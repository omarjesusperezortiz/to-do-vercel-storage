<template>
  <router-view></router-view>
</template>

<script setup>

import {ref,onMounted} from 'vue'
import {login,newTask} from "./api"
import {useStore} from "./store/auth"
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = useStore();
const { user } = storeToRefs(userStore);

onMounted(async () =>{
    
  try {
    await userStore.fetchUser(); // here we call fetch user
    
    // console.log(user.value,'user para la condicion')
    if (!user.value) {
      // redirect them to logout if the user is not there

      router.push({ path: "/auth/login" });
    } else {
      // continue to dashboard
      // router.push({ path: "/" });
    }
  } catch (e) {
    console.log(e);
  }
})
</script>

<style scoped>
li{
  list-style: none;
}
.navbar{
  display:flex;
  flex-direction: row;
  gap: 20px;
  justify-content: center;
}
</style>