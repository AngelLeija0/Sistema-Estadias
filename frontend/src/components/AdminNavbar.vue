<template>
  <div
    class="container-fluid row"
    style="margin-top: 35px; background-color: #e8e8e8"
  >
    <div class="col-md-2 col-2 flex">
      <q-card-actions>
        <q-btn
          color="white"
          label="Inicio"
          flat
          class="q-ma-md"
          icon="home"
          text-color="black"
          icon-color="black"
          style="margin: 3px; text-transform: capitalize; font-size: 16px"
          @click="toIndex"
        />
      </q-card-actions>
    </div>
    <div class="col-md-8 col-7 flex justify-center">
      <div class="row" style="width: 100%; align-items: center">
        <div class="col-12">
          <q-input
            class="q-pa-sm"
            color="white"
            standout="bg-black text-white"
            rounded
            clearable
            v-model="searcher"
            label="Buscar por Nombre / Matricula"
            @keyup="handleKeyUp"
            @clear="clearFilter"
          />
        </div>
      </div>
    </div>
    <div class="col-md-2 col-3 flex justify-end">
      <q-card-actions>
        <q-btn-dropdown
          v-if="isLogin"
          :label="user.nombre + ' ' + user.apPaterno"
          flat
          icon="account_circle"
          class="flex"
          style="margin: 3px 0; text-transform: capitalize; font-size: 16px"
        >
          <q-list>
            <q-item clickable v-close-popup @click="logout">
              <q-item-section>
                <q-item-label style="display: flex; align-items: center">
                  Cerrar sesión
                  <svg
                    style="margin-left: 10px"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-box-arrow-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                    />
                  </svg>
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-card-actions>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { SessionStorage } from "quasar";
import { useUserStore } from "src/stores/user-store";
import { useRouter } from "vue-router";
import { useFilterStore } from "src/stores/filter-store";
import { useDataApiStore } from "src/stores/data-api-store";
import { api } from "src/boot/axios";

