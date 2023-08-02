<template>
  <UserNavbar></UserNavbar>
  <div class="container-fluid">
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
  <div v-if="pageLoaded">
    <div class="container-fluid">
      <div
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
        "
      >
        <h1
          style="
            font-size: 35px;
            padding-left: 60px;
            font-weight: bold;
            margin-right: 20px;
            margin-top: 5px;
          "
        >
          Seguimiento administrativo
        </h1>
        <div
          :style="{
            backgroundColor: phaseStatus.bgColor,
            padding: '10px',
            width: '300px',
            height: '50px',
            marginLeft: 'auto',
            marginRight: '200px',
            borderRadius: '10px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }"
        >
          <p style="font-size: 20px; color: white; margin: 0">
            {{ phaseStatus.label }}
          </p>
          <q-btn
            v-if="phaseStatus.label == 'Rechazada'"
            flat
            color="white"
            icon="more_horiz"
            size="12px"
            style="margin-top: 0"
            @click="dialogPhaseState = true"
          ></q-btn>
          <q-dialog v-model="dialogPhaseState">
            <q-card
              class="q-pt-md q-pl-md q-pr-md"
              style="width: 500px; max-width: 60vw; height: 45vh"
            >
              <div class="row q-ma-md">
                <div class="col-12" style="display: flex; justify-content: end">
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
                    Estado de etapa {{ currentSection.slice(-1) }}
                  </div>
                </div>
                <div class="col-12 q-pa-md q-mt-md">
                  <p style="font-size: 14px">
                    <span style="font-weight: 500">Estado: </span
                    >{{ phaseStatus.label }}
                  </p>
                  <p style="font-size: 14px">
                    <span style="font-weight: 500">Fecha de revisión: </span
                    >{{ phaseStatus.date }}
                  </p>
                  <p style="font-size: 14px">
                    <span style="font-weight: 500">Motivo: </span
                    >{{ phaseStatus.motive }}
                  </p>
                </div>
              </div>
            </q-card>
          </q-dialog>
        </div>
      </div>
    </div>
    <div
      class="container-fluid"
      v-show="showSections && !applicationFinish"
      style="padding-left: 60px"
    >
      <div class="row">
        <div
          class="col"
          :class="{ 'locked-section': currentSection !== 'etapa1' }"
        >
          <h2
            :class="{ 'active-section': currentSection === 'etapa1' }"
            class="section-title"
          >
            Etapa 1
            <div
              class="progress-bar"
              :style="{
                width:
                  currentSection === 'etapa1' ||
                  currentSection === 'etapa2' ||
                  currentSection === 'etapa3' ||
                  currentSection === 'etapa4' ||
                  currentSection === 'etapa5'
                    ? '100%'
                    : '0',
              }"
            ></div>
          </h2>
        </div>
        <div
          class="col"
          :class="{ 'locked-section': currentSection !== 'etapa2' }"
        >
          <h2
            :class="{ 'active-section': currentSection === 'etapa2' }"
            class="section-title"
          >
            Etapa 2
            <div
              class="progress-bar"
              :style="{
                width:
                  currentSection === 'etapa2' ||
                  currentSection === 'etapa3' ||
                  currentSection === 'etapa4' ||
                  currentSection === 'etapa5'
                    ? '100%'
                    : '0',
              }"
            ></div>
          </h2>
        </div>
        <div
          class="col"
          :class="{ 'locked-section': currentSection !== 'etapa3' }"
        >
          <h2
            :class="{ 'active-section': currentSection === 'etapa3' }"
            class="section-title"
          >
            Etapa 3
            <div
              class="progress-bar"
              :style="{
                width:
                  currentSection === 'etapa3' ||
                  currentSection === 'etapa4' ||
                  currentSection === 'etapa5'
                    ? '100%'
                    : '0',
              }"
            ></div>
          </h2>
        </div>
        <div
          class="col"
          :class="{ 'locked-section': currentSection !== 'etapa4' }"
        >
          <h2
            :class="{ 'active-section': currentSection === 'etapa4' }"
            class="section-title"
          >
            Etapa 4
            <div
              class="progress-bar"
              :style="{
                width:
                  currentSection === 'etapa4' || currentSection === 'etapa5'
                    ? '100%'
                    : '0',
              }"
            ></div>
          </h2>
        </div>
        <div
          class="col"
          :class="{ 'locked-section': currentSection !== 'etapa5' }"
        >
          <h2
            :class="{ 'active-section': currentSection === 'etapa5' }"
            class="section-title"
          >
            Etapa 5
            <div
              class="progress-bar"
              :style="{ width: currentSection === 'etapa5' ? '100%' : '0' }"
            ></div>
          </h2>
        </div>
        <!-- Repetir el código para las demás etapas si es necesario -->
      </div>
    </div>
    <div class="container-fluid text-center">
      <p
        v-if="!applicationStarted && !showSections"
        style="margin-top: 100px; font-size: 20px"
      >
        Aun no se ha realizado ninguna etapa
      </p>
      <q-btn
        color="black"
        label="Comenzar solicitud"
        class="btn btn-primary"
        @click="startApplication"
        v-if="!applicationStarted"
        style="
          color: white;
          border-radius: 20px;
          width: 300px;
          height: 100px;
          font-size: 22px;
        "
      />
    </div>

    <q-dialog v-model="uploadingFiles" persistent>
      <q-card class="q-pa-lg" style="width: 300px">
        <q-card-section>
          <div class="text-h6 text-center">Subiendo documentos</div>
        </q-card-section>
        <q-card-section class="q-pt-none text-center">
          <q-circular-progress
            indeterminate
            rounded
            size="50px"
            color="blue"
            class="q-ma-md"
          />
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

    <div class="container-fluid" style="padding-left: 60px">
      <div v-if="currentSection === 'etapa1'">
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
          "
        >
          <p style="font-size: 20px">
            En esta etapa deberás subir o escanear tu Curriculum Vitae,
            <br />
            seguro facultativo y carta de presentación en formato PDF.
          </p>
        </div>
        <div class="container-group">
          <!-- Etapa 1 -->
          <div class="container">
            <p class="document-label">Curriculum Vitae</p>

            <div class="icon-container">
              <label for="pdf-upload-cv">
                <img class="pdf-icon" src="../../assets/Iconopdg.png" alt="" />
              </label>
              <input
                id="pdf-upload-cv"
                type="file"
                accept=".pdf"
                style="display: none"
                @change="handlePDFUpload('CurriculumVitae', $event)"
              />
            </div>
            <p class="file-name" v-if="selectedCVFileName">
              {{ selectedCVFileName }}
            </p>
          </div>

          <!-- Sección Seguro facultativo -->
          <div class="container">
            <p class="document-label">Seguro facultativo</p>
            <div class="icon-container">
              <label for="pdf-upload-seguro">
                <img class="pdf-icon" src="../../assets/Iconopdg.png" alt="" />
              </label>
              <input
                id="pdf-upload-seguro"
                type="file"
                accept=".pdf"
                style="display: none"
                @change="handlePDFUpload('Segurofacultativo', $event)"
              />
            </div>
            <p class="file-name" v-if="selectedSeguroFileName">
              {{ selectedSeguroFileName }}
            </p>
          </div>

          <!-- Sección Carta presentación -->
          <div class="container">
            <p class="document-label">Carta presentación</p>
            <div class="icon-container">
              <label for="pdf-upload-carta">
                <img class="pdf-icon" src="../../assets/Iconopdg.png" alt="" />
              </label>
              <input
                id="pdf-upload-carta"
                type="file"
                accept=".pdf"
                style="display: none"
                @change="handlePDFUpload('Cartapresentacion', $event)"
              />
            </div>
            <p class="file-name" v-if="selectedCartaFileName">
              {{ selectedCartaFileName }}
            </p>
          </div>
        </div>
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
          "
        >
          <q-btn
            color="black"
            label="Guardar"
            class="btn btn-primary"
            style="
              color: white;
              border-radius: 20px;
              width: 280px;
              height: 30px;
              font-size: 22px;
            "
            :disabled="etapa1IsValid && etapa1IsAcepted"
            @click="uploadDocuments(1)"
          />

          <div style="float: right; margin-right: 160px">
            <q-btn
              color="black"
              label="Siguiente"
              class="btn btn-primary"
              style="
                color: white;
                border-radius: 20px;
                width: 160px;
                height: 25px;
                font-size: 20px;
              "
              :disabled="!etapa1IsValid || !etapa1IsAcepted"
              @click="goToNextSection"
            />
          </div>
        </div>
      </div>

      <div v-if="currentSection === 'etapa2'">
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
          "
        >
          <p style="font-size: 20px">
            En esta etapa deberas subir o escanear.
            <br />
            tu carta aceptación en formato PDF.
          </p>
        </div>

        <div class="container-group">
          <!-- Sección Curriculum Vitae -->
          <div class="container">
            <p class="document-label">Carta aceptación</p>
            <div class="icon-container">
              <label for="pdf-upload-cv">
                <img class="pdf-icon" src="../../assets/Iconopdg.png" alt="" />
              </label>
              <input
                id="pdf-upload-cv"
                type="file"
                accept=".pdf"
                style="display: none"
                @change="handlePDFUpload('Cartaaceptacion', $event)"
              />
            </div>
            <p class="file-name" v-if="selectedAceptacionFileName">
              {{ selectedAceptacionFileName }}
            </p>
          </div>
        </div>

        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
          "
        >
          <q-btn
            color="black"
            label="Guardar"
            class="btn btn-primary"
            style="
              color: white;
              border-radius: 20px;
              width: 280px;
              height: 30px;
              font-size: 22px;
            "
            :disabled="etapa2IsValid && etapa2IsAcepted"
            @click="uploadDocuments(2)"
          />

          <div style="float: right; margin-right: 160px">
            <q-btn
              color="black"
              label="Regresar"
              class="btn btn-primary"
              style="
                color: white;
                border-radius: 20px;
                width: 160px;
                height: 25px;
                font-size: 20px;
              "
              @click="goToPhase1"
            />
            <q-btn
              color="black"
              label="Siguiente"
              class="btn btn-primary"
              style="
                color: white;
                border-radius: 20px;
                width: 160px;
                height: 25px;
                font-size: 20px;
              "
              :disabled="!etapa2InfoIsValid || !etapa2IsAcepted"
              @click="goToNextSection"
            />
          </div>
        </div>
      </div>
      <div v-if="currentSection === 'etapa3'">
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
          "
        >
          <p style="font-size: 20px">
            En esta etapa deberas subir o escanear tu reporte de
            <br />
            proyecto en formato PDF.
          </p>
        </div>

        <div class="container-group">
          <!-- Sección Curriculum Vitae -->
          <div class="container">
            <p class="document-label">Reporte de proyecto</p>
            <div class="icon-container">
              <label for="pdf-upload-cv">
                <img class="pdf-icon" src="../../assets/Iconopdg.png" alt="" />
              </label>
              <input
                id="pdf-upload-cv"
                type="file"
                accept=".pdf"
                style="display: none"
                @change="handlePDFUpload('Reporteproyecto', $event)"
              />
            </div>
            <p class="file-name" v-if="selectedReporteFileName">
              {{ selectedReporteFileName }}
            </p>
          </div>
        </div>
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
          "
        >
          <q-btn
            color="black"
            label="Guardar"
            class="btn btn-primary"
            style="
              color: white;
              border-radius: 20px;
              width: 280px;
              height: 30px;
              font-size: 22px;
            "
            :disabled="etapa3IsValid && etapa3IsAcepted"
            @click="uploadDocuments(3)"
          />

          <div style="float: right; margin-right: 160px">
            <q-btn
              color="black"
              label="Regresar"
              class="btn btn-primary"
              style="
                color: white;
                border-radius: 20px;
                width: 160px;
                height: 25px;
                font-size: 20px;
              "
              @click="goToPhase2"
            />
            <q-btn
              color="black"
              label="Siguiente"
              class="btn btn-primary"
              style="
                color: white;
                border-radius: 20px;
                width: 160px;
                height: 25px;
                font-size: 20px;
              "
              :disabled="!etapa3InfoIsValid || !etapa3IsAcepted"
              @click="goToNextSection"
            />
          </div>
        </div>
      </div>
      <div v-if="currentSection === 'etapa4'">
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
          "
        >
          <p style="font-size: 20px">
            En esta etapa deberas subir o escanear tu rubrica de
            <br />
            evaluación, dictamen y protesta de ley en formato PDF.
          </p>
        </div>
        <div class="container-group">
          <!-- Sección Curriculum Vitae -->
          <div class="container">
            <p class="document-label">Rubrica de evaluación</p>
            <div class="icon-container">
              <label for="pdf-upload-cv">
                <img class="pdf-icon" src="../../assets/Iconopdg.png" alt="" />
              </label>
              <input
                id="pdf-upload-cv"
                type="file"
                accept=".pdf"
                style="display: none"
                @change="handlePDFUpload('Rubrica', $event)"
              />
            </div>
            <p class="file-name" v-if="selectedRubricaFileName">
              {{ selectedRubricaFileName }}
            </p>
          </div>

          <!-- Sección Seguro facultativo -->
          <div class="container">
            <p class="document-label">Dictamen</p>
            <div class="icon-container">
              <label for="pdf-upload-seguro">
                <img class="pdf-icon" src="../../assets/Iconopdg.png" alt="" />
              </label>
              <input
                id="pdf-upload-seguro"
                type="file"
                accept=".pdf"
                style="display: none"
                @change="handlePDFUpload('Dictamen', $event)"
              />
            </div>
            <p class="file-name" v-if="selectedDictamenFileName">
              {{ selectedDictamenFileName }}
            </p>
          </div>

          <!-- Sección Carta presentación -->
          <div class="container">
            <p class="document-label">Protesta de ley</p>
            <div class="icon-container">
              <label for="pdf-upload-carta">
                <img class="pdf-icon" src="../../assets/Iconopdg.png" alt="" />
              </label>
              <input
                id="pdf-upload-carta"
                type="file"
                accept=".pdf"
                style="display: none"
                @change="handlePDFUpload('Protesta', $event)"
              />
            </div>
            <p class="file-name" v-if="selectedProtestaFileName">
              {{ selectedProtestaFileName }}
            </p>
          </div>
        </div>
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
          "
        >
          <q-btn
            color="black"
            label="Guardar"
            class="btn btn-primary"
            style="
              color: white;
              border-radius: 20px;
              width: 280px;
              height: 30px;
              font-size: 22px;
            "
            :disabled="etapa4IsValid && etapa4IsAcepted"
            @click="uploadDocuments(4)"
          />

          <div style="float: right; margin-right: 160px">
            <q-btn
              color="black"
              label="Regresar"
              class="btn btn-primary"
              style="
                color: white;
                border-radius: 20px;
                width: 160px;
                height: 25px;
                font-size: 20px;
              "
              @click="goToPhase3"
            />
            <q-btn
              color="black"
              label="Siguiente"
              class="btn btn-primary"
              style="
                color: white;
                border-radius: 20px;
                width: 160px;
                height: 25px;
                font-size: 20px;
              "
              :disabled="!etapa4InfoIsValid || !etapa4IsAcepted"
              @click="goToNextSection"
            />
          </div>
        </div>
      </div>

      <div v-if="currentSection === 'etapa5'">
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
          "
        >
          <p style="font-size: 20px">
            En esta etapa deberas subir o escanear tu carta de
            <br />
            terminación en formato PDF.
          </p>
        </div>

        <div class="container-group">
          <div class="container">
            <p class="document-label">Carta de terminación</p>
            <div class="icon-container">
              <label for="pdf-upload-cv">
                <img class="pdf-icon" src="../../assets/Iconopdg.png" alt="" />
              </label>
              <input
                id="pdf-upload-cv"
                type="file"
                accept=".pdf"
                style="display: none"
                @change="handlePDFUpload('Terminacion', $event)"
              />
            </div>
            <p class="file-name" v-if="selectedTerminacionFileName">
              {{ selectedTerminacionFileName }}
            </p>
          </div>
        </div>
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
          "
        >
          <q-btn
            color="black"
            label="Guardar"
            class="btn btn-primary"
            style="
              color: white;
              border-radius: 20px;
              width: 280px;
              height: 30px;
              font-size: 22px;
            "
            :disabled="etapa5IsValid && etapa5IsAcepted"
            @click="uploadDocuments(5)"
          />

          <div style="float: right; margin-right: 160px">
            <q-btn
              color="black"
              label="Regresar"
              class="btn btn-primary"
              style="
                color: white;
                border-radius: 20px;
                width: 160px;
                height: 25px;
                font-size: 20px;
              "
              @click="goToPhase4"
            />
            <q-btn
              color="black"
              label="Finalizar"
              class="btn btn-primary"
              style="
                color: white;
                border-radius: 20px;
                width: 160px;
                height: 25px;
                font-size: 20px;
              "
              :disabled="!etapa5InfoIsValid || !etapa5IsAcepted"
              @click="goToNextSection"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <LoadingPage></LoadingPage>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
