<template>
    <div>
      <button @click="login">Login with Google</button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { user, isAuthenticated } from '@/stores/auth';
  
  const login = async () => {
        // Simulate a successful login (in reality, call your backend API)
        user.value = { name: 'John Doe' }; 
        isAuthenticated.value = true;
      };
  </script>
  