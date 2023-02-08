import { createWebHistory, createRouter } from "vue-router";
import Karyawan from "./views/Karyawan.vue";
import DetailKaryawan from "./views/DetailKaryawan.vue"

//Routes for front-end
const routes = [
  {
    path: "/",
    name: "karyawan",
    component: Karyawan,
  },
  {
    path: "/karyawan/:id",
    name: "detail_karyawan",
    component: DetailKaryawan,
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;