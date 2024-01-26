<template>
  <Transition appear>
    <div class="main-container">
      <div class="card-container auth-container">
        <router-view />
      </div>
    </div>
  </Transition>
</template>
<script setup>
</script>
<style scoped>
.main-container {
  margin: 0 auto;
  text-align: center;
  place-items:center;
  display: flex;
  min-width: 320px;
  min-height: 100vh;
  justify-content: center;
}
.auth-container{
  width:400px!important;
  height:auto!important;
  padding: 15px 40px;
}
</style>
