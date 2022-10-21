<template>
  <div class="main-container">
    <div class="vue-template card-container">
    <p v-show="errorMsg" class="error-msg">{{ errorMsg }}</p>
    <form @submit.prevent="signUp">
      <h2>Registrate</h2>
      <div class="form-group">
        <label>Email address</label>
        <input
          v-model="email"
          type="email"
          class="form-control form-control-lg"
          required
        />
      </div>
      <div class="form-group">
        <label>Password</label>
        <input
          v-model="password"
          type="password"
          class="form-control form-control-lg"
          required
        />
      </div>
      <div class="form-group">
        <label>Confirm Password</label>
        <input
          v-model="confirmPassword"
          type="password"
          class="form-control form-control-lg"
          required
        />
      </div>
      <button type="submit" class="btn btn-dark btn-lg btn-block">
        Register
      </button>
    </form>
    <p>
      ¿Ya tienes una cuenta? Ingresa
      <router-link to="/auth/login" class="link">aquí</router-link>
    </p>
  </div>

  </div>

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
      setTimeout(() => {redirect.push({ path: "/auth/login" })}, 5000);
      errorMsg.value = 'Going back to login'
    } catch (error) {
      // displays error message
      // hides error message
      setTimeout(() => {errorMsg.value = null}, 10000);
    }
    return;
  }
  else{
    errorMsg.value = 'Password do not match';
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

.form-group {
  margin: 20px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.link {
  cursor: pointer;
}
</style>
