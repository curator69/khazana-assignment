import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "../components/ThemeToggle";
import { Coin } from "../types/coin";

export default function Home() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoins = async () => {
      const { data } = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets",
        {
          params: {
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: 100,
            page: 1,
            sparkline: false,
          },
        }
      );
      setCoins(data);
      setLoading(false);
    };
    fetchCoins();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <ThemeToggle />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">
          Cryptocurrency Market
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {coins.map((coin) => (
            <Link href={`/coin/${coin.id}`} key={coin.id}>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300">
                <div className="flex items-center gap-4">
                  <Image
                    src={coin.image}
                    alt={coin.name}
                    width={40}
                    height={40}
                  />
                  <div>
                    <h2 className="font-semibold text-gray-900 dark:text-white">
                      {coin.name}
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      {coin.symbol.toUpperCase()}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    ${coin.current_price.toLocaleString()}
                  </p>
                  <p
                    className={`text-sm ${
                      coin.price_change_percentage_24h > 0
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
