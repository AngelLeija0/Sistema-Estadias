<template>
  <q-page class="login-page">
    <div class="login-container">
      <div class="login-card">
        <div class="login-form">
          <div class="login-form-header text-left q-pb-md">Registrarse</div>
          <q-form @submit="onSubmit" @reset="onReset" class="row" style="justify-content: center;">
            <div class="col-12 row" v-if="actualSection == 1">
              <div class="col-4">
                <q-input v-model="firstname" type="text" label="Nombre(s)" dense outlined class="login-input" stack-label
                  color="primary" bottom-slots="prepend" prefix-icon="mdi-account"
                  @change="dataInputsValidation"></q-input>
              </div>
              <div class="col-4 q-px-sm">
                <q-input v-model="middlename" type="text" label="Apellido paterno" dense outlined class="login-input"
                  stack-label color="primary" bottom-slots="prepend" prefix-icon="mdi-account"></q-input>
              </div>
              <div class="col-4">
                <q-input v-model="lastname" type="text" label="Apellido materno" dense outlined class="login-input"
                  stack-label color="primary" bottom-slots="prepend" prefix-icon="mdi-account"></q-input>
              </div>
              <div class="col-12">
                <q-input v-model="email" type="text" label="Correo institucional" dense outlined stack-label
                  suffix="@uttn.mx" :rules="emailRules" color="primary" bottom-slots="prepend" prefix-icon="mdi-lock"
                  style="margin-bottom: 0;"></q-input>
              </div>
              <div class="col-12">
                <q-input v-model="password" type="password" label="Contraseña" dense outlined stack-label color="primary"
                  :rules="passwordRules" bottom-slots="prepend" prefix-icon="mdi-lock"
                  style="margin-bottom: 0;"></q-input>
              </div>
              <div class="col-12">
                <q-input v-model="confirmPassword" type="password" label="Confirmar contraseña" dense outlined stack-label
                  :rules="confirmPasswordRules" color="primary" bottom-slots="prepend" prefix-icon="mdi-lock"
                  style="margin-bottom: 0; padding-bottom: 0"></q-input>
              </div>
            </div>
            <div class="col-12 row" v-if="actualSection == 2">
              <div class="col-12">
                <q-input v-model="studentId" type="text" label="Matricula" dense outlined stack-label color="primary"
                  :rules="studentIdRules" bottom-slots="prepend" prefix-icon="mdi-account"></q-input>
              </div>
              <div class="col-12" style="margin-bottom: 24px">
                <q-select v-model="academicLevel" label="Nivel academico" :options="academicLevelOptions" clearable
                  outlined dense emit-value map-options option-label="label" option-value="value" />
              </div>
              <div class="col-12">
                <q-select v-model="turn" label="Nivel academico" :options="turnOptions" clearable outlined dense
                  emit-value map-options option-label="label" option-value="value" />
              </div>
            </div>
            <div class="col-12 row" v-if="actualSection == 3">
              <div class="col-12" style="margin-bottom: 24px">
                <q-select v-model="career" label="Carrera" :options="careersOptions" clearable outlined dense emit-value
                  map-options option-label="label" option-value="value" @update:model-value="updateAreas" />
              </div>
              <div class="col-12" style="margin-bottom: 24px">
                <q-select v-model="area" label="Area" :options="areasOptions" clearable outlined dense emit-value
                  map-options option-label="label" option-value="value" />
              </div>

              <div class="col-6 q-pr-sm">
                <q-select v-model="grade" label="Grado" :options="gradeOptions" clearable outlined dense emit-value
                  map-options option-label="label" option-value="value" />
              </div>
              <div class="col-6 q-pl-sm">
                <q-select v-model="group" label="Grupo" :options="groupOptions" clearable outlined dense emit-value
                  map-options option-label="label" option-value="value" />
              </div>
            </div>
            <div class="col-12 q-pt-md" v-if="actualSection != 4">
              <q-btn class="q-pa-md" icon="navigate_before" label="Regresar" size="md" rounded flat color="black"
                @click="actualSection--" :disable="actualSection == 1">
              </q-btn>
              <q-btn class="q-pa-md" icon-right="navigate_next" label="Siguiente" size="md" rounded flat color="black"
                @click="handleNext" :disable="isNextButtonDisabled"></q-btn>
            </div>
            <div class="login-form-actions q-pt-md q-pb-md" v-if="actualSection == 4">
              <p>Valida que los datos ingresados sean correctos. ¿Estas seguro de querer registrarte?</p>
              <q-btn label="Regresar" flat small @click="actualSection--" />
              <q-btn label="Registrarse" type="submit" color="primary" class="login-btn" rounded small />
            </div>
          </q-form>
          <div style="display: flex; justify-content: center;" v-if="actualSection == 1">
            <q-btn flat text-color="black" label="¿Ya tienes una cuenta? Inicia sesion" size="sm" padding="5px"
              to="iniciar-sesion" />
          </div>
        </div>
      </div>
    </div>
  </q-page>
  <q-dialog v-model="registerSuccess" persistent transition-show="scale" transition-hide="scale">
    <q-card style="width: 380px">
      <q-card-section class="q-pa-lg text-center">
        <div class="text-h6 q-pb-md q-pt-md">
          Registrado correctamente
        </div>
        <q-icon name="check" color="green" size="7em" />
      </q-card-section>
      <q-card-section class="q-pt-none"> </q-card-section>
    </q-card>
  </q-dialog>
  <q-dialog v-model="registerError" persistent transition-show="scale" transition-hide="scale">
    <q-card style="width: 380px">
      <q-card-section class="q-pa-lg text-center">
        <div class="text-h6 q-pb-md q-pt-md">
          Ha ocurrido un error
        </div>
        <q-icon name="cancel" color="red" size="7em" />
      </q-card-section>
      <q-card-section class="q-pt-none"> </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from "vue";
