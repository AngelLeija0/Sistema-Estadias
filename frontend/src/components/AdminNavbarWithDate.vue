<template>
  <div
    class="container-fluid row"
    style="margin-top: 35px; background-color: #e8e8e8"
  >
    <div class="col-1 flex">
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
    <div class="col-9 flex justify-center">
      <div class="row" style="width: 100%; align-items: center; justify-content: center;">
        <div class="col-3">
          <q-input
            class="q-pa-sm"
            color="white"
            standout="bg-black text-white"
            rounded
            clearable
            v-model="searcher"
            label="Buscar por Nombre / Matricula"
          />
        </div>
        <div class="col-2" style="width: 15%;">
          <q-select
            class="q-ml-md q-mr-md"
            label-color="black"
            borderless
            flat
            clearable
            v-model="selectedLevel"
            label="Nivel de estudio"
            :options="levelOptions"
            emit-value
            map-options
            option-label="label"
            option-value="value"
          />
        </div>
        <div class="col-2" style="width: 11%;">
          <q-select
            class="q-ml-md q-mr-md"
            label-color="black"
            borderless
            flat
            clearable
            v-model="selectedCareer"
            label="Carreras"
            :options="careersOptions"
            emit-value
            map-options
            option-label="label"
            option-value="value"
            @update:model-value="updateAreas"
          />
        </div>
        <div class="col-2" style="width: 9%;">
          <q-select
            class="q-ml-md q-mr-md"
            label-color="black"
            borderless
            flat
            clearable
            v-model="selectedArea"
            label="Áreas"
            :options="areasOptions"
            emit-value
            map-options
            option-label="label"
            option-value="value"
          />
        </div>
        <div class="col-2" style="width: 8%;">
          <q-select
            class="q-ml-md q-mr-md"
            label-color="black"
            borderless
            flat
            clearable
            v-model="selectedYear"
            label="Año"
            :options="yearsOptions"
            emit-value
            map-options
            option-label="label"
            option-value="value"
          />
        </div>
        <div class="col-2" style="width: 10%;">
          <q-select
            class="q-ml-md q-mr-md"
            label-color="black"
            borderless
            flat
            clearable
            v-model="selectedPeriod"
            label="Periodo"
            :options="periodsOptions"
            emit-value
            map-options
            option-label="label"
            option-value="value"
          />
        </div>
        <div class="col-2 q-card-actions row">
          <q-btn-group flat>
            <q-btn
              color="black"
              label="Filtrar"
              class="q-ma-md"
              text-color="white"
              style="
                margin: 3px;
                padding-left: 25px;
                padding-right: 25px;
                text-transform: capitalize;
                font-size: 16px;
              "
              @click="submitFilter"
            />
            <q-btn
              flat
              label="Borrar"
              class="q-ma-md"
              style="
                margin: 3px;
                padding-left: 25px;
                padding-right: 25px;
                text-transform: capitalize;
                font-size: 16px;
              "
              @click="clearFilter"
            />
          </q-btn-group>
        </div>
      </div>
    </div>
    <div class="col-2 flex justify-end">
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
  name: "AdminNabvarWithDate",
  setup() {
    const router = useRouter();
    const userStore = useUserStore();
    const dataApiStore = useDataApiStore();
    const filterStore = useFilterStore();
    const searcher = ref(null);
    const selectedCareer = ref(null);
    const selectedArea = ref(null);
    const careersOptions = ref([]);
    const areasOptions = ref([]);
    const selectedLevel = ref(null);
    const levelOptions = ref([
      { label: "TSU", value: "Tecnico Superior Universitario" },
      { label: "Ingeniería", value: "Ingenieria" },
    ]);
    const selectedYear = ref(null);
    const yearsOptions = ref([
      { label: "2023", value: 2023 },
      { label: "2024", value: 2024 },
      { label: "2025", value: 2025 },
      { label: "2026", value: 2026 },
      { label: "2027", value: 2027 },
      { label: "2028", value: 2028 },
      { label: "2029", value: 2029 },
      { label: "2030", value: 20230 }
    ]);
    const selectedPeriod = ref(null);
    const periodsOptions = ref([
      { label: "Enero - Abril", value: "enero-abril" },
      { label: "Mayo - Agosto", value: "mayo-agosto" },
      { label: "Septiembre - Diciembre", value: "septiembre-diciembre" },
    ]);
    const initialCareer = filterStore.filter.nivelAcademico;

    function searchCareers() {
      api
        .get("http://localhost:3000/carreras")
        .then((res) => {
          if (res.data.msg) {
            console.log(res.data.msg);
          } else {
            const resCareers = res.data;
            let options = [];

            resCareers.forEach((career) => {
              let careerOption = {
                label: career.nombre,
                value: career.nombre,
                areas: [],
              };
              career.area.nombre.forEach((area) => {
                careerOption.areas.push({
                  label: area,
                  value: area,
                });
              });
              options.push(careerOption);
            });

            careersOptions.value = options;
          }
        })
        .catch((err) => console.error(err));
    }

    function updateAreas() {
      const selected = careersOptions.value.find(
        (career) => career.value === selectedCareer.value
      );

      areasOptions.value = selected ? selected.areas : [];
      selectedArea.value = null;
    }

    function searchStudents(
      typeEstadia = filterStore.filter.estado,
      filter = filterStore.filter.nivelAcademico
    ) {
      if (typeof filter === "string") {
        filter = {
          nivelAcademico: filter,
        };
      }
      try {
        api
          .post(
            `http://localhost:3000/admin/alumnos/${typeEstadia}`,
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
        console.error(error);
      }
    }

    onMounted(() => {
      searchStudents();
      searchCareers();
    });

    return {
      router,
      userStore,
      dataApiStore,
      filterStore,
      searcher,
      selectedLevel,
      levelOptions,
      selectedCareer,
      selectedArea,
      careersOptions,
      areasOptions,
      selectedYear,
      yearsOptions,
      selectedPeriod,
      periodsOptions,
      updateAreas,
      searchStudents,
      initialCareer,
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
    submitFilter() {
      const filter = this.filterStore.filter;
      const typeEstadia = filter.estado;
      const academicLevel = filter.nivelAcademico;
      const filterToSend = {
        estado: filter.estado,
      };

      if (this.searcher !== null) {
        filterToSend.buscador = this.searcher;
      }

      if (this.selectedLevel !== null) {
        filterToSend.nivelAcademico = this.selectedLevel;
      } else if (academicLevel) {
        filterToSend.nivelAcademico = academicLevel;
      }

      if (this.selectedCareer) {
        filterToSend.carrera = this.selectedCareer;
      }

      if (this.selectedArea) {
        filterToSend.area = this.selectedArea;
      }

      if (this.selectedYear) {
        filterToSend.año = this.selectedYear;
      }

      if (this.selectedPeriod) {
        filterToSend.periodo = this.selectedPeriod;
      }

      this.searchStudents(typeEstadia, filterToSend);
      window.sessionStorage.removeItem("filter");
      this.filterStore.clearFilter();
      SessionStorage.set("filter", filterToSend);
      this.filterStore.setFilter(filterToSend);
      this.$emit("filter-students");
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
      const typeEstadia = filter.estado;
      const academicLevel = this.initialCareer;
      const filterToSend = {
        estado: typeEstadia,
        nivelAcademico: academicLevel,
      };
      window.sessionStorage.removeItem("filter");
      this.filterStore.clearFilter();
      SessionStorage.set("filter", filterToSend);
      this.filterStore.setFilter(filterToSend);
      this.searcher = null;
      this.selectedLevel = null;
      this.selectedCareer = null;
      this.selectedArea = null;
      this.selectedYear = null;
      this.selectedPeriod = null;
      this.searchStudents();
      this.$emit("clear-filter-students");
    },
  },
});
</script>

<style scoped></style>
