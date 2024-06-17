<template>
  <div class="container-fluid" style="background-color: #f5f5f5">
    <q-card-actions style="display: flex; justify-content: start">
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
  <div
    class="container-fluid"
    style="background-color: #f5f5f5; height: 500px; margin-top: 0"
    v-if="advisorsLoaded"
  >
    <div class="row">
      <div class="col-12" style="display: flex; justify-content: center">
        <q-card class="q-ma-lg">
          <q-card-section class="q-ml-xl q-mr-xl q-mt-sm q-mb-xl text-center">
            <h1 style="font-size: 24px; font-weight: 400">Cargando asesor</h1>
            <q-spinner-hourglass color="primary" size="4em" />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
  <div
    class="container-fluid q-pt-sm q-pl-xl q-pr-xl q-pb-xl"
    style="background-color: #f5f5f5; min-height: 73vh"
    v-else
  >
    <div
      class="row q-ml-xl q-mr-xl"
      style="background-color: white; border-radius: 15px; height: 65vh"
    >
      <div class="col-3 q-pt-lg" style="border-right: 1px solid lightgray">
        <div
          style="
            padding: 5px;
            text-align: center;
            border-bottom: 1px solid lightgray;
          "
        >
          <p style="font-size: 16px; font-weight: 500; margin-bottom: 0">
            {{ advisor.datosPersonales.nombres.nombre }}
          </p>
          <p style="font-size: 16px; font-weight: 500">
            {{ advisor.datosPersonales.nombres.apPaterno }}
            {{ advisor.datosPersonales.nombres.apMaterno }}
          </p>
          <p style="font-size: 14px">
            {{ advisor.datosAcademicos.carrera }}
          </p>
          <p style="font-size: 14px">
            {{ advisor.datosPersonales.privado.email }}
          </p>
          <p style="color: #777676; font-size: 14px">
            {{ advisor.datosPersonales.privado.username }}
          </p>
        </div>
        <div>
          <q-card-actions style="flex-direction: column; align-items: start">
            <q-btn
              flat
              color="black"
              label="Informacion general"
              style="
                margin: 3px;
                text-transform: capitalize;
                font-size: 16px;
                font-weight: normal;
                width: 100%;
                align-items: start;
              "
              @click="showSection(1)"
            ></q-btn>
            <q-btn
              flat
              color="black"
              label="Alumnos asesorados"
              style="
                margin: 3px;
                text-transform: capitalize;
                font-size: 16px;
                font-weight: normal;
                width: 100%;
                align-items: start;
              "
              @click="showSection(2)"
            ></q-btn>
            <q-btn
              v-if="advisorState === true"
              flat
              color="orange"
              label="Deshabilitar asesor"
              style="
                margin: 3px;
                text-transform: capitalize;
                font-size: 16px;
                font-weight: normal;
                width: 100%;
                display: flex;
                justify-content: center;
                width: 100%;
                align-items: start;
              "
              @click="toogleAdvisorState()"
            ></q-btn>
            <q-btn
              v-if="advisorState === false"
              flat
              color="green"
              label="Habilitar asesor"
              style="
                margin: 3px;
                text-transform: capitalize;
                font-size: 16px;
                font-weight: normal;
                width: 100%;
                display: flex;
                justify-content: center;
                width: 100%;
                align-items: start;
              "
              @click="toogleAdvisorState()"
            ></q-btn>
            <q-btn
              flat
              color="red"
              label="Eliminar asesor"
              style="
                margin: 3px;
                text-transform: capitalize;
                font-size: 16px;
                font-weight: normal;
                width: 100%;
                display: flex;
                justify-content: center;
                width: 100%;
                align-items: start;
              "
              @click="deleteDialog = true"
            ></q-btn>
          </q-card-actions>
          <q-dialog v-model="deleteDialog">
            <q-card style="width: 400px">
              <q-card-section class="q-pa-lg text-center">
                <q-icon
                  class="q-pa-md"
                  name="warning"
                  color="orange"
                  size="6em"
                />
                <p style="font-size: 18px; padding-top: 20px">
                  ¿Estas seguro de querer eliminar el asesor
                  {{ advisor.datosPersonales.nombres.nombre }}
                  {{ advisor.datosPersonales.nombres.apPaterno }}?
                </p>
              </q-card-section>
              <q-card-section
                class="q-pt-none"
                style="display: flex; justify-content: end"
              >
                <q-card-actions>
                  <q-btn-group flat>
                    <q-btn
                      color="red"
                      label="Eliminar"
                      style="
                        margin: 3px 5px;
                        padding: 1px 20px;
                        text-transform: capitalize;
                        font-size: 16px;
                        font-weight: normal;
                      "
                      @click="deleteAdvisor"
                    ></q-btn>
                    <q-btn
                      flat
                      color="black"
                      label="Cancelar"
                      style="
                        margin: 3px 5px;
                        padding: 1px 15px;
                        text-transform: capitalize;
                        font-size: 16px;
                        font-weight: normal;
                      "
                      @click="deleteDialog = false"
                    ></q-btn>
                  </q-btn-group>
                </q-card-actions>
              </q-card-section>
            </q-card>
          </q-dialog>
        </div>
      </div>
      <div class="col-8 q-pl-xl">
        <div class="row" v-if="actualSection === 1">
          <div class="col-12">
            <h5 style="font-weight: 500">Información General</h5>
          </div>
          <div class="col-12 flex justify-end" style="padding-bottom: 10px">
            <q-card-actions>
              <q-btn-group flat v-if="!isEditingInfo">
                <q-btn
                  color="primary"
                  icon="edit"
                  label="Editar"
                  style="
                    margin: 3px;
                    padding-right: 15px;
                    text-transform: capitalize;
                    font-size: 12px;
                    font-weight: normal;
                  "
                  @click="toEditInfo"
                ></q-btn>
              </q-btn-group>
              <q-btn-group flat v-else>
                <q-btn
                  color="positive"
                  icon="save"
                  label="Guardar"
                  style="
                    margin: 3px;
                    padding-right: 15px;
                    text-transform: capitalize;
                    font-size: 12px;
                    font-weight: normal;
                  "
                  @click="saveEditInfo"
                ></q-btn>
                <q-btn
                  color="red"
                  icon="cancel"
                  label="Cancelar"
                  style="
                    margin: 3px;
                    padding-right: 15px;
                    text-transform: capitalize;
                    font-size: 12px;
                    font-weight: normal;
                  "
                  @click="showSection(1)"
                ></q-btn>
              </q-btn-group>
            </q-card-actions>
          </div>
          <div class="col-12">
            <div class="row" v-if="!isEditingInfo">
              <div class="col-4">
                <p style="margin: 5px; font-size: 16px">Nombre</p>
                <p
                  style="
                    background-color: #d9d9d9;
                    padding: 8px;
                    width: 90%;
                    font-size: 14px;
                    border-radius: 5px;
                  "
                >
                  {{ advisor.datosPersonales.nombres.nombre }}
                  {{ advisor.datosPersonales.nombres.apPaterno }}
                  {{ advisor.datosPersonales.nombres.apMaterno }}
                </p>
              </div>
              <div class="col-4">
                <p style="margin: 5px; font-size: 16px">Carrera</p>
                <p
                  style="
                    background-color: #d9d9d9;
                    padding: 8px;
                    width: 90%;
                    font-size: 14px;
                    border-radius: 5px;
                  "
                >
                  {{ advisor.datosAcademicos.carrera }}
                </p>
              </div>
              <div class="col-4">
                <p style="margin: 5px; font-size: 16px">Email</p>
                <p
                  style="
                    background-color: #d9d9d9;
                    padding: 8px;
                    width: 90%;
                    font-size: 14px;
                    border-radius: 5px;
                  "
                >
                  {{ advisor.datosPersonales.privado.email }}
                </p>
              </div>
              <div class="col-12"></div>
              <div class="col-3">
                <p style="margin: 5px; font-size: 16px">Username</p>
                <p
                  style="
                    background-color: #d9d9d9;
                    padding: 8px;
                    width: 90%;
                    font-size: 14px;
                    border-radius: 5px;
                  "
                >
                  {{ advisor.datosPersonales.privado.username }}
                </p>
              </div>
              <div class="col-3">
                <p style="margin: 5px; font-size: 16px">Contraseña</p>
                <p
                  style="
                    background-color: #d9d9d9;
                    padding: 8px;
                    width: 90%;
                    font-size: 14px;
                    border-radius: 5px;
                  "
                >
                  **********
                </p>
              </div>
              <div class="col-3">
                <p style="margin: 5px; font-size: 16px">Telefono</p>
                <p
                  style="
                    background-color: #d9d9d9;
                    padding: 8px;
                    width: 90%;
                    font-size: 14px;
                    border-radius: 5px;
                  "
                >
                  {{ advisor.datosPersonales.privado.telefono }}
                </p>
              </div>
            </div>
            <div class="row" v-else>
              <div class="col-4">
                <p style="margin: 5px; font-size: 16px">Nombre</p>
                <div style="width: 90%">
                  <q-input
                    dense
                    v-model="inputFullname"
                    input-style="background-color: #D9D9D9; padding: 8px; font-size: 14px; border-radius: 5px;"
                  />
                </div>
              </div>
              <div class="col-4">
                <p style="margin: 5px; font-size: 16px">Carrera</p>
                <div style="width: 90%">
                  <q-input
                    dense
                    v-model="inputCareer"
                    input-style="background-color: #D9D9D9; padding: 8px; font-size: 14px; border-radius: 5px;"
                  />
                </div>
              </div>
              <div class="col-4">
                <p style="margin: 5px; font-size: 16px">Email</p>
                <div style="width: 90%">
                  <q-input
                    dense
                    v-model="inputEmail"
                    input-style="background-color: #D9D9D9; padding: 8px; font-size: 14px; border-radius: 5px;"
                  />
                </div>
              </div>
              <div class="col-3">
                <p style="margin: 5px; font-size: 16px">Usuario</p>
                <div style="width: 90%">
                  <q-input
                    dense
                    v-model="inputUsername"
                    input-style="background-color: #D9D9D9; padding: 8px; font-size: 14px; border-radius: 5px;"
                  />
                </div>
              </div>
              <div class="col-3">
                <p style="margin: 5px; font-size: 16px">Contraseña</p>
                <div style="width: 90%">
                  <q-input
                    dense
                    type="password"
                    v-model="inputPassword"
                    input-style="background-color: #D9D9D9; padding: 8px; font-size: 14px; border-radius: 5px;"
                  />
                </div>
              </div>
              <div class="col-3">
                <p style="margin: 5px; font-size: 16px">Telefono</p>
                <div style="width: 90%">
                  <q-input
                    dense
                    v-model="inputPhonenumber"
                    input-style="background-color: #D9D9D9; padding: 8px; font-size: 14px; border-radius: 5px;"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Seccion de alumnos asesorados-->

        <div class="row" v-if="actualSection === 2">
          <div class="col-12" style="padding-bottom: 10px">
            <h5 style="font-weight: 500">Alumnos asesorados</h5>
          </div>
          <div class="col-12" v-if="studentsLoaded">
            <div class="row">
              <div
                class="col-12"
                style="display: flex; justify-content: center"
              >
                <q-card class="q-ma-lg">
                  <q-card-section class="q-ml-xl q-mr-xl q-mb-xl text-center">
                    <h1 style="font-size: 24px; font-weight: 400">
                      Buscando alumnos
                    </h1>
                    <q-spinner-hourglass color="primary" size="4em" />
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </div>
          <div class="col-12" v-else-if="emptyStudents">
            <div class="row">
              <div
                class="col-12"
                style="display: flex; justify-content: center"
              >
                <q-card class="q-ma-lg">
                  <q-card-section class="q-ml-xl q-mr-xl q-mb-xl text-center">
                    <h1 style="font-size: 22px; font-weight: 400">
                      No se encontraron resultados
                    </h1>
                    <q-icon name="error_outline" color="negative" size="4em" />
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </div>
          <div class="col-12" v-else>
            <div class="row">
              <div class="col-12">
                <div class="row">
                  <div
                    class="col-lg-4 col-md-4 col-sm-6 col-6"
                    v-for="(student, i) in students"
                    :key="i"
                  >
                    <CardMiniAlumno
                      v-bind="student"
                      class="q-ml-md q-mr-md q-mb-md"
                    ></CardMiniAlumno>
                  </div>
                </div>
              </div>
              <div class="col-6" style="align-items: end; display: flex">
                <p style="font-size: 13px">
                  Mostrando {{ qStudentsShowing }} de
                  {{ qTotalStudents }} registros
                </p>
              </div>
              <div class="col-6" style="display: flex; justify-content: end">
                <q-card-actions>
                  <q-btn-group flat>
                    <q-btn
                      v-for="(page, i) in pages"
                      :key="i + 1"
                      :color="i + 1 === actualPage ? 'dark' : 'grey-7'"
                      :label="i + 1"
                      class="q-icon-sm"
                      text-color="white"
                      style="
                        margin: 3px;
                        padding: 1px 14px;
                        text-transform: capitalize;
                        font-size: 13px;
                      "
                      @click="setPage(i + 1)"
                    ></q-btn>
                  </q-btn-group>
                </q-card-actions>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { defineComponent, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useFilterStore } from "src/stores/filter-store";
