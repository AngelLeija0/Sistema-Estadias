<template>
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
  <div class="container-fluid" style="min-height: 62.4vh">
    <div class="row q-pl-xl q-pr-xl">
      <div class="col-12">
        <h1 class="title">Etapas</h1>
      </div>
      <div class="col-12 q-pt-xl">
        <div class="row justify-between">
          <div class="col-md-2 col-5 q-pb-lg">
            <q-card class="my-card">
              <q-card-section
                style="background-color: #f5f5f5; min-height: 110px"
              >
                <div class="text-h6 text-weight-medium">Etapa 1</div>
                <div class="text-subtitle2 text-weight-light">
                  CV, Seguro facultativo y Carta presentacion
                </div>
              </q-card-section>
              <q-separator />
              <q-card-actions vertical>
                <div v-if="!statePhase1">
                  <q-btn
                    flat
                    color="green"
                    style="width: 100%"
                    @click="tooglePhase(1, true)"
                    >Activar</q-btn
                  >
                </div>
                <div v-else>
                  <q-btn
                    flat
                    color="red"
                    style="width: 100%"
                    @click="tooglePhase(1, false)"
                    >Desactivar</q-btn
                  >
                  <p
                    style="font-size: 12px; opacity: 0.5; margin: 10px 0 5px 0"
                  >
                    Etapa activada el {{ activationDatePhase1 }}
                  </p>
                </div>
              </q-card-actions>
            </q-card>
          </div>
          <div class="col-md-2 col-5 q-pb-lg">
            <q-card class="my-card">
              <q-card-section
                style="background-color: #f5f5f5; min-height: 110px"
              >
                <div class="text-h6 text-weight-medium">Etapa 2</div>
                <div class="text-subtitle2 text-weight-light">
                  Carta aceptacion
                </div>
              </q-card-section>
              <q-separator />
              <q-card-actions vertical>
                <div v-if="!statePhase2">
                  <q-btn
                    flat
                    color="green"
                    style="width: 100%"
                    @click="tooglePhase(2, true)"
                    >Activar</q-btn
                  >
                </div>
                <div v-else>
                  <q-btn
                    flat
                    color="red"
                    style="width: 100%"
                    @click="tooglePhase(2, false)"
                    >Desactivar</q-btn
                  >
                  <p
                    style="font-size: 12px; opacity: 0.5; margin: 10px 0 5px 0"
                  >
                    Etapa activada el {{ activationDatePhase2 }}
                  </p>
                </div>
              </q-card-actions>
            </q-card>
          </div>
          <div class="col-md-2 col-5 q-pb-lg">
            <q-card class="my-card">
              <q-card-section
                style="background-color: #f5f5f5; min-height: 110px"
              >
                <div class="text-h6 text-weight-medium">Etapa 3</div>
                <div class="text-subtitle2 text-weight-light">
                  Reporte de proyecto
                </div>
              </q-card-section>
              <q-separator />
              <q-card-actions vertical>
                <div v-if="!statePhase3">
                  <q-btn
                    flat
                    color="green"
                    style="width: 100%"
                    @click="tooglePhase(3, true)"
                    >Activar</q-btn
                  >
                </div>
                <div v-else>
                  <q-btn
                    flat
                    color="red"
                    style="width: 100%"
                    @click="tooglePhase(3, false)"
                    >Desactivar</q-btn
                  >
                  <p
                    style="font-size: 12px; opacity: 0.5; margin: 10px 0 5px 0"
                  >
                    Etapa activada el {{ activationDatePhase3 }}
                  </p>
                </div>
              </q-card-actions>
            </q-card>
          </div>
          <div class="col-md-2 col-5 q-pb-lg">
            <q-card class="my-card">
              <q-card-section
                style="background-color: #f5f5f5; min-height: 110px"
              >
                <div class="text-h6 text-weight-medium">Etapa 4</div>
                <div class="text-subtitle2 text-weight-light">
                  Rubrica, Dictamen y Protesta de ley
                </div>
              </q-card-section>
              <q-separator />
              <q-card-actions vertical>
                <div v-if="!statePhase4">
                  <q-btn
                    flat
                    color="green"
                    style="width: 100%"
                    @click="tooglePhase(4, true)"
                    >Activar</q-btn
                  >
                </div>
                <div v-else>
                  <q-btn
                    flat
                    color="red"
                    style="width: 100%"
                    @click="tooglePhase(4, false)"
                    >Desactivar</q-btn
                  >
                  <p
                    style="font-size: 12px; opacity: 0.5; margin: 10px 0 5px 0"
                  >
                    Etapa activada el {{ activationDatePhase4 }}
                  </p>
                </div>
              </q-card-actions>
            </q-card>
          </div>
          <div class="col-md-2 col-5 q-pb-lg">
            <q-card class="my-card">
              <q-card-section
                style="background-color: #f5f5f5; min-height: 110px"
              >
                <div class="text-h6 text-weight-medium">Etapa 5</div>
                <div class="text-subtitle2 text-weight-light">
                  Carta terminacion
                </div>
              </q-card-section>
              <q-separator />
              <q-card-actions vertical>
                <div v-if="!statePhase5">
                  <q-btn
                    flat
                    color="green"
                    style="width: 100%"
                    @click="tooglePhase(5, true)"
                    >Activar</q-btn
                  >
                </div>
                <div v-else>
                  <q-btn
                    flat
                    color="red"
                    style="width: 100%"
                    @click="tooglePhase(5, false)"
                    >Desactivar</q-btn
                  >
                  <p
                    style="font-size: 12px; opacity: 0.5; margin: 10px 0 5px 0"
                  >
                    Etapa activada el {{ activationDatePhase5 }}
                  </p>
                </div>
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { useFilterStore } from "src/stores/filter-store";
import { useDataApiStore } from "src/stores/data-api-store";
import { useRouter } from "vue-router";
import { api } from "src/boot/axios";
import { format } from "date-fns";

