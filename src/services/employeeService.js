import API from "../api/axios";
export const getAllEmployees = async () => {
  const response = await API.get("/employees");
  return response.data;
};

export const deleteEmployee = async (id) => {
  const response = await API.delete(`/employees/${id}`);
  return response.data;
};

export const searchEmployee = async (name) => {
  const response = await API.get(`/employees/search?name=${name}`);
  return response.data;
};

export const getEmployeesByPage = async (page, size) => {
  const response = await API.get(
    `/employees/page?page=${page}&size=${size}`
  );

  return response.data;
};

export const sortEmployees = async (field) => {
  const response = await API.get(
    `/employees/sort?field=${field}`
  );
  return response.data;
};
export const addEmployee = async (employeeData) => {
  const response = await API.post(
    "/employees",
    employeeData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const getEmployeeById = async (id) => {
  const response = await API.get(`/employees/${id}`);
  return response.data;
};

export const updateEmployee = async (id, employeeData) => {
  const response = await API.put(
    `/employees/${id}`,
    employeeData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};
export const getDashboard = async () => {

    const response = await API.get("/employees/dashboard");

    return response.data;

};
export const getRecentEmployees = async () => {

    const response = await API.get("/employees/recent");

    return response.data;

};

// export const getDepartmentChart = async () => {

//     const response =
//         await API.get("/employees/department-chart");

//     return response.data;

// };
export const exportEmployees = async () => {

    const token = localStorage.getItem("token");

    const response = await fetch(
        "http://localhost:8080/employees/export",
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "employees.xlsx";

    document.body.appendChild(link);

    link.click();

    link.remove();

    window.URL.revokeObjectURL(url);

};

export const exportPdf = async () => {

    const token = localStorage.getItem("token");

    const response = await fetch(
        "http://localhost:8080/employees/export/pdf",
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "employees.pdf";

    document.body.appendChild(link);

    link.click();

    link.remove();

    window.URL.revokeObjectURL(url);

};
export const getDepartmentChart = async () => {

    const response = await API.get("/employees/dashboard/chart");

    return response.data;

};
export const getSalaryChart = async () => {

    const response = await API.get(
        "/employees/dashboard/salary-chart"
    );

    return response.data;

};
export const importEmployees = async (file) => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await API.post(
    "/employees/import",
    formData
  );

  return response.data;
};