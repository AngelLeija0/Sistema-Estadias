import { useUserStore } from "src/stores/user-store";

function verifyLogin(to, from, next) {
  const userStore = useUserStore();
  const typeUser = userStore.user ? userStore.user.tipoUsuario : null;

  if (!userStore.getUser || userStore.user === null) {
    return next({ name: 'pagina-login' });
  }

  if (
    (typeUser === 'alumno' && to.name.startsWith('alumno-')) ||
    (typeUser === 'asesor' && to.name.startsWith('asesor-')) ||
    (typeUser === 'vinculacion' && to.name.startsWith('vinculacion-')) ||
    (typeUser === 'administrador' && to.name.startsWith('admin-')) ||
    (typeUser === 'superAdministrador' && to.name.startsWith('superAdmin-'))
  ) {
    return next();
  }

  if (typeUser === 'alumno') {
    return next({ name: 'alumno-inicio' });
  }
  if (typeUser === 'asesor') {
    return next({ name: 'asesor-inicio' });
  }
  if (typeUser === 'vinculacion') {
    return next({ name: 'vinculacion-inicio' });
  }
  if (typeUser === 'administrador') {
    return next({ name: 'admin-inicio' });
  }
  if (typeUser === 'superAdministrador') {
    return next({ name: 'superAdmin-inicio' });
  }

  next({ name: 'error-not-found' });
}

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "iniciar-sesion",
        name: "pagina-login",
        component: () => import("pages/LoginPage.vue"),
      },
      {
        path: "registro",
        name: "pagina-register",
        component: () => import("pages/RegisterPage.vue"),
      },
      {
        path: "recuperacion",
        name: "pagina-recuperacion",
        component: () => import("pages/RecuperacionPage.vue"),
      },

      /* Rutas del alumno */
      {
        path: "",
        name: "alumno-inicio",
        component: () => import("pages/alumno/InicioAlumno.vue"),
        beforeEnter: [verifyLogin]
      },
      {
        path: "anteproyecto",
        name: "alumno-anteproyecto",
        component: () => import("pages/alumno/AnteProyecto.vue"),
        beforeEnter: [verifyLogin]
      },
      {
        path: "avance",
        name: "alumno-avance",
        component: () => import("pages/alumno/AvanceAnteProyecto.vue"),
        beforeEnter: [verifyLogin]
      },
      {
        path: "estadias",
        name: "alumno-estadias",
        component: () => import("pages/alumno/SolicitarEstadias.vue"),
        beforeEnter: [verifyLogin]
      },
      {
        path: "seguimiento-academico",
        name: "alumno-seguimientoAcademico",
        component: () => import("pages/alumno/SeguimientoAcademico.vue"),
        beforeEnter: [verifyLogin]
      },
      {
        path: "seguimiento-administrativo",
        name: "alumno-seguimientoAdministrativo",
        component: () => import("pages/alumno/SeguimientoAdministrativo.vue"),
        beforeEnter: [verifyLogin]
      },
      {
        path: "solicitud-carta",
        name: "alumno-solicitudCarta",
        component: () => import("pages/alumno/SolicitudCarta.vue"),
        beforeEnter: [verifyLogin]
      },

      /* Rutas asesor */
      {
        path: "",
        name: "asesor-inicio",
        component: () => import("pages/asesor/InicioAsesor.vue"),
        beforeEnter: [verifyLogin]
      },
      {
        path: "alumno/:id",
        name: "asesor-alumnoId",
        component: () => import("pages/asesor/AlumnoDetailsPage.vue"),
        beforeEnter: [verifyLogin]
      },

      /* Rutas vinculacion */
      {
        path: "",
        name: "vinculacion-inicio",
        component: () => import("pages/vinculacion/InicioVinculacion.vue"),
        beforeEnter: [verifyLogin]
      },
      {
        path: "alumnos",
        name: "vinculacion-alumnos",
        component: () => import("pages/vinculacion/AlumnosPage.vue"),
        beforeEnter: [verifyLogin]
      },
      {
        path: "lista-alumnos",
        name: "vinculacion-listaAlumnos",
        component: () => import("pages/vinculacion/ListaAlumnos.vue"),
        beforeEnter: [verifyLogin]
      },
      {
        path: "alumno/:id",
        name: "vinculacion-alumnoId",
        component: () => import("pages/vinculacion/AlumnoDetailsPage.vue"),
        beforeEnter: [verifyLogin]
      },
      {
        path: "lista-vinculadores",
        name: "vinculacion-listaVinculadores",
        component: () => import("pages/vinculacion/ListaVinculadores.vue"),
        beforeEnter: [verifyLogin]
      },
      {
        path: "vinculador/:id",
        name: "vinculacion-vinculadorId",
        component: () => import("pages/vinculacion/VinculadorDetailsPage.vue"),
        beforeEnter: [verifyLogin]
      },
      /* ------------------------------------------------------------------ */

      /* Rutas admin */
      {
        path: "",
        name: "admin-inicio",
        component: () => import("pages/admin/InicioAdmin.vue"),
        beforeEnter: [verifyLogin]
      },
      {
        path: "alumnos",
        name: "admin-alumnos",
        component: () => import("pages/admin/AlumnosPage.vue"),
        beforeEnter: [verifyLogin]
      },
      {
        path: "alumnos-sin-empezar",
        name: "admin-alumnos-sin-empezar",
        component: () => import("pages/admin/AlumnosSE.vue"),
        beforeEnter: [verifyLogin]
      },
      {
        path: "lista-alumnos",
        name: "admin-listaAlumnos",
        component: () => import("pages/admin/ListaAlumnos.vue"),
        beforeEnter: [verifyLogin]
      },
      {
        path: "alumno/:id",
        name: "admin-alumnoId",
        component: () => import("pages/admin/AlumnoDetailsPage.vue"),
        beforeEnter: [verifyLogin]
      },
      {
        path: "lista-asesores",
        name: "admin-listaAsesores",
        component: () => import("pages/admin/ListaAsesores.vue"),
        beforeEnter: [verifyLogin]
      },
      {
        path: "asesor/:id",
        name: "admin-asesorId",
        component: () => import("pages/admin/AsesorDetailsPage.vue"),
        beforeEnter: [verifyLogin]
      },
      {
        path: "administracion",
        name: "admin-administracion",
        component: () => import("pages/admin/AdministracionPage.vue"),
        beforeEnter: [verifyLogin]
      },
      {
        path: "etapas",
        name: "admin-etapas",
        component: () => import("pages/admin/EtapasPage.vue"),
        beforeEnter: [verifyLogin]
      },
      {
        path: "lista-administradores",
        name: "admin-listaAdministradores",
        component: () => import("pages/admin/ListaAdministradores.vue"),
        beforeEnter: [verifyLogin]
      },
      {
        path: "administrador/:id",
        name: "admin-administradorId",
        component: () => import("pages/admin/AdministradorDetailsPage.vue"),
        beforeEnter: [verifyLogin]
      },

      /* Rutas super administrador */
      {
        path: "",
        name: "superAdmin-inicio",
        component: () => import("pages/superadmin/InicioSuperAdmin.vue"),
        beforeEnter: [verifyLogin]
      },
      {
        path: "administradores",
        name: "superAdmin-administradores",
        component: () => import("pages/superadmin/ListaSuperAdministradores.vue"),
        beforeEnter: [verifyLogin]
      },

    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    name: "error-not-found",
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
