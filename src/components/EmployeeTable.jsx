import {
  Avatar,
  Box,
  Chip,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";

import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

function EmployeeTable({
  employees,
  onEdit,
  onDelete,
}) {

  const formatSalary = (salary) => {

    return `₹${Number(salary).toLocaleString("en-IN")}`;

  };

  return (

    <TableContainer
      component={Paper}
      sx={{
        borderRadius: 4,
        border: "1px solid #e5e7eb",
        boxShadow: "0 4px 20px rgba(0,0,0,.05)",
        overflow: "hidden",
      }}
    >

      <Table>

        <TableHead>

          <TableRow
            sx={{
              bgcolor: "#f8fafc",
            }}
          >

            <TableCell sx={{ fontWeight: 700 }}>
              Employee
            </TableCell>

            <TableCell sx={{ fontWeight: 700 }}>
              Department
            </TableCell>

            <TableCell sx={{ fontWeight: 700 }}>
              Salary
            </TableCell>

            <TableCell sx={{ fontWeight: 700 }}>
              Joining Date
            </TableCell>

            <TableCell
              align="center"
              sx={{ fontWeight: 700 }}
            >
              Actions
            </TableCell>

          </TableRow>

        </TableHead>

        <TableBody>

          {employees.map((emp) => (

            <TableRow
              key={emp.id}
              hover
              sx={{
                transition: ".2s",

                "&:hover": {

                  bgcolor: "#f9fbfd",

                },
              }}
            >

              <TableCell>

                <Box
                  display="flex"
                  alignItems="center"
                  gap={2}
                >

                  <Avatar
                    src={emp.profileImage}
                    sx={{
                      width: 50,
                      height: 50,
                      bgcolor: "#1976d2",
                    }}
                  >
                    {emp.firstName.charAt(0)}
                  </Avatar>

                  <Box>

                    <Typography
                      fontWeight={600}
                    >
                      {emp.firstName} {emp.lastName}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      {emp.email}
                    </Typography>

                  </Box>

                </Box>

              </TableCell>

              <TableCell>

                <Chip
                  label={emp.department}
                  color="primary"
                  variant="outlined"
                />

              </TableCell>

              <TableCell>

                <Typography
                  fontWeight={600}
                >
                  {formatSalary(emp.salary)}
                </Typography>

              </TableCell>

              <TableCell>

                {emp.joiningDate}

              </TableCell>

              <TableCell align="center">

                <Tooltip title="Edit Employee">

                  <IconButton
                    color="primary"
                    onClick={() =>
                      onEdit(emp.id)
                    }
                  >

                    <EditRoundedIcon />

                  </IconButton>

                </Tooltip>

                <Tooltip title="Delete Employee">

                  <IconButton
                    color="error"
                    onClick={() =>
                      onDelete(emp.id)
                    }
                  >

                    <DeleteRoundedIcon />

                  </IconButton>

                </Tooltip>

              </TableCell>

            </TableRow>

          ))}

        </TableBody>

      </Table>

    </TableContainer>

  );

}

export default EmployeeTable;