<template>
  <h1>APP</h1>
  <li><router-link :to="{name:'home'}" >Home</router-link></li>
  <li><router-link :to="{name:'login'}" >Login</router-link></li>
  <router-view></router-view>
</template>
<script setup>
console.log(process.env.NODE_ENV)
</script>
<style scoped>
</style>