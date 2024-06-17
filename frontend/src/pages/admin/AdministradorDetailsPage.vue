<template>
  <div class="container-fluid" style="background-color: #f5f5f5">
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
  <div
    class="container-fluid"
    style="background-color: #f5f5f5; height: 500px; margin-top: 0"
    v-if="adminsLoaded"
  >
    <div class="row">
      <div class="col-12" style="display: flex; justify-content: center">
        <q-card class="q-ma-lg">
          <q-card-section class="q-ml-xl q-mr-xl q-mt-sm q-mb-xl text-center">
            <h1 style="font-size: 24px; font-weight: 400">
              Cargando administrador
            </h1>
            <q-spinner-hourglass color="primary" size="4em" />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
  <div
    class="container-fluid q-pt-sm q-pl-xl q-pr-xl q-pb-xl"
    style="background-color: #f5f5f5; min-height: 73vh"
    v-else
  >
    <div
      class="row q-ml-xl q-mr-xl"
      style="background-color: white; border-radius: 15px; height: 65vh"
    >
      <div class="col-3 q-pt-lg" style="border-right: 1px solid lightgray">
        <div
          style="
            padding: 5px;
            text-align: center;
            border-bottom: 1px solid lightgray;
          "
        >
          <p style="font-size: 16px; font-weight: 500; margin-bottom: 0">
            {{ admin.datosPersonales.nombres.nombre }}
          </p>
          <p style="font-size: 16px; font-weight: 500">
            {{ admin.datosPersonales.nombres.apPaterno }}
            {{ admin.datosPersonales.nombres.apMaterno }}
          </p>
          <p style="font-size: 14px">
            {{ admin.datosPersonales.privado.email }}
          </p>
          <p style="color: #777676; font-size: 14px">
            {{ admin.datosPersonales.privado.username }}
          </p>
        </div>
        <div>
          <q-card-actions style="flex-direction: column; align-items: start">
            <q-btn
              flat
              color="black"
              label="Informacion general"
              style="
                margin: 3px;
                text-transform: capitalize;
                font-size: 16px;
                font-weight: normal;
                width: 100%;
                align-items: start;
              "
              @click="showSection(1)"
            ></q-btn>
            <q-btn
              flat
              color="red"
              label="Eliminar administrador"
              style="
                margin: 3px;
                text-transform: capitalize;
                font-size: 16px;
                font-weight: normal;
                width: 100%;
                display: flex;
                justify-content: center;
                width: 100%;
                align-items: start;
              "
              @click="deleteDialog = true"
            ></q-btn>
          </q-card-actions>
          <q-dialog v-model="deleteDialog">
            <q-card style="width: 400px">
              <q-card-section class="q-pa-lg text-center">
                <q-icon
                  class="q-pa-md"
                  name="warning"
                  color="orange"
                  size="6em"
                />
                <p style="font-size: 18px; padding-top: 20px">
                  ¿Estas seguro de querer eliminar el administrador
                  {{ admin.datosPersonales.nombres.nombre }}
                  {{ admin.datosPersonales.nombres.apPaterno }}?
                </p>
              </q-card-section>
              <q-card-section
                class="q-pt-none"
                style="display: flex; justify-content: end"
              >
                <q-card-actions>
                  <q-btn-group flat>
                    <q-btn
                      color="red"
                      label="Eliminar"
                      style="
                        margin: 3px 5px;
                        padding: 1px 20px;
                        text-transform: capitalize;
                        font-size: 16px;
                        font-weight: normal;
                      "
                      @click="deleteAdmin"
                    ></q-btn>
                    <q-btn
                      flat
                      color="black"
                      label="Cancelar"
                      style="
                        margin: 3px 5px;
                        padding: 1px 15px;
                        text-transform: capitalize;
                        font-size: 16px;
                        font-weight: normal;
                      "
                      @click="deleteDialog = false"
                    ></q-btn>
                  </q-btn-group>
                </q-card-actions>
              </q-card-section>
            </q-card>
          </q-dialog>
        </div>
      </div>
      <div class="col-8 q-pl-xl">
        <div class="row" v-if="actualSection === 1">
          <div class="col-12">
            <h5 style="font-weight: 500">Información General</h5>
          </div>
          <div class="col-12 flex justify-end" style="padding-bottom: 10px">
            <q-card-actions>
              <q-btn-group flat v-if="!isEditingInfo">
                <q-btn
                  color="primary"
                  icon="edit"
                  label="Editar"
                  style="
                    margin: 3px;
                    padding-right: 15px;
                    text-transform: capitalize;
                    font-size: 12px;
                    font-weight: normal;
                  "
                  @click="toEditInfo"
                ></q-btn>
              </q-btn-group>
              <q-btn-group flat v-else>
                <q-btn
                  color="positive"
                  icon="save"
                  label="Guardar"
                  style="
                    margin: 3px;
                    padding-right: 15px;
                    text-transform: capitalize;
                    font-size: 12px;
                    font-weight: normal;
                  "
                  @click="saveEditInfo"
                ></q-btn>
                <q-btn
                  color="red"
                  icon="cancel"
                  label="Cancelar"
                  style="
                    margin: 3px;
                    padding-right: 15px;
                    text-transform: capitalize;
                    font-size: 12px;
                    font-weight: normal;
                  "
                  @click="showSection(1)"
                ></q-btn>
              </q-btn-group>
            </q-card-actions>
          </div>
          <div class="col-12">
            <div class="row" v-if="!isEditingInfo">
              <div class="col-4">
                <p style="margin: 5px; font-size: 16px">Nombre</p>
                <p
                  style="
                    background-color: #d9d9d9;
                    padding: 8px;
                    width: 90%;
                    font-size: 14px;
                    border-radius: 5px;
                  "
                >
                  {{ admin.datosPersonales.nombres.nombre }}
                  {{ admin.datosPersonales.nombres.apPaterno }}
                  {{ admin.datosPersonales.nombres.apMaterno }}
                </p>
              </div>
              <div class="col-4">
                <p style="margin: 5px; font-size: 16px">Email</p>
                <p
                  style="
                    background-color: #d9d9d9;
                    padding: 8px;
                    width: 90%;
                    font-size: 14px;
                    border-radius: 5px;
                  "
                >
                  {{ admin.datosPersonales.privado.email }}
                </p>
              </div>
              <div class="col-4">
                <p style="margin: 5px; font-size: 16px">Username</p>
                <p
                  style="
                    background-color: #d9d9d9;
                    padding: 8px;
                    width: 90%;
                    font-size: 14px;
                    border-radius: 5px;
                  "
                >
                  {{ admin.datosPersonales.privado.username }}
                </p>
              </div>
              <div class="col-12"></div>
              <div class="col-3">
                <p style="margin: 5px; font-size: 16px">Contraseña</p>
                <p
                  style="
                    background-color: #d9d9d9;
                    padding: 8px;
                    width: 90%;
                    font-size: 14px;
                    border-radius: 5px;
                  "
                >
                  **********
                </p>
              </div>
            </div>
            <div class="row" v-else>
              <div class="col-4">
                <p style="margin: 5px; font-size: 16px">Nombre</p>
                <div style="width: 90%">
                  <q-input
                    dense
                    v-model="inputFullname"
                    input-style="background-color: #D9D9D9; padding: 8px; font-size: 14px; border-radius: 5px;"
                  />
                </div>
              </div>
              <div class="col-4">
                <p style="margin: 5px; font-size: 16px">Email</p>
                <div style="width: 90%">
                  <q-input
                    dense
                    v-model="inputEmail"
                    input-style="background-color: #D9D9D9; padding: 8px; font-size: 14px; border-radius: 5px;"
                  />
                </div>
              </div>
              <div class="col-4">
                <p style="margin: 5px; font-size: 16px">Usuario</p>
                <div style="width: 90%">
                  <q-input
                    dense
                    v-model="inputUsername"
                    input-style="background-color: #D9D9D9; padding: 8px; font-size: 14px; border-radius: 5px;"
                  />
                </div>
              </div>
              <div class="col-3">
                <p style="margin: 5px; font-size: 16px">Contraseña</p>
                <div style="width: 90%">
                  <q-input
                    dense
                    type="password"
                    v-model="inputPassword"
                    input-style="background-color: #D9D9D9; padding: 8px; font-size: 14px; border-radius: 5px;"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { defineComponent, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useFilterStore } from "src/stores/filter-store";
