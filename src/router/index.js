import Frivilligside from "@/views/Frivilligside.vue";
import Footer from "@/components/Footer.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'frivilligside',
      component: Frivilligside
    },
    {
        path: '/footer',
        name: 'footer',
        component: Footer
      },
  ]
})

export default router

