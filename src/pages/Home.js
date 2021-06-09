import { useState } from 'react';
import { useHistory, useLocation, Link } from 'react-router-dom';
import { Chart } from 'react-charts';
import useSWR from 'swr';
import { useMediaQuery, useLocalStorage } from 'hooks';
import { fetcher, formatCurrency, formatNumber } from 'utils';
import { Pagination, Select, Table, TableSkeleton } from 'components';
import { Layout } from 'partials';

const series = {
  showPoints: false,
};

const axes = [
  {
    primary: true,
    position: 'bottom',
    type: 'linear',
    show: false,
  },
  { position: 'left', type: 'linear', show: false },
];

const formatSparklineData = data => [
  {
    label: 'Last 7 days',
    data: data.map((value, i) => ({
      primary: i,
      secondary: value,
    })),
  },
];

const getSeriesStyle =
  (color = 'black') =>
  () => ({
    color: color,
    opacity: 1,
  });

const columns = (isLargeScreen = false) => [
  {
    id: 'rank',
    label: '#',
    renderCell: row => (
      <span className="text-sm">{row?.market_cap_rank ?? '-'}</span>
    ),
    hidden: !isLargeScreen,
  },
  {
    id: 'name',
    label: 'Name',
    align: 'left',
    renderCell: row => (
      <Link to={`/coins/${row.id}`} className="flex items-center space-x-2">
        <img src={row.image} alt={row.symbol} width={24} height={24} />
        <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
          <span className="text-sm sm:text-base">{row.name}</span>
          <p className="uppercase text-xs sm:text-base">
            <span className="bg-gray-200 text-gray-500 rounded-md py-1 px-2 font-medium mr-1 sm:hidden">
              {row.market_cap_rank}
            </span>
            <span className="text-gray-400">{row.symbol}</span>
          </p>
        </div>
      </Link>
    ),
  },
  {
    id: 'price',
    label: 'Price',
    align: 'right',
    renderCell: row => formatCurrency(row.current_price),
  },
  {
    id: 'price_change_perc_24h',
    label: '24h %',
    align: 'right',
    renderCell: row => (
      <span
        className={
          row.price_change_percentage_24h_in_currency > 0
            ? 'text-green-500'
            : 'text-red-500'
        }
      >
        {formatNumber(row.price_change_percentage_24h_in_currency)}%
      </span>
    ),
  },
  {
    id: 'price_change_perc_7d',
    label: '7d %',
    align: 'right',
    renderCell: row => (
      <span
        className={
          row.price_change_percentage_7d_in_currency > 0
            ? 'text-green-500'
            : 'text-red-500'
        }
      >
        {formatNumber(row.price_change_percentage_7d_in_currency)}%
      </span>
    ),
  },
  {
    id: 'market_cap',
    label: 'Market cap',
    align: 'right',
    renderCell: row =>
      formatCurrency(row.market_cap, { maximumFractionDigits: 0 }),
  },
  {
    id: 'total_volume',
    label: 'Total Volume',
    align: 'right',
    renderCell: row =>
      formatCurrency(row.total_volume, { maximumFractionDigits: 0 }),
  },
  {
    id: 'circulating_supply',
    label: 'Circulating Supply',
    align: 'right',
    renderCell: row => (
      <span>
        {formatNumber(row.circulating_supply)}{' '}
        <span className="uppercase">{row.symbol}</span>
      </span>
    ),
  },
  {
    id: 'sparkline_in_7d',
    label: 'Last 7 days',
    align: 'right',
    renderCell: row => (
      <div className="h-12 w-40">
        <Chart
          data={formatSparklineData(row?.sparkline_in_7d?.price ?? [])}
          series={series}
          getSeriesStyle={getSeriesStyle(
            row?.price_change_percentage_7d_in_currency > 0
              ? '#22C55E'
              : '#EF4444'
          )}
          axes={axes}
        />
      </div>
    ),
  },
];

