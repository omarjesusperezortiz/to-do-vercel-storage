<template>

    <div class="vue-template card-container">
        <p v-show="errorMsg" class="error-msg"> {{ errorMsg }} </p>
        <form @submit.prevent='signIn'>
            <h2 >Iniciar Sesion</h2>
            <div class="form-group">
                <label>Email address</label>
                <input v-model="email" type="email" class="form-control form-control-lg" required/>
            </div>
            <div class="form-group">
                <label>Password</label>
                <input v-model="password" type="password" class="form-control form-control-lg" required/>
            </div>
            <button type="submit" class="btn btn-dark btn-lg btn-block">Sign In</button>
        </form>
        <p>¿Aun no te has registrado? Regístrate <router-link to="/auth/register" class="link">aquí</router-link> </p>
    </div>

</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '../store/auth';


const router = useRouter();
const userStore = useStore();

// Route Variables

// Input Fields
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
    // displays error message
    errorMsg.value = `Hay un error en las credenciales`;
    console.log(error.message)
    // hides error message
    setTimeout(() => {
      errorMsg.value = null;
    }, 10000);
  }
};


</script>
<style scoped>
.form-group{
    margin: 20px;
    display:flex;
    justify-content: space-between;
    gap:20px;
}

.link{
    cursor:pointer;
}
</style>