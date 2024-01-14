<template>
  <router-view></router-view>
</template>

<script setup>
import {onMounted} from 'vue';
import {useAuthStore} from "./store/auth";
import {useRouter} from "vue-router";

const router = useRouter();
const authStore = useAuthStore();

onMounted(async () => {
  authStore.rehydrateUser(); // Rehydrate auth state from localStorage
  if (!authStore.isAuthenticated) {
    // User is not authenticated, redirect to login
    await router.push({name: 'login'});
  } else {
    try {
      await authStore.fetchUser(); // Fetch user from API
    } catch (error) {
      console.error('Failed to fetch user:', error);
    }
  }
});
</script>

<style scoped>
</style>