export default defineComponent({
  name: "AdminNabvar",
  setup() {
    const router = useRouter();
    const userStore = useUserStore();
    const dataApiStore = useDataApiStore();
    const filterStore = useFilterStore();
    const searcher = ref(null);

    if (!filterStore.filter) {
      SessionStorage.set("filter", {});
      filterStore.setFilter({});
    }
    const initialCareer = ref();
    if (router.currentRoute.value.name === "admin-listaAlumnos" || router.currentRoute.value.name === "vinculacion-listaAlumnos") {
      initialCareer.value = filterStore.filter.nivelAcademico;
    }

    function searchAdvisors(filter = {}) {
      try {
        console.log("Buscando asesores ...");
        api
          .post(`http://localhost:3000/admin/asesores`, {
            filtro: filter,
          })
          .then((res) => {
            if (res.data.msg) {
              //console.log(res.data.msg);
            } else {
              window.sessionStorage.removeItem("data-api");
              dataApiStore.clearDataApi();
              SessionStorage.set("data-api", res.data);
              dataApiStore.setDataApi(res.data);
            }
          })
          .catch((err) => {
            window.sessionStorage.removeItem("data-api");
            dataApiStore.clearDataApi();
            SessionStorage.set("data-api", {});
            dataApiStore.setDataApi({});
            console.error(err);
          });
      } catch (error) {
        console.log(error);
      }
    }

    function searchStudents(filter = filterStore.filter) {
      try {
        const body = {};
        let url = "";
        let idAsesor = "";
        body.filtro = filter;
        if (router.currentRoute.value.name === "asesor-inicio") {
          idAsesor = userStore.getUser.id;
          body.idAsesor = idAsesor;
          url = "http://localhost:3000/asesor/inicio";
        } else if (
          router.currentRoute.value.name === "admin-listaAlumnos" ||
          router.currentRoute.value.name === "vinculacion-listaAlumnos" ||
          router.currentRoute.value.name === "asesor-inicio"
        ) {
          url = `http://localhost:3000/admin/alumnos/${body.filtro.estado}`;
        }
        console.log(body);
        api
          .post(url, body)
          .then((res) => {
            if (res.data.msg) {
              //console.log(res.data.msg);
            } else {
              window.sessionStorage.removeItem("data-api");
              dataApiStore.clearDataApi();
              SessionStorage.set("data-api", res.data);
              dataApiStore.setDataApi(res.data);
            }
          })
          .catch((err) => {
            console.error(err);
          });
      } catch (error) {
        console.log("Error catch 2");
        console.error(error);
      }
    }

    function searchAdmins(filter = {}) {
      try {
        console.log("Buscando administradores ...");
        api
          .post(
            `http://localhost:3000/admin/administradores`,
            {
              filtro: filter,
            }
          )
          .then((res) => {
            if (res.data.msg) {
              //console.log(res.data.msg);
            } else {
              window.sessionStorage.removeItem("data-api");
              dataApiStore.clearDataApi();
              SessionStorage.set("data-api", res.data);
              dataApiStore.setDataApi(res.data);
            }
          })
          .catch((err) => {
            window.sessionStorage.removeItem("data-api");
            dataApiStore.clearDataApi();
            SessionStorage.set("data-api", {});
            dataApiStore.setDataApi({});
            console.error(err);
          });
      } catch (error) {
        console.log(error);
      }
    }

    function searchVinculadores(filter = {}) {
      try {
        console.log("Buscando vinculandores ...");
        api
          .post(
            `http://localhost:3000/vinculacion/vinculadores`,
            {
              filtro: filter,
            }
          )
          .then((res) => {
            if (res.data.msg) {
              //console.log(res.data.msg);
            } else {
              window.sessionStorage.removeItem("data-api");
              dataApiStore.clearDataApi();
              SessionStorage.set("data-api", res.data);
              dataApiStore.setDataApi(res.data);
            }
          })
          .catch((err) => {
            window.sessionStorage.removeItem("data-api");
            dataApiStore.clearDataApi();
            SessionStorage.set("data-api", {});
            dataApiStore.setDataApi({});
            console.error(err);
          });
      } catch (error) {
        console.log(error);
      }
    }

    onMounted(() => {
      const actualRoute = router.currentRoute.value.name;
      actualRoute === "admin-listaAlumnos" ||
      actualRoute === "vinculacion-listaAlumnos"
        ? searchStudents()
        : "";
      actualRoute === "admin-listaAsesores" ? searchAdvisors() : "";
      actualRoute === "admin-listaAdministradores" ? searchAdmins() : "";
      actualRoute === "asesor-inicio" ? searchStudents() : "";
      actualRoute === "vinculacion-listaVinculadores" ? searchVinculadores() : "";
    });

    return {
      router,
      userStore,
      dataApiStore,
      filterStore,
      searcher,
      searchStudents,
      initialCareer,
      searchAdvisors,
      searchAdmins,
      searchVinculadores,
    };
  },

  computed: {
    isLogin() {
      if (this.user) {
        return true;
      } else {
        return false;
      }
    },
    user() {
      if (!this.userStore.getUser && window.sessionStorage.getItem("user")) {
        this.userStore.setUser(window.sessionStorage.getItem("user"));
      }
      return this.userStore.getUser;
    },
  },
  methods: {
    reloadVinculadores() {
      this.searchVinculadores();
    },
    reloadAdmins() {
      this.searchAdmins();
    },
    reloadAdvisors() {
      this.searchAdvisors();
    },
    submitFilter() {
      const filter = this.filterStore.filter;

      if (this.searcher !== null) {
        filter.buscador = this.searcher;
      }

      if (this.router.currentRoute.value.path === "/lista-alumnos") {
        this.searchStudents(filter);
        this.$emit("filter-students");
      }

      if (this.router.currentRoute.value.path === "/lista-asesores") {
        this.searchAdvisors(filter);
        this.$emit("filter-advisors");
      }
      window.sessionStorage.removeItem("filter");
      this.filterStore.clearFilter();
      SessionStorage.set("filter", filter);
      this.filterStore.setFilter(filter);
    },
    toIndex() {
      window.sessionStorage.removeItem("filter");
      this.filterStore.clearFilter();
      window.sessionStorage.removeItem("data-api");
      this.dataApiStore.clearDataApi();
      console.clear();
      this.router.push({ path: "/" });
    },
    logout() {
      window.sessionStorage.removeItem("user");
      this.userStore.userLogout();
      this.router.push({name: "pagina-login" });
    },
    clearFilter() {
      const filter = this.filterStore.filter;
      filter.buscador ? delete filter.buscador : "";
      window.sessionStorage.removeItem("filter");
      this.filterStore.clearFilter();
      window.sessionStorage.removeItem("data-api");
      this.dataApiStore.clearDataApi();
      SessionStorage.set("filter", filter);
      this.filterStore.setFilter(filter);
      this.$emit("clear-filter-students");
      this.searcher = null;
      this.router.currentRoute.value.path === "/lista-alumnos"
        ? this.searchStudents()
        : "";
      this.router.currentRoute.value.path === "/lista-asesores"
        ? this.searchAdvisors()
        : "";
    },
    handleKeyUp(event) {
      if (event.keyCode === 13 || event.keyCode === 8) {
        this.submitFilter();
      }
    },
  },
});
</script>

<style scoped></style>
