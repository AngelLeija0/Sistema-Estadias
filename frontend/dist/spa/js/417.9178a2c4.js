(globalThis["webpackChunkestadias_quasar"]=globalThis["webpackChunkestadias_quasar"]||[]).push([[417],{78417:(s,t,e)=>{"use strict";e.r(t),e.d(t,{default:()=>x});var o=e(59835),a=e(87346),i=e.n(a),n=e(98792),r=e.n(n);const l=s=>((0,o.dD)("data-v-728c0077"),s=s(),(0,o.Cn)(),s),c={class:"container text-center",style:{"padding-top":"100px"}},d={class:"img-container"},u=l((()=>(0,o._)("p",{class:"box-text"},[(0,o._)("strong",null,"Alumnos")],-1))),m={class:"img-container"},g=l((()=>(0,o._)("p",{class:"box-text"},[(0,o._)("strong",null,"Asesores")],-1)));function p(s,t,e,a,n,l){return(0,o.wg)(),(0,o.iD)("div",c,[(0,o._)("div",{class:"small-box",onClick:t[1]||(t[1]=t=>s.redirectToSection("alumnos")),style:{"margin-top":"0"}},[(0,o._)("div",d,[(0,o._)("img",{src:i(),alt:"Imagen 1",class:"img-fluid",onLoad:t[0]||(t[0]=(...t)=>s.adjustContainerPosition&&s.adjustContainerPosition(...t))},null,32)]),u]),(0,o._)("div",{class:"small-box",onClick:t[3]||(t[3]=t=>s.redirectToSection("lista-asesores")),style:{"margin-top":"0"}},[(0,o._)("div",m,[(0,o._)("img",{src:r(),alt:"Imagen 2",class:"img-fluid",onLoad:t[2]||(t[2]=(...t)=>s.adjustContainerPosition&&s.adjustContainerPosition(...t))},null,32)]),g])])}e(69665);var v=e(17736),_=e(7904),h=e(28339),w=e(89322);const S=(0,o.aZ)({name:"admin-inicio",setup(){const s=(0,_.f)(),t=(0,v.r)(),e=(0,h.tv)(),o=(0,w.L)();return window.sessionStorage.getItem("data-api")&&(window.sessionStorage.removeItem("data-api"),s.clearDataApi()),window.sessionStorage.getItem("filter")&&(window.sessionStorage.removeItem("filter"),t.clearFilter()),{dataApiStore:s,filterStore:t,router:e,userStore:o}},methods:{redirectToSection(s){if("alumnos"!==s)return this.$router.push(s);const t=this.userStore.getUser.tipoUsuario;let e="";"alumno"===t&&(e="alumno"),"asesor"===t&&(e="asesor"),"vinculacion"===t&&(e="vinculacion"),"administrador"===t&&(e="admin"),"superAdministrador"===t&&(e="superAdmin");const o=`${e}-${s}`;console.log(o),this.$router.push({name:o})}}});var b=e(11639);const f=(0,b.Z)(S,[["render",p],["__scopeId","data-v-728c0077"]]),x=f},98792:(s,t,e)=>{s.exports=e.p+"img/card-asesores.396b9695.jpg"}}]);