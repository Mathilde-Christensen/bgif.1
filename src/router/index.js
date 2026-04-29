import Frivilligside from "@/views/Frivilligside.vue";
import { createRouter, createWebHistory } from 'vue-router'
import Frivilligside from '@/views/Frivilligside.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'frivilligside',
      component: Frivilligside
    },
  ]
})

export default router

