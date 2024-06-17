<template>
  <div class="container-fluid" :style="{ paddingTop: isMobile ? '20px' : '' }">
    <q-card-actions style="display: flex; justify-content: start">
      <q-btn flat color="black" label="Regresar" icon="arrow_left"
        style="margin: 3px; text-transform: capitalize; font-size: 16px" @click="toBack"></q-btn>
    </q-card-actions>
  </div>
  <div v-if="pageLoaded">
    <div v-if="isMobile">
      <div class="container-fluid">
        <div style="
          display: flex;
          justify-content: space-between;
          align-items: center;
        ">
          <h1 style="
            font-size: 35px;
            padding-left: 60px;
            font-weight: bold;
            margin-right: 20px;
            margin-top: 5px;
            line-height: normal;
          ">
            Seguimiento administrativo
          </h1>
        </div>
      </div>
      <div class="container-fluid" style="padding-left: 60px; padding-right: 60px;">
        <div class="row q-pb-md" style="justify-content: space-between;">
          <div class="col-lg-5 col-md-6 col-11 q-ma-sm q-pt-md row" v-for="(document, i) in documents" :key="i + 1"
            style="display: flex; align-items: center;">
            <div class="col-12" style="background: lightgray; padding: 7px 10px; border-radius: 5px;">
              <p style="margin: 0; height: 100%; line-height: normal;">{{ document.label }}</p>
            </div>
            <div class="col-6 q-pr-sm">
              <input :id="'pdf-upload-' + document.name" :type="document.state !== 'Aceptada' ? 'file' : 'button'" accept=".pdf" role="button"
                @change="uploadDocuments(document.name, $event)" style="display: none;" />
              <label :for="'pdf-upload-' + document.name" class="custom-upload-button"
                style="padding: 7px 15px; width: 100%; justify-content: center; display: flex; align-items: center;">
                <span class="button-label">Subir</span>
                <q-icon name="file_upload" class="q-icon-sm q-pl-sm"></q-icon>
              </label>
            </div>
            <div class="col-6 q-pl-sm" :style="{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
              background: definePhaseColor(document.state),
              padding: '7px 10px',
              borderRadius: '5px'
            }">
              <p style="margin: 0; height: 100%;">{{ document.state }}</p>
              <q-btn v-if="document.state === 'Rechazada'" flat color="white" icon="more_horiz" size="10px"
                style="margin: 0 4px;" @click="setActualDocument(document.name), dialogPhaseState = true"></q-btn>
            </div>
          </div>
        </div>
      </div>

      <q-dialog v-model="dialogPhaseState">
        <q-card class="q-pt-md q-pl-md q-pr-md" style="width: 500px; max-width: 60vw; height: 45vh">
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
                Estado de etapa {{ actualDocument.label }}
              </div>
            </div>
            <div class="col-12 q-pa-md q-mt-md">
              <p style="font-size: 14px">
                <span style="font-weight: 500">Estado: </span>{{ actualDocument.state.name }}
              </p>
              <p style="font-size: 14px">
                <span style="font-weight: 500">Fecha de revisión: </span>{{ actualDocument.state.date }}
              </p>
              <p style="font-size: 14px">
                <span style="font-weight: 500">Motivo: </span>{{ actualDocument.state.motive }}
              </p>
            </div>
          </div>
        </q-card>
      </q-dialog>

      <q-dialog v-model="uploadingFiles" persistent>
        <q-card class="q-pa-lg" style="width: 300px">
          <q-card-section>
            <div class="text-h6 text-center">Subiendo documentos</div>
          </q-card-section>
          <q-card-section class="q-pt-none text-center">
            <q-circular-progress indeterminate rounded size="50px" color="blue" class="q-ma-md" />
          </q-card-section>
        </q-card>
      </q-dialog>

      <q-dialog v-model="uploadedFiles" persistent>
        <q-card class="q-pa-lg" style="width: 300px">
          <q-card-section>
            <div class="text-h6 text-center">
              Documento subido correctamente
            </div>
          </q-card-section>
          <q-card-section class="q-pt-none text-center">
            <q-icon name="check_circle" color="green" size="50px" />
          </q-card-section>
        </q-card>
      </q-dialog>

      <q-dialog v-model="errorUploadingFiles" persistent>
        <q-card class="q-pa-lg" style="width: 300px">
          <q-card-section>
            <div class="text-h6 text-center">Ha ocurrido un error</div>
          </q-card-section>
          <q-card-section class="q-pt-none text-center">
            <q-icon name="cancel" color="red" size="50px" />
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
    <div v-else>
      <div class="container-fluid">
        <div style="
          display: flex;
          justify-content: space-between;
          align-items: center;
        ">
          <h1 style="
            font-size: 35px;
            padding-left: 60px;
            font-weight: bold;
            margin-right: 20px;
            margin-top: 5px;
            margin-bottom: 7px;
          ">
            Seguimiento Administrativo
          </h1>
        </div>
        <div style="padding: 15px 60px;">
          <p>En esta sección podras adjuntar todos los documentos necesarios en el proceso de estadias. Oprime cada recuadro para subir un archivo. Los documentos tienen que ser en formato PDF y pesar menos de 5 MB</p>
        </div>
      </div>
      <div class="container-fluid" style="padding-left: 60px; padding-right: 60px;">
        <div class="row" style="justify-content: space-between;">
          <div class="col-2 q-ma-sm row" v-for="(document, i) in documents" :key="i + 1"
            style="display: flex; align-items: center;">
            <q-card class="my-card" style="width: 100%; color: white; border: 1px solid #0000001c;">
              <q-card-section
                style="height: 80px; -background: #e9e9e9; display: flex; justify-content: center; align-items: center; margin: 0; padding: 0;">
                <input :id="'pdf-upload-' + document.name" :type="document.state !== 'Aceptada' ? 'file' : 'button'" accept=".pdf" role="button"
                  @change="uploadDocuments(document.name, $event)" style="display: none;" />
                <label :for="'pdf-upload-' + document.name" class="document-label">
                  <q-icon :name="document.icon" size="45px" color="dark"></q-icon>
                </label>
              </q-card-section>
              <q-card-actions flat vertical style="padding: 0">
                <div :style="{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: 'white',
                  background: definePhaseColor(document.state),
                  padding: '7px 10px',
                  borderRadius: '0 0 4px 4px'
                }">
                  <p style="margin: 0; height: 100%;">{{ document.state }}</p>
                  <q-btn v-if="document.state === 'Rechazada'" flat color="white" icon="more_horiz" size="10px"
                    style="margin: 0 4px;" @click="setActualDocument(document.name), dialogPhaseState = true"></q-btn>
                </div>
              </q-card-actions>
            </q-card>
            <div class="text-subtitle1 text-center col-12" style="margin: 0; opacity: 0.6; height: 56px;">
              {{ document.label }}
            </div>
          </div>
        </div>
      </div>

      <q-dialog v-model="dialogPhaseState">
        <q-card class="q-pt-md q-pl-md q-pr-md" style="width: 500px; max-width: 60vw; height: 45vh">
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
                Estado de etapa {{ actualDocument.label }}
              </div>
            </div>
            <div class="col-12 q-pa-md q-mt-md">
              <p style="font-size: 14px">
                <span style="font-weight: 500">Estado: </span>{{ actualDocument.state.name }}
              </p>
              <p style="font-size: 14px">
                <span style="font-weight: 500">Fecha de revisión: </span>{{ actualDocument.state.date }}
              </p>
              <p style="font-size: 14px">
                <span style="font-weight: 500">Motivo: </span>{{ actualDocument.state.motive }}
              </p>
            </div>
          </div>
        </q-card>
      </q-dialog>

      <q-dialog v-model="uploadingFiles" persistent>
        <q-card class="q-pa-lg" style="width: 300px">
          <q-card-section>
            <div class="text-h6 text-center">Subiendo documentos</div>
          </q-card-section>
          <q-card-section class="q-pt-none text-center">
            <q-circular-progress indeterminate rounded size="50px" color="blue" class="q-ma-md" />
          </q-card-section>
        </q-card>
      </q-dialog>

      <q-dialog v-model="uploadedFiles" persistent>
        <q-card class="q-pa-lg" style="width: 300px">
          <q-card-section>
            <div class="text-h6 text-center">
              Documentos subidos correctamente
            </div>
          </q-card-section>
          <q-card-section class="q-pt-none text-center">
            <q-icon name="check_circle" color="green" size="50px" />
          </q-card-section>
        </q-card>
      </q-dialog>

      <q-dialog v-model="errorUploadingFiles" persistent>
        <q-card class="q-pa-lg" style="width: 300px">
          <q-card-section>
            <div class="text-h6 text-center">Ha ocurrido un error</div>
          </q-card-section>
          <q-card-section class="q-pt-none text-center">
            <q-icon name="cancel" color="red" size="50px" />
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </div>
  <div v-else>
    <LoadingPage></LoadingPage>
  </div>
