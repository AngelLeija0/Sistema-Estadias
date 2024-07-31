<template>
  <div class="container-fluid">
    <q-card-actions style="display: flex; justify-content: start">
      <q-btn flat color="black" label="Regresar" icon="arrow_left"
        style="margin: 3px; text-transform: capitalize; font-size: 16px" @click="toBack"></q-btn>
    </q-card-actions>
  </div>
  <div class="container text-center" style="margin-top: 0; padding-top: 20px;">
    <div class="small-box" style="margin-top: 0px" @click="() => router.push({ name: 'admin-alumnos-sin-empezar' })">
      <div class="img-container">
        <img src="../../assets/admin/card-alumnos.jpg" alt="Imagen 1" class="img-fluid"
          @load="adjustContainerPosition" />
      </div>
      <p class="box-text">
        <strong>Alumnos sin <br>empezar</strong>
      </p>
      <q-btn-actions style="width: 95%; padding: 0px 15px;">
        <p class="q-ma-md" style="width: 100%; height: 50px;">&nbsp;</p>
      </q-btn-actions>
    </div>
    <div class="small-box" style="margin-top: 0px">
      <div class="img-container" @click="redirectToSection('proceso')">
        <img src="../../assets/admin/card-alumnos.jpg" alt="Imagen 1" class="img-fluid"
          @load="adjustContainerPosition" />
      </div>
      <p class="box-text" @click="redirectToSection('proceso')">
        <strong>Alumnos en proceso</strong>
      </p>
      <div class="line"></div>
      <q-btn-actions style="width: 95%;
        padding: 0px 15px;
        justify-content: center;
        display: flex;
        align-items: center;">
        <q-btn color="white" label="Filtrar" class="q-ma-md btn-filter-dark" text-color="white" icon-color="white"
          @click="dialogProceso = true" flat style="width: 100%;">
          <q-icon name="filter_list" size="20px" color="white" style="padding-left: 5px" />
        </q-btn>
        <q-dialog v-model="dialogProceso">
          <q-card class="q-pa-md" style="width: 700px; max-width: 80vw">
            <q-card-section>
              <div class="text-h6">Filtrar por:</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <q-select label-color="black" borderless flat clearable v-model="selectedLevel" label="Nivel de estudio"
                :options="levelOptions" emit-value map-options option-label="label" option-value="value" />
              <q-select label-color="black" borderless flat clearable v-model="selectedArea" label="Áreas"
                :options="areasOptions" emit-value map-options option-label="label" option-value="value" />
              <q-select label-color="black" borderless flat clearable v-model="selectedGrade" label="Grado"
                :options="gradeOptions" emit-value map-options option-label="label" option-value="value" />
              <q-select label-color="black" borderless flat clearable v-model="selectedGroup" label="Grupo"
                :options="groupOptions" emit-value map-options option-label="label" option-value="value" />
              <q-select label-color="black" borderless flat clearable v-model="selectedProgress" label="Avance"
                :options="progressOptions" emit-value map-options option-label="label" option-value="value" />
            </q-card-section>

            <q-card-actions align="right" class="bg-white text-teal">
              <q-btn color="black" label="Buscar" @click="redirectToSection('proceso')" />
              <q-btn color="black" label="Cancelar" flat v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </q-btn-actions>
    </div>
    <div class="small-box" style="margin-top: 0px">
      <div class="img-container" @click="redirectToSection('liberados')">
        <img src="../../assets/admin/card-alumnos-liberados.jpg" alt="Imagen 2" class="img-fluid"
          @load="adjustContainerPosition" />
      </div>
      <p class="box-text" @click="redirectToSection('liberados')">
        <strong>Alumnos liberados</strong>
      </p>
      <div class="line"></div>
      <q-btn-actions style="width: 95%;
    padding: 0px 15px;
    justify-content: center;
    display: flex;
    align-items: center;">
        <q-btn color="white" label="Filtrar" class="q-ma-md btn-filter-dark" text-color="white" icon-color="white"
          style="width: 100%;" @click="dialogLiberado = true" flat>
          <q-icon name="filter_list" size="20px" color="white" style="padding-left: 5px" />
        </q-btn>
        <q-dialog v-model="dialogLiberado">
          <q-card class="q-pa-md" style="width: 700px; max-width: 80vw">
            <q-card-section>
              <div class="text-h6">Filtrar por:</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <q-select label-color="black" borderless flat clearable v-model="selectedLevel" label="Nivel de estudio"
                :options="levelOptions" emit-value map-options option-label="label" option-value="value" />
              <q-select label-color="black" borderless flat clearable v-model="selectedArea" label="Áreas"
                :options="areasOptions" emit-value map-options option-label="label" option-value="value" />
              <q-select label-color="black" borderless flat clearable v-model="selectedGrade" label="Grado"
                :options="gradeOptions" emit-value map-options option-label="label" option-value="value" />
              <q-select label-color="black" borderless flat clearable v-model="selectedGroup" label="Grupo"
                :options="groupOptions" emit-value map-options option-label="label" option-value="value" />
            </q-card-section>

            <q-card-actions align="right" class="bg-white text-teal">
              <q-btn color="black" label="Buscar" @click="redirectToSection('liberados')" />
              <q-btn color="black" label="Cancelar" flat v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </q-btn-actions>
    </div>
    <div class="small-box" style="margin-top: 0px">
      <div class="img-container" @click="redirectToSection('historial')">
        <img src="../../assets/admin/card-historial.jpg" alt="Imagen 3" class="img-fluid"
          @load="adjustContainerPosition" />
      </div>
      <p class="box-text" @click="redirectToSection('historial')">
        <strong>Historial</strong>
      </p>
      <div class="line"></div>
      <q-btn-actions 
        style="
          width: 95%;
          padding: 0px 15px;
          justify-content: center;
          display: flex;
          align-items: center;">
        <q-btn color="white" label="Filtrar" class="q-ma-md btn-filter-dark" text-color="white" icon-color="white"
          style="width: 100%;" @click="dialogHistorial = true" flat>
          <q-icon name="filter_list" size="20px" color="white" style="padding-left: 5px" />
        </q-btn>
        <q-dialog v-model="dialogHistorial">
          <q-card class="q-pa-md" style="width: 700px; max-width: 80vw">
            <q-card-section>
              <div class="text-h6">Filtrar por:</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <q-select label-color="black" borderless flat clearable v-model="selectedLevel" label="Nivel de estudio"
                :options="levelOptions" emit-value map-options option-label="label" option-value="value" />
              <q-select label-color="black" borderless flat clearable v-model="selectedArea" label="Áreas"
                :options="areasOptions" emit-value map-options option-label="label" option-value="value" />
              <q-select label-color="black" borderless flat clearable v-model="selectedGrade" label="Grado"
                :options="gradeOptions" emit-value map-options option-label="label" option-value="value" />
              <q-select label-color="black" borderless flat clearable v-model="selectedGroup" label="Grupo"
                :options="groupOptions" emit-value map-options option-label="label" option-value="value" />
              <q-select label-color="black" borderless flat clearable v-model="selectedYear" label="Año"
                :options="yearOptions" emit-value map-options option-label="label" option-value="value" />
              <q-select label-color="black" borderless flat clearable v-model="selectedPeriod" label="Periodo"
                :options="periodOptions" emit-value map-options option-label="label" option-value="value" />
            </q-card-section>

            <q-card-actions align="right" class="bg-white text-teal">
              <q-btn color="black" label="Buscar" @click="redirectToSection('historial')" />
              <q-btn color="black" label="Cancelar" flat v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </q-btn-actions>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { SessionStorage } from "quasar";
