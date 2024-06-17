<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="navbar">
      <q-toolbar v-if="isMobile">
        <q-toolbar-title>
          <div class="text-center" @click="toHome">
            <div class="logo-container">
              <img src="../assets/logoUTTN.png" alt="Logo" class="logo-image cursor-pointer" />
            </div>
          </div>
        </q-toolbar-title>
        <q-toolbar-title style="position: absolute; right: 0;" v-if="isLogin">
          <q-btn-dropdown color="white" flat dropdown-icon="menu">
            <div class="row no-wrap q-pa-lg">
              <div class="column" style="justify-content: center;">
                <q-btn color="dark" label="Inicio" outline class="q-ma-md" icon="home"
                  style="margin: 3px; text-transform: capitalize; font-size: 16px" @click="toHome" />
              </div>
              <q-separator vertical inset class="q-mx-lg" />
              <div class="column items-center" style="justify-content: center;">
                <div class="text-subtitle1">
                  {{ user.nombre == undefined ? user.username : user.nombre + ' ' + user.apPaterno }}
                </div>
                <q-btn color="red" outline label="Cerrar sesión" push size="sm" v-close-popup />
              </div>
            </div>
          </q-btn-dropdown>
        </q-toolbar-title>
      </q-toolbar>
      <q-toolbar v-else>
        <q-toolbar-title style="position: absolute; left: 0;" v-if="isLogin">
          <q-btn color="white" label="Inicio" flat class="q-ma-md" icon="home" text-color="white" icon-color="white"
            style="margin: 3px; text-transform: capitalize; font-size: 16px" @click="toHome" />
        </q-toolbar-title>
        <q-toolbar-title>
          <div class="text-center" @click="toHome">
            <div class="logo-container">
              <img src="../assets/logoUTTN.png" alt="Logo" class="logo-image cursor-pointer" />
            </div>
          </div>
        </q-toolbar-title>
        <q-toolbar-title style="position: absolute; right: 0;" v-if="isLogin">
          <q-btn-dropdown :label="user.nombre == undefined ? user.username : user.nombre + ' ' + user.apPaterno" flat
            icon="account_circle" class="flex" style="margin: 3px 0; text-transform: capitalize; font-size: 16px">
            <q-list>
              <q-item clickable v-close-popup @click="logout">
                <q-item-section>
                  <q-item-label style="display: flex; align-items: center">
                    Cerrar sesión
                    <svg style="margin-left: 10px" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                      fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
                      <path fill-rule="evenodd"
                        d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                      <path fill-rule="evenodd"
                        d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                    </svg>
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer elevated class="custom-footer">
      <div class="text-center div-footer">
        © 2023 Universidad Tecnologica de Tamaulipas Norte.
      </div>
    </q-footer>
  </q-layout>
</template>

<script>
/* eslint-disable */
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import { useQuasar } from "quasar";
import { useUserStore } from "src/stores/user-store";
import { useRouter } from "vue-router";

const linksList = [
  {
    title: "Home",
    icon: "home",
    link: "index",
  },
  {
    title: "Library",
    icon: "book",
    link: "library",
  },
];

export default defineComponent({
  name: "MainLayout",
  components: {
    EssentialLink,
  },

  setup() {
    const router = useRouter();
    const userStore = useUserStore();
    const upDrawerOpen = ref(false);
    const $q = useQuasar();


    const isMobile = ref(isUsingMobile());

    console.log(isMobile.value);

    function isUsingMobile() {
      const validation1 = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const finalValidation = validation1;
      return finalValidation;
    }

    return {
      essentialLinks: linksList,
      upDrawerOpen,
      $q,
      router,
      userStore,
      isMobile,
      toggleupDrawer() {
        upDrawerOpen.value = !upDrawerOpen.value;
      },
    };
  },
  methods: {
    logout() {
      window.sessionStorage.removeItem("user");
      this.userStore.userLogout();
      this.router.push({ name: "pagina-login" });
    },
    toHome() {
      this.router.push({ path: "/" });
    }
  },
  computed: {
    isLogin() {
      if (this.user) {
        return true;
      } else {
        return false;
      }
    },
    user() {
      if (!this.userStore.getUser && window.sessionStorage.getItem("user")) {
        this.userStore.setUser(window.sessionStorage.getItem("user"));
      }
      return this.userStore.getUser;
    },
  },
});
</script>

<style scoped>
.bg {
  background-color: #1ab192;
}

.button-container {
  display: flex;
  justify-content: flex-start;
  /* Cambiado el estilo para alinear a la izquierda */
  margin-top: 60px;
}

.button-item {
  margin: 0 12px;
  border-radius: 4px;
  padding: 5px 15px;
  background-color: #1ab192;
  color: #fff;
  font-weight: bold;
  text-transform: none;
  transition: background-color 0.3s ease;
}

.button-item:hover {
  background-color: #167e6d;
}

.button-item:active {
  background-color: #125c52;
}

.button-item-icon {
  margin-right: 10px;
  border-radius: 50%;
  background-color: #1ab192;
  color: #fff;
  font-size: 16px;
  transition: background-color 0.3s ease;
  cursor: pointer;
}

.button-item-icon:hover {
  background-color: #167e6d;
}

.button-item-icon:active {
  background-color: #125c52;
}

.alert-card {
  max-width: 300px;
  width: 80%;
  margin: 20px auto;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.alert-content {
  padding: 20px;
  text-align: center;
}

.image-container {
  margin-bottom: 20px;
}

.alert-image {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
}

.message-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.alert-message {
  font-size: 16px;
  margin-bottom: 5px;
  font-weight: bold;
  display: flex;
  align-items: center;
}

.alert-icon {
  margin-right: 5px;
  font-size: 18px;
}

.alert-text {
  margin-left: 5px;
}

.alert-email {
  font-size: 14px;
  color: #555;
  display: flex;
  align-items: center;
}

.alert-email-icon {
  margin-right: 5px;
  font-size: 16px;
}

.alert-email-link {
  color: #1ab192;
  text-decoration: none;
}

.alert-email-link:hover {
  text-decoration: underline;
}

.navbar {
  background-image: linear-gradient(to bottom, #ffffff 26%, #1ab192 20%);
  height: 100px;
}

.logo-image {
  margin-top: 10px;
  height: 120px;
}

.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.button-item {
  margin-left: 12px;
  margin-right: auto;
  border-radius: 4px;
  padding: 5px 15px;
  font-weight: bold;
  text-transform: none;
  transition: background-color 0.3s ease;
}

.div-footer {
  background: #2f2f2f;
  height: 50px;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