import { api } from "src/boot/axios";
import { SessionStorage } from "quasar";
import { useUserStore } from "src/stores/user-store";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "pagina-register",
  setup() {
    const userStore = useUserStore();
    const router = useRouter();

    const registerSuccess = ref(false);
    const registerError = ref(false);

    const actualSection = ref(1);

    const academicLevelOptions = ref([
      { label: "Técnico Superior Universitario", value: "Tecnico Superior Universitario" },
      { label: "Ingeniería", value: "Ingenieria" },
      { label: "Posgrado", value: "Posgrado" }
    ]);
    const turnOptions = ref([
      { label: "Matutino", value: "Matutino" },
      { label: "Vespertino", value: "Vespertino" }
    ]);

    const gradeOptions = ref([
      { label: "6to", value: "6" },
      { label: "8vo", value: "8" },
      { label: "11vo", value: "11" },
    ]);
    const groupOptions = ref([
      { label: "A", value: "A" },
      { label: "B", value: "B" },
      { label: "C", value: "C" },
      { label: "D", value: "D" },
      { label: "E", value: "E" },
      { label: "F", value: "F" },
      { label: "G", value: "G" },
      { label: "H", value: "H" },
      { label: "I", value: "I" },
      { label: "J", value: "J" },
    ]);

    const careersOptions = ref([]);
    const areasOptions = ref([]);

    const firstname = ref();
    const middlename = ref();
    const lastname = ref();
    const email = ref();
    const password = ref();
    const confirmPassword = ref();
    const studentId = ref();
    const academicLevel = ref();
    const turn = ref();
    const career = ref();
    const area = ref();
    const grade = ref();
    const group = ref();

    const emailRules = ref([
      (v) => !!v || "Correo institucional es requerido",
      (v) => !/.+@|\..+/.test(v) || "Ingresa un correo válido",
    ]);

    const passwordRules = ref([
      (v) => !!v || "Contraseña es requerida",
      (v) => v && v.length >= 8 || "La contraseña debe tener al menos 8 caracteres",
    ]);

    const confirmPasswordRules = ref([
      (v) => !!v || "Confirmar contraseña es requerido",
      (v) => v === password.value || "Las contraseñas no coinciden",
    ]);

    const studentIdRules = ref([
      (v) => !!v || "Matrícula es requerida",
      (v) => /^\d+$/.test(v) || "Ingresa una matrícula válida",
    ]);

    const isNextButtonDisabled = computed(() => {
      if (actualSection.value === 1) {
        return (
          !firstname.value ||
          !middlename.value ||
          !lastname.value ||
          !email.value ||
          !password.value ||
          !confirmPassword.value
        );
      } else if (actualSection.value === 2) {
        return !studentId.value || !academicLevel.value || !turn.value;
      } else if (actualSection.value === 3) {
        return !career.value || !area.value || !grade.value || !group.value;
      }
      return false;
    });

    function handleNext() {
      if (!isNextButtonDisabled.value) {
        actualSection.value++;
      }
    }

    function onSubmit() {
      try {
        const studentInfo = {
          datosPersonales: {
            nombres: {
              nombre: firstname.value,
              apPaterno: middlename.value,
              apMaterno: lastname.value
            },
            privado: {
              matricula: studentId.value,
              email: email.value,
              password: password.value
            }
          },
          datosAcademicos: {
            nivelAcademico: academicLevel.value,
            turno: turn.value,
            carrera: career.value,
            area: area.value,
            grado: grade.value,
            grupo: group.value
          },
        };
        api
          .post("./login/register", {
            alumno: studentInfo,
          })
          .then((res) => {
            actualSection.value = 1;
            registerSuccess.value = true;

            firstname.value = null;
            middlename.value = null;
            lastname.value = null;
            studentId.value = null;
            email.value = null;
            password.value = null;
            academicLevel.value = null;
            turn.value = null;
            career.value = null;
            area.value = null;
            grade.value = null;
            group.value = null;

            const userData = {
              tipoUsuario: "alumno",
              id: res.data._id,
              nombre: res.data.datosPersonales.nombres.nombre,
              apPaterno: res.data.datosPersonales.nombres.apPaterno,
              apMaterno: res.data.datosPersonales.nombres.apMaterno
            }

            setTimeout(() => {
              registerSuccess.value = false;
              userStore.setUser(userData);
              router.push({ name: "alumno-inicio" });
            }, 1500);

          })
          .catch((err) => {
            console.log(err);
            registerError.value = true;
            setTimeout(() => {
              registerError.value = false;
            }, 1500);
          });
      } catch (error) {
        console.log(error);
      }
    }

    function onReset() {
      user_name.value = "";
      password.value = "";
    }

    function toIndex(view) {
      if (view === "alumno") {
        router.push({ name: "alumno-inicio" });
      }
      if (view === "asesor") {
        router.push({ name: "asesor-inicio" });
      }
      if (view === "vinculacion") {
        router.push({ name: "vinculacion-inicio" });
      }
      if (view === "administrador") {
        router.push({ name: "admin-inicio" });
      }
    }

    function searchCareers() {
      api
        .get("./carreras")
        .then((res) => {
          if (res.data.msg) {
            console.log(res.data.msg);
          } else {
            const resCareers = res.data;
            let options = [];

            resCareers.forEach((career) => {
              let careerOption = {
                label: career.nombre,
                value: career.nombre,
                areas: [],
              };
              career.area.nombre.forEach((area) => {
                careerOption.areas.push({
                  label: area,
                  value: area,
                });
              });
              options.push(careerOption);
            });

            careersOptions.value = options;
            console.log(careersOptions.value);
          }
        })
        .catch((err) => console.error(err));
    }

    function updateAreas() {
      console.log(career.value);
      const careerSelected = career.value;
      const selected = careersOptions.value.find(
        (career) => career.value === careerSelected
      );

      areasOptions.value = selected ? selected.areas : [];
      area.value = null;
    }

    if (SessionStorage.getItem("user")) {
      userStore.setUser(SessionStorage.getItem("user"));
      toIndex(userStore.user.tipoUsuario);
    }

    onMounted(() => {
      searchCareers();
    });

    return {
      userStore,
      router,
      onSubmit,
      onReset,
      toIndex,
      registerSuccess,
      registerError,
      actualSection,
      academicLevelOptions,
      turnOptions,
      gradeOptions,
      groupOptions,
      careersOptions,
      areasOptions,
      firstname,
      middlename,
      lastname,
      email,
      password,
      confirmPassword,
      studentId,
      academicLevel,
      turn,
      career,
      area,
      grade,
      group,
      searchCareers,
      updateAreas,
      emailRules,
      passwordRules,
      confirmPasswordRules,
      studentIdRules,
      isNextButtonDisabled,
      handleNext
    };
  },
});

