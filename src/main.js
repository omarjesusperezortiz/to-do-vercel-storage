import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import './style.css';
import { useAuthStore } from './store/auth'

axios.defaults.baseURL = import.meta.env.POSTGRES_URL

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);

// Rehydrate user state (check for existing login session)
const authStore = useAuthStore();
authStore.rehydrateUser();

app.use(VueAxios, axios);
app.use(router);
app.mount('#app');
