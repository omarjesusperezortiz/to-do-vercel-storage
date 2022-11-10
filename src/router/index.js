import { createRouter, createWebHashHistory } from 'vue-router'

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
  history: createWebHashHistory(import.meta.env.BASE_URL),
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
