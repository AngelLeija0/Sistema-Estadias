<template>
  <UserNavbar></UserNavbar>
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
    style="background-color: #f5f5f5; min-height: 370px"
    v-else
  >
    <div
      class="row q-ml-xl q-mr-xl"
      style="background-color: white; border-radius: 15px; height: 455px"
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
              label="Informacion general"
              :style="{
                margin: '3px',
                textTransform: 'capitalize',
                fontSize: '16px',
                fontWeight: 'normal',
                width: '100%',
                alignItems: 'start',
                background: actualSection === 1 ? '#e8e8e8' : '',
              }
              "
              @click="showSection(1)"
            ></q-btn>
            <q-btn
              flat
              color="black"
              label="Documentación"
              :style="{
                margin: '3px',
                textTransform: 'capitalize',
                fontSize: '16px',
                fontWeight: 'normal',
                width: '100%',
                alignItems: 'start',
                background: actualSection === 2 ? '#e8e8e8' : '',
              }
              "
              @click="showSection(2)"
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
        <div class="row" v-if="actualSection === 2">
          <q-dialog v-model="downloadingDocument">
            <q-card class="q-pa-lg" style="width: 300px">
              <q-card-section>
                <div class="text-h6 text-center">Descargando documento</div>
              </q-card-section>
              <q-card-section class="q-pt-none text-center">
                <q-spinner color="primary" size="50px" />
              </q-card-section>
            </q-card>
          </q-dialog>
          <q-dialog v-model="downloadingError">
            <q-card class="q-pa-lg" style="width: 300px">
              <q-card-section>
                <div class="text-h6 text-center">
                  No se encontro este documento
                </div>
              </q-card-section>
              <q-card-section class="q-pt-none text-center">
                <q-icon name="cancel" color="red" size="50px" />
              </q-card-section>
            </q-card>
          </q-dialog>
          <div class="col-12">
            <h5 style="font-weight: 500">Documentación</h5>
          </div>
          <div class="col-12 q-pt-md">
            <div class="row" v-if="existsDocumentos">
              <div class="col-md-12">
                <div class="row justify-between" v-if="actualPhase == 0">
                  <div
                    class="col-md-2"
                    v-for="(phase, i) in phases"
                    :key="i + 1"
                  >
                    <q-card
                      v-ripple
                      dark
                      bordered
                      class="bg-grey-4 my-card cursor-pointer q-hoverable"
                      style="height: 205px"
                      @click="toShowPhase(phase)"
                    >
                      <q-card-section>
                        <div class="text-subtitle2 text-black">
                          Etapa {{ phase }}
                        </div>
                      </q-card-section>
                      <q-separator color="grey-5" inset />
                      <q-card-section>
                        <div v-for="(document, i) in documents" :key="i + 1">
                          <p class="text-black" v-if="document.phase === phase">
                            ∙ {{ document.label }}
                          </p>
                        </div>
                      </q-card-section>
                    </q-card>
                  </div>
                </div>
                <div class="col-md-12" v-else>
                  <div class="row">
                    <div class="col-md-6">
                      <p style="font-weight: 500; font-size: 18px">
                        Etapa {{ actualPhase }}
                      </p>
                    </div>
                    <div class="col-md-6 flex justify-end">
                      <q-card-actions>
                        <q-btn-group flat>
                          <q-btn
                            color="black"
                            label="Regresar"
                            icon="arrow_left"
                            style="
                              margin: 3px;
                              padding-right: 15px;
                              text-transform: capitalize;
                              font-size: 12px;
                            "
                            @click="toBackPhase"
                          ></q-btn>
                        </q-btn-group>
                      </q-card-actions>
                    </div>
                    <div class="col-md-12 q-pt-xl"></div>
                    <div
                      class="col-4"
                      style="padding-bottom: 30px"
                      v-for="(document, i) in documentsToShow"
                      :key="i + 1"
                    >
                      <div
                        style="
                          background-color: #d9d9d9;
                          padding: 0 8px;
                          width: 90%;
                          border-radius: 5px;
                          display: inline-flex;
                          align-items: center;
                          justify-content: space-between;
                        "
                      >
                        <p style="font-size: 14px; margin: 0">
                          {{ document.label }}
                        </p>
                        <q-card-actions style="justify-content: end">
                          <q-btn-group flat>
                            <q-btn
                              flat
                              color="black"
                              icon="visibility"
                              style="
                                padding-right: 10px;
                                text-transform: capitalize;
                                font-size: 12px;
                                font-weight: normal;
                              "
                              @click="
                                toDownloadDocument(document.name, document.path)
                              "
                            ></q-btn>
                          </q-btn-group>
                        </q-card-actions>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row" v-else>
              <p>No se encontraron documentos</p>
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
import UserNavbar from "src/components/UserNavbar.vue";

