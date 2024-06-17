<template>
  <div>
    <div class="container-fluid">
      <q-card-actions style="background-color: #f5f5f5; display: flex; justify-content: start">
        <q-btn flat color="black" label="Regresar" icon="arrow_left"
          style="margin: 3px; text-transform: capitalize; font-size: 16px" @click="toBack"></q-btn>
      </q-card-actions>
    </div>
    <div class="container-fluid" style="background-color: #f5f5f5; min-height: 74vh; margin-top: 0">
      <div class="row">
        <div class="col-12 q-pa-lg" style="display: flex; justify-content: center" v-if="administratorsLoaded">
          <q-card class="q-ma-lg">
            <q-card-section class="q-ml-xl q-mr-xl q-mt-sm q-mb-xl text-center">
              <h1 style="font-size: 24px; font-weight: 400">Cargando alumnos</h1>
              <q-spinner-hourglass color="primary" size="4em" />
            </q-card-section>
          </q-card>
        </div>
        <div class="col-12 q-px-lg" v-else>
          <h6 style="margin: 30px 10px;">Administradores de carrera</h6>
          <q-btn style="margin: 0px 100px 30px; margin-top: 10px; padding: 12px; text-transform: none;" color="primary"
            label="Agregar nuevo administrador" icon-right="add" @click="dialogAddAdministrator = true" />
          <q-table :rows="tableRows" :columns="tableColumns" row-key="nombre" class="q-mb-lg">
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td v-for="col in tableColumns" :key="col.name" :props="props">
                  <template v-if="col.name === 'actions'">
                    <q-btn-group flat>
                      <q-btn color="primary" size="sm" icon-right="edit" class="q-mx-sm"
                        @click="changePasswordAdministrator(props.row.idAdministrador)">Cambiar contraseña</q-btn>
                      <q-btn color="red" size="sm" icon-right="delete" class="q-mx-sm"
                        @click="deleteAdministrator(props.row.idAdministrador)">Eliminar</q-btn>
                    </q-btn-group>
                  </template>
                  <template v-else>
                    {{ props.row[col.field] }}
                  </template>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
      </div>
    </div>
  </div>

  <q-dialog v-model="dialogDeleteAdministrator">
    <q-card class="q-pt-md q-pl-md q-pr-md" style="width: 500px; max-width: 60vw; height: 40vh">
      <div class="row q-ma-sm">
        <div class="col-12" style="display: flex; justify-content: end">
          <q-card-actions>
            <q-btn align="right" flat color="red" icon="close" v-close-popup style="
                margin: 3px;
                padding-left: 25px;
                padding-right: 25px;
                text-transform: capitalize;
                font-size: 16px;
              " />
          </q-card-actions>
        </div>
        <div class="col-12 q-pa-md">
          <div class="text-h6 text-center" style="font-size: 22px; font-weight: 500">
            ¿Estas seguro de borrarlo?
          </div>
        </div>
        <div class="col-12 q-pt-xl">
          <q-card-actions class="bg-white text-teal" align="center">
            <q-btn-group flat="">
              <q-btn color="red" label="Borrar" icon="delete" style="
                  margin: 3px;
                  padding-left: 20px;
                  padding-right: 20px;
                  text-transform: capitalize;
                  font-size: 14px;
                " @click="deleteAdministrator(adminSelected, true)" />
              <q-btn color="black" label="Cancelar" style="
                  margin: 3px;
                  padding-left: 20px;
                  padding-right: 20px;
                  text-transform: capitalize;
                  font-size: 14px;
                " v-close-popup />
            </q-btn-group>
          </q-card-actions>
        </div>
      </div>
    </q-card>
  </q-dialog>

  <q-dialog v-model="dialogAddAdministrator">
    <q-card class="q-pt-md q-pl-md q-pr-md" style="width: 700px; max-width: 80vw; height: 450px">
      <div class="row q-ma-md">
        <div class="col-6 q-pb-md" style="display: flex; align-items: center">
          <div class="text-h6" style="font-size: 28px; font-weight: 500">
            Administrador
          </div>
        </div>
        <div class="col-6" style="display: flex; justify-content: end">
          <q-card-actions>
            <q-btn flat color="red" icon="close" v-close-popup style="
                    margin: 3px;
                    padding-left: 25px;
                    padding-right: 25px;
                    text-transform: capitalize;
                    font-size: 16px;
                  " />
          </q-card-actions>
        </div>
        <div class="col-12">
          <div class="row">
            <div class="col-6 q-pb-lg">
              <div style="width: 90%">
                <q-input outline v-model="dialogUsername" label="Usuario"
                  input-style="font-size: 14px; border-radius: 5px;" />
              </div>
            </div>
            <div class="col-6 q-pb-lg">
              <div style="width: 90%">
                  <q-input v-model="dialogEmail" type="text" label="Correo institucional"
                  suffix="@uttn.mx" :rules="emailRules" color="primary" bottom-slots="prepend" prefix-icon="mdi-lock"
                  input-style="font-size: 14px; border-radius: 5px;"></q-input>
              </div>
            </div>
            <div class="col-12 q-pb-lg">
              <div style="width: 90%">
                <q-input outline v-model="dialogPassword" label="Contraseña"
                  input-style="font-size: 14px; border-radius: 5px;" />
              </div>
            </div>
            <div class="col-12 q-pb-lg">
              <div style="width: 90%">
                <q-select label-color="black" clearable v-model="dialogCareer" label="Carrera"
                  :options="careersOptions" emit-value map-options option-label="label" option-value="value"
                  style="font-size: 14px; border-radius: 5px;" />
              </div>
            </div>
            <div class="col-12" style="display: flex; justify-content: end; align-items: end">
              <q-card-actions class="bg-white text-teal">
                <q-btn-group flat="">
                  <q-btn color="primary" label="Agregar" icon-right="add" style="
                          margin: 3px;
                          padding-left: 25px;
                          padding-right: 25px;
                          text-transform: capitalize;
                          font-size: 16px;
                        " @click="createAdminsitrator" />
                </q-btn-group>
              </q-card-actions>
            </div>
          </div>
        </div>
      </div>
    </q-card>
  </q-dialog>

  <q-dialog v-model="dialogChangeAdministratorPassword">
    <q-card class="q-pt-md q-pl-md q-pr-md" style="width: 500px; max-width: 60vw; height: 40vh">
      <div class="row q-ma-sm">
        <div class="col-12" style="display: flex; justify-content: end">
          <q-card-actions>
            <q-btn align="right" flat color="red" icon="close" v-close-popup style="
              margin: 3px;
              padding-left: 25px;
              padding-right: 25px;
              text-transform: capitalize;
              font-size: 16px;
            " />
          </q-card-actions>
        </div>
        <div class="col-12 q-pa-md">
          <div class="text-h6 text-center" style="font-size: 22px; font-weight: 500">
            Cambiar contraseña
          </div>
        </div>
        <div class="col-12 q-pa-sm">
          <q-input v-model="dialogNewPassword" filled autogrow style="font-size: 14px" />
          <q-card-actions class="bg-white text-teal q-pt-md" align="center">
            <q-btn-group flat="">
              <q-btn color="primary" label="Cambiar" icon-right="send" style="
                margin: 3px;
                padding-left: 20px;
                padding-right: 20px;
                text-transform: capitalize;
                font-size: 14px;
              " @click="changePasswordAdministrator(adminSelected, true)" />
              <q-btn flat color="white" text-color="black" label="Cancelar" style="
                margin: 3px;
                padding-left: 40px;
                padding-right: 40px;
                text-transform: capitalize;
                font-size: 14px;
              " v-close-popup />
            </q-btn-group>
          </q-card-actions>
        </div>
      </div>
    </q-card>
  </q-dialog>

  <q-dialog v-model="dialogSuccess" persistent transition-show="scale" transition-hide="scale">
    <q-card style="width: 350px" v-if="dialogNewPassword != null">
      <q-card-section class="q-pa-lg text-center">
        <div class="text-h6">Administrador modificado correctamente</div>
        <q-icon name="check_circle" color="green" size="7em" />
      </q-card-section>
    </q-card>
    <q-card style="width: 350px" v-else>
      <q-card-section class="q-pa-lg text-center">
        <div class="text-h6">Administrador agregado correctamente</div>
        <q-icon name="check_circle" color="green" size="7em" />
      </q-card-section>
    </q-card>
  </q-dialog>

  <q-dialog v-model="dialogError" persistent transition-show="scale" transition-hide="scale">
    <q-card style="width: 300px">
      <q-card-section class="q-pa-lg text-center">
        <div class="text-h6">Ha ocurrido un error</div>
        <q-icon name="cancel" color="red" size="7em" />
      </q-card-section>

      <q-card-section class="q-pt-none"> </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
