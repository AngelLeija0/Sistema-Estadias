<template>
  <UserNavbar></UserNavbar>
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
    v-if="studentsLoaded"
  >
    <div class="row">
      <div class="col-12" style="display: flex; justify-content: center">
        <q-card class="q-ma-lg">
          <q-card-section class="q-ml-xl q-mr-xl q-mt-sm q-mb-xl text-center">
            <h1 style="font-size: 24px; font-weight: 400">Cargando alumno</h1>
            <q-spinner-hourglass color="primary" size="4em" />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
  <div
    class="container-fluid q-pt-sm q-pl-xl q-pr-xl q-pb-xl"
    style="background-color: #f5f5f5; min-height: 370px"
    v-else
  >
    <div
      class="row q-ml-xl q-mr-xl"
      style="background-color: white; border-radius: 15px; height: 455px"
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
            {{ student.nombre }}
          </p>
          <p style="font-size: 16px; font-weight: 500">
            {{ student.apPaterno }} {{ student.apMaterno }}
          </p>
          <p style="font-size: 14px">
            {{ student.carrera }} {{ student.area }}
          </p>
          <p style="color: #777676; font-size: 14px">{{ student.matricula }}</p>
        </div>
        <div>
          <q-card-actions style="flex-direction: column; align-items: start">
            <q-btn
              flat
              color="black"
              label="Informacion general"
              :style="{
                margin: '3px',
                textTransform: 'capitalize',
                fontSize: '16px',
                fontWeight: 'normal',
                width: '100%',
                alignItems: 'start',
                background: actualSection === 1 ? '#e8e8e8' : '',
              }"
              @click="showSection(1)"
            ></q-btn>
            <q-btn
              flat
              color="black"
              label="Carta presentación"
              :style="{
                margin: '3px',
                textTransform: 'capitalize',
                fontSize: '16px',
                fontWeight: 'normal',
                width: '100%',
                alignItems: 'start',
                background: actualSection === 3 ? '#e8e8e8' : '',
              }"
              @click="showSection(3)"
            ></q-btn>
            <q-btn
              flat
              color="black"
              label="Documentación"
              :style="{
                margin: '3px',
                textTransform: 'capitalize',
                fontSize: '16px',
                fontWeight: 'normal',
                width: '100%',
                alignItems: 'start',
                background: actualSection === 2 ? '#e8e8e8' : '',
              }"
              @click="showSection(2)"
            ></q-btn>
            <q-btn
              flat
              color="black"
              label="Anteproyecto"
              :style="{
                margin: '3px',
                textTransform: 'capitalize',
                fontSize: '16px',
                fontWeight: 'normal',
                width: '100%',
                alignItems: 'start',
                background: actualSection === 4 ? '#e8e8e8' : '',
              }"
              @click="showSection(4)"
            ></q-btn>
            <q-btn
              flat
              color="black"
              label="Avance"
              :style="{
                margin: '3px',
                textTransform: 'capitalize',
                fontSize: '16px',
                fontWeight: 'normal',
                width: '100%',
                alignItems: 'start',
                background: actualSection === 5 ? '#e8e8e8' : '',
              }"
              @click="showSection(5)"
            ></q-btn>
          </q-card-actions>
        </div>
      </div>
      <div class="col-8 q-pl-xl">
        <div class="row" v-if="actualSection === 1">
          <div class="col-12" style="padding-bottom: 20px">
            <h5 style="font-weight: 500">Información General</h5>
          </div>
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
              {{ student.nombre }} {{ student.apPaterno }}
              {{ student.apMaterno }}
            </p>
          </div>
          <div class="col-4">
            <p style="margin: 5px; font-size: 16px">Carrera</p>
            <p
              style="
                background-color: #d9d9d9;
                padding: 8px;
                width: 90%;
                font-size: 14px;
                border-radius: 5px;
              "
            >
              {{ student.carrera }}
            </p>
          </div>
          <div class="col-4">
            <p style="margin: 5px; font-size: 16px">Area</p>
            <p
              style="
                background-color: #d9d9d9;
                padding: 8px;
                width: 90%;
                font-size: 14px;
                border-radius: 5px;
              "
            >
              {{ student.area }}
            </p>
          </div>
          <div class="col-12"></div>
          <div class="col-3">
            <p style="margin: 5px; font-size: 16px">Matricula</p>
            <p
              style="
                background-color: #d9d9d9;
                padding: 8px;
                width: 90%;
                font-size: 14px;
                border-radius: 5px;
              "
            >
              {{ student.matricula }}
            </p>
          </div>
          <div class="col-2">
            <p style="margin: 5px; font-size: 16px">Grado</p>
            <p
              style="
                background-color: #d9d9d9;
                padding: 8px;
                width: 90%;
                font-size: 14px;
                border-radius: 5px;
              "
            >
              {{ student.grado }}
            </p>
          </div>
          <div class="col-2">
            <p style="margin: 5px; font-size: 16px">Grupo</p>
            <p
              style="
                background-color: #d9d9d9;
                padding: 8px;
                width: 90%;
                font-size: 14px;
                border-radius: 5px;
              "
            >
              {{ student.grupo }}
            </p>
          </div>
          <div class="col-5">
            <p style="margin: 5px; font-size: 16px">Nivel academico</p>
            <p
              style="
                background-color: #d9d9d9;
                padding: 8px;
                width: 90%;
                font-size: 14px;
                border-radius: 5px;
              "
            >
              {{ student.nivelAcademico }}
            </p>
          </div>
        </div>
        <div class="row" v-if="actualSection === 2">
          <q-dialog v-model="downloadingDocument">
            <q-card class="q-pa-lg" style="width: 300px">
              <q-card-section>
                <div class="text-h6 text-center">Descargando documento</div>
              </q-card-section>
              <q-card-section class="q-pt-none text-center">
                <q-spinner color="primary" size="50px" />
              </q-card-section>
            </q-card>
          </q-dialog>
          <q-dialog v-model="downloadingError">
            <q-card class="q-pa-lg" style="width: 300px">
              <q-card-section>
                <div class="text-h6 text-center">
                  No se encontro este documento
                </div>
              </q-card-section>
              <q-card-section class="q-pt-none text-center">
                <q-icon name="cancel" color="red" size="50px" />
              </q-card-section>
            </q-card>
          </q-dialog>
          <div class="col-8">
            <h5 style="font-weight: 500">Documentación</h5>
          </div>
          <div
            class="col-4"
            style="display: flex; align-items: center; justify-content: right"
          >
            <div
              :style="{
                display: 'flex',
                alignItems: 'center',
                margin: '0',
                padding: '7px 30%',
                borderRadius: '8px',
                backgroundColor: phaseState.color,
              }"
            >
              <p style="color: white; font-weight: bold; margin: 0">
                {{ phaseState.label }}
              </p>
              <q-btn
                v-if="phaseState.label === 'Rechazada'"
                flat
                color="white"
                icon="more_horiz"
                size="12px"
                @click="dialogPhaseState = true"
              ></q-btn>
            </div>
          </div>
          <q-dialog v-model="dialogChangePhaseState">
            <q-card
              class="q-pt-md q-pl-md q-pr-md"
              style="width: 500px; max-width: 60vw; height: 40vh"
            >
              <div class="row q-ma-sm">
                <div class="col-12" style="display: flex; justify-content: end">
                  <q-card-actions>
                    <q-btn
                      align="right"
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
                <div class="col-12 q-pa-md">
                  <div
                    class="text-h6 text-center"
                    style="font-size: 22px; font-weight: 500"
                  >
                    Estado de etapa {{ actualPhase }}
                  </div>
                </div>
                <div class="col-12 q-pt-xl">
                  <q-card-actions class="bg-white text-teal" align="center">
                    <q-btn-group flat="">
                      <q-btn
                        color="primary"
                        label="Aceptar"
                        icon="done"
                        style="
                          margin: 3px;
                          padding-left: 20px;
                          padding-right: 20px;
                          text-transform: capitalize;
                          font-size: 14px;
                        "
                        @click="setPhaseState('Aceptada')"
                      />
                      <q-btn
                        color="red"
                        label="Rechazar"
                        icon="close"
                        style="
                          margin: 3px;
                          padding-left: 20px;
                          padding-right: 20px;
                          text-transform: capitalize;
                          font-size: 14px;
                        "
                        @click="dialogDenyPhase = true"
                      />
                    </q-btn-group>
                  </q-card-actions>
                </div>
              </div>
            </q-card>
          </q-dialog>
          <q-dialog v-model="dialogDenyPhase">
            <q-card
              class="q-pt-md q-pl-md q-pr-md"
              style="width: 500px; max-width: 60vw; height: 40vh"
            >
              <div class="row q-ma-sm">
                <div class="col-12" style="display: flex; justify-content: end">
                  <q-card-actions>
                    <q-btn
                      align="right"
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
                <div class="col-12 q-pa-md">
                  <div
                    class="text-h6 text-center"
                    style="font-size: 22px; font-weight: 500"
                  >
                    Rechazar etapa {{ actualPhase }}
                  </div>
                </div>
                <div class="col-12 q-pa-sm">
                  <q-input
                    v-model="phaseState.motive"
                    filled
                    autogrow
                    style="font-size: 14px"
                  />
                  <q-card-actions class="bg-white text-teal" align="center">
                    <q-btn-group flat="">
                      <q-btn
                        color="red"
                        label="Rechazar"
                        icon="close"
                        style="
                          margin: 3px;
                          padding-left: 20px;
                          padding-right: 20px;
                          text-transform: capitalize;
                          font-size: 14px;
                        "
                        @click="setPhaseState('Rechazada', phaseState.motive)"
                      />
                      <q-btn
                        flat
                        color="white"
                        text-color="black"
                        label="Cancelar"
                        style="
                          margin: 3px;
                          padding-left: 40px;
                          padding-right: 40px;
                          text-transform: capitalize;
                          font-size: 14px;
                        "
                        v-close-popup
                      />
                    </q-btn-group>
                  </q-card-actions>
                </div>
              </div>
            </q-card>
          </q-dialog>
          <q-dialog v-model="dialogPhaseState">
            <q-card
              class="q-pt-md q-pl-md q-pr-md"
              style="width: 500px; max-width: 60vw; height: 45vh"
            >
              <div class="row q-ma-sm">
                <div class="col-12" style="display: flex; justify-content: end">
                  <q-card-actions>
                    <q-btn
                      align="right"
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
                <div class="col-12 q-pa-md">
                  <div
                    class="text-h6 text-center"
                    style="font-size: 22px; font-weight: 500"
                  >
                    Estado de etapa {{ actualPhase }}
                  </div>
                </div>
                <div class="col-12 q-pa-md q-mt-md">
                  <p style="font-size: 14px">
                    <span style="font-weight: 500">Estado: </span
                    >{{ phaseState.label }}
                  </p>
                  <p style="font-size: 14px">
                    <span style="font-weight: 500">Fecha de revisión: </span
                    >{{ phaseState.date }}
                  </p>
                  <p style="font-size: 14px">
                    <span style="font-weight: 500">Motivo: </span
                    >{{ phaseState.motive }}
                  </p>
                </div>
              </div>
            </q-card>
          </q-dialog>
          <div class="col-12 q-pt-md">
            <div class="row" v-if="existsDocumentos">
              <div class="col-md-12">
                <div class="row justify-between" v-if="actualPhase == 0">
                  <div
                    class="col-md-2"
                    v-for="(phase, i) in phases"
                    :key="i + 1"
                  >
                    <q-card
                      v-ripple
                      dark
                      bordered
                      class="bg-grey-4 my-card cursor-pointer"
                      style="height: 205px"
                      @click="toShowPhase(phase)"
                    >
                      <q-card-section>
                        <div
                          class="text-subtitle2 text-black"
                          style="
                            justify-content: space-between;
                            display: flex;
                            align-items: center;
                          "
                        >
                          Etapa {{ phase }}
                          <q-icon name="arrow_forward_ios" color="black" />
                        </div>
                      </q-card-section>
                      <q-separator color="grey-5" inset />
                      <q-card-section>
                        <div v-for="(document, i) in documents" :key="i + 1">
                          <p class="text-black" v-if="document.phase === phase">
                            ∙ {{ document.label }}
                          </p>
                        </div>
                      </q-card-section>
                    </q-card>
                  </div>
                </div>
                <div class="col-md-12" v-else>
                  <div class="row">
                    <div class="col-md-6">
                      <p style="font-weight: 500; font-size: 18px">
                        Etapa {{ actualPhase }}
                      </p>
                    </div>
                    <div class="col-md-6 flex justify-end">
                      <q-card-actions>
                        <q-btn-group flat>
                          <q-btn
                            color="black"
                            label="Regresar"
                            icon="arrow_left"
                            style="
                              margin: 3px;
                              padding-right: 15px;
                              text-transform: capitalize;
                              font-size: 12px;
                            "
                            @click="toBackPhase"
                          ></q-btn>
                          <q-btn
                            color="secondary"
                            icon="settings"
                            label="Cambiar estado"
                            style="
                              margin: 3px;
                              padding-right: 15px;
                              text-transform: capitalize;
                              font-size: 12px;
                              font-weight: normal;
                            "
                            @click="dialogChangePhaseState = true"
                          ></q-btn>
                        </q-btn-group>
                      </q-card-actions>
                    </div>
                    <div class="col-md-12 q-pt-xl"></div>
                    <div
                      class="col-4"
                      style="padding-bottom: 30px"
                      v-for="(document, i) in documentsToShow"
                      :key="i + 1"
                    >
                      <div
                        style="
                          background-color: #d9d9d9;
                          padding: 0 8px;
                          width: 90%;
                          border-radius: 5px;
                          display: inline-flex;
                          align-items: center;
                          justify-content: space-between;
                        "
                      >
                        <p style="font-size: 14px; margin: 0">
                          {{ document.label }}
                        </p>
                        <q-card-actions style="justify-content: end">
                          <q-btn-group flat>
                            <q-btn
                              flat
                              color="black"
                              icon="visibility"
                              style="
                                padding-right: 10px;
                                text-transform: capitalize;
                                font-size: 12px;
                                font-weight: normal;
                              "
                              @click="
                                toDownloadDocument(document.name, document.path)
                              "
                            ></q-btn>
                          </q-btn-group>
                        </q-card-actions>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row" v-else>
              <p>No se encontraron documentos</p>
            </div>
          </div>
        </div>
        <div class="row" v-if="actualSection === 3">
          <div class="col-8">
            <h5 style="font-weight: 500">Carta presentación</h5>
          </div>
          <div
            class="col-4"
            style="display: flex; align-items: center; justify-content: right"
          >
            <div
              :style="{
                display: 'flex',
                alignItems: 'center',
                margin: '0',
                padding: '7px 30%',
                borderRadius: '8px',
                backgroundColor: cpaState.color,
              }"
            >
              <p style="color: white; font-weight: bold; margin: 0">
                {{ cpaState.label }}
              </p>
              <q-btn
                v-if="cpaState.label === 'Rechazada'"
                flat
                color="white"
                icon="more_horiz"
                size="12px"
                @click="dialogCpaState = true"
              ></q-btn>
            </div>
          </div>
          <div class="col-12 flex justify-end" style="padding-bottom: 10px">
            <q-card-actions>
              <q-btn-group flat v-if="!isEditingCPA">
                <q-btn
                  color="secondary"
                  icon="settings"
                  label="Cambiar estado"
                  style="
                    margin: 3px;
                    padding-right: 15px;
                    text-transform: capitalize;
                    font-size: 12px;
                    font-weight: normal;
                  "
                  @click="dialogChangeCPAState = true"
                ></q-btn>
                <q-dialog v-model="dialogChangeCPAState">
                  <q-card
                    class="q-pt-md q-pl-md q-pr-md"
                    style="width: 500px; max-width: 60vw; height: 40vh"
                  >
                    <div class="row q-ma-sm">
                      <div
                        class="col-12"
                        style="display: flex; justify-content: end"
                      >
                        <q-card-actions>
                          <q-btn
                            align="right"
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
                      <div class="col-12 q-pa-md">
                        <div
                          class="text-h6 text-center"
                          style="font-size: 22px; font-weight: 500"
                        >
                          Estado de carta presentación
                        </div>
                      </div>
                      <div class="col-12 q-pt-xl">
                        <q-card-actions
                          class="bg-white text-teal"
                          align="center"
                        >
                          <q-btn-group flat="">
                            <q-btn
                              color="primary"
                              label="Aceptar"
                              icon="done"
                              style="
                                margin: 3px;
                                padding-left: 20px;
                                padding-right: 20px;
                                text-transform: capitalize;
                                font-size: 14px;
                              "
                              @click="setCpaState('Aceptada')"
                            />
                            <q-btn
                              color="red"
                              label="Rechazar"
                              icon="close"
                              style="
                                margin: 3px;
                                padding-left: 20px;
                                padding-right: 20px;
                                text-transform: capitalize;
                                font-size: 14px;
                              "
                              @click="dialogDenyCpa = true"
                            />
                          </q-btn-group>
                        </q-card-actions>
                      </div>
                    </div>
                  </q-card>
                </q-dialog>
                <q-dialog v-model="dialogDenyCpa">
                  <q-card
                    class="q-pt-md q-pl-md q-pr-md"
                    style="width: 500px; max-width: 60vw; height: 40vh"
                  >
                    <div class="row q-ma-sm">
                      <div
                        class="col-12"
                        style="display: flex; justify-content: end"
                      >
                        <q-card-actions>
                          <q-btn
                            align="right"
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
                      <div class="col-12 q-pa-md">
                        <div
                          class="text-h6 text-center"
                          style="font-size: 22px; font-weight: 500"
                        >
                          Rechazar documento
                        </div>
                      </div>
                      <div class="col-12 q-pa-sm">
                        <q-input
                          v-model="cpaState.motive"
                          filled
                          autogrow
                          style="font-size: 14px"
                        />
                        <q-card-actions
                          class="bg-white text-teal"
                          align="center"
                        >
                          <q-btn-group flat="">
                            <q-btn
                              color="red"
                              label="Rechazar"
                              icon="close"
                              style="
                                margin: 3px;
                                padding-left: 20px;
                                padding-right: 20px;
                                text-transform: capitalize;
                                font-size: 14px;
                              "
                              @click="setCpaState('Rechazada', cpaState.motive)"
                            />
                            <q-btn
                              flat
                              color="white"
                              text-color="black"
                              label="Cancelar"
                              style="
                                margin: 3px;
                                padding-left: 40px;
                                padding-right: 40px;
                                text-transform: capitalize;
                                font-size: 14px;
                              "
                              v-close-popup
                            />
                          </q-btn-group>
                        </q-card-actions>
                      </div>
                    </div>
                  </q-card>
                </q-dialog>
                <q-dialog v-model="dialogCpaState">
                  <q-card
                    class="q-pt-md q-pl-md q-pr-md"
                    style="width: 500px; max-width: 60vw; height: 45vh"
                  >
                    <div class="row q-ma-sm">
                      <div
                        class="col-12"
                        style="display: flex; justify-content: end"
                      >
                        <q-card-actions>
                          <q-btn
                            align="right"
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
                      <div class="col-12 q-pa-md">
                        <div
                          class="text-h6 text-center"
                          style="font-size: 22px; font-weight: 500"
                        >
                          Estado de carta presentación
                        </div>
                      </div>
                      <div class="col-12 q-pa-md q-mt-md">
                        <p style="font-size: 14px">
                          <span style="font-weight: 500">Estado: </span
                          >{{ cpaState.label }}
                        </p>
                        <p style="font-size: 14px">
                          <span style="font-weight: 500"
                            >Fecha de revisión: </span
                          >{{ cpaState.date }}
                        </p>
                        <p style="font-size: 14px">
                          <span style="font-weight: 500">Motivo: </span
                          >{{ cpaState.motive }}
                        </p>
                      </div>
                    </div>
                  </q-card>
                </q-dialog>
                <q-btn
                  color="orange"
                  icon="print"
                  label="Imprimir"
                  style="
                    margin: 3px;
                    padding-right: 15px;
                    text-transform: capitalize;
                    font-size: 12px;
                    font-weight: normal;
                  "
                  @click="dialogPrintOptions = true"
                ></q-btn>
                <q-dialog v-model="dialogPrintOptions">
                  <q-card
                    class="q-pt-md q-pl-md q-pr-md"
                    style="width: 500px; max-width: 60vw; height: 40vh"
                  >
                    <div class="row q-ma-sm">
                      <div
                        class="col-12"
                        style="display: flex; justify-content: end"
                      >
                        <q-card-actions>
                          <q-btn
                            align="right"
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
                      <div class="col-12 q-pa-md">
                        <div
                          class="text-h6 text-center"
                          style="font-size: 22px; font-weight: 500"
                        >
                          Imprimir carta presentacion
                        </div>
                      </div>
                      <div class="col-12 q-pt-xl">
                        <q-card-actions
                          class="bg-white text-teal"
                          align="center"
                        >
                          <q-btn-group flat>
                            <q-btn
                              color="primary"
                              label="Con firma"
                              icon="done"
                              style="
                                margin: 3px;
                                padding-left: 20px;
                                padding-right: 20px;
                                text-transform: capitalize;
                                font-size: 14px;
                              "
                              @click="printCPA('Con-Firma')"
                            />
                            <q-btn
                              color="red"
                              label="Sin firma"
                              icon="close"
                              style="
                                margin: 3px;
                                padding-left: 20px;
                                padding-right: 20px;
                                text-transform: capitalize;
                                font-size: 14px;
                              "
                              @click="printCPA('Sin-Firma')"
                            />
                          </q-btn-group>
                        </q-card-actions>
                      </div>
                    </div>
                  </q-card>
                </q-dialog>

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
                  @click="toEditCPA"
                ></q-btn>
                <q-btn
                  color="red"
                  icon="delete"
                  label="Borrar"
                  style="
                    margin: 3px;
                    padding-right: 15px;
                    text-transform: capitalize;
                    font-size: 12px;
                    font-weight: normal;
                  "
                  @click="dialogDeleteCPA = true"
                ></q-btn>
                <q-dialog v-model="dialogDeleteCPA">
                  <q-card
                    class="q-pt-md q-pl-md q-pr-md"
                    style="width: 500px; max-width: 60vw; height: 40vh"
                  >
                    <div class="row q-ma-sm">
                      <div
                        class="col-12"
                        style="display: flex; justify-content: end"
                      >
                        <q-card-actions>
                          <q-btn
                            align="right"
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
                      <div class="col-12 q-pa-md">
                        <div
                          class="text-h6 text-center"
                          style="font-size: 22px; font-weight: 500"
                        >
                          ¿Estas seguro de borrarlo?
                        </div>
                      </div>
                      <div class="col-12 q-pt-xl">
                        <q-card-actions
                          class="bg-white text-teal"
                          align="center"
                        >
                          <q-btn-group flat="">
                            <q-btn
                              color="red"
                              label="Borrar"
                              icon="delete"
                              style="
                                margin: 3px;
                                padding-left: 20px;
                                padding-right: 20px;
                                text-transform: capitalize;
                                font-size: 14px;
                              "
                              @click="toDeleteCPA"
                            />
                            <q-btn
                              color="black"
                              label="Cancelar"
                              style="
                                margin: 3px;
                                padding-left: 20px;
                                padding-right: 20px;
                                text-transform: capitalize;
                                font-size: 14px;
                              "
                              v-close-popup
                            />
                          </q-btn-group>
                        </q-card-actions>
                      </div>
                    </div>
                  </q-card>
                </q-dialog>
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
                  @click="saveEditCPA"
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
                  @click="showSection(3)"
                ></q-btn>
              </q-btn-group>
            </q-card-actions>
          </div>
          <div class="col-12">
            <div class="row" v-if="existsCPA">
              <div class="row" v-if="!isEditingCPA">
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
                    {{ student.nombre }} {{ student.apPaterno }}
                    {{ student.apMaterno }}
                  </p>
                </div>
                <div class="col-4">
                  <p style="margin: 5px; font-size: 16px">Carrera</p>
                  <p
                    style="
                      background-color: #d9d9d9;
                      padding: 8px;
                      width: 90%;
                      font-size: 14px;
                      border-radius: 5px;
                    "
                  >
                    {{ student.carrera }}
                  </p>
                </div>
                <div class="col-4">
                  <p style="margin: 5px; font-size: 16px">Area</p>
                  <p
                    style="
                      background-color: #d9d9d9;
                      padding: 8px;
                      width: 90%;
                      font-size: 14px;
                      border-radius: 5px;
                    "
                  >
                    {{ student.area }}
                  </p>
                </div>
                <div class="col-12"></div>
                <div class="col-3">
                  <p style="margin: 5px; font-size: 16px">Matricula</p>
                  <p
                    style="
                      background-color: #d9d9d9;
                      padding: 8px;
                      width: 90%;
                      font-size: 14px;
                      border-radius: 5px;
                    "
                  >
                    {{ student.matricula }}
                  </p>
                </div>
                <div class="col-3">
                  <p style="margin: 5px; font-size: 16px">NSS</p>
                  <p
                    style="
                      background-color: #d9d9d9;
                      padding: 8px;
                      width: 90%;
                      font-size: 14px;
                      border-radius: 5px;
                    "
                  >
                    {{ student.cartaPresentacion.datosAlumno.nss }}
                  </p>
                </div>
                <div class="col-4">
                  <p style="margin: 5px; font-size: 16px">CURP</p>
                  <p
                    style="
                      background-color: #d9d9d9;
                      padding: 8px;
                      width: 90%;
                      font-size: 14px;
                      border-radius: 5px;
                    "
                  >
                    {{ student.cartaPresentacion.datosAlumno.curp }}
                  </p>
                </div>
                <div class="col-1">
                  <p style="margin: 5px; font-size: 16px">Grado</p>
                  <p
                    style="
                      background-color: #d9d9d9;
                      padding: 8px;
                      width: 90%;
                      font-size: 14px;
                      border-radius: 5px;
                    "
                  >
                    {{ student.grado }}
                  </p>
                </div>
                <div class="col-1">
                  <p style="margin: 5px; font-size: 16px">Grupo</p>
                  <p
                    style="
                      background-color: #d9d9d9;
                      padding: 8px;
                      width: 90%;
                      font-size: 14px;
                      border-radius: 5px;
                    "
                  >
                    {{ student.grupo }}
                  </p>
                </div>
                <div class="col-4">
                  <p style="margin: 5px; font-size: 16px">Nivel academico</p>
                  <p
                    style="
                      background-color: #d9d9d9;
                      padding: 8px;
                      width: 90%;
                      font-size: 14px;
                      border-radius: 5px;
                    "
                  >
                    {{ student.nivelAcademico }}
                  </p>
                </div>
                <div class="col-3">
                  <p style="margin: 5px; font-size: 16px">Periodo</p>
                  <p
                    style="
                      background-color: #d9d9d9;
                      padding: 8px;
                      width: 90%;
                      font-size: 14px;
                      border-radius: 5px;
                    "
                  >
                    {{ student.cartaPresentacion.datosAcademicos.periodo }}
                  </p>
                </div>
                <div class="col-2">
                  <p style="margin: 5px; font-size: 16px">Año</p>
                  <p
                    style="
                      background-color: #d9d9d9;
                      padding: 8px;
                      width: 90%;
                      font-size: 14px;
                      border-radius: 5px;
                    "
                  >
                    {{ student.cartaPresentacion.datosAcademicos.año }}
                  </p>
                </div>
              </div>
              <div class="row" v-else>
                <div class="col-4">
                  <p style="margin: 5px; font-size: 16px">Nombre</p>
                  <div style="width: 90%">
                    <q-input
                      dense
                      v-model="fullname"
                      input-style="background-color: #D9D9D9; padding: 8px; font-size: 14px; border-radius: 5px;"
                    />
                  </div>
                </div>
                <div class="col-4">
                  <p style="margin: 5px; font-size: 16px">Carrera</p>
                  <div style="width: 90%">
                    <q-input
                      dense
                      v-model="career"
                      input-style="background-color: #D9D9D9; padding: 8px; font-size: 14px; border-radius: 5px;"
                    />
                  </div>
                </div>
                <div class="col-4">
                  <p style="margin: 5px; font-size: 16px">Area</p>
                  <div style="width: 90%">
                    <q-input
                      dense
                      v-model="area"
                      input-style="background-color: #D9D9D9; padding: 8px; font-size: 14px; border-radius: 5px;"
                    />
                  </div>
                </div>
                <div class="col-12"></div>
                <div class="col-3">
                  <p style="margin: 5px; font-size: 16px">Matricula</p>
                  <div style="width: 90%">
                    <q-input
                      dense
                      v-model="matricula"
                      input-style="background-color: #D9D9D9; padding: 8px; font-size: 14px; border-radius: 5px;"
                    />
                  </div>
                </div>
                <div class="col-3">
                  <p style="margin: 5px; font-size: 16px">NSS</p>
                  <div style="width: 90%">
                    <q-input
                      dense
                      v-model="nss"
                      input-style="background-color: #D9D9D9; padding: 8px; font-size: 14px; border-radius: 5px;"
                    />
                  </div>
                </div>
                <div class="col-4">
                  <p style="margin: 5px; font-size: 16px">CURP</p>
                  <div style="width: 90%">
                    <q-input
                      dense
                      v-model="curp"
                      input-style="background-color: #D9D9D9; padding: 8px; font-size: 14px; border-radius: 5px;"
                    />
                  </div>
                </div>
                <div class="col-1">
                  <p style="margin: 5px; font-size: 16px">Grado</p>
                  <div style="width: 90%">
                    <q-input
                      dense
                      v-model="grade"
                      input-style="background-color: #D9D9D9; padding: 8px; font-size: 14px; border-radius: 5px;"
                    />
                  </div>
                </div>
                <div class="col-1">
                  <p style="margin: 5px; font-size: 16px">Grupo</p>
                  <div style="width: 90%">
                    <q-input
                      dense
                      v-model="group"
                      input-style="background-color: #D9D9D9; padding: 8px; font-size: 14px; border-radius: 5px;"
                    />
                  </div>
                </div>
                <div class="col-4">
                  <p style="margin: 5px; font-size: 16px">Nivel academico</p>
                  <div style="width: 90%">
                    <q-input
                      dense
                      v-model="academicLevel"
                      input-style="background-color: #D9D9D9; padding: 8px; font-size: 14px; border-radius: 5px;"
                    />
                  </div>
                </div>
                <div class="col-3">
                  <p style="margin: 5px; font-size: 16px">Periodo</p>
                  <div style="width: 90%">
                    <q-input
                      dense
                      v-model="period"
                      input-style="background-color: #D9D9D9; padding: 8px; font-size: 14px; border-radius: 5px;"
                    />
                  </div>
                </div>
                <div class="col-2">
                  <p style="margin: 5px; font-size: 16px">Año</p>
                  <div style="width: 90%">
                    <q-input
                      dense
                      v-model="year"
                      input-style="background-color: #D9D9D9; padding: 8px; font-size: 14px; border-radius: 5px;"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="row" v-else>
              <p>No se encontro carta presentación</p>
            </div>
          </div>
        </div>
        <div class="row" v-if="actualSection === 4">
          <div class="col-8">
            <h5 style="font-weight: 500">Anteproyecto</h5>
          </div>
          <div
            class="col-4"
            style="display: flex; align-items: center; justify-content: right"
          >
            <div
              :style="{
                display: 'flex',
                alignItems: 'center',
                margin: '0',
                padding: '7px 30%',
                borderRadius: '8px',
                backgroundColor: projectState.color,
              }"
            >
              <p style="color: white; font-weight: bold; margin: 0">
                {{ projectState.label }}
              </p>
              <q-btn
                v-if="projectState.label === 'Rechazada'"
                flat
                color="white"
                icon="more_horiz"
                size="12px"
                @click="dialogProjectState = true"
              ></q-btn>
              <q-dialog v-model="dialogProjectState">
                <q-card
                  class="q-pt-md q-pl-md q-pr-md"
                  style="width: 500px; max-width: 60vw; height: 45vh"
                >
                  <div class="row q-ma-sm">
                    <div
                      class="col-12"
                      style="display: flex; justify-content: end"
                    >
                      <q-card-actions>
                        <q-btn
                          align="right"
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
                    <div class="col-12 q-pa-md">
                      <div
                        class="text-h6 text-center"
                        style="font-size: 22px; font-weight: 500"
                      >
                        Estado de anteproyecto
                      </div>
                    </div>
                    <div class="col-12 q-pa-md q-mt-md">
                      <p style="font-size: 14px">
                        <span style="font-weight: 500">Estado: </span
                        >{{ projectState.label }}
                      </p>
                      <p style="font-size: 14px">
                        <span style="font-weight: 500">Fecha de revisión: </span
                        >{{ projectState.date }}
                      </p>
                      <p style="font-size: 14px">
                        <span style="font-weight: 500">Motivo: </span
                        >{{ projectState.motive }}
                      </p>
                    </div>
                  </div>
                </q-card>
              </q-dialog>
            </div>
          </div>
          <div class="col-12">
            <div
              class="row"
              v-if="existAnteproyecto"
              style="overflow-y: scroll; height: 35vh"
            >
              <div class="col-12">
                <p class="project-title">Datos del asesor academico</p>
              </div>
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
                  {{ project.datosAsesorAcademico.nombre }}
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
                  {{ project.datosAsesorAcademico.email }}
                </p>
              </div>
              <div class="col-4">
                <p style="margin: 5px; font-size: 16px">Telefono</p>
                <p
                  style="
                    background-color: #d9d9d9;
                    padding: 8px;
                    width: 90%;
                    font-size: 14px;
                    border-radius: 5px;
                  "
                >
                  {{ project.datosAsesorAcademico.telefono }}
                </p>
              </div>

              <div class="col-12">
                <p class="project-title">Datos del asesor empresarial</p>
              </div>
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
                  {{ project.datosAsesorEmpresarial.nombre }}
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
                  {{ project.datosAsesorEmpresarial.email }}
                </p>
              </div>
              <div class="col-4">
                <p style="margin: 5px; font-size: 16px">Telefono</p>
                <p
                  style="
                    background-color: #d9d9d9;
                    padding: 8px;
                    width: 90%;
                    font-size: 14px;
                    border-radius: 5px;
                  "
                >
                  {{ project.datosAsesorEmpresarial.telefono }}
                </p>
              </div>

              <div class="col-12">
                <p class="project-title">Datos del proyecto</p>
              </div>
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
                  {{ project.datosProyecto.nombre }}
                </p>
              </div>
              <div class="col-8">
                <p style="margin: 5px; font-size: 16px">Objetivo</p>
                <p
                  style="
                    background-color: #d9d9d9;
                    padding: 8px;
                    width: 90%;
                    font-size: 14px;
                    border-radius: 5px;
                  "
                >
                  {{ project.datosProyecto.objetivo }}
                </p>
              </div>
              <div class="col-12">
                <p style="margin: 5px; font-size: 16px">Descripción</p>
                <p
                  style="
                    background-color: #d9d9d9;
                    padding: 8px;
                    width: 90%;
                    font-size: 14px;
                    border-radius: 5px;
                  "
                >
                  {{ project.datosProyecto.descripcion }}
                </p>
              </div>
              <div class="col-12 q-pa-md"></div>
            </div>
            <div class="row" v-else>
              <p>No se encontro anteproyecto</p>
            </div>
          </div>
        </div>
        <div class="row" v-if="actualSection === 5">
          <div class="col-12 q-pb-md">
            <h5 style="font-weight: 500">Avance</h5>
          </div>
          <div class="col-12">
            <div class="row" v-if="existsAvance">
              <div
                class="col-md-3 col-lg-2 q-pt-md"
                v-for="(progressPhase, i) in progress"
                :key="i + 1"
              >
                <q-card
                  v-ripple
                  class="card my-card cursor-pointer q-hoverable"
                  :style="{
                    background: progressPhase.color,
                    opacity: progressPhase.state === 'false' ? '0.7' : '1',
                  }"
                >
                  <p
                    class="text-white text-capitalize"
                    style="font-size: 17px; margin: 0; user-select: none"
                  >
                    {{ progressPhase.label }}
                  </p>
                </q-card>
                <p
                  v-if="progressPhase.state !== 'false'"
                  style="margin: 5px 0 0 15px; font-size: 12px; color: #777767"
                >
                  Revisado el {{ progressPhase.date }}
                </p>
              </div>
            </div>
            <div class="row" v-else>
              <p>No se encontro avance</p>
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
import { format } from "date-fns";
import UserNavbar from "src/components/UserNavbar.vue";

