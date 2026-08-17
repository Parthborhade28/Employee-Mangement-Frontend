import API from "../api/axios";

export const login = async (loginData) => {
  const response = await API.post("/auth/login", loginData);
  return response.data;
};
export const forgotPassword = async (data) => {

    const response = await API.post(
        "/auth/forgot-password",
        data
    );

    return response.data;

};

export const verifyOtp = async (data) => {

    const response = await API.post(
        "/auth/verify-otp",
        data
    );

    return response.data;

};

export const resetPassword = async (data) => {

    const response = await API.post(
        "/auth/reset-password",
        data
    );

    return response.data;

};
export const getProfile = async () => {

    const response = await API.get("/auth/profile");

    return response.data;

};