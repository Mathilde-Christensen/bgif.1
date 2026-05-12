<script setup>
import { RouterView, useRoute } from 'vue-router'
import Footer from './components/Footer.vue'
import Header from './components/Header.vue'

const route = useRoute()
</script>

<template>
  <div class="app">
    <Header
      v-if="
        route.path !== '/faellesskab' &&
        route.path !== '/login'
      "
    />

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