export default defineComponent({
  name: "admin-etapas",
  setup() {
    const dataApiStore = useDataApiStore();
    const filterStore = useFilterStore();
    const router = useRouter();

    const statePhase1 = ref(false);
    const statePhase2 = ref(false);
    const statePhase3 = ref(false);
    const statePhase4 = ref(false);
    const statePhase5 = ref(false);

    const activationDatePhase1 = ref(null);
    const activationDatePhase2 = ref(null);
    const activationDatePhase3 = ref(null);
    const activationDatePhase4 = ref(null);
    const activationDatePhase5 = ref(null);

    if (window.sessionStorage.getItem("data-api")) {
      window.sessionStorage.removeItem("data-api");
      dataApiStore.clearDataApi();
    }
    if (window.sessionStorage.getItem("filter")) {
      window.sessionStorage.removeItem("filter");
      filterStore.clearFilter();
    }

    function toBack() {
      router.go(-1);
    }

    function loadPhasesInfo() {
      console.log("Buscando etapas ...");
      api
        .post(
          `./admin/administracion/etapas`,
          {
            carrera: "Tecnologias de la Informacion",
          }
        )
        .then((res) => {
          const phases = res.data[0];
          console.log(phases);

          statePhase1.value = JSON.parse(phases.etapa1.estado);
          statePhase2.value = JSON.parse(phases.etapa2.estado);
          statePhase3.value = JSON.parse(phases.etapa3.estado);
          statePhase4.value = JSON.parse(phases.etapa4.estado);
          statePhase5.value = JSON.parse(phases.etapa5.estado);

          activationDatePhase1.value = formatDate(phases.etapa1.fecha);
          activationDatePhase2.value = formatDate(phases.etapa2.fecha);
          activationDatePhase3.value = formatDate(phases.etapa3.fecha);
          activationDatePhase4.value = formatDate(phases.etapa4.fecha);
          activationDatePhase5.value = formatDate(phases.etapa5.fecha);
        })
        .catch((err) => {
          console.error(err);
        });
    }

    function tooglePhase(phase, state) {
      console.log("Cambiando estado de etapa ...");
      api
        .post(
          `./admin/administracion/etapa/toggle`,
          {
            carrera: "Tecnologias de la Informacion",
            etapa: phase,
            estado: state,
          }
        )
        .then((res) => {
          if (phase == 1) {
            statePhase1.value = res.data.estado;
            activationDatePhase1.value = res.data.fecha;
          }
          if (phase == 2) {
            statePhase2.value = res.data.estado;
            activationDatePhase2.value = res.data.fecha;
          }
          if (phase == 3) {
            statePhase3.value = res.data.estado;
            activationDatePhase3.value = res.data.fecha;
          }
          if (phase == 4) {
            statePhase4.value = res.data.estado;
            activationDatePhase4.value = res.data.fecha;
          }
          if (phase == 5) {
            statePhase5.value = res.data.estado;
            activationDatePhase5.value = res.data.fecha;
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }

    function formatDate(dateString) {
      const dateObj = new Date(dateString);
      return format(dateObj, "dd-MM-yyyy HH:mm:ss");
    }

    onMounted(() => {
      loadPhasesInfo();
    });

    return {
      dataApiStore,
      filterStore,
      router,
      toBack,
      loadPhasesInfo,
      tooglePhase,
      statePhase1,
      statePhase2,
      statePhase3,
      statePhase4,
      statePhase5,
      activationDatePhase1,
      activationDatePhase2,
      activationDatePhase3,
      activationDatePhase4,
      activationDatePhase5,
      formatDate,
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
.title {
  margin: 0;
  font-size: 35px;
  font-weight: 500;
}
</style>
