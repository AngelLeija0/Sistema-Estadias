<template>
  <q-card style="border-radius: 15px; text-align: center">
    <q-card-section vertical>
      <q-card-section style="height: 255px">
        <p style="font-size: 20px; font-weight: 500; margin-bottom: 0;">{{ nombre }}</p>
        <p style="font-size: 20px; font-weight: 500;">{{ apPaterno }} {{ apMaterno }}</p>
        <p style="font-size: 18px">{{ carrera }} {{ area }} - {{ grado }}°{{ grupo }}</p>
        <p style="color: #777676; font-size: 18px">{{ proyecto }}</p>
      </q-card-section>
      <q-card-actions style="display: flex; justify-content: center">
        <q-btn
          style="
            font-size: 16px;
            font-weight: 400;
            text-transform: capitalize;
            padding: 10px 40px;
            background: #1ab192;
            color: white;
          "
          rounded
          label="Ver perfil"
          :to="profileLink"
        ></q-btn>
      </q-card-actions>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent, computed } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "CardProyecto",
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
    proyecto: {
      type: String,
    },
    grado: {
      type: String,
    },
    grupo: {
      type: String,
    },
  },
  setup(props) {
    const router = useRouter();
    const actualSection = router.currentRoute.value.name;
    console.log(actualSection);
    const profileLink = computed(() => {
      if (actualSection === "asesor-inicio") {
        return { name: "asesor-alumnoId", params: { id: props.idAlumno } };
      }
      else if (actualSection === "admin-listaAlumnos") {
        return { name: "admin-alumnoId", params: { id: props.idAlumno } };
      }
      else if (actualSection === "vinculacion-listaAlumnos") {
        return { name: "vinculacion-alumnoId" , params: { id: props.idAlumno } };
      }
      return { path: "/" };
    });
    return {
      profileLink,
    };
  },
});
</script>
