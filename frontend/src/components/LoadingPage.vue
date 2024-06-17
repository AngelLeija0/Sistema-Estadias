<template>
  <div class="container-fluid q-mt-xl">
    <div class="row q-pt-xl">
      <div
        class="col-12 q-pt-xl"
        style="display: flex; justify-content: center"
      >
        <q-card class="q-ma-lg">
          <q-card-section class="q-ml-xl q-mr-xl q-mt-sm q-mb-xl text-center">
            <h1 style="font-size: 24px; font-weight: 400">Cargando página</h1>
            <q-spinner-hourglass color="primary" size="4em" />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "LoadingPage",
});
</script>
