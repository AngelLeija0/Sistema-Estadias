<template>
  <div class="container-fluid" :style="{ paddingTop: isMobile ? '20px' : '' }">
    <q-card-actions
      style="display: flex; justify-content: start"
    >
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
  <div class="container text-center" style="padding-top: 25px;">
    <div class="small-box" @click="redirectToSection('anteproyecto')">
      <div class="img-container">
        <img
          src="../../assets/alumno/card-anteproyecto.png"
          alt="Imagen 1"
          class="img-fluid"
          @load="adjustContainerPosition"
        />
      </div>
      <p class="box-text"><strong>Anteproyecto</strong></p>
    </div>
    <div class="small-box" @click="redirectToSection('avance')">
      <div class="img-container">
        <img
          src="../../assets/alumno/card-avance.png"
          alt="Imagen 3"
          class="img-fluid"
          @load="adjustContainerPosition"
        />
      </div>
      <p class="box-text"><strong>Avance</strong></p>
    </div>
    <div class="small-box" @click="redirectToSection('estadias')">
      <div class="img-container">
        <img
          src="../../assets/alumno/card-estadias.png"
          alt="Imagen 4"
          class="img-fluid"
          @load="adjustContainerPosition"
        />
      </div>
      <p class="box-text"><strong>Estadías</strong></p>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "alumno-seguimientoAcademico",
  setup() {
    const router = useRouter();

    const isMobile = ref(isUsingMobile());

    function isUsingMobile() {
      const validation1 = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const finalValidation = validation1;
      return finalValidation;
    }

    return {
      router,
      isMobile,
    }
  },
  methods: {
    redirectToSection(section) {
      this.$router.push(section);
    },
    toBack() {
      this.router.go(-1);
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
  margin: 45px;
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
  text-align: center;
  font-weight: 500;
  color: #333;
  font-size: 27px;
  line-height: 1.3;
  text-transform: none;
}
</style>