import { useDataApiStore } from "src/stores/data-api-store";
import { api } from "src/boot/axios";

export default defineComponent({
  name: "admin-administradorId",
  setup() {
    const dataApiStore = useDataApiStore();
    const filterStore = useFilterStore();
    const router = useRouter();
    const idAdmin = ref(router.currentRoute._value.params.id);
    const admin = ref();
    const adminsLoaded = ref(true);
    const actualSection = ref(1);
    const isEditingInfo = ref(false);

    const deleteDialog = ref(false);

    const inputFullname = ref(null);
    const inputUsername = ref(null);
    const inputEmail = ref(null);
    const inputPassword = ref(null);

    function loadAdmin(updatedAdmin = null) {
      try {
        if (updatedAdmin !== null) {
          admin.value = updatedAdmin;
          setTimeout(() => {
            adminsLoaded.value = false;
          }, 2000);
        } else {
          adminsLoaded.value = true;
          api
            .post(
              `./admin/administrador/perfil`,
              {
                administrador: idAdmin.value,
              }
            )
            .then((res) => {
              admin.value = res.data;
              setTimeout(() => {
                adminsLoaded.value = false;
              }, 2000);
            })
            .catch((err) => console.error(err));
        }
      } catch (error) {
        setTimeout(() => {
          loadAdmin();
          console.error(error);
        }, 2000);
      }
    }

    function deleteAdmin() {
      api
        .post(
          `./admin/administrador/perfil/borrar`,
          {
            administrador: idAdmin._value,
          }
        )
        .then((res) => {
          console.log(res.data);
          if (res.data === "Administrador eliminado correctamente") {
            router.push({ name: "admin-listaAdministradores" });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }

    function toBack() {
      console.clear();
      router.go(-1);
    }

    function toEditInfo() {
      isEditingInfo.value = !isEditingInfo.value;
      const name = admin.value.datosPersonales.nombres;
      const user = admin.value.datosPersonales.privado;
      inputFullname.value = `${name.nombre} ${name.apPaterno} ${name.apMaterno}`;
      inputEmail.value = user.email;
      inputUsername.value = user.username;
      inputPassword.value = "**********";
    }

    function saveEditInfo() {
      const fullName = inputFullname.value;
      const fullNameDivided = fullName.split(" ");

      let firstName;
      let lastName1;
      let lastName2;

      if (fullNameDivided.length > 3) {
        firstName = `${fullNameDivided[0]} ${fullNameDivided[1]}`;
        lastName1 = fullNameDivided[2];
        lastName2 = fullNameDivided[3];
      } else {
        firstName = fullNameDivided[0];
        lastName1 = fullNameDivided[1];
        lastName2 = fullNameDivided[2];
      }

      const updatedAdmin = {
        idAdministrador: idAdmin._value,
        datosPersonales: {
          nombres: {
            nombre: firstName,
            apPaterno: lastName1,
            apMaterno: lastName2,
          },
          privado: {
            email: inputEmail.value,
            username: inputUsername.value,
            password: inputPassword.value,
          },
        },
      };
      adminsLoaded.value = true;
      api
        .patch(
          `./admin/administrador/perfil/modificar`,
          {
            administrador: updatedAdmin,
          }
        )
        .then((res) => {
          if (res.data.msg) {
            console.log(res.data.msg);
          } else {
            isEditingInfo.value = false;
            actualSection.value = 1;
            loadAdmin(res.data);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }

    function showSection(section) {
      isEditingInfo.value = false;
      actualSection.value = section;
    }

    onMounted(() => {
      loadAdmin();
    });

    return {
      dataApiStore,
      filterStore,
      router,
      idAdmin,
      admin,
      loadAdmin,
      deleteDialog,
      deleteAdmin,
      adminsLoaded,
      toBack,
      showSection,
      actualSection,
      toEditInfo,
      isEditingInfo,
      saveEditInfo,
      inputFullname,
      inputUsername,
      inputEmail,
      inputPassword
    };
  },
});
</script>

<style scoped>
.input-group {
  display: flex;
  align-items: stretch;
  width: 100%;
  height: 40px;
}

.form-control {
  border: 1px solid #ced4da;
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  line-height: 2.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  flex: 1;
}

.btn-primary {
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-menu {
  display: none;
  position: absolute;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.15);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  min-width: 160px;
  z-index: 1;
  padding: 0;
  margin: 0;
  list-style: none;
}

.dropdown-menu a {
  display: block;
  padding: 10px 16px;
  color: #333;
  text-decoration: none;
  transition: background-color 0.3s ease;
  font-size: 14px;
}

.dropdown-menu a:hover {
  background-color: #f5f5f5;
}

.dropdown:hover .dropdown-menu {
  display: block;
}

.form-row {
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  margin-right: 50px;
  margin-bottom: 50px;
  margin-top: 30px;
}

.form-group {
  flex: 1;
  padding: 0 10px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  font-size: 20px;
}

input {
  width: 100%;
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #000;
  background-color: #ddd; /* Fondo gris por defecto */
  font-size: 20px; /* Tamaño de fuente más grande */
}

input:focus {
  background-color: #fff; /* Fondo blanco al recibir clic */
}

.custom-select .q-field__native {
  font-size: 20px; /* Tamaño de fuente más grande */
}

.custom-select .q-field__native:focus {
  outline: none; /* Quita el contorno por defecto al enfocar */
}

.custom-select .q-field__native::selection {
  background-color: transparent; /* Evita el recuadro adicional al seleccionar texto */
}

@media (max-width: 768px) {
  .container-fluid {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
  }

  .container-fluid div:first-child {
    position: static;
    margin-right: 10px;
  }

  .container-fluid div:first-child q-btn {
    margin-left: 10px;
  }

  .container-fluid div:last-child {
    display: none;
  }

  .container-fluid div:nth-child(2) {
    height: auto;
    padding: 5px;
  }

  .container-fluid div:nth-child(2) q-btn {
    font-size: 10px;
    padding: 4px 8px;
    border-radius: 15px;
  }

  .container-fluid div:nth-child(2) q-btn:last-child {
    margin-right: 0;
  }

  .container-fluid div:nth-child(2) div {
    display: none;
  }

  .container-fluid div:nth-child(2) div:last-child {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .container-fluid div:nth-child(2) div:last-child q-btn {
    margin-left: 10px;
  }

  .container-fluid div:nth-child(2) div:last-child q-btn:last-child {
    margin-left: 0;
  }

  .container-fluid div:nth-child(2) div:last-child q-btn i {
    display: none;
  }

  .container-fluid div:nth-child(2) div:last-child q-btn span {
    display: none;
  }

  .container-fluid div:nth-child(2) div:last-child q-btn:before {
    content: "<";
  }

  .container-fluid div:nth-child(2) div:last-child q-btn:after {
    content: "Regresar";
  }

  .container-fluid div:nth-child(2) div:last-child q-btn.q-btn--flat {
    background-color: transparent;
    box-shadow: none;
    border: none;
    margin-left: 0;
  }

  .container-fluid div:nth-child(2) div:last-child q-btn.q-btn--flat:hover {
    background-color: transparent;
  }

  .container-fluid
    div:nth-child(2)
    div:last-child
    q-btn.q-btn--flat:hover:before {
    background-color: transparent;
  }

  .container-fluid
    div:nth-child(2)
    div:last-child
    q-btn.q-btn--flat:hover:after {
    background-color: transparent;
  }

  .container-fluid div:nth-child(2) div:last-child q-btn.q-btn--flat:active {
    background-color: transparent;
  }

  .container-fluid
    div:nth-child(2)
    div:last-child
    q-btn.q-btn--flat:active:before {
    background-color: transparent;
  }

  .container-fluid
    div:nth-child(2)
    div:last-child
    q-btn.q-btn--flat:active:after {
    background-color: transparent;
  }

  .container-fluid div:nth-child(2) div:last-child q-btn.q-btn--flat:focus {
    background-color: transparent;
  }

  .container-fluid
    div:nth-child(2)
    div:last-child
    q-btn.q-btn--flat:focus:before {
    background-color: transparent;
  }

  .container-fluid
    div:nth-child(2)
    div:last-child
    q-btn.q-btn--flat:focus:after {
    background-color: transparent;
  }

  .container-fluid div:nth-child(2) div:last-child q-btn.q-btn--flat:visited {
    background-color: transparent;
  }

  .container-fluid
    div:nth-child(2)
    div:last-child
    q-btn.q-btn--flat:visited:before {
    background-color: transparent;
  }

  .container-fluid
    div:nth-child(2)
    div:last-child
    q-btn.q-btn--flat:visited:after {
    background-color: transparent;
  }

  .container-fluid div:nth-child(2) div:last-child q-btn.q-btn--flat:disabled {
    background-color: transparent;
  }

  .container-fluid
    div:nth-child(2)
    div:last-child
    q-btn.q-btn--flat:disabled:before {
    background-color: transparent;
  }

  .container-fluid
    div:nth-child(2)
    div:last-child
    q-btn.q-btn--flat:disabled:after {
    background-color: transparent;
  }

  .container-fluid div:nth-child(2) div:last-child q-btn:before {
    content: "<";
  }

  .container-fluid div:nth-child(2) div:last-child q-btn:after {
    content: "Regresar";
  }

  .container-fluid div:nth-child(2) div:last-child q-btn.q-btn--flat:before {
    background-color: transparent;
  }

  .container-fluid div:nth-child(2) div:last-child q-btn.q-btn--flat:after {
    background-color: transparent;
  }

  .container-fluid div:nth-child(2) div:last-child q-btn i {
    display: none;
  }

  .container-fluid div:nth-child(2) div:last-child q-btn span {
    display: none;
  }

  .container-fluid div:nth-child(2) div:last-child q-btn:before {
    content: "<";
  }

  .container-fluid div:nth-child(2) div:last-child q-btn:after {
    content: "Regresar";
  }

  .container-fluid div:nth-child(2) div:last-child q-btn.q-btn--flat {
    background-color: transparent;
    box-shadow: none;
    border: none;
    margin-left: 0;
  }

  .container-fluid div:nth-child(2) div:last-child q-btn.q-btn--flat:hover {
    background-color: transparent;
  }

  .container-fluid
    div:nth-child(2)
    div:last-child
    q-btn.q-btn--flat:hover:before {
    background-color: transparent;
  }

  .container-fluid
    div:nth-child(2)
    div:last-child
    q-btn.q-btn--flat:hover:after {
    background-color: transparent;
  }

  .container-fluid div:nth-child(2) div:last-child q-btn.q-btn--flat:active {
    background-color: transparent;
  }

  .container-fluid
    div:nth-child(2)
    div:last-child
    q-btn.q-btn--flat:active:before {
    background-color: transparent;
  }

  .container-fluid
    div:nth-child(2)
    div:last-child
    q-btn.q-btn--flat:active:after {
    background-color: transparent;
  }

  .container-fluid div:nth-child(2) div:last-child q-btn.q-btn--flat:focus {
    background-color: transparent;
  }

  .container-fluid
    div:nth-child(2)
    div:last-child
    q-btn.q-btn--flat:focus:before {
    background-color: transparent;
  }

  .container-fluid
    div:nth-child(2)
    div:last-child
    q-btn.q-btn--flat:focus:after {
    background-color: transparent;
  }

  .container-fluid div:nth-child(2) div:last-child q-btn.q-btn--flat:visited {
    background-color: transparent;
  }

  .container-fluid
    div:nth-child(2)
    div:last-child
    q-btn.q-btn--flat:visited:before {
    background-color: transparent;
  }

  .container-fluid
    div:nth-child(2)
    div:last-child
    q-btn.q-btn--flat:visited:after {
    background-color: transparent;
  }

  .container-fluid div:nth-child(2) div:last-child q-btn.q-btn--flat:disabled {
    background-color: transparent;
  }

  .container-fluid
    div:nth-child(2)
    div:last-child
    q-btn.q-btn--flat:disabled:before {
    background-color: transparent;
  }

  .container-fluid
    div:nth-child(2)
    div:last-child
    q-btn.q-btn--flat:disabled:after {
    background-color: transparent;
  }

  .container-fluid div:nth-child(2) div:last-child q-btn:before {
    content: "<";
  }

  .container-fluid div:nth-child(2) div:last-child q-btn:after {
    content: "Regresar";
  }

  .container-fluid div:nth-child(2) div:last-child q-btn.q-btn--flat:before {
    background-color: transparent;
  }

  .container-fluid div:nth-child(2) div:last-child q-btn.q-btn--flat:after {
    background-color: transparent;
  }
}
</style>
