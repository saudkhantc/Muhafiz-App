// src/services/Endpoints.js

const endpoints = {
  REGISTER: '/users/register',
  LOGIN: '/users/login',
  FORGOT_PASSWORD: '/users/forgot-password',
  VERIFY_OTP: '/users/verify-otp',
  RESET_PASSWORD: '/users/reset-password',
  RESEND_LINK: '/users/resend-link',
   GET_USER: (id) => `${BASE_URL}/${id}`,
  UPDATE_USER: (id) => `${BASE_URL}/update/${id}`,

  
 
};

export default endpoints;
