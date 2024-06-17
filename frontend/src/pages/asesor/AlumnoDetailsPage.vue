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
    v-if="studentsLoaded"
  >
    <div class="row">
      <div class="col-12" style="display: flex; justify-content: center">
        <q-card class="q-ma-lg">
          <q-card-section class="q-ml-xl q-mr-xl q-mt-sm q-mb-xl text-center">
            <h1 style="font-size: 24px; font-weight: 400">Cargando alumno</h1>
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
      style="background-color: white; border-radius: 15px; height: 60vh"
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
            {{ student.nombre }}
          </p>
          <p style="font-size: 16px; font-weight: 500">
            {{ student.apPaterno }} {{ student.apMaterno }}
          </p>
          <p style="font-size: 14px">
            {{ student.carrera }} {{ student.area }}
          </p>
          <p style="color: #777676; font-size: 14px">{{ student.matricula }}</p>
        </div>
        <div>
          <q-card-actions style="flex-direction: column; align-items: start">
            <q-btn
              flat
              color="black"
              label="Información general"
              :style="{
                margin: '3px',
                textTransform: 'capitalize',
                fontSize: '16px',
                fontWeight: 'normal',
                width: '100%',
                alignItems: 'start',
                background: actualSection === 1 ? '#e8e8e8' : '',
              }"
              @click="showSection(1)"
            ></q-btn>
            <q-btn
              flat
              color="black"
              label="Anteproyecto"
              :style="{
                margin: '3px',
                textTransform: 'capitalize',
                fontSize: '16px',
                fontWeight: 'normal',
                width: '100%',
                alignItems: 'start',
                background: actualSection === 4 ? '#e8e8e8' : '',
              }"
              @click="showSection(4)"
            ></q-btn>
            <q-btn
              flat
              color="black"
              label="Avance"
              :style="{
                margin: '3px',
                textTransform: 'capitalize',
                fontSize: '16px',
                fontWeight: 'normal',
                width: '100%',
                alignItems: 'start',
                background: actualSection === 5 ? '#e8e8e8' : '',
              }"
              @click="showSection(5)"
            ></q-btn>
          </q-card-actions>
        </div>
      </div>
      <div class="col-8 q-pl-xl">
        <div class="row" v-if="actualSection === 1">
          <div class="col-12" style="padding-bottom: 20px">
            <h5 style="font-weight: 500">Información General</h5>
          </div>
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
              {{ student.nombre }} {{ student.apPaterno }}
              {{ student.apMaterno }}
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
              {{ student.carrera }}
            </p>
          </div>
          <div class="col-4">
            <p style="margin: 5px; font-size: 16px">Area</p>
            <p
              style="
                background-color: #d9d9d9;
                padding: 8px;
                width: 90%;
                font-size: 14px;
                border-radius: 5px;
              "
            >
              {{ student.area }}
            </p>
          </div>
          <div class="col-12"></div>
          <div class="col-3">
            <p style="margin: 5px; font-size: 16px">Matricula</p>
            <p
              style="
                background-color: #d9d9d9;
                padding: 8px;
                width: 90%;
                font-size: 14px;
                border-radius: 5px;
              "
            >
              {{ student.matricula }}
            </p>
          </div>
          <div class="col-2">
            <p style="margin: 5px; font-size: 16px">Grado</p>
            <p
              style="
                background-color: #d9d9d9;
                padding: 8px;
                width: 90%;
                font-size: 14px;
                border-radius: 5px;
              "
            >
              {{ student.grado }}
            </p>
          </div>
          <div class="col-2">
            <p style="margin: 5px; font-size: 16px">Grupo</p>
            <p
              style="
                background-color: #d9d9d9;
                padding: 8px;
                width: 90%;
                font-size: 14px;
                border-radius: 5px;
              "
            >
              {{ student.grupo }}
            </p>
          </div>
          <div class="col-5">
            <p style="margin: 5px; font-size: 16px">Nivel academico</p>
            <p
              style="
                background-color: #d9d9d9;
                padding: 8px;
                width: 90%;
                font-size: 14px;
                border-radius: 5px;
              "
            >
              {{ student.nivelAcademico }}
            </p>
          </div>
        </div>
        <div class="row" v-if="actualSection === 4">
          <div class="col-8">
            <h5 style="font-weight: 500">Anteproyecto</h5>
          </div>
          <div
            class="col-4"
            style="display: flex; align-items: center; justify-content: right"
          >
            <div
              :style="{
                display: 'flex',
                alignItems: 'center',
                margin: '0',
                padding: '7px 30%',
                borderRadius: '8px',
                backgroundColor: projectState.color,
              }"
            >
              <p style="color: white; font-weight: bold; margin: 0">
                {{ projectState.label }}
              </p>
              <q-btn
                v-if="projectState.label === 'Rechazada'"
                flat
                color="white"
                icon="more_horiz"
                size="12px"
                @click="dialogProjectState = true"
              ></q-btn>
            </div>
          </div>
          <div class="col-12 flex justify-end" style="padding-bottom: 10px">
            <q-card-actions>
              <q-btn-group flat v-if="!isEditingProject && existAnteproyecto">
                <q-btn
                  color="secondary"
                  icon="settings"
                  label="Cambiar estado"
                  style="
                    margin: 3px;
                    padding-right: 15px;
                    text-transform: capitalize;
                    font-size: 12px;
                    font-weight: normal;
                  "
                  @click="dialogChangeProjectState = true"
                ></q-btn>
                <q-dialog v-model="dialogChangeProjectState">
                  <q-card
                    class="q-pt-md q-pl-md q-pr-md"
                    style="width: 500px; max-width: 60vw; height: 40vh"
                  >
                    <div class="row q-ma-md">
                      <div
                        class="col-12"
                        style="display: flex; justify-content: end"
                      >
                        <q-card-actions>
                          <q-btn
                            align="right"
                            flat
                            color="red"
                            icon="close"
                            v-close-popup
                            style="
                              margin: 3px;
                              padding-left: 25px;
                              padding-right: 25px;
                              text-transform: capitalize;
                              font-size: 16px;
                            "
                          />
                        </q-card-actions>
                      </div>
                      <div class="col-12 q-pa-md">
                        <div
                          class="text-h6 text-center"
                          style="font-size: 22px; font-weight: 500"
                        >
                          Estado de anteproyecto
                        </div>
                      </div>
                      <div class="col-12 q-pt-xl">
                        <q-card-actions
                          class="bg-white text-teal"
                          align="center"
                        >
                          <q-btn-group flat="">
                            <q-btn
                              color="primary"
                              label="Aceptar"
                              icon="done"
                              style="
                                margin: 3px;
                                padding-left: 20px;
                                padding-right: 20px;
                                text-transform: capitalize;
                                font-size: 14px;
                              "
                              @click="setProjectState('Aceptada')"
                            />
                            <q-btn
                              color="red"
                              label="Rechazar"
                              icon="close"
                              style="
                                margin: 3px;
                                padding-left: 20px;
                                padding-right: 20px;
                                text-transform: capitalize;
                                font-size: 14px;
                              "
                              @click="dialogDenyProject = true"
                            />
                          </q-btn-group>
                        </q-card-actions>
                      </div>
                    </div>
                  </q-card>
                </q-dialog>
                <q-dialog v-model="dialogDenyProject">
                  <q-card
                    class="q-pt-md q-pl-md q-pr-md"
                    style="width: 500px; max-width: 60vw; height: 40vh"
                  >
                    <div class="row q-ma-md">
                      <div
                        class="col-12"
                        style="display: flex; justify-content: end"
                      >
                        <q-card-actions>
                          <q-btn
                            align="right"
                            flat
                            color="red"
                            icon="close"
                            v-close-popup
                            style="
                              margin: 3px;
                              padding-left: 25px;
                              padding-right: 25px;
                              text-transform: capitalize;
                              font-size: 16px;
                            "
                          />
                        </q-card-actions>
                      </div>
                      <div class="col-12 q-pa-md">
                        <div
                          class="text-h6 text-center"
                          style="font-size: 22px; font-weight: 500"
                        >
                          Rechazar anteproyecto
                        </div>
                      </div>
                      <div class="col-12 q-pa-sm">
                        <q-input
                          v-model="projectState.motive"
                          filled
                          autogrow
                          style="font-size: 14px"
                        />
                        <q-card-actions
                          class="bg-white text-teal"
                          align="center"
                        >
                          <q-btn-group flat="">
                            <q-btn
                              color="red"
                              label="Rechazar"
                              icon="close"
                              style="
                                margin: 3px;
                                padding-left: 20px;
                                padding-right: 20px;
                                text-transform: capitalize;
                                font-size: 14px;
                              "
                              @click="setProjectState('Rechazada', projectState.motive)"
                            />
                            <q-btn
                              flat
                              color="white"
                              text-color="black"
                              label="Cancelar"
                              style="
                                margin: 3px;
                                padding-left: 40px;
                                padding-right: 40px;
                                text-transform: capitalize;
                                font-size: 14px;
                              "
                              v-close-popup
                            />
                          </q-btn-group>
                        </q-card-actions>
                      </div>
                    </div>
                  </q-card>
                </q-dialog>
                <q-dialog v-model="dialogProjectState">
                  <q-card
                    class="q-pt-md q-pl-md q-pr-md"
                    style="width: 500px; max-width: 60vw; height: 45vh"
                  >
                    <div class="row q-ma-md">
                      <div
                        class="col-12"
                        style="display: flex; justify-content: end"
                      >
                        <q-card-actions>
                          <q-btn
                            align="right"
                            flat
                            color="red"
                            icon="close"
                            v-close-popup
                            style="
                              margin: 3px;
                              padding-left: 25px;
                              padding-right: 25px;
                              text-transform: capitalize;
                              font-size: 16px;
                            "
                          />
                        </q-card-actions>
                      </div>
                      <div class="col-12 q-pa-md">
                        <div
                          class="text-h6 text-center"
                          style="font-size: 22px; font-weight: 500"
                        >
                          Estado de anteproyecto
                        </div>
                      </div>
                      <div class="col-12 q-pa-md q-mt-md">
                        <p style="font-size: 14px">
                          <span style="font-weight: 500">Estado: </span
                          >{{ projectState.label }}
                        </p>
                        <p style="font-size: 14px">
                          <span style="font-weight: 500"
                            >Fecha de revisión: </span
                          >{{ projectState.date }}
                        </p>
                        <p style="font-size: 14px">
                          <span style="font-weight: 500">Motivo: </span
                          >{{ projectState.motive }}
                        </p>
                      </div>
                    </div>
                  </q-card>
                </q-dialog>
                <q-btn
                  color="red"
                  icon="delete"
                  label="Borrar"
                  style="
                    margin: 3px;
                    padding-right: 15px;
                    text-transform: capitalize;
                    font-size: 12px;
                    font-weight: normal;
                  "
                ></q-btn>
              </q-btn-group>
              <q-btn-group flat v-else-if="isEditingProject">
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
                  @click="saveEditCPA"
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
                  @click="showSection(3)"
                ></q-btn>
              </q-btn-group>
            </q-card-actions>
          </div>
          <div class="col-12">
            <div
              class="row"
              v-if="existAnteproyecto"
              style="overflow-y: scroll; height: 35vh"
            >
              <div class="col-12">
                <p class="project-title">Datos del asesor academico</p>
              </div>
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
                  {{ project.datosAsesorAcademico.nombre }}
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
                  {{ project.datosAsesorAcademico.email }}
                </p>
              </div>
              <div class="col-4">
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
                  {{ project.datosAsesorAcademico.telefono }}
                </p>
              </div>
              <div class="col-12">
                <p class="project-title">Datos del asesor empresarial</p>
              </div>
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
                  {{ project.datosAsesorEmpresarial.nombre }}
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
                  {{ project.datosAsesorEmpresarial.email }}
                </p>
              </div>
              <div class="col-4">
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
                  {{ project.datosAsesorEmpresarial.telefono }}
                </p>
              </div>
              <div class="col-12">
                <p class="project-title">Datos del proyecto</p>
              </div>
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
                  {{ project.datosProyecto.nombre }}
                </p>
              </div>
              <div class="col-8">
                <p style="margin: 5px; font-size: 16px">Objetivo</p>
                <p
                  style="
                    background-color: #d9d9d9;
                    padding: 8px;
                    width: 90%;
                    font-size: 14px;
                    border-radius: 5px;
                  "
                >
                  {{ project.datosProyecto.objetivo }}
                </p>
              </div>
              <div class="col-12">
                <p style="margin: 5px; font-size: 16px">Descripción</p>
                <p
                  style="
                    background-color: #d9d9d9;
                    padding: 8px;
                    width: 90%;
                    font-size: 14px;
                    border-radius: 5px;
                  "
                >
                  {{ project.datosProyecto.descripcion }}
                </p>
              </div>
              <div class="col-12 q-pa-md"></div>
            </div>
            <div class="row" v-else>
              <p>No se encontro anteproyecto</p>
            </div>
          </div>
        </div>
        <div class="row" v-if="actualSection === 5">
          <div class="col-12">
            <h5 style="font-weight: 500">Avance</h5>
          </div>
          <div class="col-12">
            <div class="row" v-if="existsAvance">
              <div
                class="col-md-3 col-lg-2 q-pt-md"
                v-for="(progressPhase, i) in progress"
                :key="i + 1"
              >
                <q-card
                  v-ripple
                  class="card my-card cursor-pointer q-hoverable"
                  :style="{
                    background: progressPhase.color,
                    opacity: progressPhase.state === 'false' ? '0.7' : '1',
                  }"
                  @click="
                    toggleProgress(progressPhase.label, progressPhase.state)
                  "
                >
                  <p
                    class="text-white text-capitalize"
                    style="font-size: 17px; margin: 0; user-select: none"
                  >
                    {{ progressPhase.label }}
                  </p>
                </q-card>
                <p
                  v-if="progressPhase.state !== 'false'"
                  style="margin: 5px 0 0 15px; font-size: 12px; color: #777767"
                >
                  Revisado el {{ progressPhase.date }}
                </p>
              </div>
            </div>
            <div class="row" v-else>
              <p>No se encontro avance</p>
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
import { format } from "date-fns";

