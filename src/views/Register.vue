<template>
  <Transition appear>
    <div class="main-container">
      <div class="vue-template card-container modify2">
        <Transition>
          <div v-if="errorMsg" class="addError modify">
            <h3  class="error-text"> {{ errorMsg }} </h3>
          </div>
        </Transition>
        <form @submit.prevent="signUp">
          <h2>Regístrate</h2>
          <div class="register-login-container">
            <h4>Correo electrónico</h4>
            <div class="form-group">
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
          <router-link to="/auth/login" class="link">aquí</router-link>
        </p>
      </div>
    </div>
  </Transition>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/auth";

const router = useRouter();
const userStore = useAuthStore();
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const errorMsg = ref("");

const signUp = async () => {
  if (password.value !== confirmPassword.value) {
    errorMsg.value = 'Las contraseñas no coinciden';
    return;
  }
  try {
    await userStore.register({ email: email.value, password: password.value });
    // Check if registration was successful
    if (userStore.isAuthenticated) {
      errorMsg.value = 'Registrando usuario...';
      setTimeout(() => {
        router.push({ name: "home" });
      }, 2000);
    } else {
      // Handle case where registration was not successful
      errorMsg.value = 'Error al crear el usuario';
      setTimeout(() => errorMsg.value = null, 5000);
    }
  } catch (error) {
    // Handle network or other unexpected errors
    errorMsg.value = error.response?.data?.message || 'Error al crear el usuario';
    console.log(error);
    setTimeout(() => errorMsg.value = null, 5000);
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
