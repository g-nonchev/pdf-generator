<template>
  <div>
    <button @click="loginWithGoogle">Login with Google</button>
    <button v-if="isAuthenticated" @click="logout">Logout</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { user, isAuthenticated } from '@/stores/authStore';
import authService from '@/services/authService';
const loginWithGoogle = () => {
  authService.loginWithGoogle();
};

const logout = async () => {
  const result = await authService.logout();
  if (result) {
    user.value = null;
    isAuthenticated.value = false;
  }
};

onMounted(() => {
  if (authService.checkLoginSuccess()) {
    user.value = { name: 'John Doe' };  // In a real-world app, you'd get user details from the backend or a token.
    isAuthenticated.value = true;
  }
});
</script>
