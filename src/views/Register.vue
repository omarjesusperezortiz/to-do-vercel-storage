<template>
  <Transition appear>
  <div class="main-container">
    <div class="vue-template card-container modify2">
      <!-- vshow muestra el mensaje de arror -->
    <Transition>
    <div v-if="errorMsg" class="addError modify">
      <h3  class="error-text"> {{ errorMsg }} </h3>
    </div>
  </Transition>
    <!-- submit.prevent evita el reload de la pagina -->
    <form @submit.prevent="signUp">
      <h2>Regístrate</h2>
      <div class="register-login-container">
      <h4>Correo electrónico</h4>
      <div class="form-group">
        <!-- los valores vmodel seran los que se enviaran a Auth -->
        <input
          v-model="email"
          type="email"
          class="register-login-input"
          required
        />
      </div>
      <h4>Contraseña</h4>
      <div class="form-group">
        
        <input
          v-model="password"
          type="password"
          class="register-login-input"
          required
        />
      </div>
      <h4>Confirmar contraseña</h4>
      <div class="form-group">
        
        <input
          v-model="confirmPassword"
          type="password"
          class="register-login-input"
          required
        />
      </div>
    </div>
      <button type="submit" class="btn btn-dark btn-lg btn-block">
        Registrar
      </button>
    </form>
    <p>
      ¿Ya tienes una cuenta? Ingresa
      <router-link :to="{ name: 'login'}" class="link">aquí</router-link>
    </p>
  </div>

  </div>
</Transition>
</template>
<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "../store/auth";
import { storeToRefs } from "pinia";

const { user } = storeToRefs(useStore);

// Router to push user once SignedUp to Log In
// const router = useRouter()
// const useStore = useStore();

// Input Fields
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

// Error Message
const errorMsg = ref("");
const redirect = useRouter();

//Arrow function to SignUp user to supaBase with a timeOut() method for showing the error
const signUp = async () => {
  if (password.value === confirmPassword.value) {
    try {
      await useStore().signUp(email.value, password.value);
      errorMsg.value = 'Usuario creado! Redirigiendo...'
      setTimeout(() => {
        redirect.push({ name: "home" })},
       3000);
    } catch (error) {
      // displays error message
      // hides error message
      if(error='AuthApiError: User already registered'){
        errorMsg.value = 'El usuario ya existe!'
      }
    }
    return;
  }
  else{
    errorMsg.value = 'La contraseña no coincide'
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
  margin-top:-250px
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



.link {
  cursor: pointer;
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
