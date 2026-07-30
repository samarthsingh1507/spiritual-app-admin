import { useEffect, useState } from "react";
import { getUserStatus } from "../services/dashboardService";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
} from "recharts";

function UserStatusChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function loadChart() {
      try {
        const result = await getUserStatus();
        setData(result);
      } catch (error) {
        console.error(error);
      }
    }

    loadChart();
  }, []);

  const colors = ["#10B981", "#EF4444"];

  return (
    <div className="chart-container">
      <h2>👥 User Status</h2>

      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={data}
            dataKey="users"
            nameKey="status"
            outerRadius={120}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default UserStatusChart;