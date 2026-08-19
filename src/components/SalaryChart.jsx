import { useEffect, useState } from "react";

import { getSalaryChart } from "../services/employeeService";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";


function SalaryChart() {

  const [data, setData] = useState([]);

  const [loading, setLoading] =
    useState(true);


  // =====================================================
  // LOAD CHART
  // =====================================================

  useEffect(() => {

    loadChart();

  }, []);


  const loadChart = async () => {

    try {

      const response =
        await getSalaryChart();

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

          justifyContent:
            "center",

          alignItems:
            "center",
        }}
      >

        <CircularProgress />

      </Box>

    );

  }


  return (

    <Card
      sx={{
        mt: {
          xs: 2,
          lg: 0,
        },

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
          Average Salary by Department
        </Typography>


        {/* =================================================
            NO DATA
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
              No salary data available.
            </Typography>

          </Box>

        ) : (

          <ResponsiveContainer
            width="100%"
            height={350}
          >

            <BarChart
              data={data}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 10,
              }}
            >

              {/* =================================================
                  GRID
              ================================================= */}

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#475569"
                opacity={0.35}
              />


              {/* =================================================
                  X AXIS
              ================================================= */}

              <XAxis
                dataKey="department"
                tick={{
                  fill: "#94a3b8",
                  fontSize: 12,
                }}
                axisLine={{
                  stroke: "#475569",
                }}
                tickLine={{
                  stroke: "#475569",
                }}
              />


              {/* =================================================
                  Y AXIS
              ================================================= */}

              <YAxis
                tick={{
                  fill: "#94a3b8",
                  fontSize: 12,
                }}
                axisLine={{
                  stroke: "#475569",
                }}
                tickLine={{
                  stroke: "#475569",
                }}
              />


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

                formatter={(value) =>
                  `₹${Number(
                    value
                  ).toLocaleString(
                    "en-IN"
                  )}`
                }
              />


              {/* =================================================
                  BAR
              ================================================= */}

              <Bar
                dataKey="averageSalary"

                fill="#42a5f5"

                radius={[
                  8,
                  8,
                  0,
                  0,
                ]}

                maxBarSize={60}
              />

            </BarChart>

          </ResponsiveContainer>

        )}

      </CardContent>

    </Card>

  );

}

export default SalaryChart;