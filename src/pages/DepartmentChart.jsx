import { useEffect, useState } from "react";
import { getDepartmentChart } from "../services/employeeService";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";

const COLORS = [
  "#42a5f5",
  "#66bb6a",
  "#ffa726",
  "#ab47bc",
  "#ef5350",
  "#29b6f6",
];

function DepartmentChart() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadChart();
  }, []);

  const loadChart = async () => {

    try {

      const response =
        await getDepartmentChart();

      console.log(response);

      setData(response);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };


  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {

    return (
      <Box
        sx={{
          height: 420,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );

  }


  return (

    <Card
      sx={{
        height: "100%",

        borderRadius: 4,

        border:
          "1px solid",

        borderColor:
          "divider",

        bgcolor:
          "background.paper",

        boxShadow:
          "0 6px 24px rgba(0,0,0,0.08)",

        transition:
          "0.25s ease",

        "&:hover": {
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.12)",
        },
      }}
    >

      <CardContent
        sx={{
          p: {
            xs: 2,
            sm: 3,
          },
        }}
      >

        {/* =================================================
            TITLE
        ================================================= */}

        <Typography
          variant="h5"
          fontWeight="bold"
          mb={3}
          color="text.primary"
          sx={{
            fontSize: {
              xs: "1.2rem",
              sm: "1.5rem",
            },
          }}
        >
          Employees by Department
        </Typography>


        {/* =================================================
            CHART
        ================================================= */}

        {data.length === 0 ? (

          <Box
            sx={{
              height: 350,

              display: "flex",

              justifyContent:
                "center",

              alignItems:
                "center",
            }}
          >

            <Typography
              color="text.secondary"
            >
              No department data available.
            </Typography>

          </Box>

        ) : (

          <ResponsiveContainer
            width="100%"
            height={350}
          >

            <PieChart>

              <Pie
                data={data}
                dataKey="totalEmployees"
                nameKey="department"
                outerRadius={120}
                label
              >

                {data.map(
                  (entry, index) => (

                    <Cell
                      key={index}
                      fill={
                        COLORS[
                          index %
                          COLORS.length
                        ]
                      }
                    />

                  )
                )}

              </Pie>


              {/* =================================================
                  TOOLTIP
              ================================================= */}

              <Tooltip
                contentStyle={{
                  backgroundColor:
                    "#1e293b",

                  border:
                    "1px solid #475569",

                  borderRadius:
                    "10px",

                  color:
                    "#ffffff",

                  boxShadow:
                    "0 8px 20px rgba(0,0,0,0.25)",
                }}

                labelStyle={{
                  color:
                    "#ffffff",

                  fontWeight: 600,
                }}

                itemStyle={{
                  color:
                    "#ffffff",
                }}
              />


              {/* =================================================
                  LEGEND
              ================================================= */}

              <Legend
                wrapperStyle={{
                  color:
                    "inherit",
                }}
              />

            </PieChart>

          </ResponsiveContainer>

        )}

      </CardContent>

    </Card>

  );

}

export default DepartmentChart;