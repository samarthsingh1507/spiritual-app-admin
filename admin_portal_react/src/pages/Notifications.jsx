import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import NotificationTable from "../components/NotificationTable";
import NotificationModal from "../components/NotificationModal";
import ConfirmModal from "../components/ConfirmModal";
import TableSkeleton from "../components/TableSkeleton";

import "../styles/notifications.css";

import {
  getNotifications,
  deleteNotification,
} from "../services/notificationService";

import { isSuperAdmin } from "../services/authService";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  const [showConfirm, setShowConfirm] = useState(false);
  const [notificationToDelete, setNotificationToDelete] = useState(null);

  const fetchNotifications = async () => {
    try {
      setLoading(true);

      const data = await getNotifications(page, 10, search);

      setNotifications(data.notifications);
      setTotalRows(data.totalNotifications);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load notifications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [page, search]);

  const handleAdd = () => {
    setSelectedNotification(null);
    setShowModal(true);
  };

  const handleEdit = (notification) => {
    setSelectedNotification(notification);
    setShowModal(true);
  };

  const handleDeleteClick = (notification) => {
    setNotificationToDelete(notification);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteNotification(notificationToDelete.id);

      toast.success("Notification deleted.");

      setShowConfirm(false);
      setNotificationToDelete(null);

      fetchNotifications();
    } catch (err) {
      console.error(err);
      toast.error("Delete failed.");
    }
  };

  return (
    <div className="notifications-page">
      <h1>Push Notifications</h1>

      <div className="notifications-header">
        <input
          placeholder="🔍 Search notifications..."
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />

        {isSuperAdmin() && (
          <button onClick={handleAdd}>
            ➕ Create Notification
          </button>
        )}
      </div>

      {loading ? (
        <TableSkeleton rows={8} columns={6} />
      ) : (
        <NotificationTable
          notifications={notifications}
          loading={loading}
          page={page}
          totalRows={totalRows}
          onPageChange={setPage}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
          canManage={isSuperAdmin()}
        />
      )}

      {showModal && (
        <NotificationModal
          mode={selectedNotification ? "edit" : "add"}
          notification={selectedNotification}
          onClose={() => {
            setShowModal(false);
            setSelectedNotification(null);
          }}
          onSaved={() => {
            fetchNotifications();
            setShowModal(false);
          }}
        />
      )}

      <ConfirmModal
        isOpen={showConfirm}
        title="Delete Notification"
        message={`Delete "${notificationToDelete?.title || ""}"?`}
        onCancel={() => {
          setShowConfirm(false);
          setNotificationToDelete(null);
        }}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

export default Notifications;