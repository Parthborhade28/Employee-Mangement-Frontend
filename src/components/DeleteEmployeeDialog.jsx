import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
  Typography,
} from "@mui/material";

import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

function DeleteEmployeeDialog({
  open,
  employee,
  onClose,
  onConfirm,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          bgcolor: "background.paper",
          border: "1px solid",
          borderColor: "divider",
          boxShadow:
            "0 12px 40px rgba(0,0,0,0.18)",
        },
      }}
    >
      {/* =================================================
          TITLE
      ================================================= */}

      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          px: 3,
          pt: 3,
          fontWeight: 800,
          color: "text.primary",
        }}
      >
        <Box
          sx={{
            width: 42,
            height: 42,
            borderRadius: 2.5,

            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            bgcolor: "error.main",
            color: "#fff",
          }}
        >
          <DeleteRoundedIcon />
        </Box>

        Delete Employee
      </DialogTitle>

      {/* =================================================
          CONTENT
      ================================================= */}

      <DialogContent
        sx={{
          px: 3,
          pt: 1,
        }}
      >
        <DialogContentText
          component="div"
          sx={{
            color: "text.secondary",
            lineHeight: 1.7,
          }}
        >
          Are you sure you want to delete{" "}

          <Typography
            component="span"
            fontWeight={700}
            color="text.primary"
          >
            {employee?.firstName}{" "}
            {employee?.lastName}
          </Typography>

          ?

          <Box
            sx={{
              mt: 2,
              p: 1.5,
              borderRadius: 2.5,
              bgcolor: "action.hover",
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Typography
              variant="body2"
              color="error.main"
              fontWeight={600}
            >
              This action cannot be undone.
            </Typography>
          </Box>
        </DialogContentText>
      </DialogContent>

      {/* =================================================
          ACTIONS
      ================================================= */}

      <DialogActions
        sx={{
          px: 3,
          pb: 3,
          pt: 1,
          gap: 1,
        }}
      >
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            borderRadius: 2.5,
            textTransform: "none",
            fontWeight: 600,
            px: 2.5,
          }}
        >
          Cancel
        </Button>

        <Button
          color="error"
          variant="contained"
          startIcon={
            <DeleteRoundedIcon />
          }
          onClick={onConfirm}
          sx={{
            borderRadius: 2.5,
            textTransform: "none",
            fontWeight: 700,
            px: 2.5,
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteEmployeeDialog;