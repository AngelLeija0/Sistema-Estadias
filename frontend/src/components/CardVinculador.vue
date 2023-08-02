<template>
  <q-card style="border-radius: 15px; text-align: center">
    <q-card-section vertical>
      <q-card-section style="height: 225px">
        <p style="font-size: 20px; font-weight: 500; margin-bottom: 0">
          {{ nombre }}
        </p>
        <p style="font-size: 20px; font-weight: 500">
          {{ apPaterno }} {{ apMaterno }}
        </p>
        <p style="font-size: 18px">{{ carrera }}</p>
        <p style="font-size: 18px">{{ email }}</p>
        <p style="color: #777676; font-size: 18px">User: {{ username }}</p>
      </q-card-section>
      <q-card-actions style="display: flex; justify-content: center">
        <q-btn
          style="
            font-size: 16px;
            font-weight: 400;
            text-transform: capitalize;
            padding: 10px 40px;
          "
          rounded
          color="black"
          label="Ver perfil"
          :to="{ name: 'vinculacion-vinculadorId', params: { id: idVinculador } }"
        ></q-btn>
      </q-card-actions>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "CardVinculador",
  props: {
    nombre: {
      type: String,
    },
    apPaterno: {
      type: String,
    },
    apMaterno: {
      type: Number,
    },
    carrera: {
      type: String,
    },
    email: {
      type: String,
    },
    username: {
      type: String,
    },
    idVinculador: {
      type: String,
    },
  },
});
</script>