import { useFilterStore } from "src/stores/filter-store";
import { useDataApiStore } from "src/stores/data-api-store";
import { useUserStore } from "src/stores/user-store";
import { useRouter } from "vue-router";
import { api } from "src/boot/axios";

export default defineComponent({
  name: "admin-alumnos",
  setup() {
    const userStore = useUserStore();
    const dataApiStore = useDataApiStore();
    const filterStore = useFilterStore();
    const router = useRouter();

    const selectedCareer = ref(userStore.user.carrera);

    const dialogProceso = ref();
    const dialogLiberado = ref();
    const dialogHistorial = ref();

    const selectedArea = ref(null);
    const careersOptions = ref([]);
    const areasOptions = ref([]);
    const selectedLevel = ref(null);
    const levelOptions = ref([
      { label: "TSU", value: "Tecnico Superior Universitario" },
      { label: "Ingeniería", value: "Ingenieria" },
      { label: "Posgrado", value: "Posgrado" }
    ]);
    const selectedGrade = ref(null);
    const selectedGroup = ref(null);
    const selectedProgress = ref(null);
    const gradeOptions = ref([
      { label: "6to", value: "6" },
      { label: "11vo", value: "11" },
    ]);
    const groupOptions = ref([
      { label: "A", value: "A" },
      { label: "B", value: "B" },
      { label: "C", value: "C" },
      { label: "D", value: "D" },
    ]);
    const progressOptions = ref([
      { label: "Carta presentación", value: "etapa1" },
      { label: "25%", value: "etapa2" },
      { label: "50%", value: "etapa3" },
      { label: "75%", value: "etapa4" },
      { label: "100%", value: "etapa5" },
      { label: "Revisión ortografica", value: "etapa6" },
    ]);
    const selectedYear = ref();
    const yearOptions = ref(['2019', '2020', '2021', '2022', '2023']);
    const selectedPeriod = ref();
    const periodOptions = ref([
      { label: "Enero - Abril", value: "enero-abril" },
      { label: "Mayo - Agosto", value: "mayo-agosto" },
      { label: "Septiembre - Diciembre", value: "septiembre-diciembre" },
    ])

    if (window.sessionStorage.getItem("data-api")) {
      window.sessionStorage.removeItem("data-api");
      dataApiStore.clearDataApi();
    }
    if (window.sessionStorage.getItem("filter")) {
      window.sessionStorage.removeItem("filter");
      filterStore.clearFilter();
    }

    function searchCareers() {
      api
        .get("./carreras")
        .then((res) => {
          if (res.data.msg) {
            console.log(res.data.msg);
          } else {
            const allCareers = res.data;
            const actualCareer = allCareers.find((career) => career.nombre == selectedCareer.value);
            const actualAreas = actualCareer.area.nombre;
            console.log(actualAreas);
            areasOptions.value = actualAreas;
          }
        })
        .catch((err) => console.error(err));
    }

    function toBack() {
      router.push({ name: "admin-inicio" });
    }

    onMounted(() => {
      searchCareers();
    });

    return {
      userStore,
      dataApiStore,
      filterStore,
      router,
      toBack,
      dialogProceso,
      dialogLiberado,
      dialogHistorial,
      selectedLevel,
      levelOptions,
      selectedCareer,
      selectedArea,
      careersOptions,
      areasOptions,
      selectedGrade,
      selectedGroup,
      selectedProgress,
      gradeOptions,
      groupOptions,
      progressOptions,
      selectedYear,
      selectedPeriod,
      yearOptions,
      periodOptions,
    };
  },
  methods: {
    redirectToSection(estado) {
      const filter = {
        estado: estado,
      };
      this.selectedLevel !== null
        ? (filter.nivelAcademico = this.selectedLevel)
        : "";
      this.selectedCareer !== null
        ? (filter.carrera = this.selectedCareer)
        : "";
      this.selectedArea !== null ? (filter.area = this.selectedArea) : "";
      this.selectedGrade !== null ? (filter.grado = this.selectedGrade) : "";
      this.selectedGroup !== null ? (filter.grupo = this.selectedGroup) : "";
      this.selectedProgress !== null
        ? (filter.avance = this.selectedProgress)
        : "";
      this.selectedYear !== null ? (filter.año = this.selectedYear) : "";
      this.selectedPeriod !== null ? (filter.periodo = this.selectedPeriod) : "";
      SessionStorage.set("filter", filter);
      this.filterStore.setFilter(filter);
      this.$router.push({ name: "admin-listaAlumnos" });
    },
  },
});
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  padding-top: 40px;
  /* Agregar un espacio superior para evitar solapamiento con la barra de navegación */
  padding-bottom: 40px;
  box-sizing: border-box;
  /* Asegurar que el padding no afecte el tamaño total */
}

.btn-filter {
  width: 120px;
  margin-bottom: 50px;
  background-color: #f0f0f0;
  text-transform: none;
  padding: 10px;
  border-radius: 8px;
  font-size: 18px;
}

.btn-filter-dark {
  width: 120px;
  margin-bottom: 50px;
  background-color: #181818;
  text-transform: none;
  padding: 10px;
  border-radius: 8px;
  font-size: 18px;
}

.line {
  width: 85%;
  border: none;
  height: 1px;
  background-color: #d9d9d9;
  margin: 10px 0;
}

.small-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 320px;
  height: 520px;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin: 40px;
  margin-top: 70px;
  margin-bottom: 40px;
  background-color: #fff;
  box-shadow: 4px 4px 4px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  overflow: hidden;
  cursor: pointer;
}

.small-box:hover {
  transform: scale(1.05);
}

.img-container {
  height: 100%;
  width: 100%;
}

.img-fluid {
  width: 100%;
  height: 85%;
  object-fit: cover;
}

.box-text {
  margin-bottom: 15px;
  text-align: center;
  font-weight: 500;
  color: #333;
  font-size: 27px;
  line-height: 1.3;
  text-transform: none;
}
</style>
