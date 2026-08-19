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

    const {
      name,
      value,
    } = e.target;

    setEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));

  };


  return (

    <Card
      sx={{
        width: "100%",

        borderRadius: 4,

        border:
          "1px solid",

        borderColor:
          "divider",

        boxShadow:
          "0 6px 24px rgba(0,0,0,0.07)",

        bgcolor:
          "background.paper",
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

        {/* =================================================
            TITLE
        ================================================= */}

        <Box
          sx={{
            mb: 3,

            pb: 2.5,

            borderBottom:
              "1px solid",

            borderColor:
              "divider",
          }}
        >

          <Typography
            variant="h6"
            fontWeight={800}
            color="text.primary"
          >
            Employee Information
          </Typography>


          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 0.5,
            }}
          >
            Enter the employee details below.
          </Typography>

        </Box>


        {/* =================================================
            FORM FIELDS
        ================================================= */}

        <Grid
          container
          spacing={2.5}
        >

          {/* =================================================
              FIRST NAME
          ================================================= */}

          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >

            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={
                employee.firstName || ""
              }
              onChange={handleChange}
              required
            />

          </Grid>


          {/* =================================================
              LAST NAME
          ================================================= */}

          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >

            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={
                employee.lastName || ""
              }
              onChange={handleChange}
              required
            />

          </Grid>


          {/* =================================================
              EMAIL
          ================================================= */}

          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >

            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={
                employee.email || ""
              }
              onChange={handleChange}
              required
            />

          </Grid>


          {/* =================================================
              PHONE
          ================================================= */}

          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >

            <TextField
              fullWidth
              label="Phone Number"
              name="phone"
              value={
                employee.phone || ""
              }
              onChange={handleChange}
              required
            />

          </Grid>


          {/* =================================================
              DEPARTMENT
          ================================================= */}

          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >

            <TextField
              fullWidth
              select
              label="Department"
              name="department"
              value={
                employee.department || ""
              }
              onChange={handleChange}
              required
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


          {/* =================================================
              SALARY
          ================================================= */}

          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >

            <TextField
              fullWidth
              label="Salary"
              name="salary"
              type="number"
              value={
                employee.salary || ""
              }
              onChange={handleChange}
              required
              slotProps={{
                htmlInput: {
                  min: 1,
                },
              }}
            />

          </Grid>


          {/* =================================================
              JOINING DATE
          ================================================= */}

          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >

            <TextField
              fullWidth
              type="date"
              name="joiningDate"
              label="Joining Date"
              value={
                employee.joiningDate || ""
              }
              onChange={handleChange}
              required
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />

          </Grid>


          {/* =================================================
              PROFILE PHOTO
          ================================================= */}

          <Grid
            size={{
              xs: 12,
            }}
          >

            <Box
              sx={{
                mt: 0.5,

                p: {
                  xs: 2,
                  sm: 2.5,
                },

                borderRadius: 3,

                border:
                  "1px solid",

                borderColor:
                  "divider",

                bgcolor:
                  "action.hover",
              }}
            >

              <Typography
                variant="subtitle1"
                fontWeight={700}
                color="text.primary"
                sx={{
                  mb: 0.5,
                }}
              >
                Profile Photo
              </Typography>


              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mb: 2,
                }}
              >
                Upload an employee profile
                photo.
              </Typography>


              <ImageUploader
                image={image}
                setImage={setImage}
                existingImage={
                  existingImage
                }
              />

            </Box>

          </Grid>


          {/* =================================================
              BUTTON
          ================================================= */}

          <Grid
            size={{
              xs: 12,
            }}
          >

            <Box
              sx={{
                display: "flex",

                justifyContent: {
                  xs: "stretch",
                  sm: "flex-end",
                },

                mt: 1,
              }}
            >

              <Button
                fullWidth
                variant="contained"
                size="large"
                startIcon={
                  <SaveRoundedIcon />
                }
                onClick={onSubmit}
                sx={{
                  minWidth: {
                    xs: "100%",
                    sm: 190,
                  },

                  width: {
                    xs: "100%",
                    sm: "auto",
                  },

                  height: 48,

                  borderRadius: 3,

                  textTransform:
                    "none",

                  fontWeight: 700,

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