<template>
  <div>
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
  </div>
  <div v-if="pageLoaded">
    <div>
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
            "
          >
            Anteproyecto
          </h1>
          <div
            :style="{
              backgroundColor: projectState.color,
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
            }"
            v-if="!applicationStarted || applicationFinish"
          >
            <p>{{ projectState.label }}</p>
            <q-btn
              v-if="projectState.label === 'Rechazada'"
              flat
              color="white"
              icon="more_horiz"
              size="12px"
              style="margin: 0;"
              @click="dialogProjectState = true"
            ></q-btn>
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
                  <div class="col-12 q-pa-sm">
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
                      <span style="font-weight: 500">Fecha de revisión: </span
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
          </div>
        </div>
        <p
          style="padding-left: 60px; font-size: 20px; padding-right: 60px"
          v-if="!applicationStarted || currentSection === 'final'"
        >
          En esta seccion puedes verificar la informacion de tu anteproyecto,
          asi como tener la posibilidad de modificarla y ver el
          <br />
          estado en la que se encuentra.
        </p>
      </div>
    </div>
    <div
      class="container-fluid"
      v-show="showSections"
      v-if="!applicationFinish"
      style="padding-left: 60px"
    >
      <div class="row">
        <div class="col">
          <h2
            :class="{ 'active-section': currentSection === 'personal' }"
            class="section-title"
          >
            <span class="circle" style="font-size: 24px">1</span> Datos del
            asesor academico
            <div
              class="progress-bar"
              :style="{
                width:
                  currentSection === 'AcademicAdvisor' ||
                  currentSection === 'BusinessAdvisor' ||
                  currentSection === 'project' ||
                  currentSection === 'confirmation'
                    ? '100%'
                    : '0',
              }"
            ></div>
          </h2>
        </div>

        <div class="col">
          <h2
            :class="{ 'active-section': currentSection === 'BusinessAdvisor' }"
            class="section-title"
          >
            <span class="circle" style="font-size: 24px">2</span> Datos del
            asesor empresarial
            <div
              class="progress-bar"
              :style="{
                width:
                  currentSection === 'BusinessAdvisor' ||
                  currentSection === 'project' ||
                  currentSection === 'confirmation'
                    ? '100%'
                    : '0',
              }"
            ></div>
          </h2>
        </div>

        <div class="col">
          <h2
            :class="{ 'active-section': currentSection === 'project' }"
            class="section-title"
          >
            <span class="circle" style="font-size: 24px; margin-right: 10px"
              >3</span
            >
            Datos del proyecto
            <div
              class="progress-bar"
              :style="{
                width:
                  currentSection === 'project' ||
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
          !applicationStarted && !showSections && !currentSection === 'final'
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
        v-if="currentSection === 'AcademicAdvisor'"
      >
        <!-- Campos del formulario de datos personales -->
        <div class="form-row">
          <div class="form-group" style="padding-right: 50%">
            <q-select
              filled
              v-model="advisor"
              :options="advisorOptions"
              @update:model-value="loadAdvisor()"
              label="Selecciona un asesor academico"
              color="black"
            />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="curp">Nombre completo:</label>
            <q-input
              type="text"
              id="firstName"
              v-model="personalInfo.fullname"
              :rules="fullnameRules"
              disable
            />
          </div>
          <div class="form-group">
            <label for="curp">Correo electrónico:</label>
            <q-input
              type="text"
              id="lastName"
              v-model="personalInfo.email"
              :rules="emailRules"
              disable
            />
          </div>
          <div class="form-group">
            <label for="curp">Teléfono celular:</label>
            <q-input
              type="text"
              id="middleName"
              v-model="personalInfo.mobilePhone"
              :rules="mobilePhoneRules"
              disable
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
        v-if="currentSection === 'BusinessAdvisor'"
        @submit.prevent="submitAcademicInfo"
      >
        <div class="form-row">
          <div class="form-group">
            <label for="fullname">Nombre completo:</label>
            <q-input
              type="text"
              id="fullname"
              v-model="academicInfo.fullname"
              :rules="fullnameRules"
              required
            />
          </div>

          <div class="form-group">
            <label for="email">Correo electrónico:</label>
            <q-input
              type="text"
              id="email"
              v-model="academicInfo.email"
              :rules="emailRules"
              required
            />
          </div>

          <div class="form-group">
            <label for="mobilePhone">Teléfono celular:</label>
            <q-input
              type="text"
              id="mobilePhone"
              v-model="academicInfo.mobilePhone"
              :rules="mobilePhoneRules"
              required
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
        v-if="currentSection === 'project'"
        @submit.prevent="submitCompanyInfo"
      >
        <!-- Campos del formulario de datos de la empresa -->
        <div class="form-row">
          <div class="form-group">
            <label for="nameProject">Nombre del proyecto:</label>
            <q-input
              type="text"
              id="nameProject"
              v-model="companyInfo.nameProject"
              :rules="nameProjectRules"
              required
            />
          </div>

          <div class="form-group">
            <label for="objective">Objetivo:</label>
            <q-input
              type="text"
              id="objective"
              v-model="companyInfo.objective"
              :rules="objectiveRules"
              required
            />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="description">Descripción:</label>
            <q-input
              type="text"
              id="description"
              v-model="companyInfo.description"
              :rules="descriptionRules"
              required
            />
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
          style="flex: 1; margin-left: 40px"
        >
          <thead>
            <tr style="font-size: 14px">
              <th>Nombre completo</th>
              <th>Correo electronico</th>
              <th>Número de celular</th>
            </tr>
          </thead>
          <tbody>
            <tr style="font-size: 14px">
              <td>{{ personalInfo.fullname }}</td>
              <td>{{ personalInfo.email }}</td>
              <td>{{ personalInfo.mobilePhone }}</td>
            </tr>
          </tbody>
        </table>
        <table
          v-if="currentSection === 'confirmation'"
          class="table table-hover table-borderless"
          style="flex: 1"
        >
          <thead>
            <tr style="font-size: 14px">
              <th>Nombre completo</th>
              <th>Correo electronico</th>
              <th>Número de celular</th>
            </tr>
          </thead>
          <tbody>
            <tr style="font-size: 14px">
              <td>{{ academicInfo.fullname }}</td>
              <td>{{ academicInfo.email }}</td>
              <td>{{ academicInfo.mobilePhone }}</td>
            </tr>
          </tbody>
        </table>
        <table
          v-if="currentSection === 'confirmation'"
          class="table table-hover table-borderless"
          style="flex: 1; margin-right: 40px"
        >
          <thead>
            <tr style="font-size: 14px">
              <th style="padding: 10px">Nombre del proyecto</th>
              <th style="padding: 10px">Objetivo</th>
              <th style="padding: 10px">Descripcion</th>
            </tr>
          </thead>
          <tbody>
            <tr style="font-size: 14px">
              <td style="padding: 10px">{{ companyInfo.nameProject }}</td>
              <td style="padding: 10px">{{ companyInfo.objective }}</td>
              <td style="padding: 10px">{{ companyInfo.description }}</td>
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
          style="flex: 1; margin-left: 40px"
        >
          <thead>
            <tr style="font-size: 14px">
              <th>Nombre completo</th>
              <th>Correo electronico</th>
              <th>Número de celular</th>
            </tr>
          </thead>
          <tbody>
            <tr style="font-size: 14px">
              <td>{{ personalInfo.fullname }}</td>
              <td>{{ personalInfo.email }}</td>
              <td>{{ personalInfo.mobilePhone }}</td>
            </tr>
          </tbody>
        </table>
        <table
          v-if="currentSection === 'final'"
          class="table table-hover table-borderless"
          style="flex: 1; margin-left: 40px"
        >
          <thead>
            <tr style="font-size: 14px">
              <th>Nombre completo</th>
              <th>Correo electronico</th>
              <th>Número de celular</th>
            </tr>
          </thead>
          <tbody>
            <tr style="font-size: 14px">
              <td>{{ academicInfo.fullname }}</td>
              <td>{{ academicInfo.email }}</td>
              <td>{{ academicInfo.mobilePhone }}</td>
            </tr>
          </tbody>
        </table>
        <table
          v-if="currentSection === 'final'"
          class="table table-hover table-borderless"
          style="flex: 1; margin-right: 40px"
        >
          <thead>
            <tr style="font-size: 14px">
              <th style="padding: 10px">Nombre del proyecto</th>
              <th style="padding: 10px">Objetivo</th>
              <th style="padding: 10px">Descripcion</th>
            </tr>
          </thead>
          <tbody>
            <tr style="font-size: 14px">
              <td style="padding: 10px">{{ companyInfo.nameProject }}</td>
              <td style="padding: 10px">{{ companyInfo.objective }}</td>
              <td style="padding: 10px">{{ companyInfo.description }}</td>
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
          :disable="projectState.label === 'Aceptada'"
          v-if="currentSection === 'final'"
          @click="startApplication"
        />
      </div>
    </div>
  </div>
  <div v-else>
    <LoadingPage></LoadingPage>
  </div>
