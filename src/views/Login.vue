<template>
  <Transition appear>
<div class="main-container">
  <div class="vue-template card-container modify2">
    <!-- Aqui mostramos un error de mensaje en caso no se cumpla la condicion -->
    <Transition>
    <div v-if="errorMsg" class="addError modify">
      <h3  class="error-text"> {{ errorMsg }} </h3>
    </div>
    </Transition>
      <!-- El evento de enviar ya no volverá a cargar la página. -->
      <form @submit.prevent='signIn'>
          <h2 >Iniciar Sesion</h2>
          <div class="register-login-container">
            <h4>Correo electrónico</h4>
          <div class="form-group">

            <!-- Valor del vmodel sera la variable a enviar al userStore -->
              <input v-model="email" type="email" class="register-login-input" required/>
          </div>
          <h4>Constraseña</h4>
          <div class="form-group">

              <!-- Valor del vmodel sera la variable a enviar al userStore -->
              <input v-model="password" type="password" class="register-login-input" required/>
          </div>
        </div>
          <button type="submit" class="btn btn-dark btn-lg btn-block">Iniciar</button>
      </form>
      <p>¿Aun no te has registrado? Regístrate <router-link :to="{ name: 'register'}" class="link">aquí</router-link> </p>
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
    errorMsg.value = 'Iniciando sesion...'
      setTimeout(() => {
        router.push({ name: "Home" })},
       2000);
  } catch (error) {
    // Si existe algun error, se mostrará encima del login form
    errorMsg.value = `Hay un error en las credenciales`;
    console.log(error)
    // hides error message //escoden el error si pasa "#" ms
    setTimeout(() => {
      errorMsg.value = null;
    }, 5000);
  }
};


</script>
<style scoped>

.register-login-input{
  border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: #1a1a1a !important;
    width: 100%;
    overflow: auto;
    resize: none;
    margin-bottom:10px
}

.form-group {
    margin: 5px 0;
    display: flex;
    gap: 20px;
}

.modify2{
  width:350px!important;
  height:auto!important;
  padding: 15px 40px;
}

h4{
  margin:0;
  text-align:start}

  .modify{
  margin-top:-215px
}
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