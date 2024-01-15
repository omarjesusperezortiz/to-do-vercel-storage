// store/authStore.js
import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: null
    }),
    getters: {
        isAuthenticated: (state) => !!state.user
    },
    actions: {
        async login(credentials) {
            try {
                const response = await axios.post('/api/users/login', credentials)
                console.log("JWT Secret:", process.env.JWT_SECRET);
                this.user = response.data.user
                this.token = response.data.token
                localStorage.setItem('token', this.token)
                axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
                router.push({ name: "home" });
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
            const token = localStorage.getItem('token');
            if (token) {
                this.token = token;
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            }
        },
        async fetchUser() {
            try {
                const response = await axios.get('/api/users/login')
                this.user = response.data
            } catch (error) {
                // Handle error
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
        },
        async updateProfile(profile) {
            try {
                const response = await axios.put('/api/auth/me', profile)
                this.user = response.data
            } catch (error) {
                // Handle error
            }
        },
        async updatePassword(passwords) {
            try {
                const response = await axios.put('/api/auth/me/password', passwords)
                this.user = response.data
            } catch (error) {
                // Handle error
            }
        },
        async forgotPassword(email) {
            try {
                await axios.post('/api/auth/forgot-password', { email })
            } catch (error) {
                // Handle error
            }
        },
        async resetPassword(reset) {
            try {
                await axios.post('/api/auth/reset-password', reset)
            } catch (error) {
                // Handle error
            }
        },
        async verifyEmail(verification) {
            try {
                await axios.post('/api/auth/verify-email', verification)
            } catch (error) {
                // Handle error
            }
        }
    }
})
