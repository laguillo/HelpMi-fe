import { createRouter, createWebHistory } from "vue-router";
import App from "../App.vue";
import LogIn from "../views/LogIn.vue";
import SignUp from "../views/SignUp.vue";
// Paciente
import HomePaciente from "../views/paciente/Home.vue";
import AccountPaciente from "../views/paciente/Account.vue";
import AccountEditPaciente from "../views/paciente/AccountEdit.vue";
import RegistrarSVPaciente from "../views/paciente/RegistrarSV.vue";
import HistoriaClinicaPaciente from "../views/paciente/HistoriaClinica.vue";


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
    // Paciente
    {
      path: "/paciente/home",
      name: "HomePaciente",
      component: HomePaciente,
    },
    {
      path: "/paciente/account",
      name: "AccountPaciente",
      component: AccountPaciente,
    },
    {
      path: "/paciente/RegistrarSV",
      name: "RegistrarSVPaciente",
      component: RegistrarSVPaciente,
    },
    {
      path: "/paciente/HistoriaClinica",
      name: "HistoriaClinicaPaciente",
      component: HistoriaClinicaPaciente,
    },
    {
      path: "/paciente/AccountEdit",
      name: "AccountEditPaciente",
      component: AccountEditPaciente,
    },
    // Medico
    {
      path: "/medico/home",
      name: "home",
      component: HomeMedico,
    },
  ],
});

export default router;
