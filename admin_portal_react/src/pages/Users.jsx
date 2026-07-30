import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import UserModal from "../components/UserModal";
import ConfirmModal from "../components/ConfirmModal";
import UserTable from "../components/UserTable";
import TableSkeleton from "../components/TableSkeleton";

import "../styles/users.css";

import {
  getUsers,
  deleteUser,
} from "../services/userService";

import { isSuperAdmin } from "../services/authService";
import { exportUsersCSV } from "../utils/exportCSV";

function Users() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [plan, setPlan] = useState("All");
  const [status, setStatus] = useState("All");

  const [users, setUsers] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRows, setTotalRows] = useState(0);

  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [showConfirm, setShowConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const data = await getUsers(
        page,
        10,
        search,
        plan,
        status
      );

      setUsers(data.users);
      setTotalPages(data.totalPages);
      setTotalRows(data.totalUsers);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, search, plan, status]);

  const handleAdd = () => {
    setSelectedUser(null);
    setShowModal(true);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setShowConfirm(true);
  };

  const handleView = (user) => {
    navigate(`/users/${user.id}`);
  };

  const confirmDelete = async () => {
    if (!userToDelete) return;

    try {
      await deleteUser(userToDelete.id);

      toast.success("User deleted successfully!");

      setShowConfirm(false);
      setUserToDelete(null);

      fetchUsers();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete user.");
    }
  };

  return (
    <div className="users-page">
      <h1>User Management</h1>

      <div className="users-header">
        <input
          type="text"
          placeholder="🔍 Search users..."
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />

        <select
          value={plan}
          onChange={(e) => {
            setPage(1);
            setPlan(e.target.value);
          }}
        >
          <option value="All">All Plans</option>
          <option value="Free">Free</option>
          <option value="Gold">Gold</option>
          <option value="Premium">Premium</option>
        </select>

        <select
          value={status}
          onChange={(e) => {
            setPage(1);
            setStatus(e.target.value);
          }}
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <div style={{ display: "flex", gap: "10px" }}>
          {isSuperAdmin() && (
            <button onClick={handleAdd}>
              ➕ Add User
            </button>
          )}

          <button onClick={() => exportUsersCSV(users)}>
            📥 Export CSV
          </button>
        </div>
      </div>

      {loading ? (
        <TableSkeleton rows={8} columns={4} />
      ) : (
        <UserTable
          users={users}
          loading={loading}
          page={page}
          totalRows={totalRows}
          onPageChange={setPage}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
          onView={handleView}
          canManage={isSuperAdmin()}
        />
      )}

      {showModal && (
        <UserModal
          mode={selectedUser ? "edit" : "add"}
          user={selectedUser}
          onClose={() => {
            setShowModal(false);
            setSelectedUser(null);
          }}
          onUserAdded={() => {
            fetchUsers();
            setShowModal(false);
          }}
        />
      )}

      <ConfirmModal
        isOpen={showConfirm}
        title="🗑 Delete User"
        message={`Are you sure you want to delete "${userToDelete?.name || ""}"?`}
        onCancel={() => {
          setShowConfirm(false);
          setUserToDelete(null);
        }}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

export default Users;