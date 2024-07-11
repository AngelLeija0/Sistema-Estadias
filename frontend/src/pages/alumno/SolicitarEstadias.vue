<template>
  <q-page>
    <div class="solicitud" v-if="step === 1">
      <h2>Solicitud</h2>
      <h4>① Empresa</h4>
      <hr/>
      <h3>¿Ya cuentas con una empresa donde hacer tus estadías?</h3>
      <div class="buttons">
        <button class="btn btn-green">Sí, ya tengo una empresa donde hacer mis estadías</button>
        <button class="btn btn-orange">En proceso de búsqueda</button>
        <button class="btn btn-red">No, todavía no tengo empresa para las estadías</button>
      </div>
      <button class="next-button" @click="nextStep">Siguiente</button>
    </div>

    <div class="solicitud" v-if="step === 2">
      <h2>Solicitud</h2>
      <h4>② Preferencias</h4>
      <hr />
      <h3>¿A qué empresas te gustaría que enviáramos tu CV?</h3>
      <div class="preferences">
        <textarea v-model="companies" placeholder="Escribe aquí"></textarea>
        <div class="buttons">
          <button @click="previousStep" class="back-button">Regresar</button>
          <button @click="nextStep" class="next-button">Siguiente</button>
        </div>
      </div>
    </div>

    <div class="solicitud" v-if="step === 3">
      <h2>Solicitud</h2>
      <h4>③ Confirmación</h4>
      <hr />
      <h3>Estaremos enviando tu CV a distintas empresas, revisa continuamente tu información de contacto que pusiste en tu CV.</h3>
      <div class="buttons">
        <button @click="changeResponse" class="back-button">Quiero cambiar mi respuesta</button>
        <button @click="goHome" class="next-button">Regresar al Inicio</button>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SolicitudPage',
  data() {
    return {
      step: 1,
      companies: ''
    };
  },
  methods: {
    nextStep() {
      this.step++;
    },
    previousStep() {
      this.step--;
    },
    submit() {
      // Logic for submitting the form
    },
    goHome() {
      this.$router.push('/');
    },
    changeResponse() {
      this.step = 1;
    }
  }
});
</script>

<style scoped>
.solicitud {
  margin-left: 100px;
  text-align: left;
  padding: 20px;
}

h2 {
  font-weight: bold;
  font-size: 40px;
}

h4 {
  margin-bottom: 20px;
  font-size: 35px;
}

h3 {
  margin-bottom: 20px;
  font-size: 30px;
}

.buttons {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 20px;
}

.btn {
  width: 100%;
  max-width: 400px;
  padding: 15px;
  margin: 10px 0;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  text-align: left;
}

.btn-green {
  background-color: #8ee596;
  color: #fff;
}

.btn-orange {
  background-color: #f5a623;
  color: #fff;
}

.btn-red {
  background-color: #ff5a5a;
  color: #fff;
}

.next-button {
  background-color: #1ab192;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.back-button {
  margin-bottom: 10px;
  background-color: #FF0000;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.preferences {
  width: 50%;
}

.preferences span {
  display: inline-block;
  background: black;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  text-align: center;
  line-height: 20px;
}

.preferences h3 {
  display: inline-block;
  margin-left: 10px;
}

hr {
  margin: 10px 0;
  border: 0;
  border-top: 2px solid #FFD700;
}

textarea {
  width: 100%;
  height: 100px;
  padding: 10px;
  margin-top: 10px;
}

.content {
  padding: 20px;
  text-align: center;
}

.content h2, .content h3 {
  color: #333;
}

.line {
  width: 100px;
  height: 5px;
  background-color: #fbc02d;
  margin: 10px auto;
}

.content p {
  font-size: 18px;
  margin: 20px 0;
}

.q-btn.btn {
  margin-top: 20px;
  padding: 15px;
  font-size: 16px;
}
</style>
