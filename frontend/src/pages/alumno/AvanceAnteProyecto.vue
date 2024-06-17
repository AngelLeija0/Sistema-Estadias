<template>
  <div class="container-fluid" :style="{ paddingTop: isMobile ? '20px' : '' }">
      <q-card-actions style="display: flex; justify-content: start">
        <q-btn flat color="black" label="Regresar" icon="arrow_left"
          style="margin: 3px; text-transform: capitalize; font-size: 16px" @click="toBack"></q-btn>
      </q-card-actions>
    </div>
  <div v-if="pageLoaded">
    <div class="container-fluid">
      <div style="
          display: flex;
          justify-content: space-between;
          align-items: center;
        ">
        <h1 style="
            font-size: 35px;
            padding-left: 60px;
            font-weight: bold;
            margin-right: 20px;
          ">
          Avance
        </h1>
      </div>
      <p style="padding-left: 60px; font-size: 20px; padding-right: 60px">
        En esta sección podrás revisar el avance de tu seguimiento academico.
      </p>
      <div class="card-container q-pt-xl" style="margin-top: 0; padding-left: 60px; padding-right: 60px;">
        <div class="row q-pb-xl" style="display: flex; justify-content: space-between; width: 100%">
          <div class="col-lg-2 col-md-4 col-6 q-pt-md">
            <q-card class="card" :style="{
              backgroundColor: '#ff0000',
              opacity: progress[0].state === 'false' ? '0.6' : '1',
            }">
              <q-card-section class="text-white text-h6">Anteproyecto</q-card-section>
            </q-card>
            <p v-if="progress[0].state === 'true'" style="margin: 5px 0 0 15px; font-size: 13px; color: #777767">
              Revisado el {{ progress[0].date }}
            </p>
          </div>
          <div class="col-lg-2 col-md-4 col-6 q-pt-md">
            <q-card class="card" :style="{
              backgroundColor: '#ff2f2f',
              opacity: progress[1].state === 'false' ? '0.6' : '1',
            }">
              <q-card-section class="text-white">25%</q-card-section>
            </q-card>
            <p v-if="progress[1].state === 'true'" style="margin: 5px 0 0 15px; font-size: 13px; color: #777767">
              Revisado el {{ progress[1].date }}
            </p>
          </div>
          <div class="col-lg-2 col-md-4 col-6 q-pt-md">
            <q-card class="card" :style="{
              backgroundColor: '#FF8C00 ',
              opacity: progress[2].state === 'false' ? '0.6' : '1',
            }">
              <q-card-section class="text-white">50%</q-card-section>
            </q-card>
            <p v-if="progress[2].state === 'true'" style="margin: 5px 0 0 15px; font-size: 13px; color: #777767">
              Revisado el {{ progress[2].date }}
            </p>
          </div>
          <div class="col-lg-2 col-md-4 col-6 q-pt-md">
            <q-card class="card" :style="{
              backgroundColor: '#FFA500',
              opacity: progress[3].state === 'false' ? '0.6' : '1',
            }">
              <q-card-section class="text-white">75%</q-card-section>
            </q-card>
            <p v-if="progress[3].state === 'true'" style="margin: 5px 0 0 15px; font-size: 13px; color: #777767">
              Revisado el {{ progress[3].date }}
            </p>
          </div>
          <div class="col-lg-2 col-md-4 col-6 q-pt-md">
            <q-card class="card" :style="{
              backgroundColor: '#ffc107',
              opacity: progress[4].state === 'false' ? '0.6' : '1',
            }">
              <q-card-section class="text-white">100%</q-card-section>
            </q-card>
            <p v-if="progress[4].state === 'true'" style="margin: 5px 0 0 15px; font-size: 13px; color: #777767">
              Revisado el {{ progress[4].date }}
            </p>
          </div>
          <div class="col-lg-2 col-md-4 col-6 q-pt-md">
            <q-card class="card" :style="{
              backgroundColor: '#8BC34A',
              opacity: progress[5].state === 'false' ? '0.6' : '1',
              width: '',
            }">
              <q-card-section class="text-white text-center">Revisión ortográfica</q-card-section>
            </q-card>
            <p v-if="progress[5].state === 'true'" style="margin: 5px 0 0 15px; font-size: 13px; color: #777767">
              Revisado el {{ progress[5].date }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <LoadingPage></LoadingPage>
  </div>
</template>

<script>
/* eslint-disable */
import { defineComponent, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { api } from "src/boot/axios";
import { format } from "date-fns";
import { useUserStore } from "src/stores/user-store";
import LoadingPage from "src/components/LoadingPage.vue";

export default defineComponent({
  name: "alumno-avance",
  components: {
    LoadingPage,
  },
  setup() {

    const isMobile = ref(isUsingMobile());

    function isUsingMobile() {
      const validation1 = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const finalValidation = validation1;
      return finalValidation;
    }

    const pageLoaded = ref(false);

    const router = useRouter();
    const userStore = useUserStore();
    const idStudent = userStore.getUser.id;
    console.log(idStudent);

    const progress = ref([
      {
        state: "false",
        date: "",
      },
      {
        state: "false",
        date: "",
      },
      {
        state: "false",
        date: "",
      },
      {
        state: "false",
        date: "",
      },
      {
        state: "false",
        date: "",
      },
      {
        state: "false",
        date: "",
      },
    ]);

    function loadProgress() {
      console.log("Loading progress ...");
      try {
        api
          .post(
            `./alumno/academico/avance`,
            {
              idAlumno: idStudent,
            }
          )
          .then((res) => {
            console.log(res.data);
            const data = res.data;
            if (data === 'No se encontro ningun avance') {
              return pageLoaded.value = true;
            }
            const progressData = [];
            Object.keys(data).map((key) => {
              progressData.push({
                state: data[key].estado,
                date: formatDate(data[key].fecha),
              });
            });
            progress.value = progressData;
            pageLoaded.value = true;
          })
          .catch((err) => console.error(err));
      } catch (error) {
        setTimeout(() => {
          loadProgress();
          console.log(error);
        }, 2000);
      }
    }

    function formatDate(dateString) {
      const dateObj = new Date(dateString);
      return format(dateObj, "dd-MM-yyyy HH:mm:ss");
    }

    onMounted(() => {
      loadProgress();
    });

    return {
      pageLoaded,
      router,
      userStore,
      progress,
      isMobile,
    };
  },
  methods: {
    toBack() {
      this.router.go(-1);
    },
  },
});
</script>

<style scoped>
.card-container {
  display: flex;
  justify-content: center;
  margin-top: 150px;
}

.card {
  -width: 120px;
  height: 120px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  font-weight: bold;
  margin: 0 10px;
  /* Ajusta el espacio entre los recuadros */
  user-select: none;
}
</style>