import { api } from "src/boot/axios";
import { useUserStore } from "src/stores/user-store";
import { format } from "date-fns";
import UserNavbar from "src/components/UserNavbar.vue";
import LoadingPage from "src/components/LoadingPage.vue";

export default defineComponent({
  name: "alumno-seguimientoAdministrativo",
  components: {
    UserNavbar,
    LoadingPage,
  },
  setup() {
    const { ctx } = getCurrentInstance();
    const router = useRouter();
    const userStore = useUserStore();
    const idStudent = userStore.user.id;

    const pageLoaded = ref(false);

    const dialogPhaseState = ref(false);

    const uploadingFiles = ref(false);
    const uploadedFiles = ref(false);
    const errorUploadingFiles = ref(false);

    const allPhasesData = ref();
    const phaseStatus = ref({
      label: "",
      date: "",
      motive: "",
      bgColor: "",
    });

    const etapa1IsAcepted = ref(false);
    const etapa2IsAcepted = ref(false);
    const etapa3IsAcepted = ref(false);
    const etapa4IsAcepted = ref(false);
    const etapa5IsAcepted = ref(false);

    const etapa1IsValid = ref(false);
    const etapa2IsValid = ref(false);
    const etapa3IsValid = ref(false);
    const etapa4IsValid = ref(false);
    const etapa5IsValid = ref(false);

    const selectedCVFileName = ref("X");
    const selectedSeguroFileName = ref("X");
    const selectedCartaFileName = ref("X");
    const selectedAceptacionFileName = ref("X");
    const selectedReporteFileName = ref("X");
    const selectedRubricaFileName = ref("X");
    const selectedDictamenFileName = ref("X");
    const selectedProtestaFileName = ref("X");
    const selectedTerminacionFileName = ref("X");

    const documentsToSend = ref([]);

    function loadPhases() {
      console.log("Loading phases ...");
      api
        .post("http://localhost:3000/alumno/documentos", {
          idAlumno: idStudent,
        })
        .then((res) => {
          console.log(res.data);
          allPhasesData.value = res.data;
          if (res.data === "No se encontraron documentos" || res.data === "") {
            phaseStatus.value.label = "Sin comenzar";
            phaseStatus.value.bgColor = "#FFC107";
            phaseStatus.value.date = "";
            phaseStatus.value.motive = "";
            pageLoaded.value = true;
            return;
          }

          const phasesData = res.data.etapas;

          Object.keys(phasesData).map((key) => {
            let isAccepted;
            phasesData[key].estado === "Aceptada"
              ? (isAccepted = true)
              : (isAccepted = false);
            key === "1" ? (etapa1IsAcepted.value = isAccepted) : "";
            key === "2" ? (etapa2IsAcepted.value = isAccepted) : "";
            key === "3" ? (etapa3IsAcepted.value = isAccepted) : "";
            key === "4" ? (etapa4IsAcepted.value = isAccepted) : "";
            key === "5" ? (etapa5IsAcepted.value = isAccepted) : "";
          });

          console.log({
            "Etapa 1": etapa1IsAcepted.value,
            "Etapa 2": etapa2IsAcepted.value,
            "Etapa 3": etapa3IsAcepted.value,
            "Etapa 4": etapa4IsAcepted.value,
            "Etapa 5": etapa5IsAcepted.value,
          });

          loadPhaseState();

          pageLoaded.value = true;
        })
        .catch((err) => console.error(err));
    }

    function loadPhaseState(section = "") {
      console.log("Loading phase state");
      let actualSection = "";

      if (section) {
        if (section === 1) {
          console.log(section);
          phaseStatus.value.label = "Sin comenzar";
          phaseStatus.value.motive = "";
          phaseStatus.value.date = "";
          phaseStatus.value.bgColor = definePhaseColor("Sin comenzar");
          return;
        } else {
           console.log(section);
           console.log(typeof section === "string");
           if (section.toString().length > 1 && typeof section === "string"){
            console.log("Entra");
            actualSection = section.slice(-1);
           } else {
            console.log("Entra");
            actualSection = section.toString();
           }
        }
      } else {
        console.log("Entra");
        ctx.startApplication();
        actualSection = ctx.getCurrentSection().slice(-1);
      }
      console.log(actualSection);

      const phasesData = allPhasesData.value;
      console.log(phasesData);

      setFileName(actualSection, phasesData);
      console.log(allPhasesData.value.etapas);
      console.log(actualSection);
      console.log(allPhasesData.value.etapas[actualSection]);
      const dataActualSection = allPhasesData.value.etapas[actualSection];
      console.log(dataActualSection);

      if (dataActualSection === undefined) {
        phaseStatus.value.label = "Sin comenzar";
        phaseStatus.value.motive = "";
        phaseStatus.value.date = "";
        phaseStatus.value.bgColor = definePhaseColor("Sin comenzar");
        return;
      }

      const sectionState = dataActualSection.estado;
      const sectionMotive = dataActualSection.motivo;
      const sectionDate = formatDate(dataActualSection.fecha);

      phaseStatus.value.label = sectionState;
      phaseStatus.value.motive = sectionMotive;
      phaseStatus.value.date = sectionDate;
      phaseStatus.value.bgColor = definePhaseColor(sectionState);
    }

    function setFileName(actualSection, phasesData) {
      console.log(actualSection);
      console.log(phasesData);

      if (actualSection.toString() === '1') {
        phasesData.curriculum && phasesData.curriculum.archivo
          ? (selectedCVFileName.value = "✓")
          : (selectedCVFileName.value = "X");
        phasesData.nss && phasesData.nss.archivo
          ? (selectedSeguroFileName.value = "✓")
          : "X";
        phasesData.cpa && phasesData.cpa.archivo
          ? (selectedCartaFileName.value = "✓")
          : "X";
      } else if (actualSection.toString() === '2') {
        phasesData.caa && phasesData.caa.archivo
          ? (selectedAceptacionFileName.value = "✓")
          : (selectedAceptacionFileName.value = "X");
      } else if (actualSection.toString() === '3') {
        phasesData.reporte && phasesData.reporte.archivo
          ? (selectedReporteFileName.value = "✓")
          : (selectedReporteFileName.value = "");
      } else if (actualSection.toString() === '4') {
        phasesData.rubrica && phasesData.rubrica.archivo
          ? (selectedRubricaFileName.value = "✓")
          : (selectedRubricaFileName.value = "X");
        phasesData.dictamen && phasesData.dictamen.archivo
          ? (selectedDictamenFileName.value = "✓")
          : (selectedDictamenFileName.value = "X");
        phasesData.protesta && phasesData.protesta.archivo
          ? (selectedProtestaFileName.value = "✓")
          : (selectedProtestaFileName.value = "X");
      } else if (actualSection.toString() === '5') {
        phasesData.cta && phasesData.cta.archivo
          ? (selectedTerminacionFileName.value = "✓")
          : (selectedTerminacionFileName.value = "X");
      }
    }

    function searchAvailablePhases() {
      console.log("Searching available phases ...");
      api
        .get("http://localhost:3000/alumno/etapas")
        .then((res) => {
          console.log(res.data);
          const phases = res.data[0];
          Object.keys(phases).map((key) => {
            const phaseState = phases[key].estado;
            key === "etapa1" ? (etapa1IsValid.value = phaseState) : "";
            key === "etapa2" ? (etapa2IsValid.value = phaseState) : "";
            key === "etapa3" ? (etapa3IsValid.value = phaseState) : "";
            key === "etapa4" ? (etapa4IsValid.value = phaseState) : "";
            key === "etapa5" ? (etapa5IsValid.value = phaseState) : "";
          });
        })
        .catch((err) => console.error(err));
    }

    function formatDate(dateString) {
      const dateObj = new Date(dateString);
      return format(dateObj, "dd-MM-yyyy HH:mm:ss");
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

    onMounted(() => {
      searchAvailablePhases();
      loadPhases();
    });

    return {
      router,
      userStore,
      pageLoaded,
      phaseStatus,
      searchAvailablePhases,
      documentsToSend,
      etapa1IsValid,
      etapa2IsValid,
      etapa3IsValid,
      etapa4IsValid,
      etapa5IsValid,
      etapa1IsAcepted,
      etapa2IsAcepted,
      etapa3IsAcepted,
      etapa4IsAcepted,
      etapa5IsAcepted,
      formatDate,
      uploadedFiles,
      uploadingFiles,
      errorUploadingFiles,
      selectedCVFileName,
      selectedSeguroFileName,
      selectedCartaFileName,
      selectedAceptacionFileName,
      selectedReporteFileName,
      selectedRubricaFileName,
      selectedDictamenFileName,
      selectedProtestaFileName,
      selectedTerminacionFileName,
      dialogPhaseState,
      definePhaseColor,
      loadPhaseState,
      allPhasesData,
      setFileName,
    };
  },
  data() {
    return {
      filesUploaded: {
        cv: false,
        seguro: false,
        carta: false,
        aceptacion: false,
        reporte: false,
        rubrica: false,
        dictamen: false,
        protesta: false,
        terminacion: false,
      },
      selectedCVFileName: "",
      selectedSeguroFileName: "",
      selectedCartaFileName: "",
      selectedAceptacionFileName: "",
      selectedReporteFileName: "",
      selectedRubricaFileName: "",
      selectedDictamenFileName: "",
      selectedProtestaFileName: "",
      selectedTerminacionFileName: "",
      applicationStarted: false,
      currentSection: "",
      applicationFinish: false,
      showSections: false,
      etapa1Info: {
        // Campos de la etapa 1
      },
      etapa2Info: {
        // Campos de la etapa 2
      },
      etapa3Info: {
        // Campos de la etapa 3
      },
      etapa4Info: {
        // Campos de la etapa 4
      },
      etapa5Info: {
        // Campos de la etapa 5
      },
      etapa6Info: {
        // Campos de la etapa 6
      },
      etapa7Info: {
        // Campos de la etapa 7
      },
      etapa8Info: {
        // Campos de la etapa 8
      },
      etapa9Info: {
        // Campos de la etapa 9
      },
      selectedFileName: "",
      etapa1FilesUploaded: false,
      etapa2FilesUploaded: false,
      etapa3FilesUploaded: false,
      etapa4FilesUploaded: false,
      etapa5FilesUploaded: false,
    };
  },
  computed: {
    etapa1InfoIsValid() {
      return (
        this.filesUploaded.cv &&
        this.filesUploaded.seguro &&
        this.filesUploaded.carta
      );
    },
    etapa2InfoIsValid() {
      return this.filesUploaded.aceptacion;
    },
    etapa3InfoIsValid() {
      return this.filesUploaded.reporte;
    },
    etapa4InfoIsValid() {
      return (
        this.filesUploaded.rubrica &&
        this.filesUploaded.dictamen &&
        this.filesUploaded.protesta
      );
    },
    etapa5InfoIsValid() {
      return this.filesUploaded.terminacion;
    },
    etapa6InfoIsValid() {
      const { campo1, campo2, campo3 } = this.etapa6Info;
      return campo1 && campo2 && campo3; // Ejemplo de validación: campos no deben estar vacíos
    },
    etapa7InfoIsValid() {
      const { campo1, campo2, campo3 } = this.etapa7Info;
      return campo1 && campo2 && campo3; // Ejemplo de validación: campos no deben estar vacíos
    },
    etapa8InfoIsValid() {
      const { campo1, campo2, campo3 } = this.etapa8Info;
      return campo1 && campo2 && campo3; // Ejemplo de validación: campos no deben estar vacíos
    },
    etapa9InfoIsValid() {
      const { campo1, campo2, campo3 } = this.etapa9Info;
      return campo1 && campo2 && campo3; // Ejemplo de validación: campos no deben estar vacíos
    },
  },
  methods: {
    uploadDocuments(phase) {
      console.log("Uploading documents ...");
      this.uploadingFiles = true;
      const formData = new FormData();
      formData.append("idAlumno", this.userStore.user.id);
      formData.append("apellidoPaterno", this.userStore.user.apPaterno);
      formData.append("apellidoMaterno", this.userStore.user.apMaterno);
      formData.append("nombre", this.userStore.user.nombre);
      formData.append("etapa", phase);
      for (const documento of this.documentsToSend) {
        formData.append("archivos", documento);
      }
      api
        .post("http://localhost:3000/alumno/documentos/subir", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res.data);
          const phases = res.data.etapas;
          this.allPhasesData = { etapas: phases };
          this.loadPhaseState(phase);
          this.setFileName(phase, phases[phase]);
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
        });
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
</style>