export default defineComponent({
  name: "vinculacion-alumnoId",
  components: {
    UserNavbar,
  },
  setup() {
    const dataApiStore = useDataApiStore();
    const filterStore = useFilterStore();
    const router = useRouter();
    const idStudent = ref(router.currentRoute._value.params.id);
    const student = ref();
    const studentsLoaded = ref(true);
    const actualSection = ref(1);

    const actualPhase = ref(0);

    // Dialogs
    const dialogCpaState = ref(false);
    const dialogChangeCPAState = ref(false);
    const dialogDenyCpa = ref(false);
    const dialogChecking = ref(false);

    const dialogPhaseState = ref(false);
    const dialogChangePhaseState = ref(false);
    const dialogDenyPhase = ref(false);

    const existsCPA = ref(false);
    const existsDocumentos = ref(false);
    const existAnteproyecto = ref(false);
    const existsAvance = ref(false);

    const isEditingCPA = ref(false);
    const isEditingProject = ref(false);

    // CPA
    const cpaState = ref({
      label: "",
      motive: "",
      date: "",
      color: "",
    });
    // Campos del input de CPA
    const phoneNumber1 = ref(null);
    const phoneNumber2 = ref(null);
    const businessName = ref(null);
    const companyName = ref(null);
    const businessPosition = ref(null);
    const fullname = ref(null);
    const career = ref(null);
    const area = ref(null);
    const matricula = ref(null);
    const email = ref(null);
    const nss = ref(null);
    const curp = ref(null);
    const grade = ref(null);
    const group = ref(null);
    const academicLevel = ref(null);
    const turn = ref(null);
    const year = ref(null);
    const period = ref(null);
    const registerDateCPA = ref(null);

    // Documentos
    const allPhasesState = ref(null);
    const phases = ref([1, 2, 3, 4, 5]);
    const phaseState = ref({
      label: "",
      motive: "",
      date: "",
      color: "",
    });
    const documentsToShow = ref(null);
    const documents = ref([
      {
        label: "Curriculum Vitae",
        name: "curriculum",
        path: "",
        phase: 1,
        dialog: false,
      },
      {
        label: "Seguro facultativo",
        name: "nss",
        path: "",
        phase: 1,
        dialog: false,
      },
      {
        label: "Carta presentación",
        name: "cpa",
        path: "",
        phase: 1,
        dialog: false,
      },
      {
        label: "Carta de aceptación",
        name: "caa",
        path: "",
        phase: 2,
        dialog: false,
      },
      {
        label: "Reporte de proyecto",
        name: "reporte",
        path: "",
        phase: 3,
        dialog: false,
      },
      {
        label: "Rubrica de evaluación",
        name: "rubrica",
        path: "",
        phase: 4,
        dialog: false,
      },
      {
        label: "Dictamen",
        name: "dictamen",
        path: "",
        phase: 4,
        dialog: false,
      },
      {
        label: "Protesta de ley",
        name: "protesta",
        path: "",
        phase: 4,
        dialog: false,
      },
      {
        label: "Carta terminación",
        name: "cta",
        path: "",
        phase: 5,
        dialog: false,
      },
    ]);

    const downloadingError = ref(false);
    const downloadingDocument = ref(false);

    // Anteproyecto
    const businessEmail = ref(null);
    const businessPhone = ref(null);
    const nameProject = ref(null);
    const objectiveProject = ref(null);
    const descriptionProject = ref(null);
    const nameStateProject = ref(null);
    const motiveStateProject = ref(null);
    const dateStateProject = ref(null);
    const registerDateProject = ref(null);

    // Avance
    const progress = ref(null);
    const stages = ref(null);

    function loadStudent() {
      try {
        studentsLoaded.value = true;
        api
          .post(
            `http://localhost:3000/admin/alumno/perfil`,
            {
              idAlumno: idStudent._value,
            }
          )
          .then((res) => {
            console.log(res.data);
            if (res.data.msg) {
              console.log(res.data.msg);
            } else {
              if (res.data.cartaPresentacion) {
                existsCPA.value = true;
                const cpa = res.data.cartaPresentacion;
                cpaState.value.label = cpa.estado.nombre;
                cpa.estado.motivo === "Ninguno"
                  ? (cpaState.value.motive = "")
                  : (cpaState.value.motive = cpa.estado.motivo);
                cpaState.value.date = formatDate(cpa.estado.fecha);
                cpaState.value.color = definePhaseColor(cpa.estado.nombre);
              }
              res.data.anteproyecto
                ? (existAnteproyecto.value = true)
                : (existAnteproyecto.value = false);
              res.data.avance
                ? (existsAvance.value = true)
                : (existsAvance.value = false);
              if (res.data.avance) {
                existsAvance.value = true;
                progress.value = res.data.avance.progreso;
                const resStages = {};
                res.data.avance.etapa1
                  ? (resStages.etapa1 = res.data.avance.etapa1)
                  : "";
                res.data.avance.etapa2
                  ? (resStages.etapa2 = res.data.avance.etapa2)
                  : "";
                res.data.avance.etapa3
                  ? (resStages.etapa3 = res.data.avance.etapa3)
                  : "";
                res.data.avance.etapa4
                  ? (resStages.etapa4 = res.data.avance.etapa4)
                  : "";
                res.data.avance.etapa5
                  ? (resStages.etapa5 = res.data.avance.etapa5)
                  : "";
                stages.value = resStages;
              } else {
                existsAvance.value = false;
              }
              if (res.data.documentos) {
                existsDocumentos.value = true;
                const documentos = res.data.documentos;
                allPhasesState.value = documentos.etapas;
                Object.keys(documentos).map((key, i) => {
                  const allDocuments = documents.value;
                  allDocuments.map((document) => {
                    if (key === document.name) {
                      document.path = documentos[key].archivo;
                    }
                  });
                });
              } else {
                existsDocumentos.value = false;
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
      isEditingCPA.value = false;
      actualSection.value = section;
      toBackPhase();
    }

    function toBackPhase() {
      actualPhase.value = 0;
      phaseState.value.label = "";
      phaseState.value.motive = "";
      phaseState.value.date = "";
      phaseState.value.color = "";
    }

    function toShowPhase(phase) {
      actualPhase.value = phase;
      const phaseData = allPhasesState.value[phase];
      console.log(phaseData);
      if (phaseData !== undefined) {
        phaseState.value.label = phaseData.estado;
        phaseState.value.motive = phaseData.motivo;
        phaseState.value.date = phaseData.fecha;
        phaseState.value.color = definePhaseColor(phaseData.estado);
      } else {
        phaseState.value.label = "Sin comenzar";
        phaseState.value.motive = "";
        phaseState.value.date = "";
        phaseState.value.color = "#FFC107";
      }
      const allDocuments = documents.value;
      const depuredDocuments = [];
      allDocuments.map((document) => {
        if (document.phase === phase) {
          depuredDocuments.push(document);
        }
      });
      documentsToShow.value = depuredDocuments;
    }

    function toBack() {
      console.clear();
      router.go(-1);
    }

    function saveEditCPA() {
      isEditingCPA.value = false;
      actualSection.value = 3;

      const fullName = fullname.value;
      const parts = fullName.split(" ");

      const name = parts.slice(0, 2).join(" ");
      const lastname1 = parts[2];
      const lastname2 = parts[3];

      const cpa = {
        estado: {
          nombre: cpaState.value.label,
          motivo: cpaState.value.motive,
          fecha: new Date(),
        },
        datosAlumno: {
          nombres: {
            nombre: name,
            apPaterno: lastname1,
            apMaterno: lastname2,
          },
          privado: {
            matricula: matricula.value,
            email: email.value,
          },
          telefonoCelular: phoneNumber1.value,
          telefonoCasa: phoneNumber2.value,
          nss: nss.value,
          curp: curp.value,
        },
        datosAcademicos: {
          datosAcademicosAlumno: {
            nivelAcademico: academicLevel.value,
            turno: turn.value,
            carrera: career.value,
            area: area.value,
            grado: grade.value,
            grupo: group.value,
          },
          periodo: period.value,
          año: year.value,
        },
        datosEmpresa: {
          nombreEmpresa: companyName.value,
          nombreEmpresario: businessName.value,
          puestoEmpresario: businessPosition.value,
        },
      };
      api
        .patch(
          `http://localhost:3000/admin/alumno/perfil/cpa/modificar`,
          {
            idAlumno: idStudent._value,
            cpa,
          }
        )
        .then((res) => {
          console.log(res.data);
          const updatedCpa = res.data.cartaPresentacion;
          student.value.cartaPresentacion = updatedCpa;
        })
        .catch((err) => {
          console.error(err);
        });
    }

    function toEditCPA() {
      isEditingCPA.value = true;
      fullname.value = `${student.value.nombre} ${student.value.apPaterno} ${student.value.apMaterno}`;
      email.value = student.value.cartaPresentacion.datosAlumno.privado.email;
      nss.value = student.value.cartaPresentacion.datosAlumno.nss;
      curp.value = student.value.cartaPresentacion.datosAlumno.curp;
      career.value = student.value.carrera;
      area.value = student.value.area;
      matricula.value = student.value.matricula;
      grade.value = student.value.grado;
      group.value = student.value.grupo;
      academicLevel.value = student.value.nivelAcademico;
      turn.value = student.value.turno;
      year.value = student.value.cartaPresentacion.datosAcademicos.año;
      period.value = student.value.cartaPresentacion.datosAcademicos.periodo;
      businessName.value =
        student.value.cartaPresentacion.datosEmpresa.nombreEmpresario;
      companyName.value =
        student.value.cartaPresentacion.datosEmpresa.nombreEmpresa;
      businessPosition.value =
        student.value.cartaPresentacion.datosEmpresa.puestoEmpresario;
      registerDateCPA.value = student.value.cartaPresentacion.fechaRegistro;
      console.log(student.value.cartaPresentacion);
      phoneNumber1.value =
        student.value.cartaPresentacion.datosAlumno.telefonoCelular;
      phoneNumber2.value =
        student.value.cartaPresentacion.datosAlumno.telefonoCasa;
    }

    function toSaveAnteproyecto() {
      isEditingProject.value = false;
      actualSection.value = 4;

      const anteproyecto = {
        datosEmpresa: {
          emailEmpresario:
            student.value.anteproyecto.datosEmpresa.emailEmpresario,
          telefonoEmpresario:
            student.value.anteproyecto.datosEmpresa.telefonoEmpresario,
        },
        datosProyecto: {
          nameProject: student.value.anteproyecto.datosProyecto.nombre,
          objectiveProject: student.value.anteproyecto.datosProyecto.objetivo,
          descriptionProject:
            student.value.anteproyecto.datosProyecto.descripcion,
        },
        estado: {
          nameStateProject: student.value.anteproyecto.estado.nombre,
          motiveStateProject: student.value.anteproyecto.estado.motivo,
          dateStateProject: student.value.anteproyecto.estado.fecha,
        },
      };

      api
        .patch(
          `http://localhost:3000/admin/alumno/perfil/anteproyecto/modificar`,
          {
            idAlumno: idStudent._value,
            anteproyecto: anteproyecto,
          }
        )
        .then((res) => {
          if (res.data.msg) {
            console.log(res.data.msg);
          } else {
            console.log(res.data);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }

    function toEditAnteporyecto() {
      isEditingProject.value = true;
      businessEmail.value =
        student.value.anteproyecto.datosEmpresa.emailEmpresario;
      businessPhone.value =
        student.value.anteproyecto.datosEmpresa.telefonoEmpresario;
      nameProject.value = student.value.anteproyecto.datosProyecto.nombre;
      objectiveProject.value =
        student.value.anteproyecto.datosProyecto.objetivo;
      descriptionProject.value =
        student.value.anteproyecto.datosProyecto.descripcion;
      nameStateProject.value = student.value.anteproyecto.estado.nombre;
      motiveStateProject.value = student.value.anteproyecto.estado.motivo;
      dateStateProject.value = student.value.anteproyecto.estado.fecha;
    }

    function toDownloadDocument(name, path) {
      console.log(path);
      if (path === "") {
        setTimeout(() => {
          downloadingError.value = true;
          setTimeout(() => {
            downloadingError.value = false;
          }, 2000);
        }, 1000);
        return;
      }
      const nameFile = `${name}_${extractNameFromPath(path)}`;
      downloadingDocument.value = true;

      console.log({
        idAlumno: idStudent._value,
        nombreDocumento: name,
        pathDocumento: path,
      });

      api
        .post(
          `http://localhost:3000/admin/alumno/perfil/documento/descargar`,
          {
            idAlumno: idStudent._value,
            nombreDocumento: name,
            pathDocumento: path,
          },
          {
            responseType: "blob",
          }
        )
        .then((res) => {
          const blob = new Blob([res.data], {
            type: "application/pdf",
          });
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `${nameFile.toLowerCase()}.pdf`);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          setTimeout(() => {
            downloadingDocument.value = false;
          }, 1500);
        })
        .catch((err) => {
          console.error(err);
          setTimeout(() => {
            downloadingDocument.value = false;
            downloadingError.value = true;
            setTimeout(() => {
              downloadingError.value = false;
            }, 2000);
          }, 1000);
        });
    }

    function extractNameFromPath(path) {
      const regex = /documents\\(.+)_\w{24}\\/;
      const match = path.match(regex);

      if (match && match.length > 1) {
        const fullName = match[1];
        return fullName;
      }

      return null;
    }

    function definePhaseColor(state) {
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

    function setPhaseState(state, motive = "") {
      api
        .post(
          `http://localhost:3000/admin/alumno/perfil/documentos/etapa-toggle`, // http://localhost:3000/admin/alumno/perfil/documentos/etapa-toggle
          {
            idAlumno: idStudent._value,
            etapa: actualPhase.value,
            estado: state,
            motivo: motive,
          }
        )
        .then((res) => {
          console.log(res.data);
          phaseState.label;
          phaseState.value.label = res.data.estado;
          phaseState.value.motive = res.data.motivo;
          phaseState.value.date = res.data.fecha;
          phaseState.value.color = definePhaseColor(res.data.estado);
          dialogChangePhaseState.value = false;
          dialogDenyPhase.value = false;
        })
        .catch((err) => {
          dialogChangePhaseState.value = false;
          dialogDenyPhase.value = false;
          console.error(err);
        });
    }

    function setCpaState(state, motive = "") {
      const cpa = {
        estado: {
          nombre: state,
          motivo: motive,
          fecha: new Date(),
        },
        datosAlumno: {
          nombres: {
            nombre: student.value.nombre,
            apPaterno: student.value.apPaterno,
            apMaterno: student.value.apMaterno,
          },
          privado: {
            matricula: student.value.matricula,
            email: student.value.cartaPresentacion.datosAlumno.privado.email,
          },
          telefonoCelular:
            student.value.cartaPresentacion.datosAlumno.telefonoCelular,
          telefonoCasa:
            student.value.cartaPresentacion.datosAlumno.telefonoCasa,
          nss: student.value.cartaPresentacion.datosAlumno.nss,
          curp: student.value.cartaPresentacion.datosAlumno.curp,
        },
        datosAcademicos: {
          datosAcademicosAlumno: {
            nivelAcademico: student.value.nivelAcademico,
            turno: student.value.turno,
            carreraa: student.value.carrera,
            area: student.value.area,
            grado: student.value.grado,
            grupo: student.value.grupo,
          },
          periodo: student.value.cartaPresentacion.datosAcademicos.periodo,
          año: student.value.cartaPresentacion.datosAcademicos.año,
        },
        datosEmpresa: {
          nombreEmpresa:
            student.value.cartaPresentacion.datosEmpresa.nombreEmpresa,
          nombreEmpresario:
            student.value.cartaPresentacion.datosEmpresa.nombreEmpresario,
          puestoEmpresario:
            student.value.cartaPresentacion.datosEmpresa.puestoEmpresario,
        },
      };
      api
        .patch(
          `http://localhost:3000/admin/alumno/perfil/cpa/modificar`,
          {
            idAlumno: idStudent._value,
            cpa,
          }
        )
        .then((res) => {
          console.log(res.data);
          const cpa = res.data.cartaPresentacion;
          const state = cpa.estado.nombre;
          const motive = cpa.estado.motivo;
          const date = cpa.estado.fecha;
          cpaState.value.label = state;
          cpaState.value.motive = motive;
          cpaState.value.date = formatDate(date);
          cpaState.value.color = definePhaseColor(state);
          dialogChangeCPAState.value = false;
          dialogChecking.value = false;
          dialogDenyCpa.value = false;
        })
        .catch((err) => {
          dialogChangeCPAState.value = false;
          dialogChecking.value = false;
          dialogDenyCpa.value = false;
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
      phases,
      actualPhase,
      toShowPhase,
      showSection,
      actualSection,
      dialogChangeCPAState,
      dialogCpaState,
      dialogChecking,
      existsCPA,
      existsDocumentos,
      existAnteproyecto,
      existsAvance,
      toEditCPA,
      isEditingCPA,
      saveEditCPA,
      fullname,
      email,
      career,
      area,
      matricula,
      nss,
      curp,
      phoneNumber1,
      phoneNumber2,
      grade,
      group,
      academicLevel,
      turn,
      year,
      period,
      cpaState,
      businessName,
      companyName,
      businessPosition,
      registerDateCPA,
      toEditAnteporyecto,
      toSaveAnteproyecto,
      businessEmail,
      businessPhone,
      nameProject,
      objectiveProject,
      descriptionProject,
      nameStateProject,
      motiveStateProject,
      dateStateProject,
      registerDateProject,
      toDownloadDocument,
      setPhaseState,
      documents,
      documentsToShow,
      downloadingError,
      downloadingDocument,
      definePhaseColor,
      dialogDenyCpa,
      setCpaState,
      formatDate,
      phaseState,
      dialogPhaseState,
      dialogChangePhaseState,
      dialogDenyPhase,
      allPhasesState,
      toBackPhase,
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
