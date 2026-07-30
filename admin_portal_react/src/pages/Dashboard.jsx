import { useEffect, useState } from "react";
import {
  FaUsers,
  FaUserCheck,
  FaCrown,
  FaMedal,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import PlanDistributionChart from "../components/PlanDistributionChart";
import MonthlyUsersChart from "../components/MonthlyUsersChart";
import UserStatusChart from "../components/UserStatusChart";
import RecentUsers from "../components/RecentUsers";
import NotificationsPanel from "../components/NotificationsPanel";

import { getDashboardStats } from "../services/dashboardService";

function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    premiumUsers: 0,
    goldUsers: 0,
  });

  useEffect(() => {
    async function loadDashboard() {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error("Failed to load dashboard:", error);
      }
    }

    loadDashboard();
  }, []);

  return (
    <main>
      <Navbar />

      <section className="dashboard">
        <h1>Dashboard</h1>

        <div className="cards">
          <StatCard
            title="Total Users"
            value={stats.totalUsers}
            icon={<FaUsers />}
            iconColor="#2563eb"
          />

          <StatCard
            title="Active Users"
            value={stats.activeUsers}
            icon={<FaUserCheck />}
            iconColor="#16a34a"
          />

          <StatCard
            title="Premium Users"
            value={stats.premiumUsers}
            icon={<FaCrown />}
            iconColor="#7c3aed"
          />

          <StatCard
            title="Gold Users"
            value={stats.goldUsers}
            icon={<FaMedal />}
            iconColor="#f59e0b"
          />
        </div>

        <div className="charts-grid">
          <MonthlyUsersChart />
          <PlanDistributionChart />
        </div>

        <div className="charts-grid">
          <UserStatusChart />
          <NotificationsPanel />
        </div>

        <RecentUsers />
      </section>
    </main>
  );
}

export default Dashboard;