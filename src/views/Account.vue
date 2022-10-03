<template>
    <nav class="flex justify-between text-xs lg:text-sm items-center mt-6 rounded-3xl bg-white p-4 shadow-sm">
        <div class="flex justify-center items-center space-x-3">
            <div class="text-6xl text-gray-500 rounded-full border p-4"><i class='bx bx-user'></i></div>
            <div class="grid">
                <h1 class="font-semibold">
                    ¡Bienvenido(a) <span> {{ nombre }} {{ apellido }} </span>!
                </h1>
                <p class="text-xs font-semibold">Documento: <span class="font-normal">{{tipoDocumento}}
                        {{documento}}</span></p>
                <p class="text-xs font-semibold">Rol del usuario: <span class="font-normal">{{rol}}</span></p>
            </div>
        </div>
        <div class="space-x-6">
            <router-link
                class="font-semibold no-underline decoration-2 hover:underline hover:decoration-helpmi-400 active:decoration-helpmi-500"
                to="home"><i class='bx bx-fw bx-home'></i>Inicio</router-link>
            <router-link
                class="font-semibold no-underline decoration-2 hover:underline hover:decoration-helpmi-400 active:decoration-helpmi-500"
                to="RegistrarSV"><i class="bx bx-fw bx-plus-medical"></i>Registrar Signos
                Vitales</router-link>
            <router-link
                class="font-semibold no-underline decoration-2 hover:underline hover:decoration-helpmi-400 active:decoration-helpmi-500"
                to="Account"><i class='bx bx-fw bxs-user-rectangle'></i>Mi Perfil</router-link>
            <router-link
                class="font-semibold no-underline decoration-2 hover:underline hover:decoration-helpmi-400 active:decoration-helpmi-500"
                to="HistoriaClinica"><i class="bx bx-fw bx-clipboard"></i>Historia Clinica</router-link>
            <button
                class="font-semibold no-underline decoration-2 hover:underline hover:decoration-helpmi-400 active:decoration-helpmi-500"
                v-on:click="logOut"><i class='bx bx-fw bx-log-out'></i>Cerrar Sesión </button>
        </div>
    </nav>
    <main class="flex gap-4 mt-6">
        <div class="shadow sm:rounded-lg w-3/4 bg-white">
            <div class="flex justify-center items-center space-x-4 border-b">
                <h2 class="py-3 font-bold text-center bg-white">Información del usuario</h2>
                <router-link to="AccountEdit" class="text-xs py-1 px-2 bg-helpmi-500 text-gray-50 rounded font-medium shadow hover:bg-helpmi-600"><i class='bx bx-fw bx-edit-alt'></i>Editar Perfil</router-link>
            </div>
            <div class="grid grid-cols-2 m-6 text-sm">
                <div>
                    <p class="font-semibold">Nombre: <span class="font-normal">{{nombre}}</span></p>
                    <p class="font-semibold">Apellido: <span class="font-normal">{{apellido}}</span></p>
                    <p class="font-semibold">Tipo de documento: <span class="font-normal">{{tipoDocumento}}</span></p>
                    <p class="font-semibold">Número de documento: <span class="font-normal">{{documento}}</span></p>
                    <p class="font-semibold">Genero: <span class="font-normal">{{genero}}</span></p>
                </div>
                <div>
                    <p class="font-semibold">Celular: <span class="font-normal">{{celular}}</span></p>
                    <p class="font-semibold">Correo electronico: <span class="font-normal">{{email}}</span></p>
                    <p class="font-semibold">Dirección: <span class="font-normal">{{direccion}}</span></p>
                    <p class="font-semibold">Nombre del Familiar: <span class="font-normal">{{familiar}}</span></p>
                </div>
            </div>
        </div>
        <div class="shadow md:rounded-lg bg-white w-1/4">
            <h2 class="font-bold text-center py-3 border-b">Información Medica</h2>
            <div class="space-y-2 p-4 text-sm">
                <p class="font-semibold">Médico: <span class="font-normal">{{medico}}</span></p>
                <p class="font-semibold">Enfermero: <span class="font-normal">{{enfermero}}</span></p>
            </div>
        </div>
    </main>
</template>

<script>
import jwt_decode from "jwt-decode";
import axios from "axios";
export default {
    name: "Home",
    data: function () {
        return {
            username: localStorage.getItem("username") || "none",
            nombre: "",
            apellido: "",
            documento: "",
            tipoDocumento: "",
            celular: "",
            email: "",
            direccion: "",
            genero: "",
            rol: "",
            medico: "",
            enfermero: "",
            loaded: false,
        };
    },
    methods: {
        verifyAuth: function () {
            this.is_auth = localStorage.getItem("isAuth") || false;
            if (this.is_auth == false)
                this.$router.push({ name: "logIn" });
            else
                this.$router.push({ name: "home" });
        },
        logOut: function () {
            localStorage.clear();
            alert("Sesión Cerrada");
            this.verifyAuth();
        },
        getData: async function () {
            if (
                localStorage.getItem("token_access") === null ||
                localStorage.getItem("token_refresh") === null
            ) {
                this.$emit("logOut");
                return;
            }
            await this.verifyToken();
            let token = localStorage.getItem("token_access");
            let userId = jwt_decode(token).user_id.toString();

            axios
                .get(`https://helpmi-be.herokuapp.com/user/${userId}/`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((result) => {
                    this.nombre = result.data.nombre;
                    this.apellido = result.data.apellido;
                    this.documento = result.data.documento;
                    this.tipoDocumento = result.data.tipoDocumento;
                    this.celular = result.data.celular;
                    this.email = result.data.email;
                    this.direccion = result.data.direccion;
                    this.genero = result.data.genero;
                    this.rol = result.data.rol;
                    this.medico = result.data.medico;
                    this.enfermero = result.data.enfermero;
                    // this.balance = result.data.account.balance;
                    this.loaded = true;
                })
                .catch(() => {
                    this.$emit("logOut");
                });
        },
        verifyToken: function () {
            return axios
                .post(
                    "https://helpmi-be.herokuapp.com/refresh/",
                    { refresh: localStorage.getItem("token_refresh") },
                    { headers: {} }
                )
                .then((result) => {
                    localStorage.setItem("token_access", result.data.access);
                })
                .catch(() => {
                    this.$emit("logOut");
                });
        },
    },
    created: async function () {
        this.getData();
    },
};
</script>