const limits = [100, 50, 20];

const Home = () => {
  const history = useHistory();
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  // Check screen dimensions
  const isLargeScreen = useMediaQuery(['(min-width: 640px)'], [true], false);

  // For controlling the table's pagination
  const [pageIndex, setPageIndex] = useState(parseInt(query.get('page')) || 1);
  const [pageLimit, setPageLimit] = useLocalStorage('page-limit', limits[0]);

  // Fetch global data about market from API
  const { data: globalData } = useSWR(
    'https://api.coingecko.com/api/v3/global',
    {
      refreshInterval: 1000,
    }
  );

  // Fetch coins market data from API (paginated)
  const { data: coins, error } = useSWR(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&sparkline=true&price_change_percentage=24h%2C7d&page=${pageIndex}&per_page=${pageLimit}`,
    fetcher,
    {
      refreshInterval: 1000,
    }
  );

  // Compute/retrieve data to display
  const totalMarketCap = globalData?.data?.total_market_cap?.usd ?? 0;
  const marketCapChangePerc24h =
    globalData?.data?.market_cap_change_percentage_24h_usd ?? 0;
  const totalActiveCryptos = globalData?.data?.active_cryptocurrencies ?? 0;
  const totalPages = Math.ceil(totalActiveCryptos / pageLimit);
  const start = 1 + (pageIndex - 1) * pageLimit;
  const end = totalActiveCryptos
    ? Math.min(start + pageLimit - 1, totalActiveCryptos)
    : '...';

  const handleOnPageChange = newPage => {
    setPageIndex(newPage);
    history.push(`${location.pathname}?page=${newPage}`);
  };

  const handleOnLimitChange = newLimit => {
    setPageLimit(newLimit);
  };

  return (
    <Layout>
      <div className="mb-12 space-y-2">
        <h1 className="capitalize text-2xl font-semibold">
          Today's cryptocurrency prices by market cap
        </h1>
        <p className="text-gray-500">
          The global crypto market cap is $
          {formatNumber(totalMarketCap, {
            notation: 'compact',
          })}
          , a{' '}
          <span
            className={`${
              marketCapChangePerc24h < 0 ? 'text-red-500' : 'text-green-500'
            }`}
          >
            {formatNumber(marketCapChangePerc24h)}%
          </span>{' '}
          {marketCapChangePerc24h < 0 ? 'decrease' : 'increase'} over the last
          day.
        </p>
      </div>

      {error ? (
        <p className="text-center text-red-500 bg-red-100 rounded-md max-w-max mx-auto py-3 px-12">
          Something went wrong. Please try refreshing the page.
        </p>
      ) : (
        <>
          {!coins ? (
            <TableSkeleton cols={isLargeScreen ? 6 : 1} />
          ) : (
            <Table
              columns={columns(isLargeScreen)}
              rows={coins}
              pageLimit={pageLimit}
              onLimitChange={setPageIndex}
            />
          )}
          <div className="flex flex-col lg:flex-row items-center justify-between lg:space-x-4 mt-6">
            {/* Table info */}
            <div className="text-gray-600 mt-6 lg:mt-0">
              Showing <span className="font-medium">{start}</span> to{' '}
              <span className="font-medium">{end}</span> of{' '}
              <span className="font-medium">{totalActiveCryptos}</span> results
            </div>

            {/* Table pagination */}
            <div className="order-first lg:order-none mx-auto">
              <Pagination
                currentPage={pageIndex}
                totalPages={totalPages}
                delta={isLargeScreen ? 2 : 1}
                onPageChange={handleOnPageChange}
              />
            </div>

            {/* Page limit selection */}
            <div className="flex items-center space-x-2 text-gray-600 mt-6 lg:mt-0">
              <span>Show rows</span>
              <Select
                options={limits}
                initialOption={pageLimit}
                onSelect={handleOnLimitChange}
              />
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};

export default Home;
