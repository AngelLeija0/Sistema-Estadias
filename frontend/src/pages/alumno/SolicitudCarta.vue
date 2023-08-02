<template>
  <UserNavbar></UserNavbar>
  <div v-if="pageLoaded">
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
          Solicitud de la Carta de Presentación
        </h1>
        <div
          :style="{
            backgroundColor: cpaState.color,
            color: 'white',
            padding: '10px',
            width: '300px',
            height: '50px',
            marginLeft: 'auto',
            marginRight: '200px',
            fontSize: '20px',
            borderRadius: '10px',
            display: 'flex',
            justifyContent: 'center',
            padding: '10px',
          }"
          v-if="!applicationStarted || applicationFinish"
        >
          <p>{{ cpaState.label }}</p>
          <q-btn
            v-if="cpaState.label === 'Rechazada'"
            flat
            color="white"
            icon="more_horiz"
            size="12px"
            style="margin: 0;"
            @click="dialogCpaState = true"
          ></q-btn>
          <q-dialog v-model="dialogCpaState">
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
                <div class="col-12 q-pa-sm">
                  <div
                    class="text-h6 text-center"
                    style="font-size: 22px; font-weight: 500"
                  >
                    Estado de carta presentación
                  </div>
                </div>
                <div class="col-12 q-pa-md q-mt-md">
                  <p style="font-size: 14px">
                    <span style="font-weight: 500">Estado: </span
                    >{{ cpaState.label }}
                  </p>
                  <p style="font-size: 14px">
                    <span style="font-weight: 500">Fecha de revisión: </span
                    >{{ cpaState.date }}
                  </p>
                  <p style="font-size: 14px">
                    <span style="font-weight: 500">Motivo: </span
                    >{{ cpaState.motive }}
                  </p>
                </div>
              </div>
            </q-card>
          </q-dialog>
        </div>
      </div>
      <p
        style="padding-left: 60px; font-size: 20px; padding-right: 60px"
        v-if="!applicationStarted"
      >
        En esta sección puedes verificar la información de tu carta de
        presentación, así como tener la posibilidad de modificarla y
        <br />
        ver el estado en la que se encuentra.
      </p>
    </div>
    <div
      class="container-fluid"
      v-show="showSections"
      v-if="applicationStarted && !applicationFinish"
      style="padding-left: 60px"
    >
      <div class="row">
        <div class="col">
          <h2
            :class="{ 'active-section': currentSection === 'personal' }"
            class="section-title"
          >
            <span class="circle" style="font-size: 24px">1</span> Datos
            personales
            <div
              class="progress-bar"
              :style="{
                width:
                  currentSection === 'personal' ||
                  currentSection === 'academic' ||
                  currentSection === 'company' ||
                  currentSection === 'confirmation'
                    ? '100%'
                    : '0',
              }"
            ></div>
          </h2>
        </div>

        <div class="col">
          <h2
            :class="{ 'active-section': currentSection === 'academic' }"
            class="section-title"
          >
            <span class="circle" style="font-size: 24px">2</span> Datos
            académicos
            <div
              class="progress-bar"
              :style="{
                width:
                  currentSection === 'academic' ||
                  currentSection === 'company' ||
                  currentSection === 'confirmation'
                    ? '100%'
                    : '0',
              }"
            ></div>
          </h2>
        </div>

        <div class="col">
          <h2
            :class="{ 'active-section': currentSection === 'company' }"
            class="section-title"
          >
            <span class="circle" style="font-size: 24px; margin-right: 10px"
              >3</span
            >
            Datos de la empresa
            <div
              class="progress-bar"
              :style="{
                width:
                  currentSection === 'company' ||
                  currentSection === 'confirmation'
                    ? '100%'
                    : '0',
              }"
            ></div>
          </h2>
        </div>

        <div class="col">
          <h2
            :class="{ 'active-section': currentSection === 'confirmation' }"
            class="section-title"
          >
            <span class="circle" style="font-size: 24px; margin-right: 10px"
              >4</span
            >
            Confirmación
            <div
              class="progress-bar"
              :style="{
                width: currentSection === 'confirmation' ? '100%' : '0',
              }"
            ></div>
          </h2>
        </div>
      </div>
    </div>

    <p
      style="font-size: 35px; text-align: left; margin-left: 90px"
      v-if="currentSection === 'confirmation'"
    >
      Confirmación
    </p>
    <p
      style="font-size: 18px; text-align: left; margin-left: 90px"
      v-if="currentSection === 'confirmation'"
    >
      Asegurate que todos los datos estan correctos. En caso de querer modificar
      algun dato, puedes oprimir el boton de regresar para navegar a esa
      sección.
    </p>
    <div class="container-fluid text-center">
      <p
        v-if="
          !applicationStarted && !showSections && currentSection !== 'final'
        "
        style="margin-top: 100px; font-size: 20px"
      >
        Aun no se ha realizado ninguna solicitud
      </p>
      <q-btn
        color="black"
        label="Comenzar solicitud"
        class="btn btn-primary"
        @click="startApplication"
        v-if="!applicationStarted && currentSection !== 'final'"
        style="
          color: white;
          border-radius: 20px;
          width: 300px;
          height: 100px;
          font-size: 22px;
        "
      />
    </div>
    <div class="container-fluid" style="padding-left: 60px">
      <form
        @submit.prevent="submitPersonalInfo"
        v-if="currentSection === 'personal'"
      >
        <!-- Campos del formulario de datos personales -->
        <div class="form-row">
          <div class="form-group">
            <label for="firstName">Nombres(s):</label>
            <q-input
              type="text"
              id="firstName"
              v-model="personalInfo.firstName"
              :rules="firstNameRules"
              required
            />
          </div>

          <div class="form-group">
            <label for="lastName">Apellido paterno:</label>
            <q-input
              type="text"
              id="lastName"
              v-model="personalInfo.lastName"
              :rules="lastNameRules"
              required
            />
          </div>

          <div class="form-group">
            <label for="middleName">Apellido materno:</label>
            <q-input
              type="text"
              id="middleName"
              v-model="personalInfo.middleName"
              :rules="middleNameRules"
              required
            />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="mobilePhone">Número de teléfono celular:</label>
            <q-input
              type="tel"
              id="mobilePhone"
              v-model="personalInfo.mobilePhone"
              :rules="mobilePhoneRules"
              required
            />
          </div>
          <div class="form-group">
            <label for="homePhone">Número de teléfono de casa:</label>
            <q-input
              type="tel"
              id="homePhone"
              v-model="personalInfo.homePhone"
              :rules="homePhoneRules"
            />
          </div>

          <div class="form-group">
            <label for="insuranceNumber">Número de seguro facultativo:</label>
            <q-input
              type="text"
              id="insuranceNumber"
              v-model="personalInfo.insuranceNumber"
              :rules="insuranceNumberRules"
            />
          </div>

          <div class="form-group">
            <label for="curp">CURP:</label>
            <q-input
              type="text"
              id="curp"
              v-model="personalInfo.curp"
              :rules="curpRules"
              required
            />
          </div>
        </div>

        <!-- Botón para pasar a la siguiente sección -->
        <div class="text-center" style="position: relative; bottom: 20px">
          <button
            style="
              color: white;
              border-radius: 20px;
              width: 140px;
              height: 50px;
              font-size: 20px;
              background-color: black;
            "
            class="btn btn-primary"
            :disabled="!personalInfoIsValid"
          >
            SIGUIENTE
          </button>
        </div>
      </form>

      <form
        v-if="currentSection === 'academic'"
        @submit.prevent="submitAcademicInfo"
      >
        <div class="form-row">
          <div class="form-group">
            <label for="studentId">Matrícula:</label>
            <q-input
              type="text"
              id="studentId"
              v-model="academicInfo.studentId"
              :rules="matriculaRules"
              required
              disable
            ></q-input>
          </div>
          <div class="form-group">
            <label for="institutionEmail">Correo Institucional</label>
            <q-input
              type="text"
              id="institutionEmail"
              v-model="academicInfo.institutionEmail"
              :rules="institutionEmailRules"
              required
              disable
            ></q-input>
          </div>

          <div class="form-group">
            <label for="career">Carrera:</label>
            <q-select
              class="custom-select"
              id="career"
              v-model="academicInfo.career"
              :options="careerOptions"
              @input="handleCareerChange"
              dense
              :rules="careerRules"
              required
              disable
            />
          </div>

          <div class="form-group">
            <label for="area">Área:</label>
            <q-select
              class="custom-select"
              id="area"
              v-model="academicInfo.area"
              :options="filteredAreaOptions"
              dense
              :rules="areaRules"
              required
              disable
            />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="degree">Grado:</label>
            <q-select
              class="custom-select"
              id="degree"
              v-model="academicInfo.degree"
              :options="degreeOptions"
              dense
              :rules="degreeRules"
              required
              disable
            />
          </div>

          <div class="form-group">
            <label for="group">Grupo:</label>
            <q-select
              class="custom-select"
              id="group"
              v-model="academicInfo.group"
              :options="groupOptions"
              dense
              :rules="groupRules"
              disable
            />
          </div>

          <div class="form-group">
            <label for="shift">Turno:</label>
            <q-select
              class="custom-select"
              id="shift"
              v-model="academicInfo.shift"
              :options="shiftOptions"
              dense
              :rules="shiftRules"
              disable
            />
          </div>

          <div class="form-group">
            <label for="period">Período:</label>
            <q-select
              class="custom-select"
              id="period"
              v-model="academicInfo.period"
              :options="periodOptions"
              dense
              disable
            />
          </div>

          <div class="form-group">
            <label for="year">Año:</label>
            <q-select
              class="custom-select"
              id="year"
              v-model="academicInfo.year"
              :options="yearOptions"
              dense
              disable
            />
          </div>
        </div>
        <div class="text-center">
          <button
            style="
              color: white;
              border-radius: 20px;
              width: 140px;
              height: 50px;
              font-size: 20px;
              background-color: black;
            "
            class="btn btn-primary"
            @click="goToPersonalSection"
          >
            REGRESAR
          </button>
          <button
            style="
              color: white;
              border-radius: 20px;
              width: 140px;
              height: 50px;
              font-size: 20px;
              background-color: black;
            "
            class="btn btn-primary"
            :disabled="!academicInfoIsValid"
          >
            SIGUIENTE
          </button>
        </div>
      </form>
      <form
        v-if="currentSection === 'company'"
        @submit.prevent="submitCompanyInfo"
      >
        <!-- Campos del formulario de datos de la empresa -->
        <div class="form-row">
          <div class="form-group">
            <label for="companyName">Empresa:</label>
            <q-input
              type="text"
              id="companyName"
              v-model="companyInfo.companyName"
              :rules="companyNameRules"
              required
            />
          </div>

          <div class="form-group">
            <label for="targetPerson">A quien va dirigido:</label>
            <q-input
              type="text"
              id="targetPerson"
              v-model="companyInfo.targetPerson"
              :rules="targetPersonRules"
              required
            />
            <small v-if="companyInfo.targetPerson" class="text-muted"
              >Ejemplo: Ing. Manuel Hernández.</small
            >
          </div>

          <div class="form-group">
            <label for="position">Puesto de la persona:</label>
            <q-input
              type="text"
              id="position"
              v-model="companyInfo.position"
              :rules="positionRules"
              required
            />
            <small v-if="companyInfo.position" class="text-muted"
              >Ejemplo: Ing. en Sistemas, Dr. en Medicina, Lic. en
              Administración, etc.</small
            >
          </div>
        </div>

        <!-- Botón para finalizar la solicitud -->
        <div class="text-center">
          <button
            class="btn btn-secondary text-center"
            @click="goToAcademicSection"
            style="
              color: white;
              border-radius: 20px;
              width: 140px;
              height: 50px;
              font-size: 20px;
              background-color: black;
            "
          >
            REGRESAR
          </button>
          <button
            class="btn btn-primary text-center"
            :disabled="!companyInfoIsValid"
            style="
              color: white;
              border-radius: 20px;
              width: 140px;
              height: 50px;
              font-size: 20px;
              background-color: black;
            "
          >
            SIGUIENTE
          </button>
        </div>
      </form>
      <div class="container" style="display: flex">
        <table
          v-if="currentSection === 'confirmation'"
          class="table table-hover table-borderless"
          style="flex: 1; margin-left: 30px"
        >
          <thead>
            <tr style="font-size: 14px">
              <th>Nombre</th>
              <th>Apellido materno</th>
              <th>Apellido paterno</th>
              <th>Celular</th>
              <th>Teléfono casa</th>
              <th>Seguro facultativo</th>
              <th>CURP</th>
            </tr>
          </thead>
          <tbody>
            <tr style="font-size: 14px">
              <td>{{ personalInfo.firstName }}</td>
              <td>{{ personalInfo.lastName }}</td>
              <td>{{ personalInfo.middleName }}</td>
              <td>{{ personalInfo.mobilePhone }}</td>
              <td>{{ personalInfo.homePhone }}</td>
              <td>{{ personalInfo.insuranceNumber }}</td>
              <td>{{ personalInfo.curp }}</td>
            </tr>
          </tbody>
        </table>
        <table
          v-if="currentSection === 'confirmation'"
          class="table table-hover table-borderless"
          style="flex: 1; margin-right: 80px"
        >
          <thead>
            <tr style="font-size: 14px">
              <th>Matricula</th>
              <th>Correo Institucional</th>
              <th>Carrera</th>
              <th>Area</th>
              <th>Grado</th>
              <th>Grupo</th>
              <th>Turno</th>
              <th>Periodo</th>
              <th>Año</th>
            </tr>
          </thead>
          <tbody>
            <tr style="font-size: 14px">
              <td>{{ academicInfo.studentId }}</td>
              <td>{{ academicInfo.institutionEmail }}</td>
              <td>{{ academicInfo.career }}</td>
              <td>{{ academicInfo.area }}</td>
              <td>{{ academicInfo.degree }}</td>
              <td>{{ academicInfo.group }}</td>
              <td>{{ academicInfo.shift }}</td>
              <td>{{ academicInfo.period }}</td>
              <td>{{ academicInfo.year }}</td>
            </tr>
          </tbody>
        </table>
        <table
          v-if="currentSection === 'confirmation'"
          class="table table-hover table-borderless"
          style="flex: 1; margin-right: 80px; margin-left: 30px"
        >
          <thead>
            <tr style="font-size: 14px">
              <th style="padding: 10px">Nombre de la empresa</th>
              <th style="padding: 10px">A quien va dirigido</th>
              <th style="padding: 10px">Puesto de la persona</th>
            </tr>
          </thead>
          <tbody>
            <tr style="font-size: 14px">
              <td style="padding: 10px">{{ companyInfo.companyName }}</td>
              <td style="padding: 10px">{{ companyInfo.targetPerson }}</td>
              <td style="padding: 10px">{{ companyInfo.position }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        style="display: flex; justify-content: center"
        v-if="currentSection === 'confirmation'"
      >
        <q-btn
          color="black"
          label="Regresar"
          class="btn btn-primary"
          style="
            color: white;
            border-radius: 20px;
            width: 130px;
            height: 5px;
            font-size: 18px;
          "
          @click="goToCompanySection"
        />
        <q-btn
          color="black"
          label="siguiente"
          class="btn btn-primary"
          style="
            color: white;
            border-radius: 20px;
            width: 130px;
            height: 5px;
            font-size: 18px;
          "
          @click="finishApplication"
        />
      </div>
      <div class="container" style="display: flex">
        <!-- Código agregado -->
        <!-- Fin del código agregado -->

        <table
          v-if="currentSection === 'final'"
          class="table table-hover table-borderless"
          style="flex: 1; margin-left: 30px"
        >
          <thead>
            <tr style="font-size: 14px">
              <th>Nombre</th>
              <th>Apellido materno</th>
              <th>Apellido paterno</th>
              <th>Celular</th>
              <th>Teléfono casa</th>
              <th>Seguro facultativo</th>
              <th>CURP</th>
            </tr>
          </thead>
          <tbody>
            <tr style="font-size: 14px">
              <td>{{ personalInfo.firstName }}</td>
              <td>{{ personalInfo.lastName }}</td>
              <td>{{ personalInfo.middleName }}</td>
              <td>{{ personalInfo.mobilePhone }}</td>
              <td>{{ personalInfo.homePhone }}</td>
              <td>{{ personalInfo.insuranceNumber }}</td>
              <td>{{ personalInfo.curp }}</td>
            </tr>
          </tbody>
        </table>
        <table
          v-if="currentSection === 'final'"
          class="table table-hover table-borderless"
          style="flex: 1; margin-right: 80px"
        >
          <thead>
            <tr style="font-size: 14px">
              <th>Matricula</th>
              <th>Correo Institucional</th>
              <th>Area</th>
              <th>Grado</th>
              <th>Grupo</th>
              <th>Turno</th>
              <th>Periodo</th>
              <th>Año</th>
            </tr>
          </thead>
          <tbody>
            <tr style="font-size: 14px">
              <td>{{ academicInfo.studentId }}</td>
              <td>{{ academicInfo.institutionEmail }}</td>
              <td>{{ academicInfo.area }}</td>
              <td>{{ academicInfo.degree }}</td>
              <td>{{ academicInfo.group }}</td>
              <td>{{ academicInfo.shift }}</td>
              <td>{{ academicInfo.period }}</td>
              <td>{{ academicInfo.year }}</td>
            </tr>
          </tbody>
        </table>
        <table
          v-if="currentSection === 'final'"
          class="table table-hover table-borderless"
          style="flex: 1; margin-right: 80px; margin-left: 30px"
        >
          <thead>
            <tr style="font-size: 14px">
              <th style="padding: 10px">Empresa</th>
              <th style="padding: 10px">A quien va dirigido</th>
              <th style="padding: 10px">Puesto de la persona</th>
            </tr>
          </thead>
          <tbody>
            <tr style="font-size: 14px">
              <td style="padding: 10px">{{ companyInfo.companyName }}</td>
              <td style="padding: 10px">{{ companyInfo.targetPerson }}</td>
              <td style="padding: 10px">{{ companyInfo.position }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="text-center">
        <q-btn
          color="black"
          label="Modificar solicitud"
          class="btn btn-primary"
          style="
            color: white;
            border-radius: 20px;
            width: 230px;
            height: 70px;
            font-size: 18px;
            margin-top: 60px;
          "
          @click="startApplication"
          :disable="cpaState.label === 'Aceptada'"
          v-if="currentSection === 'final'"
        />
      </div>
    </div>
  </div>
  <div v-else>
    <LoadingPage></LoadingPage>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "src/stores/user-store";
import { api } from "src/boot/axios";
import { format } from "date-fns";
import UserNavbar from "src/components/UserNavbar.vue";
import LoadingPage from "src/components/LoadingPage.vue";

export default defineComponent({
  name: "alumno-solicitudCarta",
  components: {
    UserNavbar,
    LoadingPage,
  },
  setup() {
    const router = useRouter();
    const userStore = useUserStore();
    const pageLoaded = ref(false);

    const dialogCpaState = ref(false);
    const cpaState = ref({
      label: "",
      color: "",
      motive: "",
      date: "",
    });
    const currentSection = ref();

    const student = userStore.getUser;
    const idStudent = student.id;
    const studentAcademicInfo = ref(null);

    const personalInfo = ref({
      firstName: "",
      lastName: "",
      middleName: "",
      mobilePhone: "",
      homePhone: "",
      insuranceNumber: "",
      curp: "",
    });
    const academicInfo = ref({
      studentId: "",
      institutionEmail: "",
      area: "Seleccionar",
      career: "Seleccionar",
      degree: "Seleccionar",
      group: "Seleccionar",
      shift: "Seleccionar",
      period: "Seleccionar", // Campo de período
      year: new Date().getFullYear().toString(), // Generar el año actual automáticamente
      academicLevel: "",
    });
    const companyInfo = ref({
      companyName: "",
      targetPerson: "",
      position: "",
    });

    function searchAllStudentInfo() {
      api
        .post(`http://localhost:3000/alumno/id`, {
          id: idStudent,
        })
        .then((res) => {
          console.log(res.data);
          const data = res.data;
          studentAcademicInfo.value = data.datosAcademicos;
          academicInfo.value.studentId = data.datosPersonales.privado.matricula;
          academicInfo.value.institutionEmail =
            data.datosPersonales.privado.email;
          academicInfo.value.area = data.datosAcademicos.area;
          academicInfo.value.career = data.datosAcademicos.carrera;
          academicInfo.value.degree = data.datosAcademicos.grado;
          academicInfo.value.group = data.datosAcademicos.grupo;
          academicInfo.value.shift = data.datosAcademicos.turno;
          academicInfo.value.academicLevel = data.datosAcademicos.nivelAcademico;
        })
        .catch((err) => {
          console.error(err);
        });
    }

    function searchState() {
      console.log("Searching state ...");
      api
        .post(`http://localhost:3000/alumno/cpa`, {
          idAlumno: idStudent,
        })
        .then((res) => {
          pageLoaded.value = true;
          if (res.data === "No se encontro ninguna carta presentacion") {
            cpaState.value.label = "Sin comenzar";
            cpaState.value.color = definePhaseColor(cpaState.value.label);
          } else {
            const cpa = res.data;

            cpaState.value.label = cpa.estado.nombre;
            cpaState.value.color = definePhaseColor(cpa.estado.nombre);
            cpaState.value.motive = cpa.estado.motivo;
            cpaState.value.date = formatDate(cpa.estado.fecha);

            currentSection.value = "final";

            personalInfo.value.firstName = cpa.datosAlumno.nombres.nombre;
            personalInfo.value.lastName = cpa.datosAlumno.nombres.apPaterno;
            personalInfo.value.middleName = cpa.datosAlumno.nombres.apMaterno;
            personalInfo.value.mobilePhone = cpa.datosAlumno.telefonoCelular;
            personalInfo.value.homePhone = cpa.datosAlumno.telefonoCasa;
            personalInfo.value.insuranceNumber = cpa.datosAlumno.nss;
            personalInfo.value.curp = cpa.datosAlumno.curp;

            academicInfo.value.studentId = cpa.datosAlumno.privado.matricula;
            academicInfo.value.institutionEmail = cpa.datosAlumno.privado.email;
            academicInfo.value.area =
              cpa.datosAcademicos.datosAcademicosAlumno.area;
            academicInfo.value.career =
              cpa.datosAcademicos.datosAcademicosAlumno.carrera;
            academicInfo.value.degree =
              cpa.datosAcademicos.datosAcademicosAlumno.grado;
            academicInfo.value.group =
              cpa.datosAcademicos.datosAcademicosAlumno.grupo;
            academicInfo.value.shift =
              cpa.datosAcademicos.datosAcademicosAlumno.turno;
            academicInfo.value.period = cpa.datosAcademicos.periodo;
            academicInfo.value.year = cpa.datosAcademicos.año;

            companyInfo.value.companyName = cpa.datosEmpresa.nombreEmpresa;
            companyInfo.value.targetPerson = cpa.datosEmpresa.nombreEmpresario;
            companyInfo.value.position = cpa.datosEmpresa.puestoEmpresario;
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }

    function submitCPA(action) {
      try {
        let url = "";

        const cpa = {
          estado: {
            nombre: "En revisión",
            motivo: "Ninguno",
            "fecha": new Date(),
          },
          datosAlumno: {
            nombres: {
              nombre: this.personalInfo.firstName,
              apPaterno: this.personalInfo.lastName,
              apMaterno: this.personalInfo.middleName,
            },
            privado: {
              matricula: this.academicInfo.studentId,
              email: this.academicInfo.institutionEmail,
            },
            telefonoCelular: this.personalInfo.mobilePhone,
            telefonoCasa: this.personalInfo.homePhone,
            nss: this.personalInfo.insuranceNumber,
            curp: this.personalInfo.curp,
          },
          datosAcademicos: {
            datosAcademicosAlumno: {
              nivelAcademico: this.academicInfo.academicLevel,
              turno: this.academicInfo.shift,
              carrera: this.academicInfo.career,
              area: this.academicInfo.area,
              grado: this.academicInfo.degree,
              grupo: this.academicInfo.group,
            },
            periodo: this.academicInfo.period,
            año: this.academicInfo.year,
          },
          datosEmpresa: {
            nombreEmpresa: this.companyInfo.companyName,
            nombreEmpresario: this.companyInfo.targetPerson,
            puestoEmpresario: this.companyInfo.position,
          },
          fechaRegistro: new Date().toISOString,
        };
        console.log(cpa);
        console.log(action);
        if (action === "create") {
          url = "http://localhost:3000/alumno/cpa/crear";
          api
            .post(url, {
              idAlumno: idStudent,
              cartaPresentacion: cpa,
            })
            .then((res) => {
              console.log(res.data);
              if (Object.keys(res.data) === 0 || res.data === {}) {
                console.log("CPA agregado correctamente");
              }
            })
            .catch((err) => {
              console.error(err);
            });
        } else if (action === "update") {
          url =
            "http://localhost:3000/alumno/cpa/modificar";
          api
            .patch(url, {
              idAlumno: idStudent,
              cartaPresentacion: cpa,
            })
            .then((res) => {
              console.log(res.data);
              if (Object.keys(res.data) === 0 || res.data === {}) {
                console.log("CPA modifcado correctamente");
              }
            })
            .catch((err) => {
              console.error(err);
            });
        }
      } catch (error) {
        console.log(error);
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

    onMounted(() => {
      searchAllStudentInfo();
      searchState();
    });

    return {
      router,
      pageLoaded,
      cpaState,
      searchState,
      submitCPA,
      currentSection,
      personalInfo,
      academicInfo,
      companyInfo,
      definePhaseColor,
      formatDate,
      dialogCpaState,
      searchAllStudentInfo,
      studentAcademicInfo,
    };
  },
  data() {
    return {
      applicationStarted: false,
      applicationFinish: false,
      showSections: false,
      matriculaRules: [
        (v) => !!v || "La matrícula es requerida",
        (v) =>
          (/^[a-zA-Z0-9]+$/.test(v) && v.length === 10) ||
          "Ingresa una matrícula válida (10 caracteres alfanuméricos sin espacios)",
      ],
      institutionEmailRules: [
        (v) => !!v || "El correo institucional es requerido",
        (v) =>
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v) ||
          "Ingresa un correo institucional válido",
        (v) =>
          /@uttn\.mx$/.test(v) ||
          "El correo institucional debe tener el dominio @uttn.mx",
      ],
      careerRules: [
        (v) => !!v || "La carrera es requerida",
        (v) => v !== "Seleccionar" || "Selecciona una carrera válida",
      ],
      areaRules: [
        (v) => !!v || "El área es requerida",
        (v) => v !== "Seleccionar" || "Selecciona un área válida",
      ],
      degreeRules: [
        (v) => !!v || "El grado es requerido",
        (v) => v !== "Seleccionar" || "Selecciona un grado válido",
      ],
      groupRules: [
        (v) => !!v || "El grupo es requerido", // Validación: Seleccionar una opción
        (v) => v !== "Seleccionar" || "Selecciona un grupo válido",
      ],
      shiftRules: [
        (v) => !!v || "El turno es requerido", // Validación: Seleccionar una opción
        (v) => v !== "Seleccionar" || "Selecciona un turno válido",
      ],
      firstNameRules: [
        (v) => !!v || "El nombre es requerido",
        (v) =>
          /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/.test(v) || "Ingresa un nombre válido",
      ],
      lastNameRules: [
        (v) => !!v || "El apellido paterno es requerido",
        (v) =>
          /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]+$/.test(v) ||
          "Ingresa un apellido paterno válido (sin espacios)",
      ],
      middleNameRules: [
        (v) => !!v || "El apellido materno es requerido",
        (v) =>
          /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]+$/.test(v) ||
          "Ingresa un apellido materno válido (sin espacios)",
      ],
      mobilePhoneRules: [
        (v) => !!v || "El número de teléfono celular es requerido",
        (v) =>
          /^[0-9]{10}$/.test(v) ||
          "Ingresa un número de teléfono celular válido (10 dígitos)",
      ],
      homePhoneRules: [
        (v) =>
          /^[0-9]{10}$/.test(v) ||
          "Ingresa un número de teléfono de casa válido (10 dígitos)",
      ],
      insuranceNumberRules: [
        (v) =>
          /^[0-9]{8}$/.test(v) ||
          "Ingresa un número de seguro facultativo válido (8 dígitos)",
      ],
      curpRules: [
        (v) =>
          /^[A-Z]{4}\d{6}[HM]{1}[A-Z]{5}[A-Z0-9]{2}$/.test(v) ||
          "Ingresa una CURP válida",
      ],

      companyNameRules: [
        (v) => !!v || "El nombre de la empresa es requerido",
        (v) => /^[a-zA-Z\s]+$/.test(v) || "Ingresa un nombre de empresa válido",
      ],
      targetPersonRules: [
        (v) => !!v || 'El campo "A quien va dirigido" es requerido',
        (v) =>
          /^[a-zA-Z\s.]+$/.test(v) ||
          'Ingresa un valor válido para "A quien va dirigido"',
        (v) =>
          /^(Dr\.|Ing\.|Lic\.|C\.?I\.?|M\.?C\.?|Dra\.|Mtro\.|Mtra\.)\s/.test(
            v + " "
          ) ||
          'El campo "A quien va dirigido" debe comenzar con un prefijo válido seguido de un punto',
      ],
      positionRules: [
        (v) => !!v || 'El campo "Puesto de la persona" es requerido',
        (v) =>
          /^[a-zA-Z\s.]+$/.test(v) ||
          'Ingresa un valor válido para "Puesto de la persona"',
        (v) =>
          /^(Ing\.|Lic\.|Dr\.|Jefe|Gerente|Analista|Supervisor|Director|Coordinador|Asesor|Consultor|Técnico|Especialista)\s/.test(
            v
          ) ||
          'El campo "Puesto de la persona" debe comenzar con una abreviatura de puesto válida seguida de un punto',
      ],
      periodOptions: [], // Opciones de períodos
      areaOptions: [
        {
          career: "Administración",
          areas: [
            "Seleccionar",
            "Formulación y Evaluación de Proyectos",
            "Capital Humano",
          ],
        },
        {
          career: "Mantenimiento",
          areas: ["Seleccionar", "Industrial", "Petróleo"],
        },
        {
          career: "Mecatrónica",
          areas: [
            "Seleccionar",
            "Automatización",
            "Sistemas de Manufactura Flexible",
            "Instalaciones Eléctricas Eficientes",
          ],
        },
        {
          career: "Energías Renovables",
          areas: ["Seleccionar", "Calidad y Ahorro de Energía"],
        },
        {
          career: "Procesos y Operaciones Industriales",
          areas: ["Seleccionar", "Manufactura", "Plásticos"],
        },
        {
          career: "Tecnologías de la Información",
          areas: [
            "Seleccionar",
            "Desarrollo de Software Multiplataforma",
            "Entornos Virtuales y Negocios Digitales",
          ],
        },
      ],
      careerOptions: [
        "Seleccionar",
        "Administración",
        "Mantenimiento",
        "Tecnologías de la Información",
        "Mecatrónica",
        "Energías Renovables",
        "Procesos y Operaciones Industriales",
      ],
      degreeOptions: ["Seleccionar", "6to", "11vo"],
      groupOptions: ["Seleccionar", "A", "B", "C", "D", "E", "F", "G", "H"],
      shiftOptions: ["Seleccionar", "Matutino", "Vespertino"],
      // yearOptions: generateYearOptions()
    };
  },
  computed: {
    personalInfoIsValid() {
      return (
        this.personalInfo.firstName !== "" &&
        this.personalInfo.lastName !== "" &&
        this.personalInfo.middleName !== "" &&
        this.personalInfo.mobilePhone !== "" &&
        this.personalInfo.homePhone !== "" &&
        this.personalInfo.insuranceNumber !== "" &&
        this.personalInfo.curp !== ""
      );
    },
    academicInfoIsValid() {
      return (
        this.academicInfo.studentId !== "" &&
        this.academicInfo.institutionEmail !== "" &&
        this.academicInfo.career !== "Seleccionar" &&
        this.academicInfo.area !== "Seleccionar" &&
        this.academicInfo.group !== "Seleccionar" &&
        this.academicInfo.shift !== "Seleccionar" &&
        this.academicInfo.degree !== "Seleccionar" &&
        this.academicInfo.period !== "Seleccionar" &&
        this.academicInfo.year !== "Seleccionar"
      );
    },
    companyInfoIsValid() {
      return (
        this.companyInfo.companyName !== "" &&
        this.companyInfo.targetPerson !== "" &&
        this.companyInfo.position !== ""
      );
    },
    filteredAreaOptions() {
      const selectedCareerObject = this.areaOptions.find(
        (option) => option.career === this.academicInfo.career
      );
      return selectedCareerObject ? selectedCareerObject.areas : [];
    },
  },
  mounted() {
    const currentMonth = new Date().getMonth(); // Obtener el mes actual (0-11)

    if (currentMonth >= 0 && currentMonth <= 3) {
      // Enero - Abril
      this.academicInfo.period = "enero-abril";
    } else if (currentMonth >= 4 && currentMonth <= 7) {
      // Mayo - Agosto
      this.academicInfo.period = "mayo-agosto";
    } else {
      // Septiembre - Diciembre
      this.academicInfo.period = "septiembre-diciembre";
    }

    // Generar las opciones de períodos
    this.periodOptions = [
      { label: "Enero - Abril", value: "enero-abril" },
      { label: "Mayo - Agosto", value: "mayo-agosto" },
      { label: "Septiembre - Diciembre", value: "septiembre-diciembre" },
    ];
  },
  // Resto de los métodos y reglas de validación
  methods: {
    toBack() {
      this.router.go(-1);
    },
    startApplication() {
      this.applicationStarted = true;
      this.showSections = true;
      this.currentSection = "personal";
    },
    finishApplication() {
      this.applicationFinish = true;
      this.showSections = true;
      this.currentSection = "final";
      if (this.cpaState.label === "Sin comenzar") {
        this.submitCPA("create");
      } else {
        this.submitCPA("update");
      }
    },
    submitPersonalInfo() {
      if (this.personalInfoIsValid) {
        this.currentSection = "academic";
      }
    },
    submitAcademicInfo() {
      if (this.academicInfoIsValid) {
        this.currentSection = "company";
      }
    },
    submitCompanyInfo() {
      if (this.companyInfoIsValid) {
        this.currentSection = "confirmation";
      }
    },
    goToPersonalSection() {
      this.currentSection = "personal";
    },
    goToAcademicSection() {
      this.currentSection = "academic";
    },
    goToCompanySection() {
      this.currentSection = "company";
    },
    handleCareerChange() {
      // Reset the selected area when the career changes
      this.academicInfo.area = "Seleccionar";
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
.table {
  width: 100%;
  border-collapse: collapse;
  font-family: Arial, sans-serif;
  margin-bottom: 20px;
}

.table th,
.table td {
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid #ddd;
}

.table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.container table {
  flex: 0 0 calc(33.33% - 20px);
  margin: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out;
}

.container table:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.container table thead th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.container table tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

.container table td {
  vertical-align: middle;
}
</style>
