import { ref } from 'vue';

export const user = ref(null); // Will store user data when logged in, null otherwise
export const isAuthenticated = ref(false); // Indicates if the user is authenticated
