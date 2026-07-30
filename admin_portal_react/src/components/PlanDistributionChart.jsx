import { useEffect, useState } from "react";
import { getPlanDistribution } from "../services/dashboardService";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";

function PlanDistributionChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function loadChart() {
      try {
        const result = await getPlanDistribution();
        setData(result);
      } catch (error) {
        console.error(error);
      }
    }

    loadChart();
  }, []);

  const colors = [
    "#3B82F6", // Blue
    "#10B981", // Green
    "#F59E0B", // Yellow
    "#8B5CF6", // Purple
  ];

  return (
    <div className="chart-container">
      <h2>📊 Plan Distribution</h2>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart
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
            dataKey="plan"
            tick={{ fontSize: 14 }}
          />

          <YAxis
            allowDecimals={false}
            tick={{ fontSize: 14 }}
          />

          <Tooltip
            cursor={{ fill: "#f3f4f6" }}
          />

          <Bar
            dataKey="users"
            radius={[8, 8, 0, 0]}
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={colors[index % colors.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PlanDistributionChart;