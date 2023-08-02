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
  <div class="container text-center" style="padding-top: 0;">
    <div class="small-box" @click="redirectToSection('etapas')" style="margin-top: 0;">
      <div class="img-container">
        <img
          src="../../assets/admin/card-etapas.jpg"
          alt="Imagen 2"
          class="img-fluid"
          @load="adjustContainerPosition"
        />
      </div>
      <p class="box-text">
        <strong>Etapas</strong>
      </p>
    </div>
    <div class="small-box" @click="redirectToSection('lista-administradores')" style="margin-top: 0;">
      <div class="img-container">
        <img
          src="../../assets/admin/card-vinculacion.jpg"
          alt="Imagen 2"
          class="img-fluid"
          @load="adjustContainerPosition"
        />
      </div>
      <p class="box-text">
        <strong>Administradores</strong>
      </p>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useFilterStore } from "src/stores/filter-store";
import { useDataApiStore } from "src/stores/data-api-store";
import { useRouter } from "vue-router";
import UserNavbar from "src/components/UserNavbar.vue";

export default defineComponent({
  name: "admin-administracion",
  components: {
    UserNavbar,
  },
  setup() {
    const dataApiStore = useDataApiStore();
    const filterStore = useFilterStore();
    const router = useRouter();

    if (window.sessionStorage.getItem("data-api")){
      window.sessionStorage.removeItem("data-api");
      dataApiStore.clearDataApi();
    }
    if (window.sessionStorage.getItem("filter")){
      window.sessionStorage.removeItem("filter");
      filterStore.clearFilter();
    }

    function toBack() {
      router.go(-1);
    }

    return {
      dataApiStore,
      filterStore,
      router,
      toBack,
    };
  },
  methods: {
    redirectToSection(section) {
      this.$router.push(section);
    },
  },
});
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  padding-top: 40px; /* Agregar un espacio superior para evitar solapamiento con la barra de navegación */
  padding-bottom: 40px;
  box-sizing: border-box; /* Asegurar que el padding no afecte el tamaño total */
}

.small-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 320px;
  height: 485px;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin: 80px;
  margin-top: 70px;
  margin-bottom: 0;
  background-color: #fff;
  box-shadow: 4px 4px 4px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  overflow: hidden;
  cursor: pointer;
}

.small-box:hover {
  transform: scale(1.05);
}

.img-container {
  height: 100%;
}

.img-fluid {
  width: 100%;
  height: 85%;
  object-fit: cover;
}

.box-text {
  margin-bottom: 40px;
  padding: 6px;
  text-align: center;
  font-weight: 500;
  color: #333;
  font-size: 27px;
  line-height: 1.3;
  text-transform: none;
}
</style>
