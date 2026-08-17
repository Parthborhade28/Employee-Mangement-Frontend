import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

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
    >
      <DialogTitle>
        Delete Employee
      </DialogTitle>

      <DialogContent>

        <DialogContentText>

          Are you sure you want to delete

          <strong>
            {" "}
            {employee?.firstName} {employee?.lastName}
          </strong>

          ?

          <br />
          <br />

          This action cannot be undone.

        </DialogContentText>

      </DialogContent>

      <DialogActions sx={{ p: 2 }}>

        <Button
          onClick={onClose}
          variant="outlined"
        >
          Cancel
        </Button>

        <Button
          color="error"
          variant="contained"
          onClick={onConfirm}
        >
          Delete
        </Button>

      </DialogActions>

    </Dialog>
  );
}

export default DeleteEmployeeDialog;