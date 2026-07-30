import { useEffect, useState } from "react";
import { getRecentUsers } from "../services/dashboardService";

function RecentUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function loadRecentUsers() {
      try {
        const data = await getRecentUsers();
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadRecentUsers();
  }, []);

  return (
    <div className="recent-users">
      <h2>Recent Users</h2>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Plan</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No users found.
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>

                <td>{user.email}</td>

                <td>
                  <span
                    className={`plan-badge ${
                      user.plan.toLowerCase()
                    }`}
                  >
                    {user.plan}
                  </span>
                </td>

                <td>
                  <span
                    className={`status-badge ${
                      user.status.toLowerCase()
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default RecentUsers;