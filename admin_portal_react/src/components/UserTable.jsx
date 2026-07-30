import { DataGrid } from "@mui/x-data-grid";

import {
  Chip,
  IconButton,
  Tooltip,
  Avatar,
  Box,
  Typography,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

function UserTable({
  users,
  loading,
  page,
  totalRows,
  onPageChange,
  onEdit,
  onDelete,
  onView,
  canManage,
}) {
  const columns = [
    {
      field: "name",
      headerName: "User",
      flex: 1.8,

      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            height: "100%",
          }}
        >
          <Avatar
            sx={{
              bgcolor: "#2563eb",
              width: 42,
              height: 42,
              fontWeight: "bold",
            }}
          >
            {params.row.name?.charAt(0).toUpperCase()}
          </Avatar>

          <Box>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: 15,
              }}
            >
              {params.row.name}
            </Typography>

            <Typography
              sx={{
                color: "#6b7280",
                fontSize: 13,
              }}
            >
              {params.row.email}
            </Typography>
          </Box>
        </Box>
      ),
    },

    {
      field: "plan",
      headerName: "Plan",
      flex: 0.8,

      renderCell: (params) => {
        let color = "default";

        if (params.value === "Gold") color = "warning";
        if (params.value === "Premium") color = "primary";

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
      field: "status",
      headerName: "Status",
      flex: 0.8,

      renderCell: (params) => (
        <Chip
          label={params.value}
          color={params.value === "Active" ? "success" : "error"}
          size="small"
        />
      ),
    },

    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      filterable: false,
      flex: 1,

      renderCell: (params) => (
        <>
          <Tooltip title="View User">
            <IconButton
              color="info"
              onClick={() => onView(params.row)}
            >
              <VisibilityIcon />
            </IconButton>
          </Tooltip>

          {canManage && (
            <>
              <Tooltip title="Edit User">
                <IconButton
                  color="primary"
                  onClick={() => onEdit(params.row)}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Delete User">
                <IconButton
                  color="error"
                  onClick={() => onDelete(params.row)}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </>
          )}
        </>
      ),
    },
  ];

  return (
    <div
      style={{
        height: 640,
        width: "100%",
      }}
    >
      <DataGrid
        rows={users}
        columns={columns}
        getRowId={(row) => row.id}
        loading={loading}
        disableRowSelectionOnClick
        pagination
        paginationMode="server"
        rowCount={totalRows}
        pageSizeOptions={[10]}
        rowHeight={72}
        paginationModel={{
          page: page - 1,
          pageSize: 10,
        }}
        onPaginationModelChange={(model) => {
          onPageChange(model.page + 1);
        }}
      />
    </div>
  );
}

export default UserTable;