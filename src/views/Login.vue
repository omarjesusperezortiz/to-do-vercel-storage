<template>
  <Transition appear>
<div class="main-container">
  <div class="vue-template card-container">
    <!-- Aqui mostramos un error de mensaje en caso no se cumpla la condicion -->
      <p v-show="errorMsg" class="error-msg"> {{ errorMsg }} </p>
      <!-- El evento de enviar ya no volverá a cargar la página. -->
      <form @submit.prevent='signIn'>
          <h2 >Iniciar Sesion</h2>
          <div class="form-group">
              <label>Email address</label>
            <!-- Valor del vmodel sera la variable a enviar al userStore -->
              <input v-model="email" type="email" class="form-control form-control-lg" required/>
          </div>
          <div class="form-group">
              <label>Password</label>
              <!-- Valor del vmodel sera la variable a enviar al userStore -->
              <input v-model="password" type="password" class="form-control form-control-lg" required/>
          </div>
          <button type="submit" class="btn btn-dark btn-lg btn-block">Sign In</button>
      </form>
      <p>¿Aun no te has registrado? Regístrate <router-link to="/auth/register" class="link">aquí</router-link> </p>
  </div>

</div>
</Transition>
</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '../store/auth';


const router = useRouter();
const userStore = useStore();

// Route Variables

// Input Fields // Aqui almacenamos los valores del V-model
const email = ref('');
const password = ref('');
// Error Message
const errorMsg = ref("");


// Arrow function to Signin user to supaBase
const signIn = async () => {
  try {
    // calls the user store and send the users info to backend to logIn
    await userStore.signIn(email.value, password.value);
    // redirects user to the homeView
    router.push({ path: "/" });
  } catch (error) {
    // Si existe algun error, se mostrará encima del login form
    errorMsg.value = `Hay un error en las credenciales`;
    console.log(error.message)
    // hides error message //escoden el error si pasa "#" ms
    setTimeout(() => {
      errorMsg.value = null;
    }, 10000);
  }
};


</script>
<style scoped>
.main-container {
  max-width: 1280px;
  margin: 0 auto;
  text-align: center;
  place-items:center;
  display: flex;
  min-width: 320px;
  min-height: 100vh;
  justify-content: center;
}

.form-group{
    margin: 20px;
    display:flex;
    justify-content: space-between;
    gap:20px;
}

.link{
    cursor:pointer;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}


</style>