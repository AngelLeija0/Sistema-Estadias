<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="navbar">
      <q-toolbar>
        <q-toolbar-title>
          <div class="text-center">
            <div class="logo-container">
              <img src="../assets/logoUTTN.png" alt="Logo" class="logo-image cursor-pointer"  />
            </div>
          </div>
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
    return {
      essentialLinks: linksList,
      upDrawerOpen,
      $q,
      router,
      userStore,
      toggleupDrawer() {
        upDrawerOpen.value = !upDrawerOpen.value;
      },
    };
  },
  methods: {
    logout() {
      window.sessionStorage.removeItem("user");
      this.userStore.userLogout();
      this.router.push({name: "pagina-login" });
    },
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
  justify-content: flex-start; /* Cambiado el estilo para alinear a la izquierda */
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
