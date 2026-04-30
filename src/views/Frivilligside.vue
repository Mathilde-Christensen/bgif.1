<script setup>
import frivilligHero from '../assets/images/hero/frivillig_hero.webp'
import HeroTamplate from '../components/HeroTamplate.vue'
import Activities from '../components/Activities.vue'
</script>

<template>
  <div class="about-hero">
    <HeroTamplate
      :image="frivilligHero"
      title="SE HVOR DU KAN HJÆLPE"
      text="Få overblik, vælg aktiviteter og engagér dig – helt uden besvær"
      :gradient="true"
    />
  </div>
  <Activities />
</template>

<style scoped lang="scss">
</style>