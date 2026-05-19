import { createRouter, createWebHistory } from 'vue-router'
import Frivilligside from '@/views/Frivilligside.vue'
import Calendar from '@/views/Calendar.vue'
import Profil from '@/views/Profil.vue'
import Chat from '@/views/Chat.vue'
import Faellesskab from '@/views/Faellesskab.vue'
import Admin from '@/views/Admin.vue'
import Koncerter from '@/views/Koncerter.vue'
import Loppemarkeder from '@/views/Loppemarkeder.vue'
import Hardland from '@/views/Hardland.vue'
import Staevner from '@/views/Staevner.vue'
import Login from '@/views/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
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
    {
      path: '/faellesskab',
      name: 'faellesskab',
      component: Faellesskab,
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
    },
    {
      path: '/koncerter',
      name: 'koncerter',
      component: Koncerter,
    },
    {
      path: '/loppemarkeder',
      name: 'loppemarkeder',
      component: Loppemarkeder,
    },
    {
      path: '/hardland',
      name: 'hardland',
      component: Hardland,
    },
    {
      path: '/staevner',
      name: 'staevner',
      component: Staevner,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    }
  ],
})

export default router

