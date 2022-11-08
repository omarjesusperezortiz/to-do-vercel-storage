<template>
  <router-view></router-view>
</template>

<script setup>

import {ref,onMounted} from 'vue'
import {useStore} from "./store/auth"
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

//Router para redireccionar de home a login en caso no exista user.
const router = useRouter();
//Usamos userStore para recibir la informacion de usuario
const userStore = useStore();
//Usamos {user} para detectar si el user tiene alguna informacion o no y con esto crear la condicional de redireccion
const {user} = storeToRefs(userStore);

//REDIRECCION EN BASE A CREDENCIALES
onMounted( async () =>{

    await userStore.fetchUser() //Aqui llamamos al usuario


    if(!user.value){     //Esta condicion redirecciona el login al home en caso no haya info de user.

      router.push({ name: "login" })
    }
    else{console.log("adios")}
})

</script>

<style scoped>

</style>