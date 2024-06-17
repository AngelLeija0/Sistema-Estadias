<template>
  <q-card style="border-radius: 12px; text-align: center">
    <q-card-section vertical>
      <q-card-section style="height: 170px">
        <p style="font-size: 15px; font-weight: 500; margin-bottom: 0;">{{ nombre }}</p>
        <p style="font-size: 15px; font-weight: 500;">{{ apPaterno }} {{ apMaterno }}</p>
        <p style="font-size: 13px">{{ carrera }} {{ area }}</p>
        <p style="color: #777676; font-size: 13px">{{ matricula }}</p>
      </q-card-section>
      <q-card-actions style="display: flex; justify-content: center">
        <q-btn
          style="
            font-size: 13px;
            font-weight: 400;
            text-transform: capitalize;
            padding: 8px 30px;
            background: #1ab192;
            color: white;
          "
          rounded
          label="Ver perfil"
          :to="{ name: 'admin-alumnoId', params: {id: idAlumno} }"
        ></q-btn>
      </q-card-actions>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "CardMiniAlumno",
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
    nivelAcademico: {
      type: Date,
    },
    carrera: {
      type: String,
    },
    area: {
      type: String,
    },
    matricula: {
      type: String,
    },
    idAlumno: {
      type: String,
    },
  },
});
</script>
