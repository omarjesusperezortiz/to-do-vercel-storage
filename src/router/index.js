import { createRouter, createWebHistory } from 'vue-router'

const routes = [

  { path: "/task-app/auth",
    name: 'auth',
    component: () => import('../views/Auth.vue'),
    children: [
        { path: "login", name:'login', component: () => import('../views/Login.vue')},
        { path: "register", name:'register', component: () => import('../views/Register.vue') }
      ]
  },

  {
    path: '/',
    redirect: { name: 'Home' }
  },
  {
    path: '/task-app/',
    name: 'Home',
    component: () => import('../views/Home.vue') 
  },

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})


export default router;

// import { createRouter, createWebHistory } from "vue-router";
// import Auth from "../views/Auth.vue";
// import Home from "../views/Home.vue";
// import SignIn from "../components/SignIn.vue";
// import SignUp from "../components/SignUp.vue";
// import UserProfile from "../components/UserProfile.vue";

// const router = createRouter({
//   history: createWebHistory(),
//   routes,
// });
// export default router;
