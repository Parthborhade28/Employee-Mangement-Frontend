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
} from "@mui/material";

function SalaryChart() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadChart();
  }, []);

  const loadChart = async () => {
    try {

      const response = await getSalaryChart();

      setData(response);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  if (loading) {

    return <CircularProgress />;

  }

  return (

    <Card sx={{ mt: 4, borderRadius: 3 }}>

      <CardContent>

        <Typography
          variant="h5"
          fontWeight="bold"
          mb={3}
        >
          Average Salary by Department
        </Typography>

        <ResponsiveContainer
          width="100%"
          height={350}
        >

          <BarChart data={data}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="department" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="averageSalary"
              radius={[8, 8, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </CardContent>

    </Card>

  );

}

export default SalaryChart;