// store/authStore.js
import { defineStore } from 'pinia'
import axios from 'axios'
import router from "../router/index.js";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: null
    }),
    getters: {
        isAuthenticated: (state) => !!state.user,
    },
    actions: {
        async login(credentials) {
            try {
                const response = await axios.post('/api/users/login', credentials)
                this.user = response.data.user
                this.token = response.data.token
                localStorage.setItem('token', this.token)
                axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
                await router.push({name: "home"});
            } catch (error) {
                console.error('Login error:', error);
                this.loginError = "Credenciales incorrectas o el usuario no existe";
            }
        },
        logout() {
            this.user = null
            this.token = null
            localStorage.removeItem('token')
            delete axios.defaults.headers.common['Authorization']
        },
        rehydrateUser() {
            const token = localStorage.getItem('token')
            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
                this.token = token
                this.fetchUser()
                    .then(() => {
                        router.push({name: "home"});
                    })
                    .catch(error => {
                        console.error('Failed to rehydrate user:', error);
                        router.push({name: "login"});
                    });
            } else {
                router.push({name: "login"});
            }
        },
        async fetchUser() {
            try {
                const response = await axios.get('/api/users/me')
                this.user = response.data
            } catch (error) {
                console.error('Failed to fetch user:', error);
                throw error
            }
        },
        async register(credentials) {
            try {
                const response = await axios.post('/api/users/register', credentials)
                this.user = response.data.user
                this.token = response.data.token
                localStorage.setItem('token', this.token)
                axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
            } catch (error) {
                // Handle error
            }
        }
    }
})
