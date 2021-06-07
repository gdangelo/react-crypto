import { useState } from 'react';
import useSWR from 'swr';
import { fetcher, formatCurrency, formatNumber } from 'utils';
import { Table } from 'components';

const API_URL =
  'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&sparkline=false&price_change_percentage=24h%2C7d';

const columns = [
  {
    label: '#',
    renderCell: row => row.market_cap_rank,
  },
  {
    label: 'Name',
    renderCell: row => (
      <span className="flex items-center space-x-2">
        <img src={row.image} alt={row.symbol} width={24} height={24} />
        <span>{row.name}</span>
        <span className="uppercase text-gray-400">{row.symbol}</span>
      </span>
    ),
  },
  {
    label: 'Price',
    renderCell: row => formatCurrency(row.current_price),
  },
  {
    label: '24h %',
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
    label: '7d %',
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
    label: 'Market cap',
    renderCell: row => formatCurrency(row.market_cap),
  },
  {
    label: 'Total Volume',
    renderCell: row => formatCurrency(row.total_volume),
  },
  {
    label: 'Circulating Supply',
    renderCell: row => (
      <span>
        {formatNumber(row.circulating_supply)}{' '}
        <span className="uppercase">{row.symbol}</span>
      </span>
    ),
  },
];

const Home = () => {
  const [pageIndex, setPageIndex] = useState(1);
  const [pageLimit, setPageLimit] = useState(100);

  const { data, error } = useSWR(
    `${API_URL}&page=${pageIndex}&per_page=${pageLimit}`,
    fetcher
  );

  return (
    <div className="px-4 py-8 space-y-16">
      <header className="flex flex-col items-center space-y-4">
        <img src="logo.svg" alt="AlterClass" className="h-8" />
        <h1 className="capitalize text-center text-2xl font-semibold">
          Today's cryptocurrency prices by market cap
        </h1>
      </header>

      <div className="container mx-auto">
        {error ? (
          <p className="text-center text-red-500 bg-red-100 rounded-md max-w-max mx-auto py-3 px-12">
            Something went wrong. Please try refreshing the page.
          </p>
        ) : !data ? (
          <div className="rounded-md container mx-auto space-y-6  animate-pulse">
            <span className="h-20 w-full rounded-md block bg-gray-200" />
            <div className="space-y-4">
              {/* Rows */}
              {[...new Array(10)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  {/* Columns */}
                  {[...new Array(5)].map((_, i) => (
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
          <Table columns={columns} rows={data} />
        )}
      </div>
    </div>
  );
};

export default Home;
