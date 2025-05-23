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
export const verifyOtp = async (email, otp) => {
  const response = await api.post(endpoints.VERIFY_OTP, { email, otp });
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
export const getUserProfile = async (userId, token) => {
  const response = await api.get(endpoints.GET_USER(userId), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
export const updateUserProfile = async (userId, data, token) => {
  const response = await api.put(endpoints.UPDATE_USER(userId), data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const createContact = async (contact) => {
  try {
    const response = await api.post(endpoints.CREATE_CONTACT, contact);
    return response.data;
  } catch (error) {
    throw error;
  }
};