/* eslint-disable */
import {
  defineComponent,
  ref,
  onMounted,
} from "vue";
import { useFilterStore } from "src/stores/filter-store";
import { useRouter } from "vue-router";
import { useDataApiStore } from "src/stores/data-api-store";
import { api } from "src/boot/axios";
import { format } from "date-fns";
import { useUserStore } from "src/stores/user-store";
import CardAlumno from "src/components/CardAlumno.vue";

export default defineComponent({
  name: "superAdmin-administradores",
  components: {
    CardAlumno,
  },
  setup() {
    const userStore = useUserStore();
    const dataApiStore = useDataApiStore();
    const administrators = ref([]);
    const filterStore = useFilterStore();
    const router = useRouter();
    const administratorsLoaded = ref(true);
    const administratorsEmpty = ref(false);

    const dialogDeleteAdministrator = ref(false);
    const dialogChangeAdministratorPassword = ref(false);
    const dialogAddAdministrator = ref(false);

    const dialogSuccess = ref(false);
    const dialogError = ref(false);

    const dialogUsername = ref(null);
    const dialogEmail = ref(null);
    const dialogPassword = ref(null);
    const dialogCareer = ref(null);

    const dialogNewPassword = ref(null);

    const tableColumns = [
      { name: 'username', required: true, label: 'Usuario', align: 'left', field: 'username' },
      { name: 'email', required: true, label: 'Email', align: 'left', field: 'email' },
      { name: 'carrera', required: true, label: 'Carrera', align: 'left', field: 'carrera' },
      { name: 'fechaRegistro', required: true, label: 'Fecha registro', align: 'left', field: "fechaRegistro", sortable: true },
      {
        name: "actions",
        align: "left",
        label: "Acciones",
        field: "actions"
      },
    ];

    const emailRules = ref([
      (v) => !!v || "Correo institucional es requerido",
      (v) => !/.+@|\..+/.test(v) || "Ingresa un correo válido",
    ]);

    const tableRows = ref([]);

    const adminSelected = ref(null);

    const careersOptions = ref([]);

    function loadAdmins() {
      try {
        api.post('./admin/administradores', {})
          .then((res) => {
            console.log(res.data);
            const administrators = res.data;
            administrators.map((admin) => {
              console.log(admin);
              admin.fechaRegistro = formatDate(admin.fechaRegistro);
            });
            tableRows.value = administrators;
            administratorsEmpty.value = false;
            administratorsLoaded.value = false;
          }).catch((err) => {
            console.log(err);
          })
      } catch (error) {
        administratorsEmpty.value = true;
        administratorsLoaded.value = false;
        setTimeout(() => {
          loadAdmins();
          console.error(error);
        }, 2000);
      }
    }

    function deleteAdministrator(idAdministrator, confirm = false) {
      console.log(idAdministrator);
      adminSelected.value = idAdministrator;
      dialogDeleteAdministrator.value = true;
      if (confirm == true) {
        console.log(adminSelected.value);

        dialogDeleteAdministrator.value = false;

        api.post('./admin/administrador/eliminar', {
          idAdmin: adminSelected.value
        })
          .then((res) => {
            console.log(res.data);
            adminSelected.value = null;
            loadAdmins();
          }).catch((err) => {
            console.log(err);
          });
      }
    }

    function createAdminsitrator() {
      const administrator = {
        username: dialogUsername.value,
        password: dialogPassword.value,
        carrera: dialogCareer.value
      }
      console.log(administrator);
      api.post('./admin/administrador/crear', {
        administrador: administrator
      })
        .then((res) => {
          console.log(res.data);
          dialogSuccess.value = true;
          setTimeout(() => {
            dialogSuccess.value = false;
          }, 1500);
          dialogAddAdministrator.value = false;
          dialogUsername.value = null;
          dialogPassword.value = null;
          dialogCareer.value = null;
          loadAdmins();
        }).catch((err) => {
          console.log(err);
          dialogError.value = true;
          setTimeout(() => {
            dialogError.value = false;
          }, 1500);
        });
    }

    function changePasswordAdministrator(idAdministrator, confirm = false) {
      console.log(idAdministrator);
      adminSelected.value = idAdministrator;
      dialogChangeAdministratorPassword.value = true;
      if (confirm == true) {
        api.patch('./admin/administrador/cambiar-password', {
          idAdmin: idAdministrator,
          password: dialogNewPassword.value,
        })
          .then((res) => {
            console.log(res.data);
            dialogSuccess.value = true;
            setTimeout(() => {
              dialogSuccess.value = false;
              dialogNewPassword.value = null;
            }, 1500);
            dialogChangeAdministratorPassword.value = false;
            loadAdmins();
          }).catch((err) => {
            console.log(err);
            dialogError.value = true;
            setTimeout(() => {
              dialogError.value = false;
            }, 1500);
          });
      }
    }

    function searchCareers() {
      api
        .get("./carreras")
        .then((res) => {
          if (res.data.msg) {
            console.log(res.data.msg);
          } else {
            const allCareers = res.data;
            const careers = [];
            allCareers.map((career) => {
              careers.push(career.nombre);
            })
            careersOptions.value = careers;
          }
        })
        .catch((err) => console.error(err));
    }

    function formatDate(dateString) {
      console.log(dateString);
      const dateObj = new Date(dateString);
      return format(dateObj, "dd-MM-yyyy HH:mm:ss");
    }

    onMounted(() => {
      loadAdmins();
      searchCareers();
    });

    return {
      userStore,
      filterStore,
      dataApiStore,
      administrators,
      router,
      loadAdmins,
      administratorsLoaded,
      administratorsEmpty,
      tableColumns,
      tableRows,
      deleteAdministrator,
      dialogDeleteAdministrator,
      adminSelected,
      formatDate,
      changePasswordAdministrator,
      dialogChangeAdministratorPassword,
      dialogAddAdministrator,
      searchCareers,
      careersOptions,
      dialogCareer,
      dialogPassword,
      dialogUsername,
      createAdminsitrator,
      dialogSuccess,
      dialogError,
      dialogNewPassword,
      emailRules,
      dialogEmail,
    };
  },
  methods: {
    toBack() {
      window.sessionStorage.removeItem("filter");
      this.filterStore.clearFilter();
      window.sessionStorage.removeItem("data-api");
      this.dataApiStore.clearDataApi();
      console.clear();
      this.router.push({ name: "admin-alumnos" });
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
  padding-top: 40px;
  /* Agregar un espacio superior para evitar solapamiento con la barra de navegación */
  padding-bottom: 40px;
  box-sizing: border-box;
  /* Asegurar que el padding no afecte el tamaño total */
}

.btn-filter {
  width: 120px;
  margin-bottom: 50px;
  background-color: #f0f0f0;
  text-transform: none;
  padding: 10px;
  border-radius: 8px;
  font-size: 18px;
}

.line {
  width: 85%;
  border: none;
  height: 1px;
  background-color: #d9d9d9;
  margin: 10px 0;
}

.small-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 320px;
  height: 550px;
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
  width: 100%;
}

.img-fluid {
  width: 100%;
  height: 85%;
  object-fit: cover;
}

.box-text {
  margin-bottom: 15px;
  padding: 6px;
  text-align: center;
  font-weight: 500;
  color: #333;
  font-size: 27px;
  line-height: 1.3;
  text-transform: none;
}
</style>
