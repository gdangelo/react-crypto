import { useState } from 'react';
import axios from 'axios';
import useSWR from 'swr';

const API_URL =
  'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&sparkline=false&price_change_percentage=24h%2C7d';

const fetcher = url => axios.get(url).then(res => res.data);

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
          <p className="text-center text-red">
            Something went wrong. Please try refreshing the page.
          </p>
        ) : !data ? (
          <p className="text-center">Loading...</p>
        ) : (
          <table className="mx-auto">
            <thead>
              <tr>
                <th className="text-right px-4 py-6 border-t">#</th>
                <th className="text-left px-4 py-6 border-t">Name</th>
                <th className="text-right px-4 py-6 border-t">Price</th>
                <th className="text-right px-4 py-6 border-t">24h %</th>
                <th className="text-right px-4 py-6 border-t">7d %</th>
                <th className="text-right px-4 py-6 border-t">Market cap</th>
                <th className="text-right px-4 py-6 border-t">Total Volume</th>
                <th className="text-right px-4 py-6 border-t">
                  Circulating Supply
                </th>
              </tr>
            </thead>

            <tbody>
              {data?.map(crypto => (
                <tr key={crypto.id} className="hover:bg-gray-100">
                  <td className="text-right px-4 py-6 whitespace-nowrap border-t">
                    <span>{crypto.market_cap_rank}</span>
                  </td>
                  <td className="text-left flex items-center space-x-2 px-4 py-6 whitespace-nowrap border-t">
                    <img
                      src={crypto.image}
                      alt={crypto.symbol}
                      width={24}
                      height={24}
                    />
                    <span>{crypto.name}</span>
                    <span className="uppercase">{crypto.symbol}</span>
                  </td>
                  <td className="text-right px-4 py-6 whitespace-nowrap border-t">
                    <span>
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        maximumFractionDigits: 10,
                      }).format(crypto.current_price)}
                    </span>
                  </td>
                  <td className="text-right px-4 py-6 whitespace-nowrap border-t">
                    <span
                      className={
                        crypto?.price_change_percentage_24h_in_currency > 0
                          ? 'text-green'
                          : 'text-red'
                      }
                    >
                      {crypto?.price_change_percentage_24h_in_currency?.toFixed(
                        2
                      ) ?? '-'}
                      %
                    </span>
                  </td>
                  <td className="text-right px-4 py-6 whitespace-nowrap border-t">
                    <span
                      className={
                        crypto?.price_change_percentage_7d_in_currency > 0
                          ? 'text-green'
                          : 'text-red'
                      }
                    >
                      {crypto?.price_change_percentage_7d_in_currency?.toFixed(
                        2
                      ) ?? '-'}
                      %
                    </span>
                  </td>
                  <td className="text-right px-4 py-6 whitespace-nowrap border-t">
                    <span>
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        maximumFractionDigits: 10,
                      }).format(crypto.market_cap)}
                    </span>
                  </td>
                  <td className="text-right px-4 py-6 whitespace-nowrap border-t">
                    <span>
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        maximumFractionDigits: 10,
                      }).format(crypto.total_volume)}
                    </span>
                  </td>
                  <td className="text-right px-4 py-6 whitespace-nowrap border-t">
                    <span>
                      {new Intl.NumberFormat('en-US').format(
                        crypto.circulating_supply
                      )}{' '}
                      <span className="uppercase">{crypto.symbol}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Home;
