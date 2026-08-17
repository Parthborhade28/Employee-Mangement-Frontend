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
    <Box sx={{ mb: 3 }}>

      {/* =====================================================
          HEADER
      ===================================================== */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 3,
          mb: 3,
        }}
      >
        {/* Title */}

        <Box>
          <Typography
            variant="h4"
            fontWeight={700}
            sx={{
              color: "#111827",
              lineHeight: 1.2,
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
            Manage employee records and company information.
          </Typography>
        </Box>

        {/* Add Employee */}

        <Button
          variant="contained"
          startIcon={<PersonAddAlt1RoundedIcon />}
          onClick={onAddEmployee}
          sx={{
            ...buttonStyle,
            flexShrink: 0,
            px: 2.5,
          }}
        >
          Add Employee
        </Button>
      </Box>

      {/* =====================================================
          SEARCH + ACTIONS
      ===================================================== */}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          width: "100%",
        }}
      >

        {/* Search */}

        <TextField
          fullWidth
          placeholder="Search employee by name..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          sx={{
            flex: 1,

            bgcolor: "#ffffff",

            "& .MuiOutlinedInput-root": {
              height: 44,
              borderRadius: 3,
            },

            "& .MuiInputBase-input": {
              fontSize: "0.95rem",
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchRoundedIcon
                  sx={{
                    color: "#6b7280",
                  }}
                />
              </InputAdornment>
            ),
          }}
        />

        {/* Action Buttons */}

        <Stack
          direction="row"
          spacing={1.2}
          sx={{
            flexShrink: 0,
          }}
        >

          {/* Hidden CSV input */}

          <input
            type="file"
            accept=".csv"
            id="employee-csv-upload"
            style={{ display: "none" }}
            onChange={(e) => {
              const file = e.target.files[0];

              if (file) {
                onImportEmployees(file);
              }

              e.target.value = "";
            }}
          />

          {/* Import */}

          <Button
            variant="contained"
            color="primary"
            startIcon={<UploadFileRoundedIcon />}
            component="label"
            htmlFor="employee-csv-upload"
            sx={buttonStyle}
          >
            Import CSV
          </Button>

          {/* Excel */}

          <Button
            variant="outlined"
            color="success"
            startIcon={<TableViewRoundedIcon />}
            onClick={onExportExcel}
            sx={buttonStyle}
          >
            Excel
          </Button>

          {/* PDF */}

          <Button
            variant="outlined"
            color="error"
            startIcon={<PictureAsPdfRoundedIcon />}
            onClick={onExportPdf}
            sx={buttonStyle}
          >
            PDF
          </Button>

        </Stack>
      </Box>
    </Box>
  );
}

export default EmployeeToolbar;