export default defineComponent({
  name: "asesor-alumnoId",
  setup() {
    const dataApiStore = useDataApiStore();
    const filterStore = useFilterStore();
    const router = useRouter();
    const idStudent = ref(router.currentRoute._value.params.id);
    const student = ref();
    const studentsLoaded = ref(true);
    const actualSection = ref(1);

    const existAnteproyecto = ref(false);
    const existsAvance = ref(false);

    // Dialogs
    const dialogProjectState = ref(false);
    const dialogChangeProjectState = ref(false);
    const dialogDenyProject = ref(false);

    // Anteproyecto
    const isEditingProject = ref(false);
    const projectState = ref({
      label: "",
      motive: "",
      date: "",
      color: "",
    });
    const project = ref(null);

    // Avance
    const progress = ref([]);

    function loadStudent() {
      try {
        studentsLoaded.value = true;
        api
          .post(
            `./asesor/alumno/perfil`,
            {
              idAlumno: idStudent._value,
            }
          )
          .then((res) => {
            if (res.data.msg) {
              console.log(res.data.msg);
            } else {
              if (res.data.anteproyecto) {
                existAnteproyecto.value = true;
                const projectData = res.data.anteproyecto;
                project.value = projectData;
                console.log(projectData);
                projectState.value.label = projectData.estado.nombre;
                projectState.value.motive = projectData.estado.motivo;
                projectState.value.date = formatDate(projectData.estado.fecha);
                projectState.value.color = definePhaseColor(
                  projectData.estado.nombre
                );
              } else {
                existAnteproyecto.value = false;
              }
              if (res.data.avance) {
                existsAvance.value = true;
                const progressData = res.data.avance;
                const progressArray = [];
                Object.keys(progressData).map((key) => {
                  progressArray.push({
                    label: key,
                    color: defineProgressBackground(key),
                    state: progressData[key].estado,
                    date: formatDate(progressData[key].fecha),
                  });
                });
                progress.value = progressArray;
                console.log(progress.value);
              } else {
                existsAvance.value = false;
              }
              student.value = res.data;
              setTimeout(() => {
                studentsLoaded.value = false;
              }, 2000);
            }
          })
          .catch((err) => console.error(err));
      } catch (error) {
        setTimeout(() => {
          loadStudent();
          console.log(error);
        }, 2000);
      }
    }

    function showSection(section) {
      actualSection.value = section;
    }

    function toBack() {
      console.clear();
      router.go(-1);
    }

    function defineProgressBackground(phase) {
      if (phase === "anteproyecto") {
        return "#ff0000";
      }
      if (phase === "25%") {
        return "#ff2f2f";
      }
      if (phase === "50%") {
        return "#FF8C00";
      }
      if (phase === "75%") {
        return "#FFA500";
      }
      if (phase === "100%") {
        return "#ffc107";
      }
      if (phase === "revision") {
        return "#8BC34A";
      }
    }

    function definePhaseColor(state) {
      if (state === "Sin comenzar") {
        return "#FFC107";
      }
      if (state === "En revision" || state === "En revisión") {
        return "#FF8D4D";
      }
      if (state === "Aceptada") {
        return "#0ECC43";
      }
      if (state === "Rechazada") {
        return "#F44336";
      }
      return "black";
    }

    function formatDate(dateString) {
      const dateObj = new Date(dateString);
      return format(dateObj, "dd-MM-yyyy HH:mm:ss");
    }

    function setProjectState(state, motive = "") {
      let progressBool = false;
      if (state === "Aceptada"){
        progressBool = true;
      } else {
        progressBool = false;
      }
      const project = {
        nombre: state,
        motivo: motive,
        fecha: new Date()
      }
      console.log(project);
      // ./asesor/alumno/perfil/anteproyecto/toggle
      api
        .post(
          `./asesor/alumno/perfil/anteproyecto/toggle`,
          {
            idAlumno: idStudent._value,
            estado: project,
            avance: progressBool,
          }
        )
        .then((res) => {
          console.log(res.data);
          const data = res.data;
          projectState.value.label = data.nombre;
          projectState.value.motive = data.motivo;
          projectState.value.date = formatDate(data.fecha);
          projectState.value.color = definePhaseColor(data.nombre);
        })
        .catch((err) => {
          console.error(err);
        });
      dialogChangeProjectState.value = false;
      dialogProjectState.value = false;
      dialogDenyProject.value = false;
    }

    function toggleProgress(phase, state) {
      console.log({
        phase,
        state,
      });
      const stateBool = !JSON.parse(state);
      const finalState = stateBool.toString();
      api
        .post(
          `./asesor/alumno/perfil/avance/etapa-toggle`,
          {
            idAlumno: idStudent._value,
            etapa: phase,
            estado: finalState,
          }
        )
        .then((res) => {
          console.log(res.data);
          const data = res.data;
          const index = progress.value.findIndex(
            (element) => element.label === phase
          );
          progress.value[index].state = data.estado;
          progress.value[index].date = data.fecha;
        })
        .catch((err) => {
          console.error(err);
        });
    }

    onMounted(() => {
      loadStudent();
    });

    return {
      dataApiStore,
      filterStore,
      router,
      idStudent,
      student,
      loadStudent,
      studentsLoaded,
      toBack,
      showSection,
      actualSection,
      existAnteproyecto,
      existsAvance,
      progress,
      defineProgressBackground,
      toggleProgress,
      projectState,
      dialogProjectState,
      dialogChangeProjectState,
      dialogDenyProject,
      isEditingProject,
      project,
      definePhaseColor,
      setProjectState,
    };
  },
});
</script>

<style scoped>
.project-title {
  margin: 10px 5px;
  padding-bottom: 3px;
  font-size: 16px;
  font-weight: 500;
  border-bottom: 1px solid #e0e0e0;
}
.card {
  width: 120px;
  height: 120px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  font-weight: bold;
  margin: 0 10px; /* Ajusta el espacio entre los recuadros */
  user-select: none;
}
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