</script>

<style scoped>
.login-page {
  background-color: #f2f2f2;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-container {
  max-width: 600px;
  width: 100%;
}

.login-card {
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.1);
  padding: 32px;
}

.login-logo {
  display: flex;
  justify-content: center;
  margin-bottom: 32px;
}

.login-logo img {
  max-height: 100px;
}

.login-form {
  text-align: center;
}

.login-form-header {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 24px;
  color: #333333;
}

.login-input {
  max-width: 400px;
  margin: 0 auto 24px;
}

.login-input input {
  border-radius: 10px;
  border: none;
  outline: none;
  background-color: #f8f8f8;
  color: #333333;
  font-size: 28px;
  padding: 16px 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.login-input input:focus {
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

.login-input q-field__label {
  color: #555555;
  font-size: 24px;
  font-weight: 600;
  text-transform: uppercase;
  transition: color 0.3s ease;
}

.login-input input:focus+.q-field__label {
  color: #333333;
}

.login-input q-icon {
  color: #999999;
  font-size: 30px;
  transition: color 0.3s ease;
}

.login-input input:focus+.q-field__label q-icon {
  color: #007bff;
}

.login-btn {
  min-width: 120px;
  margin: 0 8px;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 1px;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 0.3s ease;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.15);
}

.login-form-footer {
  font-size: 14px;
  color: #555555;
  margin-top: 24px;
}

.register-link {
  color: #007bff;
  text-decoration: none;
  font-weight: 700;
}

.register-link:hover {
  text-decoration: underline;
}

.login-icon svg {
  fill: black;
}
</style>
