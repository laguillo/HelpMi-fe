<template>
    <menuMedico></menuMedico>
    <!-- Paciente -->
    <main class="flex gap-4 mt-6">
        <div class="overflow-x-auto relative shadow sm:rounded-lg w-full">
            <h2 class="py-3 font-bold text-center bg-white border-b uppercase">Listado de pacientes asignados</h2>
            <table class="w-full text-sm mt-2 text-center">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" class="py-3 px-6">
                            Nombre y Apellido
                        </th>
                        <th scope="col" class="py-3 px-6">
                            Documento
                        </th>
                        <th scope="col" class="py-3 px-6">
                            Celular
                        </th>
                        <th scope="col" class="py-3 px-6">
                            Dirección
                        </th>
                        <th scope="col" class="py-3 px-6">
                            Genero
                        </th>
                        <th scope="col" class="py-3 px-6">
                            Acción
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in result" :key="index" class="bg-white border-b hover:bg-gray-50">
                        <th scope="row" class="py-4 px-6 font-medium whitespace-nowrap">
                            {{user.nombre}} {{user.apellido}}
                        </th>
                        <td class="py-4 px-6">
                            Paciente
                        </td>
                        <td class="py-4 px-6">
                            <a href="#" class="font-medium text-helpmi-600 hover:underline">Ver Informe</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </main>
</template>

<script>
import menuMedico from "@/components/medico/menuComponent.vue";
import jwt_decode from "jwt-decode";
import axios from "axios";
export default {
    name: "ListaPacientes",
    data: function () {
        return {
            username: localStorage.getItem("username") || "none",
            nombre: "",
            apellido: "",
            documento: "",
            tipoDocumento: "",
            genero: "",
            direccion: "",
            celular: "",
            loaded: false,
        };
    },
    methods: {
        getData: async function () {
            if (localStorage.getItem("token_access") === null || localStorage.getItem("token_refresh") === null) {
                this.$emit('logOut');
                return;
            }
            await this.verifyToken();
            let token = localStorage.getItem("token_access");
            let userId = jwt_decode(token).user_id.toString();

            axios.get(`http://helpmi-fe.herokuapp.com/user/${userId}/`, { headers: { 'Authorization': `Bearer ${token}` } })
                .then((result) => {
                    this.nombre = result.data.nombre;
                    this.apellido = result.data.apellido;
                    this.documento = result.data.documento;
                    this.tipoDocumento = result.data.tipoDocumento;
                    this.genero = result.data.genero;
                    this.direccion = result.data.direccion;
                    this.celular = result.data.celular;
                    console.log(result.data);
                    this.loaded = true;
                })
                .catch(() => {
                    this.$emit('logOut');
                });
        },
        verifyToken: function () {
            return axios.post("http://helpmi-fe.herokuapp.com/refresh/", { refresh: localStorage.getItem("token_refresh") }, { headers: {} }
            )
                .then((result) => {
                    localStorage.setItem("token_access", result.data.access);
                })
                .catch(() => {
                    this.$emit('logOut');
                });
        }
    },
    created: async function () {
        this.getData();
    },
    components: { menuMedico }
};
</script>