export default defineComponent({
  name: "admin-alumnoId",
  components: {
    UserNavbar,
  },
  setup() {
    const dataApiStore = useDataApiStore();
    const filterStore = useFilterStore();
    const router = useRouter();
    const idStudent = ref(router.currentRoute._value.params.id);
    const student = ref();
    const studentsLoaded = ref(true);
    const actualSection = ref(1);

    const actualPhase = ref(0);

    // Dialogs
    const dialogCpaState = ref(false);
    const dialogChangeCPAState = ref(false);
    const dialogDenyCpa = ref(false);
    const dialogChecking = ref(false);

    const dialogPhaseState = ref(false);
    const dialogChangePhaseState = ref(false);
    const dialogDenyPhase = ref(false);

    const dialogProjectState = ref(false);
    const dialogChangeProjectState = ref(false);
    const dialogDenyProject = ref(false);

    const existsCPA = ref(false);
    const existsDocumentos = ref(false);
    const existAnteproyecto = ref(false);
    const existsAvance = ref(false);

    const isEditingCPA = ref(false);
    const isEditingProject = ref(false);

    const dialogPrintOptions = ref(false);

    const dialogDeleteCPA = ref(false);
    const dialogDeleteProject = ref(false);

    // CPA
    const cpaState = ref({
      label: "",
      motive: "",
      date: "",
      color: "",
    });
    // Campos del input de CPA
    const phoneNumber1 = ref(null);
    const phoneNumber2 = ref(null);
    const businessName = ref(null);
    const companyName = ref(null);
    const businessPosition = ref(null);
    const fullname = ref(null);
    const career = ref(null);
    const area = ref(null);
    const matricula = ref(null);
    const email = ref(null);
    const nss = ref(null);
    const curp = ref(null);
    const grade = ref(null);
    const group = ref(null);
    const academicLevel = ref(null);
    const turn = ref(null);
    const year = ref(null);
    const period = ref(null);
    const registerDateCPA = ref(null);

    // Documentos
    const allPhasesState = ref(null);
    const phases = ref([1, 2, 3, 4, 5]);
    const phaseState = ref({
      label: "",
      motive: "",
      date: "",
      color: "",
    });
    const documentsToShow = ref(null);
    const documents = ref([
      {
        label: "Curriculum Vitae",
        name: "curriculum",
        path: "",
        phase: 1,
        dialog: false,
      },
      {
        label: "Seguro facultativo",
        name: "nss",
        path: "",
        phase: 1,
        dialog: false,
      },
      {
        label: "Carta presentación",
        name: "cpa",
        path: "",
        phase: 1,
        dialog: false,
      },
      {
        label: "Carta de aceptación",
        name: "caa",
        path: "",
        phase: 2,
        dialog: false,
      },
      {
        label: "Reporte de proyecto",
        name: "reporte",
        path: "",
        phase: 3,
        dialog: false,
      },
      {
        label: "Rubrica de evaluación",
        name: "rubrica",
        path: "",
        phase: 4,
        dialog: false,
      },
      {
        label: "Dictamen",
        name: "dictamen",
        path: "",
        phase: 4,
        dialog: false,
      },
      {
        label: "Protesta de ley",
        name: "protesta",
        path: "",
        phase: 4,
        dialog: false,
      },
      {
        label: "Carta terminación",
        name: "cta",
        path: "",
        phase: 5,
        dialog: false,
      },
    ]);

    const downloadingError = ref(false);
    const downloadingDocument = ref(false);

    // Anteproyecto
    const projectState = ref({
      label: "",
      motive: "",
      date: "",
      color: "",
    });
    const project = ref(null);

    // Avance
    const progress = ref([]);

    function loadStudent() {
      try {
        studentsLoaded.value = true;
        api
          .post(`http://localhost:3000/admin/alumno/perfil`, {
            idAlumno: idStudent._value,
          })
          .then((res) => {
            console.log(res.data);
            if (res.data.msg) {
              console.log(res.data.msg);
            } else {
              if (res.data.cartaPresentacion) {
                existsCPA.value = true;
                const cpa = res.data.cartaPresentacion;
                cpaState.value.label = cpa.estado.nombre;
                cpaState.value.motive = cpa.estado.motivo;
                cpaState.value.date = formatDate(cpa.estado.fecha);
                cpaState.value.color = definePhaseColor(cpa.estado.nombre);
              }
              if (res.data.anteproyecto) {
                existAnteproyecto.value = true;
                const projectData = res.data.anteproyecto;
                project.value = projectData;
                console.log(projectData);
                projectState.value.label = projectData.estado.nombre;
                projectState.value.motive = projectData.estado.motivo;
                projectState.value.date = formatDate(projectData.estado.fecha);
                projectState.value.color = definePhaseColor(
                  projectData.estado.nombre
                );
              } else {
                existAnteproyecto.value = false;
              }
              if (res.data.avance) {
                existsAvance.value = true;
                const progressData = res.data.avance;
                const progressArray = [];
                Object.keys(progressData).map((key) => {
                  progressArray.push({
                    label: key,
                    color: defineProgressBackground(key),
                    state: progressData[key].estado,
                    date: progressData[key].fecha,
                  });
                });
                progress.value = progressArray;
                console.log(progress.value);
              } else {
                existsAvance.value = false;
              }
              if (res.data.documentos) {
                existsDocumentos.value = true;
                const documentos = res.data.documentos;
                allPhasesState.value = documentos.etapas;
                Object.keys(documentos).map((key, i) => {
                  const allDocuments = documents.value;
                  allDocuments.map((document) => {
                    if (key === document.name) {
                      document.path = documentos[key].archivo;
                    }
                  });
                });
              } else {
                existsDocumentos.value = false;
              }
              res.data.avance
                ? (existsAvance.value = true)
                : (existsAvance.value = false);
              student.value = res.data;
              setTimeout(() => {
                studentsLoaded.value = false;
              }, 2000);
            }
          })
          .catch((err) => console.error(err));
      } catch (error) {
        setTimeout(() => {
          loadStudent();
          console.log(error);
        }, 2000);
      }
    }

    function showSection(section) {
      isEditingCPA.value = false;
      actualSection.value = section;
      toBackPhase();
    }

    function toBackPhase() {
      actualPhase.value = 0;
      phaseState.value.label = "";
      phaseState.value.motive = "";
      phaseState.value.date = "";
      phaseState.value.color = "";
    }

    function toShowPhase(phase) {
      actualPhase.value = phase;
      const phaseData = allPhasesState.value[phase];
      console.log(phaseData);
      if (phaseData !== undefined) {
        phaseState.value.label = phaseData.estado;
        phaseState.value.motive = phaseData.motivo;
        phaseState.value.date = phaseData.fecha;
        phaseState.value.color = definePhaseColor(phaseData.estado);
      } else {
        phaseState.value.label = "Sin comenzar";
        phaseState.value.motive = "";
        phaseState.value.date = "";
        phaseState.value.color = definePhaseColor("Sin comenzar");
      }
      const allDocuments = documents.value;
      const depuredDocuments = [];
      allDocuments.map((document) => {
        if (document.phase === phase) {
          depuredDocuments.push(document);
        }
      });
      documentsToShow.value = depuredDocuments;
    }

    function toBack() {
      console.clear();
      router.push({ name: "admin-listaAlumnos" });
    }

    function saveEditCPA() {
      isEditingCPA.value = false;
      actualSection.value = 3;

      const fullName = fullname.value;
      const parts = fullName.split(" ");

      const name = parts.slice(0, 2).join(" ");
      const lastname1 = parts[2];
      const lastname2 = parts[3];

      const cpa = {
        estado: {
          nombre: cpaState.value.label,
          motivo: cpaState.value.motive,
          fecha: new Date(),
        },
        datosAlumno: {
          nombres: {
            nombre: name,
            apPaterno: lastname1,
            apMaterno: lastname2,
          },
          privado: {
            matricula: matricula.value,
            email: email.value,
          },
          telefonoCelular: phoneNumber1.value,
          telefonoCasa: phoneNumber2.value,
          nss: nss.value,
          curp: curp.value,
        },
        datosAcademicos: {
          datosAcademicosAlumno: {
            nivelAcademico: academicLevel.value,
            turno: turn.value,
            carrera: career.value,
            area: area.value,
            grado: grade.value,
            grupo: group.value,
          },
          periodo: period.value,
          año: year.value,
        },
        datosEmpresa: {
          nombreEmpresa: companyName.value,
          nombreEmpresario: businessName.value,
          puestoEmpresario: businessPosition.value,
        },
      };
      api
        .patch(`http://localhost:3000/admin/alumno/perfil/cpa/modificar`, {
          idAlumno: idStudent._value,
          cpa,
        })
        .then((res) => {
          console.log(res.data);
          const updatedCpa = res.data.cartaPresentacion;
          student.value.cartaPresentacion = updatedCpa;
        })
        .catch((err) => {
          console.error(err);
        });
    }

    function toEditCPA() {
      isEditingCPA.value = true;
      fullname.value = `${student.value.nombre} ${student.value.apPaterno} ${student.value.apMaterno}`;
      email.value = student.value.cartaPresentacion.datosAlumno.privado.email;
      nss.value = student.value.cartaPresentacion.datosAlumno.nss;
      curp.value = student.value.cartaPresentacion.datosAlumno.curp;
      career.value = student.value.carrera;
      area.value = student.value.area;
      matricula.value = student.value.matricula;
      grade.value = student.value.grado;
      group.value = student.value.grupo;
      academicLevel.value = student.value.nivelAcademico;
      turn.value = student.value.turno;
      year.value = student.value.cartaPresentacion.datosAcademicos.año;
      period.value = student.value.cartaPresentacion.datosAcademicos.periodo;
      businessName.value =
        student.value.cartaPresentacion.datosEmpresa.nombreEmpresario;
      companyName.value =
        student.value.cartaPresentacion.datosEmpresa.nombreEmpresa;
      businessPosition.value =
        student.value.cartaPresentacion.datosEmpresa.puestoEmpresario;
      registerDateCPA.value = student.value.cartaPresentacion.fechaRegistro;
      console.log(student.value.cartaPresentacion);
      phoneNumber1.value =
        student.value.cartaPresentacion.datosAlumno.telefonoCelular;
      phoneNumber2.value =
        student.value.cartaPresentacion.datosAlumno.telefonoCasa;
    }

    function toDownloadDocument(name, path) {
      console.log(path);
      if (path === "") {
        setTimeout(() => {
          downloadingError.value = true;
          setTimeout(() => {
            downloadingError.value = false;
          }, 2000);
        }, 1000);
        return;
      }
      const nameFile = `${name}_${extractNameFromPath(path)}`;
      downloadingDocument.value = true;
      api
        .post(
          `http://localhost:3000/admin/alumno/perfil/documento/descargar`,
          {
            idAlumno: idStudent._value,
            nombreDocumento: name,
            pathDocumento: path,
          },
          {
            responseType: "blob",
          }
        )
        .then((res) => {
          const blob = new Blob([res.data], {
            type: "application/pdf",
          });
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `${nameFile.toLowerCase()}.pdf`);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          setTimeout(() => {
            downloadingDocument.value = false;
          }, 1500);
        })
        .catch((err) => {
          console.error(err);
          setTimeout(() => {
            downloadingDocument.value = false;
            downloadingError.value = true;
            setTimeout(() => {
              downloadingError.value = false;
            }, 2000);
          }, 1000);
        });
    }

    function extractNameFromPath(path) {
      const regex = /documents\\(.+)_\w{24}\\/;
      const match = path.match(regex);

      if (match && match.length > 1) {
        const fullName = match[1];
        return fullName;
      }

      return null;
    }

    function definePhaseColor(state) {
      if (state === "Sin comenzar") {
        return "#FFC107";
      }
      if (state === "En revision" || state === "En revisión") {
        return "#FF8D4D";
      }
      if (state === "Aceptada") {
        return "#0ECC43";
      }
      if (state === "Rechazada") {
        return "#F44336";
      }
      return "black";
    }

    function defineProgressBackground(phase) {
      if (phase === "anteproyecto" || phase === "revision") {
        return "#000";
      }
      if (phase === "25%") {
        return "#F44336";
      }
      if (phase === "50%") {
        return "#FF9800";
      }
      if (phase === "75%") {
        return "#ffc107";
      }
      if (phase === "100%") {
        return "#8BC34A";
      }
    }

    function formatDate(dateString) {
      const dateObj = new Date(dateString);
      return format(dateObj, "dd-MM-yyyy HH:mm:ss");
    }

    function setPhaseState(state, motive = "") {
      api
        .post(
          `http://localhost:3000/admin/alumno/perfil/documentos/etapa-toggle`, // http://localhost:3000/admin/alumno/perfil/documentos/etapa-toggle
          {
            idAlumno: idStudent._value,
            etapa: actualPhase.value,
            estado: state,
            motivo: motive,
          }
        )
        .then((res) => {
          console.log(res.data);
          phaseState.label;
          phaseState.value.label = res.data.estado;
          phaseState.value.motive = res.data.motivo;
          phaseState.value.date = res.data.fecha;
          phaseState.value.color = definePhaseColor(res.data.estado);
          dialogChangePhaseState.value = false;
          dialogDenyPhase.value = false;
        })
        .catch((err) => {
          dialogChangePhaseState.value = false;
          dialogDenyPhase.value = false;
          console.error(err);
        });
    }

    function setCpaState(state, motive = "") {
      const cpa = {
        estado: {
          nombre: state,
          motivo: motive,
          fecha: new Date(),
        },
        datosAlumno: {
          nombres: {
            nombre: student.value.nombre,
            apPaterno: student.value.apPaterno,
            apMaterno: student.value.apMaterno,
          },
          privado: {
            matricula: student.value.matricula,
            email: student.value.cartaPresentacion.datosAlumno.privado.email,
          },
          telefonoCelular:
            student.value.cartaPresentacion.datosAlumno.telefonoCelular,
          telefonoCasa:
            student.value.cartaPresentacion.datosAlumno.telefonoCasa,
          nss: student.value.cartaPresentacion.datosAlumno.nss,
          curp: student.value.cartaPresentacion.datosAlumno.curp,
        },
        datosAcademicos: {
          datosAcademicosAlumno: {
            nivelAcademico: student.value.nivelAcademico,
            turno: student.value.turno,
            carreraa: student.value.carrera,
            area: student.value.area,
            grado: student.value.grado,
            grupo: student.value.grupo,
          },
          periodo: student.value.cartaPresentacion.datosAcademicos.periodo,
          año: student.value.cartaPresentacion.datosAcademicos.año,
        },
        datosEmpresa: {
          nombreEmpresa:
            student.value.cartaPresentacion.datosEmpresa.nombreEmpresa,
          nombreEmpresario:
            student.value.cartaPresentacion.datosEmpresa.nombreEmpresario,
          puestoEmpresario:
            student.value.cartaPresentacion.datosEmpresa.puestoEmpresario,
        },
      };
      api
        .patch(`http://localhost:3000/admin/alumno/perfil/cpa/modificar`, {
          idAlumno: idStudent._value,
          cpa,
        })
        .then((res) => {
          console.log(res.data);
          const cpa = res.data.cartaPresentacion;
          const state = cpa.estado.nombre;
          const motive = cpa.estado.motivo;
          const date = cpa.estado.fecha;
          cpaState.value.label = state;
          cpaState.value.motive = motive;
          cpaState.value.date = formatDate(date);
          cpaState.value.color = definePhaseColor(state);
          dialogChangeCPAState.value = false;
          dialogChecking.value = false;
          dialogDenyCpa.value = false;
        })
        .catch((err) => {
          dialogChangeCPAState.value = false;
          dialogChecking.value = false;
          dialogDenyCpa.value = false;
          console.error(err);
        });
    }

    function printCPA(type) {
      console.log(student.value);
      const career = student.value.nivelAcademico;
      console.log(career);
      let careerLabel = "";
      if (
        career === "Tecnico Superior Universitario" ||
        career === "Técnico Superior Universitario"
      ) {
        careerLabel = "TSU";
      } else if (career === "Ingenieria") {
        careerLabel = "ING";
      }
      const typeCPA = `Carta-${careerLabel}-${type}`;
      const fullname =
        `${student.value.nombre} ${student.value.apPaterno} ${student.value.apMaterno}`.toUpperCase();
      const actualDate = new Date();
      console.log(typeCPA);
      api
        .post(
          `http://localhost:3000/admin/alumno/perfil/cpa/imprimir`,
          {
            tipo: typeCPA,
            dia: actualDate.getDate().toString(),
            mes: (actualDate.getMonth() + 1).toString(),
            año: actualDate.getFullYear().toString(),
            carrera: student.value.carrera.toUpperCase(),
            area: student.value.area.toUpperCase(),
            nombreCompleto: fullname,
            nss: student.value.cartaPresentacion.datosAlumno.nss,
          },
          {
            responseType: "arraybuffer",
          }
        )
        .then((res) => {
          // Crear un objeto Blob a partir del contenido del archivo Word
          const blob = new Blob([res.data], {
            type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          });

          // Crear una URL temporal para descargar el archivo Word
          const url = URL.createObjectURL(blob);

          // Crear un enlace de descarga
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `carta_generada.docx`);

          // Hacer clic en el enlace para iniciar la descarga
          link.click();

          // Liberar la URL temporal
          URL.revokeObjectURL(url);
        })
        .catch((err) => {
          console.error(err);
        });
    }

    function toDeleteCPA() {
      api
        .patch(`http://localhost:3000/admin/alumno/perfil/cpa/eliminar`, {
          idAlumno: idStudent._value,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data === "Eliminado correctamente") {
            existsCPA.value = false;
            dialogDeleteCPA.value = false;
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }

    function toDeleteProject() {}

    onMounted(() => {
      loadStudent();
    });

    return {
      dataApiStore,
      filterStore,
      router,
      idStudent,
      student,
      loadStudent,
      studentsLoaded,
      toBack,
      phases,
      actualPhase,
      toShowPhase,
      showSection,
      actualSection,
      dialogChangeCPAState,
      dialogCpaState,
      dialogChecking,
      existsCPA,
      existsDocumentos,
      existAnteproyecto,
      existsAvance,
      toEditCPA,
      isEditingCPA,
      saveEditCPA,
      fullname,
      email,
      career,
      area,
      matricula,
      nss,
      curp,
      phoneNumber1,
      phoneNumber2,
      grade,
      group,
      academicLevel,
      turn,
      year,
      period,
      cpaState,
      businessName,
      companyName,
      businessPosition,
      registerDateCPA,
      toDownloadDocument,
      setPhaseState,
      documents,
      documentsToShow,
      downloadingError,
      downloadingDocument,
      definePhaseColor,
      dialogDenyCpa,
      setCpaState,
      formatDate,
      phaseState,
      dialogPhaseState,
      dialogChangePhaseState,
      dialogDenyPhase,
      allPhasesState,
      toBackPhase,
      progress,
      defineProgressBackground,
      projectState,
      dialogProjectState,
      dialogChangeProjectState,
      dialogDenyProject,
      isEditingProject,
      project,
      dialogPrintOptions,
      printCPA,
      dialogDeleteCPA,
      dialogDeleteProject,
      toDeleteCPA,
      toDeleteProject,
    };
  },
});
</script>

<style scoped>
.my-card:hover {
  background-color: #f0f0f0;
}
.project-title {
  margin: 10px 5px;
  padding-bottom: 3px;
  font-size: 16px;
  font-weight: 500;
  border-bottom: 1px solid #e0e0e0;
}
.card {
  width: 120px;
  height: 120px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  font-weight: bold;
  margin: 0 10px; /* Ajusta el espacio entre los recuadros */
  user-select: none;
}

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
