function StatCard({
  title,
  value,
  icon,
  iconColor = "#2563eb",
  trend = "",
}) {
  return (
    <div className="stat-card">
      <div
        className="stat-card-icon"
        style={{ backgroundColor: iconColor }}
      >
        {icon}
      </div>

      <div className="stat-card-content">
        <h4>{title}</h4>

        <h2>{value}</h2>

        {trend && (
          <p
            className={
              trend.startsWith("+")
                ? "stat-trend positive"
                : "stat-trend negative"
            }
          >
            {trend}
          </p>
        )}
      </div>
    </div>
  );
}

export default StatCard;