import { useDataApiStore } from "src/stores/data-api-store";
import { api } from "src/boot/axios";
import full from "core-js/full";
import CardMiniAlumno from "src/components/CardMiniAlumno.vue";

export default defineComponent({
  name: "admin-asesorId",
  components: {
    CardMiniAlumno,
  },
  setup() {
    const dataApiStore = useDataApiStore();
    const filterStore = useFilterStore();
    const router = useRouter();
    const idAdvisor = ref(router.currentRoute._value.params.id);
    const advisor = ref();
    const advisorsLoaded = ref(true);
    const actualSection = ref(1);

    const students = ref();
    const studentsLoaded = ref(true);
    const emptyStudents = ref(false);

    const quantityRecords = ref(3);
    const actualPage = ref(1);
    const pages = ref([1, 2, 3, 4, 5]);
    const qStudentsShowing = ref(0);
    const qTotalStudents = ref(0);

    const existsStudentsAdvised = ref(false);

    const isEditingInfo = ref(false);

    const deleteDialog = ref(false);

    const advisorState = ref(true);
    const inputFullname = ref(null);
    const inputUsername = ref(null);
    const inputEmail = ref(null);
    const inputPassword = ref(null);
    const inputPhonenumber = ref(null);
    const inputCareer = ref(null);

    function loadAdvisor(updatedAdvisor = null) {
      try {
        if (updatedAdvisor !== null) {
          advisor.value = updatedAdvisor;
          setTimeout(() => {
            advisorsLoaded.value = false;
          }, 2000);
        } else {
          advisorsLoaded.value = true;
          api
            .post(
              `./admin/asesor/perfil`,
              {
                asesor: idAdvisor.value,
              }
            )
            .then((res) => {
              console.log(res.data)
              console.log(idAdvisor.value)
              advisor.value = res.data;
              advisorState.value = res.data.estado;
              res.data.estado === "Activo" ? advisorState.value = true : '';
              res.data.estado === "Inactivo" ? advisorState.value = false : '';
              setTimeout(() => {
                advisorsLoaded.value = false;
              }, 2000);
            })
            .catch((err) => console.error(err));
        }
      } catch (error) {
        setTimeout(() => {
          loadAdvisor();
          console.error(error);
        }, 2000);
      }
    }

    function toogleAdvisorState() {
      const actualState = advisorState.value;
      const newState = !advisorState.value;

      advisorState.value = newState;

      let stringState;
      actualState === true ? stringState = "Inactivo" : '';
      actualState === false ? stringState = "Activo" : '';

      const updatedAdvisor = {
        idAsesor: idAdvisor._value,
        estado: stringState,
        datosPersonales: {
          nombres: {
            nombre: advisor.value.datosPersonales.nombres.nombre,
            apPaterno: advisor.value.datosPersonales.nombres.apPaterno,
            apMaterno: advisor.value.datosPersonales.nombres.apMaterno,
          },
          privado: {
            email: advisor.value.datosPersonales.privado.email,
            telefono: advisor.value.datosPersonales.privado.telefono,
            username: advisor.value.datosPersonales.privado.username,
            password: advisor.value.datosPersonales.privado.password,
          },
        },
        datosAcademicos: {
          carrera: advisor.value.datosAcademicos.carrera,
        },
      };
      api
        .patch(
          `./admin/asesor/perfil/modificar`,
          {
            asesor: updatedAdvisor,
          }
        )
        .then((res) => {
          console.log(res.data);
          console.log(advisorState.value);
        })
        .catch((err) => {
          console.error(err);
        });
    }

    function deleteAdvisor() {
      api
        .post(
          `./admin/asesor/perfil/borrar`,
          {
            asesor: idAdvisor._value,
          }
        )
        .then((res) => {
          console.log(res.data);
          if (res.data === "Asesor eliminado correctamente") {
            router.push({ name: "admin-listaAsesores" });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }

    function showSection(section) {
      isEditingInfo.value = false;
      actualSection.value = section;

      if (section === 2) {
        searchMentoredStudents();
      }
    }

    function toBack() {
      console.clear();
      router.go(-1);
    }

    function toEditInfo() {
      isEditingInfo.value = !isEditingInfo.value;
      const name = advisor.value.datosPersonales.nombres;
      const user = advisor.value.datosPersonales.privado;
      inputFullname.value = `${name.nombre} ${name.apPaterno} ${name.apMaterno}`;
      inputCareer.value = advisor.value.datosAcademicos.carrera;
      inputEmail.value = user.email;
      inputUsername.value = user.username;
      inputPassword.value = "**********";
      inputPhonenumber.value = user.telefono;
      advisorState.value = user.estado;
    }

    function saveEditInfo() {
      const fullName = inputFullname.value;
      const fullNameDivided = fullName.split(" ");

      let firstName;
      let lastName1;
      let lastName2;

      if (fullNameDivided.length > 3) {
        firstName = `${fullNameDivided[0]} ${fullNameDivided[1]}`;
        lastName1 = fullNameDivided[2];
        lastName2 = fullNameDivided[3];
      } else {
        firstName = fullNameDivided[0];
        lastName1 = fullNameDivided[1];
        lastName2 = fullNameDivided[2];
      }

      const updatedAdvisor = {
        idAsesor: idAdvisor._value,
        datosPersonales: {
          nombres: {
            nombre: firstName,
            apPaterno: lastName1,
            apMaterno: lastName2,
          },
          privado: {
            email: inputEmail.value,
            telefono: inputPhonenumber.value,
            username: inputUsername.value,
            password: inputPassword.value,
          },
        },
        datosAcademicos: {
          carrera: inputCareer.value,
        },
      };
      advisorsLoaded.value = true;
      api
        .patch(
          `./admin/asesor/perfil/modificar`,
          {
            asesor: updatedAdvisor,
          }
        )
        .then((res) => {
          if (res.data.msg) {
            console.log(res.data.msg);
          } else {
            isEditingInfo.value = false;
            actualSection.value = 1;
            loadAdvisor(res.data);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }

    function searchMentoredStudents() {
      emptyStudents.value = false;
      studentsLoaded.value = true;
      console.log("Buscando alumnos asesorados");
      api
        .post(
          `./admin/asesor/perfil/alumnos`,
          {
            idAsesor: idAdvisor._value,
          }
        )
        .then((res) => {
          console.log(res.data);
          studentsLoaded.value = false;
          if (res.data.length > 0) {
            studentsToShow(res.data);
          } else {
            emptyStudents.value = true
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }

    function studentsToShow(allStudents) {
      try {
        if (typeof allStudents !== "object" || allStudents === null) {
          return;
        }
        const qRecords = quantityRecords.value;
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
        qTotalStudents.value = Object.keys(allStudents).length;
      } catch (error) {
        console.error(error);
      }
    }

    function setPage(page) {
      actualPage.value = page;
      searchMentoredStudents();
    }

    onMounted(() => {
      loadAdvisor();
    });

    return {
      dataApiStore,
      filterStore,
      router,
      idAdvisor,
      advisor,
      students,
      studentsLoaded,
      emptyStudents,
      loadAdvisor,
      deleteDialog,
      deleteAdvisor,
      advisorsLoaded,
      toBack,
      showSection,
      actualSection,
      existsStudentsAdvised,
      toEditInfo,
      isEditingInfo,
      saveEditInfo,
      advisorState,
      inputFullname,
      inputUsername,
      inputEmail,
      inputPassword,
      inputPhonenumber,
      inputCareer,
      searchMentoredStudents,
      quantityRecords,
      actualPage,
      pages,
      qStudentsShowing,
      qTotalStudents,
      setPage,
      toogleAdvisorState
    };
  },
});
</script>

<style scoped>
.input-group {
  display: flex;
  align-items: stretch;
  width: 100%;
  height: 40px;
}

.form-control {
  border: 1px solid #ced4da;
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  line-height: 2.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  flex: 1;
}

.btn-primary {
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-menu {
  display: none;
  position: absolute;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.15);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  min-width: 160px;
  z-index: 1;
  padding: 0;
  margin: 0;
  list-style: none;
}

.dropdown-menu a {
  display: block;
  padding: 10px 16px;
  color: #333;
  text-decoration: none;
  transition: background-color 0.3s ease;
  font-size: 14px;
}

.dropdown-menu a:hover {
  background-color: #f5f5f5;
}

.dropdown:hover .dropdown-menu {
  display: block;
}

.form-row {
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  margin-right: 50px;
  margin-bottom: 50px;
  margin-top: 30px;
}

.form-group {
  flex: 1;
  padding: 0 10px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  font-size: 20px;
}

input {
  width: 100%;
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #000;
  background-color: #ddd; /* Fondo gris por defecto */
  font-size: 20px; /* Tamaño de fuente más grande */
}

input:focus {
  background-color: #fff; /* Fondo blanco al recibir clic */
}

.custom-select .q-field__native {
  font-size: 20px; /* Tamaño de fuente más grande */
}

.custom-select .q-field__native:focus {
  outline: none; /* Quita el contorno por defecto al enfocar */
}

.custom-select .q-field__native::selection {
  background-color: transparent; /* Evita el recuadro adicional al seleccionar texto */
}

@media (max-width: 768px) {
  .container-fluid {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
  }

  .container-fluid div:first-child {
    position: static;
    margin-right: 10px;
  }

  .container-fluid div:first-child q-btn {
    margin-left: 10px;
  }

  .container-fluid div:last-child {
    display: none;
  }

  .container-fluid div:nth-child(2) {
    height: auto;
    padding: 5px;
  }

  .container-fluid div:nth-child(2) q-btn {
    font-size: 10px;
    padding: 4px 8px;
    border-radius: 15px;
  }

  .container-fluid div:nth-child(2) q-btn:last-child {
    margin-right: 0;
  }

  .container-fluid div:nth-child(2) div {
    display: none;
  }

  .container-fluid div:nth-child(2) div:last-child {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .container-fluid div:nth-child(2) div:last-child q-btn {
    margin-left: 10px;
  }

  .container-fluid div:nth-child(2) div:last-child q-btn:last-child {
    margin-left: 0;
  }

  .container-fluid div:nth-child(2) div:last-child q-btn i {
    display: none;
  }

  .container-fluid div:nth-child(2) div:last-child q-btn span {
    display: none;
  }

  .container-fluid div:nth-child(2) div:last-child q-btn:before {
    content: "<";
  }

  .container-fluid div:nth-child(2) div:last-child q-btn:after {
    content: "Regresar";
  }

  .container-fluid div:nth-child(2) div:last-child q-btn.q-btn--flat {
    background-color: transparent;
    box-shadow: none;
    border: none;
    margin-left: 0;
  }

  .container-fluid div:nth-child(2) div:last-child q-btn.q-btn--flat:hover {
    background-color: transparent;
  }

  .container-fluid
    div:nth-child(2)
    div:last-child
    q-btn.q-btn--flat:hover:before {
    background-color: transparent;
  }

  .container-fluid
    div:nth-child(2)
    div:last-child
    q-btn.q-btn--flat:hover:after {
    background-color: transparent;
  }

  .container-fluid div:nth-child(2) div:last-child q-btn.q-btn--flat:active {
    background-color: transparent;
  }

  .container-fluid
    div:nth-child(2)
    div:last-child
    q-btn.q-btn--flat:active:before {
    background-color: transparent;
  }

  .container-fluid
    div:nth-child(2)
    div:last-child
    q-btn.q-btn--flat:active:after {
    background-color: transparent;
  }

  .container-fluid div:nth-child(2) div:last-child q-btn.q-btn--flat:focus {
    background-color: transparent;
  }

  .container-fluid
    div:nth-child(2)
    div:last-child
    q-btn.q-btn--flat:focus:before {
    background-color: transparent;
  }

  .container-fluid
    div:nth-child(2)
    div:last-child
    q-btn.q-btn--flat:focus:after {
    background-color: transparent;
  }

  .container-fluid div:nth-child(2) div:last-child q-btn.q-btn--flat:visited {
    background-color: transparent;
  }

  .container-fluid
    div:nth-child(2)
    div:last-child
    q-btn.q-btn--flat:visited:before {
    background-color: transparent;
  }

  .container-fluid
    div:nth-child(2)
    div:last-child
    q-btn.q-btn--flat:visited:after {
    background-color: transparent;
  }

  .container-fluid div:nth-child(2) div:last-child q-btn.q-btn--flat:disabled {
    background-color: transparent;
  }

  .container-fluid
    div:nth-child(2)
    div:last-child
    q-btn.q-btn--flat:disabled:before {
    background-color: transparent;
  }

  .container-fluid
    div:nth-child(2)
    div:last-child
    q-btn.q-btn--flat:disabled:after {
    background-color: transparent;
  }

  .container-fluid div:nth-child(2) div:last-child q-btn:before {
    content: "<";
  }

  .container-fluid div:nth-child(2) div:last-child q-btn:after {
    content: "Regresar";
  }

  .container-fluid div:nth-child(2) div:last-child q-btn.q-btn--flat:before {
    background-color: transparent;
  }

  .container-fluid div:nth-child(2) div:last-child q-btn.q-btn--flat:after {
    background-color: transparent;
  }

  .container-fluid div:nth-child(2) div:last-child q-btn i {
    display: none;
  }

  .container-fluid div:nth-child(2) div:last-child q-btn span {
    display: none;
  }

  .container-fluid div:nth-child(2) div:last-child q-btn:before {
    content: "<";
  }

  .container-fluid div:nth-child(2) div:last-child q-btn:after {
    content: "Regresar";
  }

  .container-fluid div:nth-child(2) div:last-child q-btn.q-btn--flat {
    background-color: transparent;
    box-shadow: none;
    border: none;
    margin-left: 0;
  }

  .container-fluid div:nth-child(2) div:last-child q-btn.q-btn--flat:hover {
    background-color: transparent;
  }

  .container-fluid
    div:nth-child(2)
    div:last-child
    q-btn.q-btn--flat:hover:before {
    background-color: transparent;
  }

  .container-fluid
    div:nth-child(2)
    div:last-child
    q-btn.q-btn--flat:hover:after {
    background-color: transparent;
  }

  .container-fluid div:nth-child(2) div:last-child q-btn.q-btn--flat:active {
    background-color: transparent;
  }

  .container-fluid
    div:nth-child(2)
    div:last-child
    q-btn.q-btn--flat:active:before {
    background-color: transparent;
  }

  .container-fluid
    div:nth-child(2)
    div:last-child
    q-btn.q-btn--flat:active:after {
    background-color: transparent;
  }

  .container-fluid div:nth-child(2) div:last-child q-btn.q-btn--flat:focus {
    background-color: transparent;
  }

  .container-fluid
    div:nth-child(2)
    div:last-child
    q-btn.q-btn--flat:focus:before {
    background-color: transparent;
  }

  .container-fluid
    div:nth-child(2)
    div:last-child
    q-btn.q-btn--flat:focus:after {
    background-color: transparent;
  }

  .container-fluid div:nth-child(2) div:last-child q-btn.q-btn--flat:visited {
    background-color: transparent;
  }

  .container-fluid
    div:nth-child(2)
    div:last-child
    q-btn.q-btn--flat:visited:before {
    background-color: transparent;
  }

  .container-fluid
    div:nth-child(2)
    div:last-child
    q-btn.q-btn--flat:visited:after {
    background-color: transparent;
  }

  .container-fluid div:nth-child(2) div:last-child q-btn.q-btn--flat:disabled {
    background-color: transparent;
  }

  .container-fluid
    div:nth-child(2)
    div:last-child
    q-btn.q-btn--flat:disabled:before {
    background-color: transparent;
  }

  .container-fluid
    div:nth-child(2)
    div:last-child
    q-btn.q-btn--flat:disabled:after {
    background-color: transparent;
  }

  .container-fluid div:nth-child(2) div:last-child q-btn:before {
    content: "<";
  }

  .container-fluid div:nth-child(2) div:last-child q-btn:after {
    content: "Regresar";
  }

  .container-fluid div:nth-child(2) div:last-child q-btn.q-btn--flat:before {
    background-color: transparent;
  }

  .container-fluid div:nth-child(2) div:last-child q-btn.q-btn--flat:after {
    background-color: transparent;
  }
}
</style>
