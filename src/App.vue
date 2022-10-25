<template>
  <router-view></router-view>
</template>

<script setup>

import {ref,onMounted} from 'vue'
import {useStore} from "./store/auth"
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = useStore();
const {user} = storeToRefs(userStore);

//REDIRECCION EN BASE A CREDENCIALES
onMounted( async () =>{

    await userStore.fetchUser() // here we call fetch user
    // console.log(await userStore.fetchUser(),'fetchuser dentro de onmounted'
    console.log(user.value,"user.value")
    if(!user.value){
      console.log("hola")
      router.push({ name: "login" })
    }
    else{console.log("adios")}
})


</script>

<style scoped>

</style>