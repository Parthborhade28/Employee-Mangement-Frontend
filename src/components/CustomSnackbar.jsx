import { Snackbar, Alert } from "@mui/material";

function CustomSnackbar({

    open,

    message,

    severity,

    onClose,

}) {

    return (

        <Snackbar

            open={open}

            autoHideDuration={3000}

            onClose={onClose}

            anchorOrigin={{

                vertical: "bottom",

                horizontal: "center",

            }}

        >

            <Alert

                severity={severity}

                variant="filled"

                onClose={onClose}

                sx={{ width: "100%" }}

            >

                {message}

            </Alert>

        </Snackbar>

    );

}

export default CustomSnackbar;