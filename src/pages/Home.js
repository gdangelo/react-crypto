import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import useSWR from 'swr';
import { useMediaQuery, useLocalStorage } from 'hooks';
import { fetcher, formatCurrency, formatNumber } from 'utils';
import { Pagination, Select, Table } from 'components';

const API_URL = 'https://api.coingecko.com/api/v3';

const columns = [
  {
    id: 'rank',
    label: '#',
    renderCell: row => row?.market_cap_rank ?? '-',
  },
  {
    id: 'name',
    label: 'Name',
    align: 'left',
    renderCell: row => (
      <span className="flex items-center space-x-2">
        <img src={row.image} alt={row.symbol} width={24} height={24} />
        <span>{row.name}</span>
        <span className="uppercase text-gray-400">{row.symbol}</span>
      </span>
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
    renderCell: row => formatCurrency(row.market_cap),
  },
  {
    id: 'total_volume',
    label: 'Total Volume',
    align: 'right',
    renderCell: row => formatCurrency(row.total_volume),
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
];

const limits = [100, 50, 20];

const Home = () => {
  const history = useHistory();
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const isLargeScreen = useMediaQuery(['(min-width: 640px)'], [true], false);

  const [pageIndex, setPageIndex] = useState(parseInt(query.get('page')) || 1);
  const [pageLimit, setPageLimit] = useLocalStorage('page-limit', limits[0]);

  const { data: globalData } = useSWR(`${API_URL}/global`);

  const { data, error } = useSWR(
    `${API_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&sparkline=false&price_change_percentage=24h%2C7d&page=${pageIndex}&per_page=${pageLimit}`,
    fetcher
  );

  const total = globalData?.data?.active_cryptocurrencies;
  const totalPages = Math.ceil(total / pageLimit);
  const start = 1 + (pageIndex - 1) * pageLimit;
  const end = total ? Math.min(start + pageLimit - 1, total) : '...';

  const handleOnPageChange = newPage => {
    setPageIndex(newPage);
    history.push(`${location.pathname}?page=${newPage}`);
  };

  const handleOnLimitChange = newLimit => {
    setPageLimit(newLimit);
  };

  return (
    <div className="px-4 sm:px-6 py-8 space-y-16">
      <header className="flex flex-col items-center space-y-4">
        <img src="logo.svg" alt="AlterClass" className="h-8" />
        <h1 className="capitalize text-center text-2xl font-semibold">
          Today's cryptocurrency prices by market cap
        </h1>
      </header>

      <div className="w-full max-w-screen-2xl mx-auto">
        {error ? (
          <p className="text-center text-red-500 bg-red-100 rounded-md max-w-max mx-auto py-3 px-12">
            Something went wrong. Please try refreshing the page.
          </p>
        ) : (
          <>
            {!data ? (
              <div className="rounded-md space-y-6 animate-pulse">
                <span className="h-20 w-full rounded-md block bg-gray-200" />
                <div className="space-y-4">
                  {/* Rows */}
                  {[...new Array(10)].map((_, i) => (
                    <div key={i} className="flex items-center space-x-4">
                      {/* Columns */}
                      {[...new Array(isLargeScreen ? 6 : 1)].map((_, i) => (
                        <span
                          key={i}
                          className="h-12 w-full rounded-md block bg-gray-200"
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <Table
                columns={columns}
                rows={data}
                pageLimit={pageLimit}
                onLimitChange={setPageIndex}
              />
            )}
            <div className="flex flex-col lg:flex-row items-center justify-between lg:space-x-4 mt-6">
              <div className="text-gray-600 mt-6 lg:mt-0">
                Showing <span className="font-medium">{start}</span> to{' '}
                <span className="font-medium">{end}</span> of{' '}
                <span className="font-medium">{total}</span> results
              </div>
              <div className="order-first lg:order-none mx-auto">
                <Pagination
                  currentPage={pageIndex}
                  totalPages={totalPages}
                  delta={isLargeScreen ? 2 : 1}
                  onPageChange={handleOnPageChange}
                />
              </div>
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
      </div>
    </div>
  );
};

export default Home;
