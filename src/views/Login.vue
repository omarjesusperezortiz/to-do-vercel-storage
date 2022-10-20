<template>

    <div class="vue-template">
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
    </div>

</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import { useStore } from '../store/auth'


const router = useRouter();
const userStore = useStore();

// Route Variables

// Input Fields
const email = ref('');
const password = ref('');
// Error Message
const errorMsg = ref("");

// Router to push user once SignedIn to the HomeView
const redirect = useRouter();


// Arrow function to Signin user to supaBase
const signIn = async () => {
  try {
    // calls the user store and send the users info to backend to logIn
    await userStore.signIn(email.value, password.value);
    // redirects user to the homeView
    redirect.push({ path: "/" });
  } catch (error) {
    // displays error message
    errorMsg.value = `Error: ${error.message}`;
    // hides error message
    setTimeout(() => {
      errorMsg.value = null;
    }, 5000);
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
</style>