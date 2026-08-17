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
} from "@mui/material";

const COLORS = [
  "#1976d2",
  "#2e7d32",
  "#ed6c02",
  "#9c27b0",
  "#d32f2f",
  "#0288d1",
];

function DepartmentChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadChart();
  }, []);

  const loadChart = async () => {
    try {
      const response = await getDepartmentChart();
      console.log(response);
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
    <Card
  sx={{
    height: "100%",
    borderRadius: 4,
    border: "1px solid #e9edf3",
    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
  }}
>
      <CardContent>
        <Typography
          variant="h5"
          fontWeight="bold"
          mb={3}
        >
          Employees by Department
        </Typography>

        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={data}
              dataKey="totalEmployees"
              nameKey="department"
              outerRadius={120}
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />

            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default DepartmentChart;