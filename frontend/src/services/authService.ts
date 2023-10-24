const BASE_URL = "http://localhost:4621/auth";

export default {
  async loginWithGoogle() {
    window.location.href = `${BASE_URL}/google`;
  },

  async logout() {
    const response = await fetch(`${BASE_URL}/logout`, {
      method: 'GET',
      credentials: 'include'
    });
    return response.ok;
  },

  checkLoginSuccess() {
    return window.location.pathname === '/login-success';
  }
};
