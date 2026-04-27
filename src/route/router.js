import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "../layouts/MainLayout.vue";
import Dashboard from "../views/Dashboard.vue";
import Income from "../views/Income.vue";
import Expenses from "../views/Expenses.vue";
import Analytics from "../views/Analytics.vue";
import Settings from "../views/Settings.vue";
import Help from "../views/Help.vue";
import Create from "../views/Create.vue";

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: "",
        name: "dahboard",
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
      },
      {
        path: "edit",
        name: "edit",
        component: Create,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
