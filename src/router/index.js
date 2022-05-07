import { createRouter, createWebHistory } from "vue-router"
import DashboardHome from "@/views/DashboardHome.vue"
import FeelSmart from "@/views/FeelSmart.vue"

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/dashboard",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: DashboardHome,
  },
  {
    path: "/analysis",
    name: "FeelSmart",
    component: FeelSmart,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "active",
})

export default router
