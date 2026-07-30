import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function TableSkeleton({ rows = 8, columns = 5 }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "12px",
        padding: "20px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: "16px",
          marginBottom: "20px",
        }}
      >
        {Array.from({ length: columns }).map((_, index) => (
          <Skeleton key={index} height={28} />
        ))}
      </div>

      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div
          key={rowIndex}
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gap: "16px",
            marginBottom: "18px",
            alignItems: "center",
          }}
        >
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton
              key={colIndex}
              height={20}
              borderRadius={6}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default TableSkeleton;