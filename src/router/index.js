import { createRouter, createWebHistory } from 'vue-router'

const routes = [

  { path: "/auth",
    name: 'auth',
    component: () => import('../views/Auth.vue'),
    children: [
        { path: "login", name:'login', component: () => import('../views/Login.vue')},
        { path: "register", name:'register', component: () => import('../views/Register.vue') }
      ]
  },

  { path: "",
    name: "home",
    component: () => import("../views/Home.vue") },

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});


export default router;
