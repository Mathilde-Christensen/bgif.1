import { createRouter, createWebHistory } from 'vue-router'
import Frivilligside from '@/views/Frivilligside.vue'
import Calendar from '@/views/Calendar.vue'
import Profil from '@/views/Profil.vue'
import Chat from '@/views/Chat.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'frivilligside',
      component: Frivilligside,
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: Calendar,
    },
    {
      path: '/profil',
      name: 'profil',
      component: Profil,
    },
    {
      path: '/chat',
      name: 'chat',
      component: Chat,
    },
  ],
})

export default router

