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
  isAdmin = false,
}) {
  const formatSalary = (salary) => {
    if (
      salary === null ||
      salary === undefined ||
      salary === ""
    ) {
      return "Not available";
    }

    return `₹${Number(
      salary
    ).toLocaleString("en-IN")}`;
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        width: "100%",

        borderRadius: 0,

        bgcolor:
          "background.paper",

        boxShadow: "none",

        overflowX: "auto",

        "&::-webkit-scrollbar": {
          height: 8,
        },

        "&::-webkit-scrollbar-thumb": {
          borderRadius: 10,
          bgcolor: "action.disabled",
        },
      }}
    >
      <Table
        sx={{
          minWidth: 750,
        }}
      >
        {/* =================================================
            TABLE HEADER
        ================================================= */}

        <TableHead>
          <TableRow
            sx={{
              bgcolor:
                "action.hover",

              "& .MuiTableCell-root": {
                borderBottom:
                  "1px solid",
                borderColor:
                  "divider",

                color:
                  "text.primary",
              },
            }}
          >
            <TableCell
              sx={{
                fontWeight: 800,
                whiteSpace:
                  "nowrap",
              }}
            >
              Employee
            </TableCell>

            <TableCell
              sx={{
                fontWeight: 800,
                whiteSpace:
                  "nowrap",
              }}
            >
              Department
            </TableCell>

            <TableCell
              sx={{
                fontWeight: 800,
                whiteSpace:
                  "nowrap",
              }}
            >
              Salary
            </TableCell>

            <TableCell
              sx={{
                fontWeight: 800,
                whiteSpace:
                  "nowrap",
              }}
            >
              Joining Date
            </TableCell>

            {/* ADMIN ONLY */}

            {isAdmin && (
              <TableCell
                align="center"
                sx={{
                  fontWeight: 800,
                  whiteSpace:
                    "nowrap",
                }}
              >
                Actions
              </TableCell>
            )}
          </TableRow>
        </TableHead>

        {/* =================================================
            TABLE BODY
        ================================================= */}

        <TableBody>
          {employees.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={
                  isAdmin ? 5 : 4
                }
                align="center"
                sx={{
                  py: 8,

                  borderBottom:
                    "none",
                }}
              >
                <Typography
                  color="text.secondary"
                >
                  No employees found.
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            employees.map((emp) => (
              <TableRow
                key={emp.id}
                hover
                sx={{
                  transition:
                    "background-color 0.2s ease",

                  "& .MuiTableCell-root":
                    {
                      borderBottom:
                        "1px solid",
                      borderColor:
                        "divider",
                    },

                  "&:hover": {
                    bgcolor:
                      "action.hover",
                  },
                }}
              >
                {/* =================================================
                    EMPLOYEE
                ================================================= */}

                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems:
                        "center",
                      gap: 2,
                      minWidth: 240,
                    }}
                  >
                    <Avatar
                      src={
                        emp.profileImage ||
                        undefined
                      }
                      sx={{
                        width: 50,
                        height: 50,

                        bgcolor:
                          "primary.main",

                        fontWeight: 700,

                        flexShrink: 0,
                      }}
                    >
                      {emp.firstName
                        ?.charAt(0)
                        ?.toUpperCase()}
                    </Avatar>

                    <Box
                      sx={{
                        minWidth: 0,
                      }}
                    >
                      <Typography
                        fontWeight={700}
                        color="text.primary"
                        sx={{
                          wordBreak:
                            "break-word",
                        }}
                      >
                        {emp.firstName}{" "}
                        {emp.lastName}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          wordBreak:
                            "break-word",
                        }}
                      >
                        {emp.email}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>

                {/* =================================================
                    DEPARTMENT
                ================================================= */}

                <TableCell>
                  <Chip
                    label={
                      emp.department ||
                      "Not assigned"
                    }
                    color="primary"
                    variant="outlined"
                    sx={{
                      fontWeight: 600,
                    }}
                  />
                </TableCell>

                {/* =================================================
                    SALARY
                ================================================= */}

                <TableCell>
                  <Typography
                    fontWeight={700}
                    color="text.primary"
                    sx={{
                      whiteSpace:
                        "nowrap",
                    }}
                  >
                    {formatSalary(
                      emp.salary
                    )}
                  </Typography>
                </TableCell>

                {/* =================================================
                    JOINING DATE
                ================================================= */}

                <TableCell>
                  <Typography
                    color="text.primary"
                    sx={{
                      whiteSpace:
                        "nowrap",
                    }}
                  >
                    {emp.joiningDate ||
                      "Not available"}
                  </Typography>
                </TableCell>

                {/* =================================================
                    ADMIN ACTIONS
                ================================================= */}

                {isAdmin && (
                  <TableCell
                    align="center"
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent:
                          "center",
                        gap: 0.5,
                      }}
                    >
                      <Tooltip
                        title="Edit Employee"
                      >
                        <IconButton
                          color="primary"
                          onClick={() =>
                            onEdit(
                              emp.id
                            )
                          }
                          sx={{
                            "&:hover": {
                              bgcolor:
                                "action.hover",
                            },
                          }}
                        >
                          <EditRoundedIcon />
                        </IconButton>
                      </Tooltip>

                      <Tooltip
                        title="Delete Employee"
                      >
                        <IconButton
                          color="error"
                          onClick={() =>
                            onDelete(
                              emp.id
                            )
                          }
                          sx={{
                            "&:hover": {
                              bgcolor:
                                "action.hover",
                            },
                          }}
                        >
                          <DeleteRoundedIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default EmployeeTable;