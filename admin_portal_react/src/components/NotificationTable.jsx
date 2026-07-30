import { DataGrid } from "@mui/x-data-grid";
import { Chip, IconButton } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function NotificationTable({
  notifications,
  loading,
  page,
  totalRows,
  onPageChange,
  onEdit,
  onDelete,
  canManage,
}) {
  const columns = [
    {
      field: "title",
      headerName: "Title",
      flex: 1.3,
    },
    {
      field: "message",
      headerName: "Message",
      flex: 2,
    },
    {
      field: "audience",
      headerName: "Audience",
      flex: 1,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color="primary"
          size="small"
        />
      ),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => {
        let color = "default";

        if (params.value === "Sent") color = "success";
        if (params.value === "Scheduled") color = "warning";
        if (params.value === "Draft") color = "default";

        return (
          <Chip
            label={params.value}
            color={color}
            size="small"
          />
        );
      },
    },
    {
      field: "scheduled_at",
      headerName: "Scheduled",
      flex: 1.3,
      valueFormatter: (value) => {
        if (!value) return "-";
        return new Date(value).toLocaleString();
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 120,

      renderCell: (params) =>
        canManage ? (
          <>
            <IconButton
              color="primary"
              onClick={() => onEdit(params.row)}
            >
              <EditIcon />
            </IconButton>

            <IconButton
              color="error"
              onClick={() => onDelete(params.row)}
            >
              <DeleteIcon />
            </IconButton>
          </>
        ) : null,
    },
  ];

  return (
    <div
      style={{
        height: 550,
        width: "100%",
      }}
    >
      <DataGrid
        rows={notifications}
        columns={columns}
        loading={loading}
        paginationMode="server"
        rowCount={totalRows}
        pageSizeOptions={[10]}
        paginationModel={{
          page: page - 1,
          pageSize: 10,
        }}
        onPaginationModelChange={(model) =>
          onPageChange(model.page + 1)
        }
        disableRowSelectionOnClick
      />
    </div>
  );
}

export default NotificationTable;