</template>

<script>
/* eslint-disable */

import { defineComponent, ref, onMounted, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
import { api } from "src/boot/axios";
import { useUserStore } from "src/stores/user-store";
import { format } from "date-fns";
import LoadingPage from "src/components/LoadingPage.vue";

export default defineComponent({
  name: "alumno-seguimientoAdministrativo",
  components: {
    LoadingPage,
  },
  setup() {

    const isMobile = ref(isUsingMobile());

    function isUsingMobile() {
      const validation1 = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const finalValidation = validation1;
      return finalValidation;
    }

    const { ctx } = getCurrentInstance();
    const router = useRouter();
    const userStore = useUserStore();
    const idStudent = userStore.user.id;

    const pageLoaded = ref(false);

    const dialogPhaseState = ref(false);

    const uploadingFiles = ref(false);
    const uploadedFiles = ref(false);
    const errorUploadingFiles = ref(false);

    const documents = ref([
      {
        label: "Curriculum Vitae Español",
        name: "cve",
        icon: "description",
        state: "Sin entregar",
        motive: "",
        date: "",
      },
      {
        label: "Curriculum Vitae Inglés",
        name: "cvi",
        icon: "description",
        state: "Sin entregar",
        motive: "",
        date: "",
      },
      {
        label: "Carta Presentación",
        name: "cpa",
        icon: "mail",
        state: "Sin entregar",
        motive: "",
        date: "",
      },
      {
        label: "Carta Aceptación",
        name: "caa",
        icon: "mail",
        state: "Sin entregar",
        motive: "",
        date: "",
      },
      {
        label: "Constancia de Vigencia de Seguro Social",
        name: "nss",
        icon: "contact_page",
        state: "Sin entregar",
        motive: "",
        date: "",
      },
      {
        label: "F-PSE-DICA-17 Estadias en Sector Productivo",
        name: "dictamen",
        icon: "summarize",
        state: "Sin entregar",
        motive: "",
        date: "",
      },
      {
        label: "F-PSE-DICA-18 Protesta de ley",
        name: "protesta",
        icon: "gavel",
        state: "Sin entregar",
        motive: "",
        date: "",
      },
      {
        label: "F-PSE-DICA-19 Rubrica de Evaluación",
        name: "rubrica",
        icon: "assignment",
        state: "Sin entregar",
        motive: "",
        date: "",
      },
      {
        label: "Reporte Proyecto de Estadias",
        name: "reporte",
        icon: "article",
        state: "Sin entregar",
        motive: "",
        date: "",
      },
      {
        label: "Carta Terminación Proyecto",
        name: "ctp",
        icon: "mail",
        state: "Sin entregar",
        motive: "",
        date: "",
      },
    ]);

    const actualDocument = ref({
      label: "",
      name: "",
      state: {
        name: "",
        motive: "",
        date: "",
      },
    });

    const allPhasesData = ref();
    const phaseStatus = ref({
      label: "",
      date: "",
      motive: "",
      bgColor: "",
    });

    const documentsToSend = ref([]);

    function loadDocuments() {
      console.log("Loading documents ...");
      api
        .post("./alumno/documentos", {
          idAlumno: idStudent,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data === "No se encontraron documentos" || res.data === "") {
            return pageLoaded.value = true;
          }

          setDocuments(res.data);
          pageLoaded.value = true;
        })
        .catch((err) => console.error(err));
    }

    function setDocuments(response) {
      try {
        const documentsData = response;
        Object.keys(documentsData).map((document) => {
          const name = document.replace('.pdf', '');
          const foundDocument = documents.value.findIndex(document => document.name === name);
          console.log(documentsData[document]);
          documents.value[foundDocument].state = documentsData[document].estado;
          documents.value[foundDocument].motive = documentsData[document].motivo;
          documents.value[foundDocument].date = documentsData[document].fecha;
        });
      } catch (error) {
        console.error(error);
      }
    }

    function setActualDocument(nameDocument) {
      console.log(nameDocument);
      const foundDocument = documents.value.find(document => document.name === nameDocument);
      console.log(foundDocument);
      actualDocument.value.label = foundDocument.label;
      actualDocument.value.name = foundDocument.name;
      actualDocument.value.path = foundDocument.path;
      actualDocument.value.state.name = foundDocument.state;
      actualDocument.value.state.motive = foundDocument.motive !== undefined ? foundDocument.motive : '';
      actualDocument.value.state.date = foundDocument.date;
      console.log(actualDocument.value.state);
    }

    function formatDate(dateString) {
      const dateObj = new Date(dateString);
      return format(dateObj, "dd-MM-yyyy HH:mm:ss");
    }

    function definePhaseColor(state) {
      if (state === "Sin entregar") {
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

    onMounted(() => {
      loadDocuments();
    });

    return {
      router,
      userStore,
      pageLoaded,
      phaseStatus,
      documentsToSend,
      loadDocuments,
      formatDate,
      uploadedFiles,
      uploadingFiles,
      errorUploadingFiles,
      dialogPhaseState,
      definePhaseColor,
      allPhasesData,
      isMobile,
      documents,
      setDocuments,
      setActualDocument,
      actualDocument,
    };
  },
  methods: {
    uploadDocuments(documentValue, event) {
      console.log("Uploading documents ...");
      this.uploadingFiles = true;
      const nameDocument = documentValue;
      console.log(nameDocument);
      const formData = new FormData();
      formData.append("idAlumno", this.userStore.user.id);
      formData.append("apellidoPaterno", this.userStore.user.apPaterno);
      formData.append("apellidoMaterno", this.userStore.user.apMaterno);
      formData.append("nombre", this.userStore.user.nombre);

      const file = event.target.files[0];
      const newFile = new File([file], `${nameDocument}.pdf`, {
        type: file.type,
        lastModified: file.lastModified,
      });
      formData.append("archivos", newFile);
      api
        .post("./alumno/documentos/subir", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res.data);
          this.setDocuments(res.data);
          setTimeout(() => {
            this.uploadingFiles = false;
            this.uploadedFiles = true;
            setTimeout(() => {
              this.uploadedFiles = false;
            }, 2000);
          }, 1000);
        })
        .catch((err) => {
          console.error(err);
          setTimeout(() => {
            this.uploadingFiles = false;
            this.errorUploadingFiles = true;
            setTimeout(() => {
              this.errorUploadingFiles = false;
            }, 2000);
          }, 2000);
        })
    },
    saveDocument(file, documentType) {
      const newFile = new File([file], `${documentType}.pdf`, {
        type: file.type,
        lastModified: file.lastModified,
      });
      this.documentsToSend.push(newFile);
    },
    toBack() {
      this.router.go(-1);
    },
    getCurrentSection() {
      return this.currentSection;
    },
    startApplication() {
      console.log("Starting application ...");
      this.applicationStarted = true;
      this.showSections = true;
      this.currentSection = "etapa1";
    },
    goToPhase1() {
      this.currentSection = "etapa1";
      this.loadPhaseState();
    },
    goToPhase2() {
      this.currentSection = "etapa2";
      this.loadPhaseState();
    },
    goToPhase3() {
      this.currentSection = "etapa3";
      this.loadPhaseState();
    },
    goToPhase4() {
      this.currentSection = "etapa4";
      this.loadPhaseState();
    },
    submitEtapa1Info() {
      if (this.etapa1InfoIsValid) {
        this.currentSection = "etapa2";
      }
    },
    submitEtapa2Info() {
      if (this.etapa2InfoIsValid) {
        this.currentSection = "etapa3";
      }
    },
    submitEtapa3Info() {
      if (this.etapa3InfoIsValid) {
        this.currentSection = "etapa4";
      }
    },
    submitEtapa4Info() {
      if (this.etapa4InfoIsValid) {
        this.currentSection = "etapa5";
      }
    },
    submitEtapa5Info() {
      if (this.etapa5InfoIsValid) {
        this.currentSection = "etapa6";
      }
    },
    submitEtapa6Info() {
      if (this.etapa6InfoIsValid) {
        this.currentSection = "etapa7";
      }
    },
    submitEtapa7Info() {
      if (this.etapa7InfoIsValid) {
        this.currentSection = "etapa8";
      }
    },
    submitEtapa8Info() {
      if (this.etapa8InfoIsValid) {
        this.currentSection = "etapa9";
      }
    },
    submitEtapa9Info() {
      if (this.etapa9InfoIsValid) {
        // Realizar acciones necesarias para la etapa 9
      }
    },
    goToNextSection() {
      const sections = [
        "etapa1",
        "etapa2",
        "etapa3",
        "etapa4",
        "etapa5",
        "etapa6",
        "etapa7",
        "etapa8",
        "etapa9",
      ];
      const currentIndex = sections.indexOf(this.currentSection);
      const nextIndex = currentIndex + 1;
      if (nextIndex < sections.length) {
        this.currentSection = sections[nextIndex];
        this.loadPhaseState(this.currentSection);
      } else {
        // Si es la última sección, marcar la solicitud como finalizada
        this.applicationFinish = true;
      }
    },
    handlePDFUpload(documentType, event) {
      const file = event.target.files[0];

      this.saveDocument(file, documentType);

      switch (documentType) {
        case "CurriculumVitae":
          this.selectedCVFileName = file.name;
          this.filesUploaded.cv = true;
          break;
        case "Segurofacultativo":
          this.selectedSeguroFileName = file.name;
          this.filesUploaded.seguro = true;
          break;
        case "Cartapresentacion":
          this.selectedCartaFileName = file.name;
          this.filesUploaded.carta = true;
          break;
        case "Cartaaceptacion":
          this.selectedAceptacionFileName = file.name;
          this.filesUploaded.aceptacion = true;
          break;
        case "Reporteproyecto":
          this.selectedReporteFileName = file.name;
          this.filesUploaded.reporte = true;
          break;
        case "Rubrica":
          this.selectedRubricaFileName = file.name;
          this.filesUploaded.rubrica = true;
          break;
        case "Dictamen":
          this.selectedDictamenFileName = file.name;
          this.filesUploaded.dictamen = true;
          break;
        case "Protesta":
          this.selectedProtestaFileName = file.name;
          this.filesUploaded.protesta = true;
          break;
        case "Terminacion":
          this.selectedTerminacionFileName = file.name;
          this.filesUploaded.terminacion = true;
          break;
        // Agrega casos para los demás documentos si es necesario
      }
    },
    checkEtapa1FilesUploaded() {
      if (
        this.selectedCVFileName &&
        this.selectedSeguroFileName &&
        this.selectedCartaFileName
      ) {
        this.etapa1FilesUploaded = true;
      } else {
        this.etapa1FilesUploaded = false;
      }
    },
    checkEtapa2FilesUploaded() {
      if (this.selectedAceptacionFileName) {
        this.etapa2FilesUploaded = true;
      } else {
        this.etapa2FilesUploaded = false;
      }
    },
    checkEtapa3FilesUploaded() {
      if (this.selectedReporteFileName) {
        this.etapa3FilesUploaded = true;
      } else {
        this.etapa3FilesUploaded = false;
      }
    },
    checkEtapa4FilesUploaded() {
      if (
        this.selectedRubricaFileName &&
        this.selectedDictamenFileName &&
        this.selectedProtestaFileName
      ) {
        this.etapa4FilesUploaded = true;
      } else {
        this.etapa4FilesUploaded = false;
      }
    },
    checkEtapa5FilesUploaded() {
      if (this.selectedTerminacionFileName) {
        this.etapa5FilesUploaded = true;
      } else {
        this.etapa5FilesUploaded = false;
      }
    },
  },
});
</script>

