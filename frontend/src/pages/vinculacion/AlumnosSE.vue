<template>
    <div>
      <div class="container-fluid">
        <q-card-actions style="background-color: #f5f5f5; display: flex; justify-content: start">
          <q-btn flat color="black" label="Regresar" icon="arrow_left"
            style="margin: 3px; text-transform: capitalize; font-size: 16px" @click="toBack"></q-btn>
        </q-card-actions>
      </div>
      <div class="container-fluid" style="background-color: #f5f5f5; min-height: 60vh; margin-top: 0">
        <div class="row">
          <div class="col-12 q-pa-lg" style="display: flex; justify-content: center" v-if="studentsLoaded">
            <q-card class="q-ma-lg">
              <q-card-section class="q-ml-xl q-mr-xl q-mt-sm q-mb-xl text-center">
                <h1 style="font-size: 24px; font-weight: 400">Cargando alumnos</h1>
                <q-spinner-hourglass color="primary" size="4em" />
              </q-card-section>
            </q-card>
          </div>
          <div class="col-12 q-pa-lg" v-else>
            <q-table title="Alumnos" :rows="tableRows" :columns="tableColumns" row-key="nombre">
              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td v-for="col in tableColumns" :key="col.name" :props="props">
                    <template v-if="col.name === 'actions'">
                      <q-btn-group flat>
                        <!-- Botones de accion -->
                      </q-btn-group>
                    </template>
                    <template v-else>
                      {{ props.row[col.field] }}
                    </template>
                  </q-td>
                </q-tr>
              </template>
  
            </q-table>
          </div>
        </div>
      </div>
    </div>
  
    <q-dialog v-model="dialogDeleteStudent">
      <q-card class="q-pt-md q-pl-md q-pr-md" style="width: 500px; max-width: 60vw; height: 40vh">
        <div class="row q-ma-sm">
          <div class="col-12" style="display: flex; justify-content: end">
            <q-card-actions>
              <q-btn align="right" flat color="red" icon="close" v-close-popup style="
                  margin: 3px;
                  padding-left: 25px;
                  padding-right: 25px;
                  text-transform: capitalize;
                  font-size: 16px;
                " />
            </q-card-actions>
          </div>
          <div class="col-12 q-pa-md">
            <div class="text-h6 text-center" style="font-size: 22px; font-weight: 500">
              ¿Estas seguro de borrarlo?
            </div>
          </div>
          <div class="col-12 q-pt-xl">
            <q-card-actions class="bg-white text-teal" align="center">
              <q-btn-group flat="">
                <q-btn color="red" label="Borrar" icon="delete" style="
                    margin: 3px;
                    padding-left: 20px;
                    padding-right: 20px;
                    text-transform: capitalize;
                    font-size: 14px;
                  " @click="deleteStudent(studentSelected, true)" />
                <q-btn color="black" label="Cancelar" style="
                    margin: 3px;
                    padding-left: 20px;
                    padding-right: 20px;
                    text-transform: capitalize;
                    font-size: 14px;
                  " v-close-popup />
              </q-btn-group>
            </q-card-actions>
          </div>
        </div>
      </q-card>
    </q-dialog>
  </template>
  
  <script>
  import {
    defineComponent,
    ref,
    onMounted,
  } from "vue";
  import { useFilterStore } from "src/stores/filter-store";
  import { useRouter } from "vue-router";
  import { useDataApiStore } from "src/stores/data-api-store";
  import { api } from "src/boot/axios";
  import { format } from "date-fns";
  
  export default defineComponent({
    name: "vinculacion-alumnos-sin-empezar",
    setup() {
  
      const dataApiStore = useDataApiStore();
      const students = ref([]);
      const filterStore = useFilterStore();
      const router = useRouter();
      const studentsLoaded = ref(true);
      const studentsEmpty = ref(false);
      const dialogDeleteStudent = ref(false);
  
      const tableColumns = [
        { name: 'nombre', required: true, label: 'Nombre', align: 'left', field: 'nombre' },
        { name: 'apPaterno', required: true, label: 'Apellido Paterno', align: 'left', field: 'apPaterno' },
        { name: 'apMaterno', required: true, label: 'Apellido Materno', align: 'left', field: 'apMaterno' },
        { name: 'matricula', required: true, label: 'Matrícula', align: 'left', field: 'matricula' },
        { name: 'nivelAcademico', required: true, label: 'Nivel Académico', align: 'left', field: 'nivelAcademico' },
        { name: 'carrera', required: true, label: 'Carrera', align: 'left', field: 'carrera' },
        { name: 'area', required: true, label: 'Área', align: 'left', field: 'area' },
        { name: 'fechaRegistro', required: true, label: 'Fecha registro', align: 'left', field: 'fechaRegistro', sortable: true },
        { name: 'ayudaestadias', label: '¿Necesita ayuda para encontrar estadias?', align: 'left', field: 'ayudaestadias', sortable: true },
        { name: 'curriculum', label: 'Curriculum', align: 'left', field: 'curriculum'},
      ];
  
      const tableRows = ref([]);
      const studentSelected = ref(null);
  
      function loadStudents() {
        try {
          api.get('./admin/alumnos/sin-iniciar')
            .then((res) => {
              console.log(res.data);
              const students = res.data;
              if (students == "No se encontraron alumnos") {
                studentsEmpty.value = false;
              studentsLoaded.value = false;
                return
              }
              students.map((student) => {
                console.log(student);
                student.fechaRegistro = formatDate(student.fechaRegistro);
              });
              tableRows.value = students; // Array de alumnos
              studentsEmpty.value = false;
              studentsLoaded.value = false;
            }).catch((err) => {
              console.log(err);
            })
        } catch (error) {
          studentsEmpty.value = true;
          studentsLoaded.value = false;
          setTimeout(() => {
            loadStudents();
            console.error(error);
          }, 2000);
        }
      }
  
      function deleteStudent(idStudent, confirm = false) {
        console.log(idStudent);
        studentSelected.value = idStudent;
        dialogDeleteStudent.value = true;
        if (confirm == true) {
          console.log(studentSelected.value);
          dialogDeleteStudent.value = false;
          api.post('./admin/alumnos/eliminar', {
            idStudent: studentSelected.value
          })
            .then((res) => {
              console.log(res.data);
              studentSelected.value = null;
              loadStudents();
            }).catch((err) => {
              console.log(err);
            })
        }
      }
  
      function formatDate(dateString) {
        console.log(dateString);
        const dateObj = new Date(dateString);
        return format(dateObj, "dd-MM-yyyy HH:mm:ss");
      }
  
      onMounted(() => {
        loadStudents();
      });
  
      return {
        filterStore,
        dataApiStore,
        students,
        router,
        loadStudents,
        studentsLoaded,
        studentsEmpty,
        tableColumns,
        tableRows,
        deleteStudent,
        dialogDeleteStudent,
        studentSelected,
      };
    },
    methods: {
      toBack() {
        window.sessionStorage.removeItem("filter");
        this.filterStore.clearFilter();
        window.sessionStorage.removeItem("data-api");
        this.dataApiStore.clearDataApi();
        console.clear();
        this.router.push({ name: "admin-alumnos" });
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
  