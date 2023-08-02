<template>
  <q-page class="login-page">
    <div class="login-container">
      <div class="login-card">
        <div class="login-form">
          <div class="login-form-header">Recuperar contraseña</div>
          <div class="row" v-if="isInStep1">
            <div class="col-12">
              <div class="text-body2 q-pb-xl">
                Ingresa tu correo institucional para enviarte un enlace para
                recuperar tu contraseña
              </div>
            </div>
            <div class="col-12">
              <q-section class="q-gutter-md">
                <q-input
                  v-model="email"
                  type="text"
                  label="Correo institucional"
                  dense
                  outlined
                  class="login-input"
                  stack-label
                  color="primary"
                  bottom-slots="prepend"
                  prefix-icon="mdi-account"
                ></q-input>
                <div class="login-form-actions q-pt-md">
                  <q-btn
                    label="Enviar"
                    type="submit"
                    color="primary"
                    class="login-btn"
                    rounded
                    small
                    @click="submitStep1"
                  />
                  <q-btn
                    label="Regresar"
                    type="reset"
                    color="dark"
                    flat
                    class="login-btn"
                    rounded
                    small
                    @click="toLoginPage"
                  />
                </div>
              </q-section>
            </div>
          </div>
          <div class="row" v-else-if="isInStep2">
            <div class="col-12">
              <div class="text-body2 q-pb-xl">
                Ingresa tu correo institucional para enviarte un enlace para
                recuperar tu contraseña
              </div>
            </div>
            <div class="col-12">

            </div>
          </div>
          <div class="row" v-else-if="isInStep3">

          </div>
        </div>
      </div>
    </div>
  </q-page>
  <q-dialog
    v-model="loginError"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card style="width: 380px">
      <q-card-section class="q-pa-lg text-center">
        <div class="text-h6 q-pb-md q-pt-md">
          Usuario o contraseña incorrecta
        </div>
        <q-icon name="cancel" color="red" size="7em" />
      </q-card-section>

      <q-card-section class="q-pt-none"> </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
/* eslint-disable */
import { defineComponent, ref } from "vue";
import { api } from "src/boot/axios";
import { SessionStorage } from "quasar";
import { useUserStore } from "src/stores/user-store";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "pagina-recuperacion",
  setup() {
    const userStore = useUserStore();
    const router = useRouter();
    const email = ref();
    const loginError = ref(false);

    const isInStep1 = ref(true); // Send code to email
    const isInStep2 = ref(false); // Insert email
    const isInStep3 = ref(false); // Change password

    function submitStep1() {
      isInStep1.value = false;
      console.log(email.value);
    }

    function submitStep2() {
      isInStep2.value = false;
      console.log(email.value);
    }

    function submitStep3() {
      isInStep3.value = false;
      console.log(email.value);
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

    if (SessionStorage.getItem("user")) {
      userStore.setUser(SessionStorage.getItem("user"));
      toIndex(userStore.user.tipoUsuario);
    }

    function toLoginPage() {
      router.push({ name: "pagina-login" });
    }

    return {
      userStore,
      router,
      toIndex,
      loginError,
      toLoginPage,
      email,
      isInStep1,
      isInStep2,
      isInStep3,
      submitStep1,
      submitStep2,
      submitStep3,
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
  max-width: 500px;
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
  text-align: left;
}

.login-form-header {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 24px;
  color: #333333;
}

.login-input {
  max-width: 420px;
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

.login-input input:focus + .q-field__label {
  color: #333333;
}

.login-input q-icon {
  color: #999999;
  font-size: 30px;
  transition: color 0.3s ease;
}

.login-input input:focus + .q-field__label q-icon {
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
