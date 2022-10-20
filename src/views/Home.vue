<template>
<h1>Home</h1>
<button @click="logOut()">Log Out</button>
</template>
<script setup>
import { useRouter } from 'vue-router'
import {supabase} from '../api/index'

const router = useRouter();

  const logOut = async () => {
  try {
    // calls the user store and send the users info to backend to logIn
    await supabase.auth.signOut();
    // redirects user to the login
    router.push({ path: "/auth/login" })

  } catch (error) {
    console.log(error,'logout')
  }
};
</script>
<style scoped>

</style>