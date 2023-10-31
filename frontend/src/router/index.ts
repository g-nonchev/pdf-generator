import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import authService from '@/services/authService'; // Assuming this is the path to your combined authService
import {isAuthenticated} from '@/stores/authStore';
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/certificates',
    name: 'certificates',
    component: () => import('../views/DataView.vue'),  // Assuming you have a view for this
    beforeEnter: (to, from, next) => {
      authService.setUserOnLoginSuccess();
      console.log("Is authenticated?", isAuthenticated.value);
      if (isAuthenticated.value) {
        next();  // Proceed to login-success view if authenticated
      } else {
        next({ name: 'home' });  // Redirect to home if not authenticated
      }
    }
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

// Global navigation guard for other routes (if needed)
// router.beforeEach((to, from, next) => {
//   console.log("Is authenticated?", isAuthenticated.value);
//   if (to.name === 'certificates' && !isAuthenticated.value) {
//     // If the user tries to access any other route (except login-success) and is not authenticated, redirect to home
//     next({ name: 'home' });
//   } else {
//     next();
//   }
// });

export default router;