</template>

<script>
/* eslint-disable */
import { defineComponent, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "src/stores/user-store";
import { api } from "src/boot/axios";
import { format } from "date-fns";
import UserNavbar from "src/components/UserNavbar.vue";
import LoadingPage from "src/components/LoadingPage.vue";

export default defineComponent({
  name: "alumno-anteproyecto",
  components: {
    UserNavbar,
    LoadingPage,
  },
  setup() {
    const router = useRouter();
    const pageLoaded = ref(true);
    const userStore = useUserStore();

    const student = userStore.getUser;
    const idStudent = student.id;
    const studentAcademicInfo = ref(null);

    const dialogProjectState = ref(false);
    const projectState = ref({
      label: "",
      color: "",
      motive: "",
      date: "",
    });

    const currentSection = ref();

    const advisor = ref();
    const idAdvisor = ref(null);
    const allAdvisors = ref(null);
    const advisorOptions = ref([]);

    // Asesor academico
    const personalInfo = ref({
      fullname: "",
      email: "",
      mobilePhone: "",
    });

    // Asesor Empresarial
    const academicInfo = ref({
      fullname: "",
      email: "",
      mobilePhone: "",
    });

    // Informacion del proyecto
    const companyInfo = ref({
      nameProject: "",
      objective: "",
      description: "",
    });

    function searchState() {
      console.log("Searching state ...");
      pageLoaded.value = false;
      api
        .post(`http://localhost:3000/alumno/academico/anteproyecto`, {
          idAlumno: idStudent,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data === "No se encontro ningun anteproyecto") {
            projectState.value.label = "Sin comenzar";
            projectState.value.color = definePhaseColor(
            projectState.value.label
            );
          } else {
            const project = res.data;
            console.log(project);
            fillData(project);
            currentSection.value = "final";
          }
          pageLoaded.value = true;
        })
        .catch((err) => {
          console.error(err);
        });
    }

    function fillData(project) {
      projectState.value.label = project.estado.nombre;
      projectState.value.color = definePhaseColor(project.estado.nombre);
      projectState.value.motive = project.estado.motivo;
      projectState.value.date = formatDate(project.estado.fecha);

      personalInfo.value.fullname = project.datosAsesorAcademico.nombre;
      personalInfo.value.email = project.datosAsesorAcademico.email;
      personalInfo.value.mobilePhone = project.datosAsesorAcademico.telefono;

      academicInfo.value.fullname = project.datosAsesorEmpresarial.nombre;
      academicInfo.value.email = project.datosAsesorEmpresarial.email;
      academicInfo.value.mobilePhone = project.datosAsesorEmpresarial.telefono;

      companyInfo.value.nameProject = project.datosProyecto.nombre;
      companyInfo.value.objective = project.datosProyecto.objetivo;
      companyInfo.value.description = project.datosProyecto.descripcion;
    }

    function searchAdvisors() {
      console.log("Searching advisors ...");
      api
        .post(`http://localhost:3000/alumno/academico/anteproyecto/asesores`, {
          idAlumno: idStudent,
        })
        .then((res) => {
          console.log(res.data);
          const data = res.data;
          allAdvisors.value = data;
          const listAdvisors = [];
          data.map((advisor) => {
            const name = `${advisor.datosPersonales.nombres.nombre} ${advisor.datosPersonales.nombres.apPaterno}`;
            listAdvisors.push(name);
          });
          advisorOptions.value = listAdvisors;
        })
        .catch((err) => {
          console.error(err);
        });
    }

    function loadAdvisor() {
      const [nombreBuscar, apPaternoBuscar] = advisor.value.split(" ");
      const actualAdvisor = allAdvisors.value.find((advisor) => {
        const nombres = advisor.datosPersonales.nombres;
        return (
          nombres.nombre === nombreBuscar &&
          nombres.apPaterno === apPaternoBuscar
        );
      });
      idAdvisor.value = actualAdvisor._id;
      personalInfo.value.fullname = `${actualAdvisor.datosPersonales.nombres.nombre} ${actualAdvisor.datosPersonales.nombres.apPaterno} ${actualAdvisor.datosPersonales.nombres.apMaterno}`;
      personalInfo.value.email = actualAdvisor.datosPersonales.privado.email;
      personalInfo.value.mobilePhone =
        actualAdvisor.datosPersonales.privado.telefono;
    }

    function submitProject(action) {
      try {
        let url = "";
        console.log(personalInfo.value);
        console.log(academicInfo.value);
        console.log(companyInfo.value);
        const project = {
          datosAsesorAcademico: {
            nombre: personalInfo.value.fullname,
            email: personalInfo.value.email,
            telefono: personalInfo.value.mobilePhone,
          },
          datosAsesorEmpresarial: {
            nombre: academicInfo.value.fullname,
            email: academicInfo.value.email,
            telefono: academicInfo.value.mobilePhone,
          },
          datosProyecto: {
            nombre: companyInfo.value.nameProject,
            objetivo: companyInfo.value.objective,
            descripcion: companyInfo.value.description,
          },
          estado: {
            nombre: "En revisión",
            motivo: "Ninguno",
            fecha: new Date(),
          },
          fechaRegistro: new Date(),
        };
        console.log(project);
        console.log(action);

        if (action === "create") {
          url = "http://localhost:3000/alumno/academico/anteproyecto/crear";
          api
            .post(url, {
              idAlumno: idStudent,
              idAsesor: idAdvisor.value,
              anteproyecto: project,
            })
            .then((res) => {
              console.log(res.data.anteproyecto);
              fillData(res.data.anteproyecto);
            })
            .catch((err) => {
              console.error(err);
            });
        } else if (action === "update") {
          url = "http://localhost:3000/alumno/academico/anteproyecto/modificar";
          api
            .patch(url, {
              idAlumno: idStudent,
              idAsesor: idAdvisor.value,
              anteproyecto: project,
            })
            .then((res) => {
              console.log(res.data);
              fillData(res.data);
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
      searchState();
    });

    return {
      router,
      pageLoaded,
      student,
      idStudent,
      studentAcademicInfo,
      projectState,
      dialogProjectState,
      currentSection,
      personalInfo,
      academicInfo,
      companyInfo,
      definePhaseColor,
      formatDate,
      submitProject,
      searchAdvisors,
      advisor,
      advisorOptions,
      loadAdvisor,
      allAdvisors,
      idAdvisor,
    };
  },
  data() {
    return {
      applicationStarted: false,
      applicationFinish: false,
      showSections: false,
      currentSection: "",
      personalInfo: {
        fullname: "",
        email: "",
        mobilePhone: "",
      },
      academicInfo: {
        fullname: "",
        email: "",
        mobilePhone: "",
      },
      companyInfo: {
        nameProject: "",
        objective: "",
        description: "",
      },
      yearOptions: generateYearOptions(),
      fullnameRules: [
        (v) => !!v || "El nombre completo es requerido",
        (v) =>
          v.length >= 3 ||
          "El nombre completo debe contener al menos 3 caracteres",
        (v) =>
          /^[a-zA-Z\s]+$/.test(v) ||
          "El nombre completo solo puede contener letras y espacios",
      ],
      emailRules: [
        (v) => !!v || "El correo electrónico es requerido",
        (v) =>
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v) ||
          "Ingresa un correo electrónico válido",
      ],
      mobilePhoneRules: [
        (v) => !!v || "El teléfono celular es requerido",
        (v) =>
          /^\d{10}$/.test(v) ||
          "Ingresa un número de teléfono celular válido (10 dígitos)",
      ],
      nameProjectRules: [
        (v) => !!v || "El nombre del proyecto es requerido",
        (v) =>
          v.length >= 3 ||
          "El nombre del proyecto debe contener al menos 3 caracteres",
        // Agrega más reglas de validación según tus requisitos
      ],
      objectiveRules: [
        (v) => !!v || "El objetivo es requerido",
        // Agrega más reglas de validación según tus requisitos
      ],
      descriptionRules: [
        (v) => !!v || "La descripción es requerida",
        // Agrega más reglas de validación según tus requisitos
      ],
    };
  },
  computed: {
    personalInfoIsValid() {
      return (
        this.personalInfo.fullname !== "" &&
        this.personalInfo.email !== "" &&
        this.personalInfo.mobilePhone !== ""
      );
    },
    academicInfoIsValid() {
      return (
        this.academicInfo.fullname !== "" &&
        this.academicInfo.email !== "" &&
        this.academicInfo.mobilePhone !== ""
      );
    },
    companyInfoIsValid() {
      return (
        this.companyInfo.nameProject !== "" &&
        this.companyInfo.objective !== "" &&
        this.companyInfo.description !== ""
      );
    },
  },
  methods: {
    toBack() {
      this.router.go(-1);
    },
    startApplication() {
      this.applicationStarted = true;
      this.showSections = true;
      this.currentSection = "AcademicAdvisor";
      this.searchAdvisors();
    },
    finishApplication() {
      this.applicationFinish = true;
      this.showSections = true;
      this.currentSection = "final";
      if (this.projectState.label === "Sin comenzar") {
        this.submitProject("create");
      } else {
        this.submitProject("update");
      }
    },
    submitPersonalInfo() {
      if (this.personalInfoIsValid) {
        this.currentSection = "BusinessAdvisor";
      }
    },
    submitAcademicInfo() {
      if (this.academicInfoIsValid) {
        this.currentSection = "project";
      }
    },
    submitCompanyInfo() {
      if (this.companyInfoIsValid) {
        this.currentSection = "confirmation";
      }
    },
    goToAcademicAdvisorSection() {
      this.currentSection = "AcademicAdvisor";
    },
    goToAcademicSection() {
      this.currentSection = "BusinessAdvisor";
    },
    goToCompanySection() {
      this.currentSection = "project";
    },
  },
});

function generateYearOptions() {
  const currentYear = new Date().getFullYear();
  const yearOptions = [];
  for (let i = currentYear; i <= currentYear + 5; i++) {
    yearOptions.push(i.toString());
  }
  return yearOptions;
}
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

.title {
  font-size: 35px;
  padding-left: 60px;
  font-weight: bold;
  margin-right: 20px;
  margin-top: 5px;
}
</style>
