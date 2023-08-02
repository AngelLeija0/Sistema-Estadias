<template>
  <div>
    <AdminNabvar
      @filter-students="loadStudents"
      @clear-filter-students="loadStudents"
    ></AdminNabvar>
  </div>
  <div class="container-fluid">
    <q-card-actions
      style="background-color: #f5f5f5; display: flex; justify-content: start"
    >
      <q-btn
        flat
        color="black"
        label="Regresar"
        icon="arrow_left"
        style="margin: 3px; text-transform: capitalize; font-size: 16px"
        @click="toBack"
      ></q-btn>
    </q-card-actions>
  </div>
  <div class="container-fluid q-pb-lg" style="background-color: #f5f5f5">
    <div class="row q-pt-md q-pl-xl q-pr-xl">
      <div class="col-6">
        <h5 style="margin: 0 0 10px 0; font-size: 18px; font-weight: 500">
          Buscando registros por:
        </h5>
        <p style="text-transform: capitalize; font-size: 14px">
          {{ filteringBy }}
        </p>
      </div>
      <div
        class="col-6"
        style="display: flex; justify-content: end; align-items: flex-start"
      >
        <q-card-actions style="padding-top: 0">
          <q-btn-group flat>
            <q-btn
              class="q-icon-sm"
              color="green-7"
              text-color="white"
              label="Excel"
              bg-color="green"
              icon="file_download"
              style="
                margin: 3px;
                padding: 1px 15px;
                text-transform: capitalize;
                font-size: 16px;
              "
              @click="dialogExcel = true"
            ></q-btn>
            <q-dialog v-model="dialogExcel">
              <q-card
                class="q-pa-xl q-ma-lg"
                style="width: 600px; background-color: #f5f5f5"
              >
                <div class="row">
                  <div class="col-6 q-px-md">
                    <q-btn
                      color="green-7"
                      text-color="white"
                      label="Excel General"
                      style="
                        height: 100px;
                        text-transform: capitalize;
                        font-size: 16px;
                        width: 100%;
                      "
                      @click="toGenerateExcel('general')"
                    />
                  </div>
                  <div class="col-6 q-px-md">
                    <q-btn
                      color="green-7"
                      text-color="white"
                      label="Excel con filtros actuales"
                      style="
                        height: 100px;
                        text-transform: capitalize;
                        font-size: 16px;
                        width: 100%;
                      "
                      @click="toGenerateExcel('specific')"
                    />
                  </div>
                  <div class="col-12 q-pt-lg">
                    <q-btn
                      outline
                      color="red"
                      label="Cancelar"
                      v-close-popup
                      style="width: 100%"
                    />
                  </div>
                </div>
              </q-card>
            </q-dialog>

            <div style="display: flex; align-items: center; padding-left: 30px">
              <p style="font-size: 16px; margin: 0">Mostrar</p>
            </div>
            <q-btn-dropdown
              outline
              color="black"
              :label="quantityRecords"
              style="
                margin: 3px 5px;
                padding: 0px 0px 0 10px;
                text-transform: capitalize;
                font-size: 16px;
              "
            >
              <q-list>
                <q-item
                  v-for="record in filteredRecords"
                  :key="record"
                  :label="record"
                  @click="setRecords(record)"
                  clickable
                  v-close-popup
                >
                  <q-item-section>
                    <q-item-label>{{ record }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
            <div style="display: flex; align-items: center">
              <p style="font-size: 16px; margin: 0">registros</p>
            </div>
          </q-btn-group>
        </q-card-actions>
      </div>
    </div>
  </div>
  <div
    class="container-fluid"
    style="background-color: #f5f5f5; min-height: 50vh; margin-top: 0"
  >
    <div class="row">
      <div
        class="col-12"
        style="display: flex; justify-content: center"
        v-if="studentsLoaded"
      >
        <q-card class="q-ma-lg">
          <q-card-section class="q-ml-xl q-mr-xl q-mt-sm q-mb-xl text-center">
            <h1 style="font-size: 24px; font-weight: 400">Cargando alumnos</h1>
            <q-spinner-hourglass color="primary" size="4em" />
          </q-card-section>
        </q-card>
      </div>
      <div
        class="col-lg-3 col-md-4 col-sm-6 col-6"
        v-else
        v-for="(student, i) in students"
        :key="i"
      >
        <CardAlumno
          v-bind="student"
          class="q-ml-xl q-mr-xl q-mb-xl"
        ></CardAlumno>
      </div>
      <div
        class="col-12"
        style="display: flex; justify-content: center"
        v-if="studentsEmpty"
      >
        <q-card class="q-ma-lg">
          <q-card-section class="q-ml-xl q-mr-xl q-mt-sm q-mb-xl text-center">
            <h1 style="font-size: 24px; font-weight: 400">
              No se encontraron resultados
            </h1>
            <q-icon name="error_outline" color="negative" size="8em" />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>

  <div class="container-fluid q-pb-lg" style="background-color: #f5f5f5">
    <div class="row q-pt-md q-pl-xl q-pr-xl">
      <div class="col-6" style="align-items: end; display: flex">
        <p>
          Mostrando {{ qStudentsShowing }} de {{ qTotalStudents }} registros
        </p>
      </div>
      <div class="col-6" style="display: flex; justify-content: end">
        <q-card-actions>
          <q-btn-group flat>
            <q-btn
              v-if="actualPage > 1"
              label="Anterior"
              icon="navigate_before"
              style="
                margin: 3px;
                padding: 1px 15px;
                text-transform: capitalize;
                font-size: 14px;
                font-weight: 400;
              "
              @click="setPage(actualPage - 1)"
            ></q-btn>
            <q-btn
              v-for="page in pages"
              :key="page"
              :color="page === actualPage ? 'dark' : 'grey-7'"
              :label="page"
              text-color="white"
              style="
                margin: 3px;
                padding: 1px 15px;
                text-transform: capitalize;
                font-size: 14px;
              "
              @click="setPage(page)"
            ></q-btn>
            <q-btn
              v-if="actualPage + 1 <= pages.length"
              label="Siguiente"
              icon-right="navigate_next"
              style="
                margin: 3px;
                padding: 1px 15px;
                text-transform: capitalize;
                font-size: 14px;
                font-weight: 400;
              "
              @click="setPage(actualPage + 1)"
            ></q-btn>
          </q-btn-group>
        </q-card-actions>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import {
  defineComponent,
  ref,
  onMounted,
  onBeforeUnmount,
  reactive,
} from "vue";
import { useFilterStore } from "src/stores/filter-store";
import { useRouter } from "vue-router";
import { useDataApiStore } from "src/stores/data-api-store";
import { api } from "src/boot/axios";
import AdminNabvar from "src/components/AdminNavbar.vue";
import CardAlumno from "src/components/CardAlumno.vue";

export default defineComponent({
  name: "vinculacion-listaAlumnos",
  components: {
    AdminNabvar,
    CardAlumno,
  },
  setup() {
    const isNavbarWithDate = ref(false);

    const dataApiStore = useDataApiStore();
    const students = ref([]);
    const filterStore = useFilterStore();
    const router = useRouter();
    const studentsLoaded = ref(true);
    const studentsEmpty = ref(false);
    const filteringBy = ref(null);
    const dialogExcel = ref();

    const quantityRecords = ref(8);
    const actualPage = ref(1);
    const pages = ref([]);
    const records = ref([8, 12, 14, 16, 18, 20]);
    const qStudentsShowing = ref(0);
    const qTotalStudents = ref(0);

    function searchTypeOfNavbar() {
      const filterData = window.sessionStorage.getItem("filter");
      const filter = JSON.parse(filterData.replace("__q_objt|", ""));
      const typeEstadia = filter.estado;
      if (typeEstadia === "liberados" || typeEstadia === "historial") {
        return (isNavbarWithDate.value = true);
      } else {
        return (isNavbarWithDate.value = false);
      }
    }

    function loadFilter() {
      const filterData = window.sessionStorage.getItem("filter");
      const filter = JSON.parse(
        filterData.replace(/__q_objt\||__q_strn\|/g, "")
      );
      let filterString = "";
      Object.keys(filter).map((key) => {
        if (filter[key] === "proceso") {
          filterString += "Alumnos en proceso, ";
        } else if (filter[key] == "liberados") {
          filterString += "Alumnos liberados, ";
        } else {
          filterString += filter[key] + ", ";
        }
      });
      filteringBy.value = filterString.slice(0, -2);
    }

    function loadStudents() {
      try {
        console.log("Loading students ...");
        studentsEmpty.value = false;
        studentsLoaded.value = true;
        students.value = [];
        loadFilter();
        setTimeout(() => {
          const studentsData = window.sessionStorage.getItem("data-api");
          console.log(studentsData);
          if (studentsData === null) {
            return loadStudents();
          }
          const depuredStudentsData = studentsData.replace(
            /__q_objt\||__q_strn\|/g,
            ""
          );
          if (depuredStudentsData === "No se encontraron alumnos") {
            students.value = [];
            qStudentsShowing.value = 0;
            qTotalStudents.value = 0;
            studentsEmpty.value = true;
            studentsLoaded.value = false;
            loadFilter();
            return;
          }
          const studentsDataToJSON = JSON.parse(depuredStudentsData);
          if (Object.keys(studentsDataToJSON).length === 0) {
            quantityRecords.value = 0;
            studentsEmpty.value = true;
            studentsLoaded.value = false;
            return;
          }
          studentsToShow(studentsDataToJSON);
        }, 2000);
      } catch (error) {
        quantityRecords.value = 0;
        studentsEmpty.value = true;
        studentsLoaded.value = false;
        setTimeout(() => {
          loadStudents();
          console.error(error);
        }, 2000);
      }
    }

    function studentsToShow(allStudents) {
      try {
        if (typeof allStudents !== "object" || allStudents === null) {
          return;
        }
        const totalRecords = Object.keys(allStudents).length;

        const qRecords = quantityRecords.value;

        generatePages(totalRecords, qRecords);

        let previusRecords = 0;
        let actualRecords = actualPage.value * quantityRecords.value;

        if (actualPage.value > 1) {
          previusRecords = (actualPage.value - 1) * quantityRecords.value;
        }

        let arrStudentsToShow = [];
        for (
          let i1 = 0, i2 = previusRecords;
          i1 < qRecords && i2 < actualRecords;
          i1++, i2++
        ) {
          if (allStudents[i2] !== undefined) {
            arrStudentsToShow.push(allStudents[i2]);
          }
        }
        students.value = arrStudentsToShow;
        qStudentsShowing.value = arrStudentsToShow.length;
        qTotalStudents.value = totalRecords;
        studentsLoaded.value = false;
        studentsEmpty.value = false;
        loadFilter();
      } catch (error) {
        console.error(error);
      }
    }

    function generatePages(totalRecords, qRecords) {
      const totalPages = Math.ceil(totalRecords / qRecords);
      const currentPage = actualPage.value;
      const visiblePages = 5;

      let startPage = currentPage - Math.floor(visiblePages / 2);
      if (startPage < 1) {
        startPage = 1;
      } else if (startPage + visiblePages - 1 > totalPages) {
        startPage = totalPages - visiblePages + 1;
      }

      const endPage = Math.min(startPage + visiblePages - 1, totalPages);

      const arrPages = [];
      for (let i = startPage; i <= endPage; i++) {
        arrPages.push(i);
      }

      pages.value = arrPages;
    }

    function setPage(page) {
      if (!pages.value.includes(page)) {
        loadStudents();
        return;
      }
      actualPage.value = page;
      loadStudents();
    }

    function setRecords(qRecords) {
      quantityRecords.value = qRecords;
      loadStudents();
    }

    onMounted(() => {
      loadFilter();
      loadStudents();
      searchTypeOfNavbar();
      router.afterEach((to, from) => {
        if (to.name === "admin-listaAlumnos") {
          loadStudents();
        }
      });
    });

    onBeforeUnmount(() => {
      router.afterEach();
    });

    return {
      filterStore,
      searchTypeOfNavbar,
      isNavbarWithDate,
      dataApiStore,
      students,
      router,
      loadStudents,
      studentsLoaded,
      studentsEmpty,
      filteringBy,
      loadFilter,
      quantityRecords,
      pages,
      records,
      actualPage,
      qStudentsShowing,
      qTotalStudents,
      studentsToShow,
      setRecords,
      setPage,
      generatePages,
      dialogExcel,
    };
  },
  computed: {
    filter() {
      if (
        !this.filterStore.getFilter &&
        window.sessionStorage.getItem("filter")
      ) {
        this.filterStore.setFilter(window.sessionStorage.getItem("filter"));
      }
      return this.filterStore.getFilter;
    },
    filteredRecords() {
      return this.records.filter((record) => record !== this.quantityRecords);
    },
  },
  methods: {
    toBack() {
      window.sessionStorage.removeItem("filter");
      this.filterStore.clearFilter();
      window.sessionStorage.removeItem("data-api");
      this.dataApiStore.clearDataApi();
      console.clear();
      this.router.go(-1);
    },
    toGenerateExcel(type) {
      console.log("Fetching Excel ...");
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

      let url = "";
      type == "general"
        ? (url = `http://localhost:3000/admin/alumnos/${typeEstadia}/excel-general`)
        : "";
      type == "specific"
        ? (url = `http://localhost:3000/admin/alumnos/${typeEstadia}/excel`)
        : "";
      api
        .post(
          url,
          {
            filtro: filter,
          },
          {
            responseType: "blob",
          }
        )
        .then((res) => {
          if (res.data.msg) {
            console.log(res.data.msg);
          } else {
            const blob = new Blob([res.data], {
              type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `alumnos-${typeEstadia}.xlsx`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }
        })
        .catch((err) => console.error(err));
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
  padding-top: 40px; /* Agregar un espacio superior para evitar solapamiento con la barra de navegación */
  padding-bottom: 40px;
  box-sizing: border-box; /* Asegurar que el padding no afecte el tamaño total */
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
  height: 550px;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin: 80px;
  margin-top: 70px;
  margin-bottom: 0;
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
  padding: 6px;
  text-align: center;
  font-weight: 500;
  color: #333;
  font-size: 27px;
  line-height: 1.3;
  text-transform: none;
}
</style>
