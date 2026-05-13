<script setup>
import { RouterView, useRoute } from 'vue-router'
import Footer from './components/Footer.vue'
import Header from './components/Header.vue'

const route = useRoute()

const hideDefaultHeaderRoutes = [
  '/faellesskab',
  '/login',
  '/hardland',
  '/loppemarkeder',
  '/koncerter',
  '/staevner',
]
</script>

<template>
  <div class="app">
    <Header v-if="!hideDefaultHeaderRoutes.includes(route.path)" />

    <main class="app__main">
      <RouterView />
    </main>

    <Footer />
  </div>
</template>

<style scoped lang="scss">
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app__main {
  flex: 1;
}
</style>