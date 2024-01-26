<template>
  <header class="nav-header">
    <nav class="nav">
      <h1 class="logo">
        <span class="clip">TaskApp</span>
      </h1>
      <button
        class="logout-button"
        aria-label="Cerrar sesión"
        @click="logOut"
      >
        Cerrar sesión
      </button>
    </nav>
  </header>
</template>
<script setup>
import { useAuthStore } from '../store/auth.js';
import { useRouter } from 'vue-router';

// Using the store and router for authentication logic
const userStore = useAuthStore();
const router = useRouter();

// Logout function to handle user logout
const logOut = () => {
  userStore.logout(); // Clear user data and tokens
  router.push({ name: 'login' }); // Redirect to login page
};
</script>
<style scoped>
.nav-header {
  position: sticky;
  top: 0;
  z-index: 1;
  padding: 20px;
}
.nav {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  top: 0;
  right: 0;
  width: 100%;
  background-color: transparent;
  backdrop-filter: saturate(50%) blur(8px);
}
.logo {
  color: transparent;
  font-size: 3rem;
}
.logout-button{
  border: 2px solid transparent;
  border-radius: 8px;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  background-color: #1a1a1a;
  color: #fff;
  cursor: pointer;
  transition: 0.5s ease;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  margin: 0 auto;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
.logout-button:hover{
  border-color: #fd1d7c;
  color: #fd1d7c;
  transition: 0.5s ease;
}
.clip {
  background: linear-gradient(120deg, #bd34fe 30%, #41d1ff);
  background-clip: text;
  -webkit-background-clip: text;
}
</style>
