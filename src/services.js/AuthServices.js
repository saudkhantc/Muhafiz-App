// src/services/authServices.js


import api from "./Api";
import endpoints from "./Endpoints";

export const registerUser = async (payload) => {
  const response = await api.post(endpoints.REGISTER, payload);
  return response.data;
};

export const loginUser = async (payload) => {
  const response = await api.post(endpoints.LOGIN, payload);
  return response.data;
};

export const forgotPassword = async (email) => {
  const response = await api.post(endpoints.FORGOT_PASSWORD, { email });
  return response.data;
};

export const resetPassword = async (token, newPassword) => {
  const response = await api.post(endpoints.RESET_PASSWORD, {
    token,
    password: newPassword,
  });
  return response.data;
};

export const resendResetLink = async (email) => {
  const response = await api.post(endpoints.RESEND_LINK, { email });
  return response.data;
};
