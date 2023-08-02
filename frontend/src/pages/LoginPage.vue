<template>
  <q-page class="login-page">
    <div class="login-container">
      <div class="login-card">
        <div class="login-logo">
          <q-icon name="account_circle" size="100px" color="black" />
        </div>
        <div class="login-form">
          <div class="login-form-header">Iniciar Sesión</div>
          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
            <q-input
              v-model="user_name"
              type="text"
              label="Usuario"
              dense
              outlined
              class="login-input"
              stack-label
              color="primary"
              bottom-slots="prepend"
              prefix-icon="mdi-account"
            ></q-input>
            <q-input
              v-model="password"
              type="password"
              label="Contraseña"
              dense
              outlined
              class="login-input"
              stack-label
              color="primary"
              bottom-slots="prepend"
              prefix-icon="mdi-lock"
              style="margin-bottom: 0;"
            ></q-input>
            <!--
            Recuperacion de contraseña
            <q-btn flat text-color="black" label="¿Olvidaste tu contraseña?" size="sm" padding="7px" @click="toRecuperationPage"/>
            -->
            <div class="login-form-actions q-pt-md">
              <q-btn
                label="Ingresar"
                type="submit"
                color="primary"
                class="login-btn"
                rounded
                small
              />
              <q-btn
                label="Limpiar"
                type="reset"
                color="dark"
                flat
                class="login-btn"
                rounded
                small
              />
            </div>
          </q-form>
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
import { defineComponent, ref } from "vue";
import { api } from "src/boot/axios";
import { SessionStorage } from "quasar";
import { useUserStore } from "src/stores/user-store";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "pagina-login",
  setup() {
    const userStore = useUserStore();
    const router = useRouter();
    const user_name = ref();
    const password = ref();

    const loginError = ref(false);

    function onSubmit() {
      try {
        api
          .post("http://localhost:3000/login", {
            usuario: user_name.value,
            password: password.value,
          })
          .then((res) => {
            SessionStorage.set("user", res.data);
            userStore.setUser(res.data);
            toIndex(res.data.tipoUsuario);
          })
          .catch((err) => {
            if (err.response.status == 404 || err.response.status == 401) {
              loginError.value = true;
              setTimeout(() => {
                loginError.value = false;
              }, 3000);
            }
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

    if (SessionStorage.getItem("user")) {
      userStore.setUser(SessionStorage.getItem("user"));
      toIndex(userStore.user.tipoUsuario);
    }

    function toRecuperationPage(){
      router.push({ name: "pagina-recuperacion" });
    }

    return {
      user_name,
      password,
      userStore,
      router,
      onSubmit,
      onReset,
      toIndex,
      loginError,
      toRecuperationPage,
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
  max-width: 400px;
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
