import { useEffect, useState } from "react";
import { getMonthlyUsers } from "../services/dashboardService";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function MonthlyUsersChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function loadChart() {
      try {
        const result = await getMonthlyUsers();
        setData(result);
      } catch (error) {
        console.error(error);
      }
    }

    loadChart();
  }, []);

  return (
    <div className="chart-container">
      <h2>📈 Monthly User Growth</h2>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 20,
            left: 0,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="4 4" />

          <XAxis
            dataKey="month"
            tick={{ fontSize: 14 }}
          />

          <YAxis
            allowDecimals={false}
            tick={{ fontSize: 14 }}
          />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="users"
            stroke="#3B82F6"
            strokeWidth={3}
            dot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MonthlyUsersChart;