<style scoped>
.container-fluid {
  padding: 0;
}

.section-title {
  font-weight: 600;
  font-size: 20px;
  text-align: center;
  margin: 20px 0;
  position: relative;
}

.section-title .progress-bar {
  position: absolute;
  bottom: -6px;
  left: 0;
  height: 6px;
  background-color: #ffd600;
  transition: width 0.3s ease-in-out;
}

.active-section {
  border-bottom: 6px solid #ffd600;
  color: black !important;
  margin-right: 70px;
}

.circle {
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: black;
  color: white;
  text-align: center;
  line-height: 30px;
  margin-right: 10px;
  vertical-align: middle;
}

.col:last-child .progress-bar {
  margin-right: 100px;
}

.form-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 15px;
}

.form-group {
  flex: 0 0 200px;
  margin: 0 10px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

button {
  margin-top: 20px;
}

.text-center {
  text-align: center;
}

.btn {
  margin: 10px;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 6px;
  cursor: pointer;
}

.btn-primary {
  background-color: #007bff;
  border: none;
  color: #fff;
}

.btn-secondary {
  background-color: #6c757d;
  border: none;
  color: #fff;
}

.btn-home {
  z-index: 1;
  position: relative;
}

.container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.pdf-icon {
  width: 60px;
  margin: 5px;
}

.icon-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.document-label {
  text-align: center;
  margin-bottom: 5px;
  font-weight: bold;
}

.container-group {
  display: flex;
  flex-wrap: wrap;
  max-width: 1000px;
}

.container-group .container {
  flex-basis: calc(33.33% - 50px);
  margin: 10px;
}

.container p,
.container label {
  font-size: 20px;
}

label {
  margin: 0;
}

.file-name {
  font-size: 12px !important;
  opacity: 0.8;
  text-transform: lowercase !important;
}

.custom-upload-button {
  display: inline-block;
  background-color: black;
  color: white;
  padding: 4px 15px;
  margin: 3px;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  text-transform: none;
}

.custom-upload-button:hover {
  background-color: #333;
}

.document-label {
  width: 100%;
  height: 100%;
  margin: 0;
  justify-content: center;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.document-label:hover {
  background: #5ec8b2;
}

</style>
