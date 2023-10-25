import { ref } from 'vue';
import {user, isAuthenticated} from '@/stores/authStore';

const BASE_URL = "http://localhost:4621/auth";


// Redirects user to the Google login page
const loginWithGoogle = () => {
  window.location.href = `${BASE_URL}/google`;
};

// Checks if the user is redirected back after a successful Google login
const checkLoginSuccess = () => {
  return window.location.pathname === '/certificates';
};

// Logs out the user
const logout = async () => {
  const response = await fetch(`${BASE_URL}/logout`, {
    method: 'POST',
  });

  if (response.ok) {
    user.value = null;
    isAuthenticated.value = false;
  }

  return response.ok;
};

// On successful login, sets the user details
const setUserOnLoginSuccess = () => {
  if (checkLoginSuccess()) {
    isAuthenticated.value = true;
  }
};

export default {
  loginWithGoogle,
  logout,
  setUserOnLoginSuccess
};
