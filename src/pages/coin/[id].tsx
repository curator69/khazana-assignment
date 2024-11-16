import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Line } from "react-chartjs-2";
import ThemeToggle from "../../components/ThemeToggle";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { CoinDetail as CoinDetailType } from "../../types/coin";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function CoinDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [coin, setCoin] = useState<CoinDetailType | null>(null);
  const [chartData, setChartData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        const [coinResponse, chartResponse] = await Promise.all([
          axios.get(`https://api.coingecko.com/api/v3/coins/${id}`),
          axios.get(
            `https://api.coingecko.com/api/v3/coins/${id}/market_chart`,
            {
              params: { vs_currency: "usd", days: "7" },
            }
          ),
        ]);

        setCoin(coinResponse.data);

        const chartData = {
          labels: chartResponse.data.prices.map((price: any) =>
            new Date(price[0]).toLocaleDateString()
          ),
          datasets: [
            {
              label: "Price (USD)",
              data: chartResponse.data.prices.map((price: any) => price[1]),
              borderColor: "rgb(75, 192, 192)",
              tension: 0.1,
            },
          ],
        };
        setChartData(chartData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!coin) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <ThemeToggle />
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/"
          className="text-blue-500 hover:underline mb-8 inline-block"
        >
          ← Back to Market
        </Link>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="flex items-center gap-4 mb-8">
            <Image
              src={coin.image.large}
              alt={coin.name}
              width={64}
              height={64}
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {coin.name}
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                {coin.symbol.toUpperCase()}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Current Price
              </h2>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                ${coin.market_data.current_price.usd.toLocaleString()}
              </p>
              <p
                className={`text-lg ${
                  coin.market_data.price_change_percentage_24h > 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {coin.market_data.price_change_percentage_24h.toFixed(2)}%
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Price Chart (7 Days)
              </h2>
              {chartData && (
                <Line
                  data={chartData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: "top",
                        labels: {
                          color: document.documentElement.classList.contains(
                            "dark"
                          )
                            ? "white"
                            : "black",
                        },
                      },
                    },
                    scales: {
                      y: {
                        ticks: {
                          color: document.documentElement.classList.contains(
                            "dark"
                          )
                            ? "white"
                            : "black",
                        },
                      },
                      x: {
                        ticks: {
                          color: document.documentElement.classList.contains(
                            "dark"
                          )
                            ? "white"
                            : "black",
                        },
                      },
                    },
                  }}
                />
              )}
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              About {coin.name}
            </h2>
            <div
              dangerouslySetInnerHTML={{ __html: coin.description.en }}
              className="prose prose-gray dark:prose-invert max-w-none text-gray-900 dark:text-gray-200"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
