<template>
  <AdminNabvar
    ref="adminNavbar"
    @filter-admins="loadAdmins"
    @clear-filter-admins="loadAdmins"
    style="display: none;"
  ></AdminNabvar>
  <div class="container-fluid">
    <q-card-actions
      style="background-color: #f5f5f5; display: flex; justify-content: start"
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
  <div class="container-fluid" style="background-color: #f5f5f5">
    <div class="row q-pt-md q-pl-xl q-pr-xl">
      <div class="col-6">
        <h5 style="margin: 0 0 10px 0; font-size: 18px; font-weight: 500">
          Buscando registros por:
        </h5>
        <p
          style="text-transform: capitalize; font-size: 14px"
          v-if="filteringBy === ''"
        >
          Todos los registros
        </p>
        <p style="text-transform: capitalize; font-size: 14px" v-else>
          {{ filteringBy }}
        </p>
      </div>
      <div
        class="col-6"
        style="display: flex; justify-content: end; align-items: flex-start"
      >
        <q-card-actions style="padding-top: 0">
          <q-btn-group flat>
            <q-btn
              class="q-icon-sm"
              color="green-7"
              text-color="white"
              label="Excel"
              bg-color="green"
              icon="file_download"
              style="
                margin: 3px;
                padding: 1px 15px;
                text-transform: capitalize;
                font-size: 16px;
              "
              @click="toGenerateExcel"
            ></q-btn>
            <div style="display: flex; align-items: center; padding-left: 30px">
              <p style="font-size: 16px; margin: 0">Mostrar</p>
            </div>
            <q-btn-dropdown
              outline
              color="black"
              :label="quantityRecords"
              style="
                margin: 3px 5px;
                padding: 0px 0px 0 10px;
                text-transform: capitalize;
                font-size: 16px;
              "
            >
              <q-list>
                <q-item
                  v-for="record in filteredRecords"
                  :key="record"
                  :label="record"
                  @click="setRecords(record)"
                  clickable
                  v-close-popup
                >
                  <q-item-section>
                    <q-item-label>{{ record }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
            <div style="display: flex; align-items: center">
              <p style="font-size: 16px; margin: 0">registros</p>
            </div>
          </q-btn-group>
        </q-card-actions>
      </div>
    </div>
  </div>
  <div class="container-fluid" style="background-color: #f5f5f5">
    <div class="row q-pt-sm q-pl-xl q-pr-xl q-pb-xl">
      <q-card-actions>
        <q-btn
          class="q-icon-sm"
          color="black"
          text-color="white"
          label="Agregar un nuevo administrador"
          icon="add"
          style="
            margin: 3px;
            padding: 1px 15px;
            text-transform: none;
            font-size: 16px;
          "
          @click="dialogAddAdmin = true"
        ></q-btn>
      </q-card-actions>
      <q-dialog v-model="dialogAddAdmin">
        <q-card
          class="q-pt-md q-pl-md q-pr-md"
          style="width: 700px; max-width: 80vw; height: 60vh"
        >
          <div class="row q-ma-md">
            <div
              class="col-6 q-pb-md"
              style="display: flex; align-items: center"
            >
              <div class="text-h6" style="font-size: 28px; font-weight: 500">
                Administrador
              </div>
            </div>
            <div class="col-6" style="display: flex; justify-content: end">
              <q-card-actions>
                <q-btn
                  flat
                  color="red"
                  icon="close"
                  v-close-popup
                  style="
                    margin: 3px;
                    padding-left: 25px;
                    padding-right: 25px;
                    text-transform: capitalize;
                    font-size: 16px;
                  "
                />
              </q-card-actions>
            </div>
            <div class="col-12">
              <div class="row">
                <div class="col-4 q-pb-lg">
                  <p style="margin: 5px; font-size: 16px">Nombre</p>
                  <div style="width: 90%">
                    <q-input
                      dense
                      v-model="dialogName"
                      input-style="background-color: #D9D9D9; padding: 8px; font-size: 14px; border-radius: 5px;"
                    />
                  </div>
                </div>
                <div class="col-4 q-pb-lg">
                  <p style="margin: 5px; font-size: 16px">Apellido paterno</p>
                  <div style="width: 90%">
                    <q-input
                      dense
                      v-model="dialogLastname2"
                      input-style="background-color: #D9D9D9; padding: 8px; font-size: 14px; border-radius: 5px;"
                    />
                  </div>
                </div>
                <div class="col-4 q-pb-lg">
                  <p style="margin: 5px; font-size: 16px">Apellido materno</p>
                  <div style="width: 90%">
                    <q-input
                      dense
                      v-model="dialogLastname1"
                      input-style="background-color: #D9D9D9; padding: 8px; font-size: 14px; border-radius: 5px;"
                    />
                  </div>
                </div>
                <div class="col-4 q-pb-lg">
                  <p style="margin: 5px; font-size: 16px">Nombre de usuario</p>
                  <div style="width: 90%">
                    <q-input
                      dense
                      v-model="dialogUsername"
                      input-style="background-color: #D9D9D9; padding: 8px; font-size: 14px; border-radius: 5px;"
                    />
                  </div>
                </div>
                <div class="col-4 q-pb-lg">
                  <p style="margin: 5px; font-size: 16px">Email</p>
                  <div style="width: 90%">
                    <q-input
                      dense
                      v-model="dialogEmail"
                      input-style="background-color: #D9D9D9; padding: 8px; font-size: 14px; border-radius: 5px;"
                    />
                  </div>
                </div>
                <div class="col-4 q-pb-lg">
                  <p style="margin: 5px; font-size: 16px">Contraseña</p>
                  <div style="width: 90%">
                    <q-input
                      dense
                      v-model="dialogPassword"
                      input-style="background-color: #D9D9D9; padding: 8px; font-size: 14px; border-radius: 5px;"
                    />
                  </div>
                </div>
                <div
                  class="col-12"
                  style="display: flex; justify-content: end; align-items: end"
                >
                  <q-card-actions class="bg-white text-teal">
                    <q-btn-group flat="">
                      <q-btn
                        color="primary"
                        label="Agregar administrador"
                        icon="add"
                        style="
                          margin: 3px;
                          padding-left: 25px;
                          padding-right: 25px;
                          text-transform: capitalize;
                          font-size: 16px;
                        "
                        @click="toAddAdmin"
                      />
                    </q-btn-group>
                  </q-card-actions>
                </div>
              </div>
            </div>
          </div>
        </q-card>
      </q-dialog>
      <q-dialog
        v-model="dialogStateAdminAdded"
        persistent
        transition-show="scale"
        transition-hide="scale"
      >
        <q-card v-if="isAdminAdded" style="width: 350px">
          <q-card-section class="q-pa-lg text-center">
            <div class="text-h6">Administrador agregado correctamente</div>
            <q-icon name="check_circle" color="green" size="7em" />
          </q-card-section>
        </q-card>

        <q-card v-if="isAdminError" style="width: 300px">
          <q-card-section class="q-pa-lg text-center">
            <div class="text-h6">Ha ocurrido un error</div>
            <q-icon name="cancel" color="red" size="7em" />
          </q-card-section>

          <q-card-section class="q-pt-none"> </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </div>
  <div
    class="container-fluid"
    style="background-color: #f5f5f5; min-height: 50vh; margin-top: 0"
  >
    <div class="row">
      <div
        class="col-12"
        style="display: flex; justify-content: center"
        v-if="adminsLoaded"
      >
        <q-card class="q-ma-lg">
          <q-card-section class="q-ml-xl q-mr-xl q-mt-sm q-mb-xl text-center">
            <h1 style="font-size: 24px; font-weight: 400">
              Cargando administradores
            </h1>
            <q-spinner-hourglass color="primary" size="4em" />
          </q-card-section>
        </q-card>
      </div>
      <div
        class="col-lg-3 col-md-4 col-sm-6 col-6"
        v-else
        v-for="(admin, i) in admins"
        :key="i + 1"
      >
        <CardAdmin v-bind="admin" class="q-ml-xl q-mr-xl q-mb-xl"></CardAdmin>
      </div>
      <div
        class="col-12"
        style="display: flex; justify-content: center"
        v-if="adminsEmpty"
      >
        <q-card class="q-ma-lg">
          <q-card-section class="q-ml-xl q-mr-xl q-mt-sm q-mb-xl text-center">
            <h1 style="font-size: 24px; font-weight: 400">
              No se encontraron resultados
            </h1>
            <q-icon name="error_outline" color="negative" size="8em" />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
  <div class="container-fluid q-pb-lg" style="background-color: #f5f5f5">
    <div class="row q-pt-md q-pl-xl q-pr-xl">
      <div class="col-6" style="align-items: end; display: flex">
        <p>Mostrando {{ qAdminsShowing }} de {{ qTotalAdmins }} registros</p>
      </div>
      <divl class="col-6" style="display: flex; justify-content: end">
        <q-card-actions>
          <q-btn-group flat>
            <q-btn
              v-if="actualPage > 1"
              label="Anterior"
              icon="navigate_before"
              style="
                margin: 3px;
                padding: 1px 15px;
                text-transform: capitalize;
                font-size: 14px;
                font-weight: 400;
              "
              @click="setPage(actualPage - 1)"
            ></q-btn>
            <q-btn
              v-for="page in pages"
              :key="page"
              :color="page === actualPage ? 'dark' : 'grey-7'"
              :label="page"
              text-color="white"
              style="
                margin: 3px;
                padding: 1px 15px;
                text-transform: capitalize;
                font-size: 14px;
              "
              @click="setPage(page)"
            ></q-btn>
            <q-btn
              v-if="actualPage + 1 <= pages.length"
              label="Siguiente"
              icon-right="navigate_next"
              style="
                margin: 3px;
                padding: 1px 15px;
                text-transform: capitalize;
                font-size: 14px;
                font-weight: 400;
              "
              @click="setPage(actualPage + 1)"
            ></q-btn>
          </q-btn-group>
        </q-card-actions>
      </divl>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { defineComponent, ref, onMounted, onBeforeUnmount } from "vue";
import { useFilterStore } from "src/stores/filter-store";
import { useRouter } from "vue-router";
import { useDataApiStore } from "src/stores/data-api-store";
import { api } from "src/boot/axios";
import AdminNabvar from "src/components/AdminNavbar.vue";
import CardAdmin from "src/components/CardAdmin.vue";

export default defineComponent({
  name: "admin-listaAdministradores",
  components: {
    AdminNabvar,
    CardAdmin,
  },
  setup() {
    const dataApiStore = useDataApiStore();
    const admins = ref([]);
    const filterStore = useFilterStore();
    const router = useRouter();
    const adminsLoaded = ref(true);
    const adminsEmpty = ref(false);
    const filteringBy = ref(null);

    const quantityRecords = ref(4);
    const actualPage = ref(1);
    const pages = ref([]);
    const records = ref([4, 8, 12, 14, 16]);
    const qAdminsShowing = ref(0);
    const qTotalAdmins = ref(0);

    const dialogAddAdmin = ref(false);
    const dialogStateAdminAdded = ref(false);
    const isAdminAdded = ref(false);
    const isAdminError = ref(false);

    const dialogName = ref(null);
    const dialogLastname1 = ref(null);
    const dialogLastname2 = ref(null);
    const dialogUsername = ref(null);
    const dialogEmail = ref(null);
    const dialogPassword = ref(null);

    function loadFilter() {
      const filterData = window.sessionStorage.getItem("filter");
      const filter = JSON.parse(
        filterData.replace(/__q_objt\||__q_strn\|/g, "")
      );
      let filterString = "";
      Object.keys(filter).map((key) => {
        filterString += filter[key] + ", ";
      });
      filteringBy.value = filterString.slice(0, -2);
    }

    function loadAdmins() {
      try {
        adminsEmpty.value = false;
        adminsLoaded.value = true;
        admins.value = [];
        loadFilter();
        setTimeout(() => {
          const adminsData = dataApiStore.getDataApi;
          if (adminsData === null) {
            return loadAdmins();
          }

          if (Object.keys(adminsData).length === 0) {
            admins.value = [];
            qAdminsShowing.value = 0;
            qTotalAdmins.value = 0;
            adminsEmpty.value = true;
            adminsLoaded.value = false;
            loadFilter();
            return;
          }
          adminsToShow(adminsData);
        }, 2000);
      } catch (error) {
        quantityRecords.value = 0;
        adminsEmpty.value = true;
        adminsLoaded.value = false;
        setTimeout(() => {
          loadAdmins();
          console.error(error);
        }, 2000);
      }
    }

    function adminsToShow(allAdmins) {
      try {
        if (typeof allAdmins !== "object" || allAdmins === null) {
          return;
        }
        const totalRecords = Object.keys(allAdmins).length;

        const qRecords = quantityRecords.value;

        generatePages(totalRecords, qRecords);

        let previusRecords = 0;
        let actualRecords = actualPage.value * quantityRecords.value;
        if (actualPage.value > 1) {
          previusRecords = (actualPage.value - 1) * quantityRecords.value;
        }
        let arrAdminsToShow = [];
        for (
          let i1 = 0, i2 = previusRecords;
          i1 < qRecords && i2 < actualRecords;
          i1++, i2++
        ) {
          if (allAdmins[i2] !== undefined) {
            arrAdminsToShow.push(allAdmins[i2]);
          }
        }
        admins.value = arrAdminsToShow;
        qAdminsShowing.value = arrAdminsToShow.length;
        qTotalAdmins.value = Object.keys(allAdmins).length;
        adminsLoaded.value = false;
        adminsEmpty.value = false;
        loadFilter();
      } catch (error) {
        console.error(error);
      }
    }

    function generatePages(totalRecords, qRecords) {
      const totalPages = Math.ceil(totalRecords / qRecords);
      const currentPage = actualPage.value;
      const visiblePages = 5;

      let startPage = currentPage - Math.floor(visiblePages / 2);
      if (startPage < 1) {
        startPage = 1;
      } else if (startPage + visiblePages - 1 > totalPages) {
        startPage = totalPages - visiblePages + 1;
      }

      const endPage = Math.min(startPage + visiblePages - 1, totalPages);

      const arrPages = [];
      for (let i = startPage; i <= endPage; i++) {
        arrPages.push(i);
      }

      pages.value = arrPages;
    }

    function setPage(page) {
      if (!pages.value.includes(page)) {
        loadAdmins();
        return;
      }
      actualPage.value = page;
      loadAdmins();
    }

    function setRecords(qRecords) {
      quantityRecords.value = qRecords;
      loadAdmins();
    }

    onMounted(() => {
      loadFilter();
      loadAdmins();
      adminsToShow();
      router.afterEach((to, from) => {
        if (to.name === "admin-listaAsesores") {
          loadAdmins();
        }
      });
    });

    onBeforeUnmount(() => {
      router.afterEach();
    });

    return {
      filterStore,
      dataApiStore,
      admins,
      router,
      loadAdmins,
      adminsLoaded,
      adminsEmpty,
      filteringBy,
      loadFilter,
      quantityRecords,
      pages,
      records,
      actualPage,
      qAdminsShowing,
      qTotalAdmins,
      adminsToShow,
      setRecords,
      setPage,
      generatePages,
      dialogAddAdmin,
      dialogName,
      dialogLastname1,
      dialogLastname2,
      dialogUsername,
      dialogEmail,
      dialogPassword,
      dialogStateAdminAdded,
      isAdminAdded,
      isAdminError,
    };
  },
  computed: {
    filter() {
      if (
        !this.filterStore.getFilter &&
        window.sessionStorage.getItem("filter")
      ) {
        this.filterStore.setFilter(window.sessionStorage.getItem("filter"));
      }
      return this.filterStore.getFilter;
    },
    filteredRecords() {
      return this.records.filter((record) => record !== this.quantityRecords);
    },
  },
  data() {
    return {
      adminNavbarReady: false,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.adminNavbarReady = true;
    });
  },
  methods: {
    toAddAdmin() {
      try {
        this.isAdminAdded = false;
        this.isAdminError = false;
        const actualDate = new Date().toISOString();
        const newAdmin = {
          datosPersonales: {
            nombres: {
              nombre: this.dialogName,
              apPaterno: this.dialogLastname1,
              apMaterno: this.dialogLastname2,
            },
            privado: {
              email: this.dialogEmail,
              username: this.dialogUsername,
              password: this.dialogPassword,
            },
          },
          fechaRegistro: actualDate,
        };
        this.dialogStateAdminAdded = true;
        api
          .post(
            `./admin/administrador/crear`,
            {
              administrador: newAdmin,
            }
          )
          .then((res) => {
            if (res.data.msg) {
              //console.log(res.data.msg);
            } else {
              this.isAdminAdded = true;
              this.dialogName = null;
              this.dialogLastname1 = null;
              this.dialogLastname2 = null;
              this.dialogUsername = null;
              this.dialogEmail = null;
              this.dialogPassword = null;
              this.dialogPhonenumber = null;
              this.adminsLoaded = true;
              this.$nextTick(() => {
                if (this.adminNavbarReady) {
                  this.$refs.adminNavbar.reloadAdmins();
                  this.loadAdmins();
                }
              });
              setTimeout(() => {
                this.dialogStateAdminAdded = false;
                this.dialogAddAdmin = false;
              }, 2000);
              setTimeout(() => {
                this.adminsLoaded = false;
              }, 3500);
            }
          })
          .catch((err) => {
            this.isAdminError = true;
            setTimeout(() => {
              this.isAdminError = false;
              this.dialogStateAdminAdded = false;
              this.dialogAddAdmin = false;
            }, 3000);
            console.error(err);
          });
      } catch (error) {
        this.isAdminError = true;
        setTimeout(() => {
          this.isAdminError = false;
          this.dialogStateAdvminAdded = false;
          this.dialogAddAdmin = false;
        }, 3000);
        console.log(error);
      }
    },
    toBack() {
      window.sessionStorage.removeItem("filter");
      this.filterStore.clearFilter();
      window.sessionStorage.removeItem("data-api");
      this.dataApiStore.clearDataApi();
      console.clear();
      this.router.go(-1);
    },

    toGenerateExcel() {
      console.log("Excel generated");
      const filterToSend = {};
      if (this.searcher !== null) {
        filterToSend.buscador = this.searcher;
      }
      api
        .post(
          `./admin/administradores/excel`,
          {
            filtro: filterToSend,
          },
          {
            responseType: "blob",
          }
        )
        .then((res) => {
          if (res.data.msg) {
            console.log(res.data.msg);
          } else {
            const blob = new Blob([res.data], {
              type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "administradores.xlsx");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }
        })
        .catch((err) => console.error(err));
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
