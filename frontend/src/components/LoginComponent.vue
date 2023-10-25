<template>
  <div class="flex demo center">
    <button v-if="!isAuthenticated" @click="loginWithGoogle" class="warning">Login with Google</button>
    <button v-else @click="logout">Logout</button>
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
  authService.setUserOnLoginSuccess();
});
</script>
