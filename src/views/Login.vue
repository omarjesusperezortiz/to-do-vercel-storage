<template>
  <Transition>
    <div
      v-if="loading"
      class="add-error modify"
    >
      <h3 class="error-text">
        {{ message }}
      </h3>
    </div>
  </Transition>
  <form @submit.prevent="signIn">
    <h2>Iniciar Sesion</h2>
    <div class="register-login-container">
      <h4>Correo electrónico</h4>
      <div class="form-group">
        <input
          v-model="email"
          type="email"
          class="register-login-input"
          required
        >
      </div>
      <h4>Constraseña</h4>
      <div class="form-group">
        <input
          v-model="password"
          type="password"
          class="register-login-input"
          required
        >
      </div>
    </div>
    <button
      type="submit"
      class="btn btn-dark btn-lg btn-block"
    >
      Iniciar
    </button>
  </form>
  <p>
    ¿Aun no te has registrado? Regístrate <router-link
      to="/auth/register"
      class="link"
    >
      aquí
    </router-link>
  </p>
</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth';

const router = useRouter();
const userStore = useAuthStore();
const email = ref('');
const password = ref('');
const message = ref("");
const loading = ref(false);

const signIn = async () => {
  message.value = 'Iniciando sesión...';
  loading.value = true;
  try {
    await userStore.login({ email: email.value, password: password.value })
    // Check if login was successful
    if (userStore.isAuthenticated) {
      setTimeout(() => {
        loading.value = false;
        router.push({ name: "home" });
      }, 2000);
    } else {
      // Handle case where login was not successful
      message.value = 'Error en las credenciales';
      setTimeout(() => message.value = null, 5000);
    }
  } catch (error) {
    // Handle network or other unexpected errors
    message.value = error.response?.data?.message || 'Error en las credenciales';
    setTimeout(() => message.value = null, 5000);
  }
}
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
h4{
  margin:0;
  text-align:start
}
.modify{
  margin-top:-215px
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
