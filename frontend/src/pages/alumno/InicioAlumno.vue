<template>
  <UserNavbar></UserNavbar>
  <div class="container text-center">
    <div class="small-box" @click="redirectToSection('solicitud-carta')">
      <div class="img-container">
        <img
          src="../../assets/alumno/card-carta-presentacion.jpg"
          alt="Imagen 1"
          class="img-fluid"
          @load="adjustContainerPosition"
        />
      </div>
      <p class="box-text">
        <strong>Carta</strong><br /><strong>presentación</strong>
      </p>
    </div>
    <div
      class="small-box"
      @click="redirectToSection('seguimiento-administrativo')"
    >
      <div class="img-container">
        <img
          src="../../assets/alumno/card-seguimiento-administrativo.jpg"
          alt="Imagen 2"
          class="img-fluid"
          @load="adjustContainerPosition"
        />
      </div>
      <p class="box-text">
        <strong>Seguimiento</strong><br /><strong>administrativo</strong>
      </p>
    </div>
    <div class="small-box" @click="redirectToSection('seguimiento-academico')">
      <div class="img-container">
        <img
          src="../../assets/alumno/card-seguimiento-academico.jpg"
          alt="Imagen 3"
          class="img-fluid"
          @load="adjustContainerPosition"
        />
      </div>
      <p class="box-text">
        <strong>Seguimiento</strong><br /><strong>académico</strong>
      </p>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import UserNavbar from "src/components/UserNavbar.vue";

export default defineComponent({
  name: "alumno-inicio",
  components: {
    UserNavbar,
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
  height: 500px;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin: 80px;
  margin-top: 0px;
  margin-bottom: 40px;
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
  margin-bottom: 60px;
  padding: 6px;
  text-align: left;
  font-weight: 500;
  color: #333;
  font-size: 27px;
  line-height: 1.3;
  text-transform: none;
}
</style>
