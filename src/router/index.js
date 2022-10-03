import { createRouter, createWebHistory } from "vue-router";
import App from "../App.vue";
import LogIn from "../views/LogIn.vue";
import SignUp from "../views/SignUp.vue";
import Home from "../views/Home.vue";
import Account from "../views/Account.vue";
import RegistrarSV from "../views/RegistrarSV.vue";
import HistoriaClinica from "../views/HistoriaClinica.vue";
import AccountEdit from "../views/AccountEdit.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "root",
      component: App,
    },
    {
      path: "/user/logIn",
      name: "logIn",
      component: LogIn,
    },
    {
      path: "/user/signUp",
      name: "signUp",
      component: SignUp,
    },
    {
      path: "/user/home",
      name: "home",
      component: Home,
    },
    {
      path: "/user/account",
      name: "account",
      component: Account,
    },
    {
      path: "/user/RegistrarSV",
      name: "RegistrarSV",
      component: RegistrarSV,
    },
    {
      path: "/user/HistoriaClinica",
      name: "HistoriaClinica",
      component: HistoriaClinica,
    },
    {
      path: "/user/AccountEdit",
      name: "AccountEdit",
      component: AccountEdit,
    },
  ],
});

export default router;
