function NotificationsPanel() {
  const notifications = [
    "New user registered",
    "Premium subscription purchased",
    "Daily summary sent",
    "Push notification delivered",
  ];

  return (
    <div className="notifications-panel">
      <h2>Notifications</h2>

      <ul>
        {notifications.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default NotificationsPanel;