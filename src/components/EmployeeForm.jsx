import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";

import SaveRoundedIcon from "@mui/icons-material/SaveRounded";

import ImageUploader from "./ImageUploader";

function EmployeeForm({
  employee,
  setEmployee,
  image,
  setImage,
  existingImage = "",
  onSubmit,
  buttonText = "Save Employee",
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;

    setEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 1100,
        borderRadius: 4,
        border: "1px solid #e5e7eb",
        boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
        bgcolor: "#ffffff",
      }}
    >
      <CardContent
        sx={{
          p: {
            xs: 2,
            sm: 3,
            md: 4,
          },
        }}
      >
        {/* ================= TITLE ================= */}

        <Typography
          variant="h5"
          fontWeight={700}
          sx={{
            color: "#111827",
            mb: 3,
          }}
        >
          Employee Information
        </Typography>

        {/* ================= FORM FIELDS ================= */}

        <Grid container spacing={2.5}>

          {/* First Name */}

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={employee.firstName || ""}
              onChange={handleChange}
            />
          </Grid>

          {/* Last Name */}

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={employee.lastName || ""}
              onChange={handleChange}
            />
          </Grid>

          {/* Email */}

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={employee.email || ""}
              onChange={handleChange}
            />
          </Grid>

          {/* Phone */}

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={employee.phone || ""}
              onChange={handleChange}
            />
          </Grid>

          {/* Department */}

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              select
              label="Department"
              name="department"
              value={employee.department || ""}
              onChange={handleChange}
            >
              <MenuItem value="IT">
                IT
              </MenuItem>

              <MenuItem value="HR">
                HR
              </MenuItem>

              <MenuItem value="Finance">
                Finance
              </MenuItem>

              <MenuItem value="Sales">
                Sales
              </MenuItem>

              <MenuItem value="Marketing">
                Marketing
              </MenuItem>

              <MenuItem value="Security">
                Security
              </MenuItem>
            </TextField>
          </Grid>

          {/* Salary */}

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Salary"
              name="salary"
              type="number"
              value={employee.salary || ""}
              onChange={handleChange}
            />
          </Grid>

          {/* Joining Date */}

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              type="date"
              name="joiningDate"
              label="Joining Date"
              value={employee.joiningDate || ""}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          {/* ================= PROFILE PHOTO ================= */}

          <Grid size={{ xs: 12 }}>
            <Box
              sx={{
                mt: 1,
                p: 2.5,
                borderRadius: 3,
                border: "1px solid #e5e7eb",
                bgcolor: "#fafbfc",
              }}
            >
              <Typography
                variant="subtitle1"
                fontWeight={600}
                sx={{
                  mb: 2,
                }}
              >
                Profile Photo
              </Typography>

              <ImageUploader
                image={image}
                setImage={setImage}
                existingImage={existingImage}
              />
            </Box>
          </Grid>

          {/* ================= BUTTON ================= */}

          <Grid size={{ xs: 12 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mt: 1,
              }}
            >
              <Button
                variant="contained"
                size="large"
                startIcon={<SaveRoundedIcon />}
                onClick={onSubmit}
                sx={{
                  minWidth: 180,
                  height: 46,
                  borderRadius: 3,
                  textTransform: "none",
                  fontWeight: 600,
                  px: 3,
                }}
              >
                {buttonText}
              </Button>
            </Box>
          </Grid>

        </Grid>
      </CardContent>
    </Card>
  );
}

export default EmployeeForm;