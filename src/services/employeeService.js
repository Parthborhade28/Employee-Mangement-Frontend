// import API from "../api/axios";
// export const getAllEmployees = async () => {
//   const response = await API.get("/employees");
//   return response.data;
// };

// export const deleteEmployee = async (id) => {
//   const response = await API.delete(`/employees/${id}`);
//   return response.data;
// };

// export const searchEmployee = async (name) => {
//   const response = await API.get(`/employees/search?name=${name}`);
//   return response.data;
// };

// export const getEmployeesByPage = async (page, size) => {
//   const response = await API.get(
//     `/employees/page?page=${page}&size=${size}`
//   );

//   return response.data;
// };

// export const sortEmployees = async (field) => {
//   const response = await API.get(
//     `/employees/sort?field=${field}`
//   );
//   return response.data;
// };
// export const addEmployee = async (employeeData) => {
//   const response = await API.post(
//     "/employees",
//     employeeData,
//     {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     }
//   );

//   return response.data;
// };

// export const getEmployeeById = async (id) => {
//   const response = await API.get(`/employees/${id}`);
//   return response.data;
// };

// export const updateEmployee = async (id, employeeData) => {
//   const response = await API.put(
//     `/employees/${id}`,
//     employeeData,
//     {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     }
//   );

//   return response.data;
// };
// export const getDashboard = async () => {

//     const response = await API.get("/employees/dashboard");

//     return response.data;

// };
// export const getRecentEmployees = async () => {

//     const response = await API.get("/employees/recent");

//     return response.data;

// };

// // export const getDepartmentChart = async () => {

// //     const response =
// //         await API.get("/employees/department-chart");

// //     return response.data;

// // };
// export const exportEmployees = async () => {

//     const token = localStorage.getItem("token");

//     const response = await fetch(
//         "https://employee-management-backend-1-rfi2.onrender.com/employees/export",
//         {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         }
//     );

//     const blob = await response.blob();

//     const url = window.URL.createObjectURL(blob);

//     const link = document.createElement("a");

//     link.href = url;

//     link.download = "employees.xlsx";

//     document.body.appendChild(link);

//     link.click();

//     link.remove();

//     window.URL.revokeObjectURL(url);

// };

// export const exportPdf = async () => {

//     const token = localStorage.getItem("token");

//     const response = await fetch(
//         "https://employee-management-backend-1-rfi2.onrender.com/employees/export/pdf",
//         {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         }
//     );

//     const blob = await response.blob();

//     const url = window.URL.createObjectURL(blob);

//     const link = document.createElement("a");

//     link.href = url;

//     link.download = "employees.pdf";

//     document.body.appendChild(link);

//     link.click();

//     link.remove();

//     window.URL.revokeObjectURL(url);

// };
// export const getDepartmentChart = async () => {

//     const response = await API.get("/employees/dashboard/chart");

//     return response.data;

// };
// export const getSalaryChart = async () => {

//     const response = await API.get(
//         "/employees/dashboard/salary-chart"
//     );

//     return response.data;

// };
// export const importEmployees = async (file) => {
//   const formData = new FormData();

//   formData.append("file", file);

//   const response = await API.post(
//     "/employees/import",
//     formData
//   );

//   return response.data;
// };
import API from "../api/axios";

// =====================================================
// GET ALL EMPLOYEES
// =====================================================

export const getAllEmployees = async () => {
  const response = await API.get("/employees");

  return response.data;
};


// =====================================================
// DELETE EMPLOYEE
// =====================================================

export const deleteEmployee = async (id) => {
  const response = await API.delete(`/employees/${id}`);

  return response.data;
};


// =====================================================
// SEARCH EMPLOYEE
// =====================================================

export const searchEmployee = async (name) => {
  const response = await API.get(
    `/employees/search?name=${encodeURIComponent(name)}`
  );

  return response.data;
};


// =====================================================
// GET EMPLOYEES BY PAGE
// =====================================================

export const getEmployeesByPage = async (page, size) => {
  const response = await API.get(
    `/employees/page?page=${page}&size=${size}`
  );

  return response.data;
};


// =====================================================
// SORT EMPLOYEES
// =====================================================

export const sortEmployees = async (field) => {
  const response = await API.get(
    `/employees/sort?field=${field}`
  );

  return response.data;
};


// =====================================================
// ADD EMPLOYEE
// =====================================================

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


// =====================================================
// GET EMPLOYEE BY ID
// =====================================================

export const getEmployeeById = async (id) => {
  const response = await API.get(
    `/employees/${id}`
  );

  return response.data;
};


// =====================================================
// UPDATE EMPLOYEE
// =====================================================

export const updateEmployee = async (
  id,
  employeeData
) => {
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


// =====================================================
// DASHBOARD
// =====================================================

export const getDashboard = async () => {
  const response = await API.get(
    "/employees/dashboard"
  );

  return response.data;
};


// =====================================================
// RECENT EMPLOYEES
// =====================================================

export const getRecentEmployees = async () => {
  const response = await API.get(
    "/employees/recent"
  );

  return response.data;
};


// =====================================================
// EXPORT EXCEL
// =====================================================

export const exportEmployees = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API.defaults.baseURL}/employees/export`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to export employees");
  }

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


// =====================================================
// EXPORT PDF
// =====================================================

export const exportPdf = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API.defaults.baseURL}/employees/export/pdf`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to export PDF");
  }

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


// =====================================================
// DEPARTMENT CHART
// =====================================================

export const getDepartmentChart = async () => {
  const response = await API.get(
    "/employees/dashboard/chart"
  );

  return response.data;
};


// =====================================================
// SALARY CHART
// =====================================================

export const getSalaryChart = async () => {
  const response = await API.get(
    "/employees/dashboard/salary-chart"
  );

  return response.data;
};


// =====================================================
// IMPORT EMPLOYEES
// =====================================================

export const importEmployees = async (file) => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await API.post(
    "/employees/import",
    formData
  );

  return response.data;
};