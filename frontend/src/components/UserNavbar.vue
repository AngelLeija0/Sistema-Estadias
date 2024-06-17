<template>
  <div
    class="container-fluid row"
    style="margin-top: 35px; background-color: #e8e8e8"
  >
    <div class="col-4 flex">
      <q-card-actions>
        <q-btn
          color="white"
          label="Inicio"
          flat
          class="q-ma-md"
          icon="home"
          text-color="black"
          icon-color="black"
          style="margin: 3px; text-transform: capitalize; font-size: 16px"
          @click="toIndex"
        />
      </q-card-actions>
    </div>
    <div class="col-8 flex justify-end">
      <q-card-actions>
        <q-btn-dropdown
          v-if="isLogin"
          :label="user.nombre == undefined ? user.username : user.nombre + ' ' + user.apPaterno"
          flat
          icon="account_circle"
          class="flex"
          style="margin: 3px 0; text-transform: capitalize; font-size: 16px"
        >
          <q-list>
            <q-item clickable v-close-popup @click="logout">
              <q-item-section>
                <q-item-label style="display: flex; align-items: center">
                  Cerrar sesión
                  <svg
                    style="margin-left: 10px"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-box-arrow-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                    />
                  </svg>
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-card-actions>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useUserStore } from "src/stores/user-store";
import { useRouter } from "vue-router";
import { useFilterStore } from "src/stores/filter-store";

export default defineComponent({
  name: "UserNavbar",
  setup() {
    const router = useRouter();
    const userStore = useUserStore();

    return {
      router,
      userStore,
    };
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
  methods: {
    toIndex() {
      this.router.push({ path: "/" });
    },
    logout() {
      window.sessionStorage.removeItem("user");
      this.userStore.userLogout();
      this.router.push({name: "pagina-login" });
    },
  },
});
</script>

<style scoped></style>
