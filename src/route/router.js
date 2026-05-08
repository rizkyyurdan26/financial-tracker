import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "../layouts/MainLayout.vue";
import Dashboard from "../views/Dashboard.vue";
import Income from "../views/Income.vue";
import Expenses from "../views/Expenses.vue";
import Analytics from "../views/Analytics.vue";
import Settings from "../views/Settings.vue";
import Help from "../views/Help.vue";
import Create from "../views/Create.vue";
import LoginPage from "../views/loginregister/LoginPage.vue";
import RegisterPage from "../views/loginregister/RegisterPage.vue";
import ResetPassword from "../views/recovery/ResetPassword.vue";
import ForgotPassword from "../views/recovery/ForgotPassword.vue";

const routes = [
  {
    path:'/login',
    name: 'login',
    component: LoginPage,
    meta: {requiresGuest:true}
    
  },
  {
    path:'/register',
    name: 'register',
    component: RegisterPage,
    meta: {requiresGuest:true}

  },
  {
    path: "/",
    component: MainLayout,
    // meta: { requiresAuth: true },
    children: [
      {
        path: "",
        name: "dashboard",
        component: Dashboard,
      },
      {
        path: "income",
        name: "income",
        component: Income,
      },
      {
        path: "expense",
        name: "expense",
        component: Expenses,
      },
      {
        path: "analytics",
        name: "analytics",
        component: Analytics,
      },
      {
        path: "setting",
        name: "setting",
        component: Settings,
      },
      {
        path: "help",
        name: "help",
        component: Help,
      },
      {
        path: "create",
        name: "create",
        component: Create,
        meta: { requiresAuth: true }
      },
      {
        path: "edit/:id",
        name: "edit",
        component: Create,
        meta: { requiresAuth: true }
      },
    ],
  },

  // Forgot Password
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: ForgotPassword,
    meta: { requiresGuest: true }
  },
  {
    path: '/reset-password',
    name: 'reset-password',
    component: ResetPassword,
    meta: { requiresAuth: true } 
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from) => {
  const isAuthenticated = localStorage.getItem("access_token");
  
  const isRecovery = window.location.hash.includes("type=recovery");

  if (to.meta.requiresAuth && !isAuthenticated && !isRecovery) {
    return { name: 'login' };
  } 
  
  if (to.meta.requiresGuest && isAuthenticated) {
    return { name: 'dashboard' };
  }
});

export default router;
