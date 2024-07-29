<template>
  <q-page>
    <LoadingPage v-if="isLoading" />
    <section v-else>
      <div class="solicitud" v-if="step === 1">
        <h2>Solicitud</h2>
        <h4>① Empresa</h4>
        <hr />
        <h3>¿Ya cuentas con una empresa donde hacer tus estadías?</h3>
        <div class="buttons">
          <button @click="() => { goToSpecificConfirmation(); progress = 'Con empresa' }" class="btn btn-green">Sí, ya
            tengo una empresa donde hacer mis
            estadías</button>
          <button @click="() => { nextStep(); progress = 'En proceso' }" class="btn btn-orange">En proceso de
            búsqueda</button>
          <button @click="() => { nextStep(); progress = 'Sin empresa' }" class="btn btn-red">No, todavía no tengo
            empresa
            para las estadías</button>
        </div>
        <button v-if="step != 1" class="next-button" @click="nextStep">Siguiente</button>
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
        <h3>Estaremos enviando tu CV a distintas empresas, revisa continuamente tu información de contacto que pusiste
          en
          tu CV.</h3>
        <div class="buttons">
          <button @click="changeResponse" class="back-button">Quiero cambiar mi respuesta</button>
          <button @click="sendForm" class="next-button">Enviar solicitud</button>
        </div>
      </div>

      <div class="solicitud" v-if="step === 4">
        <h2>Solicitud</h2>
        <h4>③ Confirmación</h4>
        <hr />
        <h3>Si necesitas ayuda no dudes en cambiar tu respuesta</h3>
        <div class="buttons">
          <button @click="changeResponse" class="back-button">Quiero cambiar mi respuesta</button>
          <button @click="sendForm" class="next-button">Enviar solicitud</button>
        </div>
      </div>

      <q-dialog v-model="dialogSuccessful">
        <q-card class="q-pa-lg" style="width: 300px">
          <q-card-section>
            <div class="text-h6 text-center">Enviado correctamente</div>
          </q-card-section>
          <q-card-section class="q-pt-none text-center">
            <q-icon name="done" color="positive" size="50px" />
          </q-card-section>
        </q-card>
      </q-dialog>
    </section>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useUserStore } from "src/stores/user-store";
import { api } from 'src/boot/axios';
import LoadingPage from 'src/components/LoadingPage.vue';

export default defineComponent({
  name: 'SolicitudPage',
  components: {
    LoadingPage
  },
  setup() {
    const isLoading = ref(true);
    const userStore = useUserStore();
    const progress = ref("")
    const dialogSuccessful = ref(false);
    const step = ref(1)

    searchForm()
    function searchForm() {
      api.post('./alumno/academico/estadias', {
        idAlumno: userStore.getUser.id
      }).then((res) => {
        console.log(res.data)
        step.value = res.data.progreso == 'Con empresa' ? 4 : 3
        isLoading.value = false;
      }).catch((err) => {
        console.error(err);
      });
    }

    return {
      userStore,
      progress,
      dialogSuccessful,
      isLoading,
      step,
    }
  },
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
    goToSpecificConfirmation() {
      this.step = 4;
    },
    changeResponse() {
      this.step = 1;
      this.progress = ''
      this.companies = ''
    },
    sendForm() {
      api.post('./alumno/academico/estadias/guardar', {
        idAlumno: this.userStore.getUser.id,
        progreso: this.progress,
        nombreEmpresa: this.companies || ""
      }).then((res) => {
        if (Object.keys(res.data).length > 0) {
          this.dialogSuccessful = true
          setTimeout(() => {
            this.dialogSuccessful = false
          }, 2000)
        }
      }).catch((err) => console.error(err));
    },
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

.content h2,
.content h3 {
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
