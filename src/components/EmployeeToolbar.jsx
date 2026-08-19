import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  InputAdornment,
} from "@mui/material";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import PersonAddAlt1RoundedIcon from "@mui/icons-material/PersonAddAlt1Rounded";
import PictureAsPdfRoundedIcon from "@mui/icons-material/PictureAsPdfRounded";
import TableViewRoundedIcon from "@mui/icons-material/TableViewRounded";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";

function EmployeeToolbar({
  search,
  onSearch,
  onAddEmployee,
  onExportExcel,
  onExportPdf,
  onImportEmployees,
  isAdmin = false,
}) {
  const buttonStyle = {
    height: 44,
    borderRadius: 3,
    textTransform: "none",
    fontWeight: 600,
    px: 2,
    whiteSpace: "nowrap",
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* =====================================================
          HEADER
      ===================================================== */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: {
            xs: "flex-start",
            sm: "center",
          },
          gap: 2,
          mb: 3,

          flexDirection: {
            xs: "column",
            sm: "row",
          },
        }}
      >
        {/* TITLE */}

        <Box>
          <Typography
            variant="h5"
            fontWeight={800}
            color="text.primary"
            sx={{
              lineHeight: 1.2,
              fontSize: {
                xs: "1.35rem",
                sm: "1.5rem",
              },
            }}
          >
            Employee Directory
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              mt: 0.6,
              fontSize: "0.95rem",
            }}
          >
            Manage employee records and
            company information.
          </Typography>
        </Box>

        {/* =================================================
            ADD EMPLOYEE
        ================================================= */}

        {isAdmin && (
          <Button
            variant="contained"
            startIcon={
              <PersonAddAlt1RoundedIcon />
            }
            onClick={onAddEmployee}
            sx={{
              ...buttonStyle,

              flexShrink: 0,

              px: 2.5,

              width: {
                xs: "100%",
                sm: "auto",
              },
            }}
          >
            Add Employee
          </Button>
        )}
      </Box>

      {/* =====================================================
          SEARCH + ACTIONS
      ===================================================== */}

      <Box
        sx={{
          display: "flex",
          alignItems: "stretch",
          gap: 2,
          width: "100%",

          flexDirection: {
            xs: "column",
            lg: "row",
          },
        }}
      >
        {/* =================================================
            SEARCH
        ================================================= */}

        <TextField
          fullWidth
          placeholder="Search employee by name..."
          value={search}
          onChange={(e) =>
            onSearch(e.target.value)
          }
          sx={{
            flex: 1,

            "& .MuiOutlinedInput-root": {
              minHeight: 44,

              borderRadius: 3,

              bgcolor:
                "background.paper",

              transition:
                "0.2s ease",

              "&:hover": {
                bgcolor:
                  "background.paper",
              },

              "&.Mui-focused": {
                bgcolor:
                  "background.paper",
              },
            },

            "& .MuiInputBase-input": {
              fontSize: "0.95rem",
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchRoundedIcon
                  color="action"
                />
              </InputAdornment>
            ),
          }}
        />

        {/* =================================================
            ADMIN ACTIONS
        ================================================= */}

        {isAdmin && (
          <Stack
            direction={{
              xs: "column",
              sm: "row",
            }}
            spacing={1.2}
            sx={{
              flexShrink: 0,

              width: {
                xs: "100%",
                lg: "auto",
              },
            }}
          >
            {/* =================================================
                CSV INPUT
            ================================================= */}

            <input
              type="file"
              accept=".csv"
              id="employee-csv-upload"
              style={{
                display: "none",
              }}
              onChange={(e) => {
                const file =
                  e.target.files?.[0];

                if (file) {
                  onImportEmployees(
                    file
                  );
                }

                e.target.value = "";
              }}
            />

            {/* =================================================
                IMPORT CSV
            ================================================= */}

            <Button
              variant="contained"
              color="primary"
              startIcon={
                <UploadFileRoundedIcon />
              }
              component="label"
              htmlFor="employee-csv-upload"
              sx={{
                ...buttonStyle,

                width: {
                  xs: "100%",
                  sm: "auto",
                },
              }}
            >
              Import CSV
            </Button>

            {/* =================================================
                EXCEL
            ================================================= */}

            <Button
              variant="outlined"
              color="success"
              startIcon={
                <TableViewRoundedIcon />
              }
              onClick={
                onExportExcel
              }
              sx={{
                ...buttonStyle,

                width: {
                  xs: "100%",
                  sm: "auto",
                },
              }}
            >
              Excel
            </Button>

            {/* =================================================
                PDF
            ================================================= */}

            <Button
              variant="outlined"
              color="error"
              startIcon={
                <PictureAsPdfRoundedIcon />
              }
              onClick={
                onExportPdf
              }
              sx={{
                ...buttonStyle,

                width: {
                  xs: "100%",
                  sm: "auto",
                },
              }}
            >
              PDF
            </Button>
          </Stack>
        )}
      </Box>
    </Box>
  );
}

export default EmployeeToolbar;