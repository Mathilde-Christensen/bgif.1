<script setup>
import frivilligHero from '../assets/images/hero/frivillig_hero.webp'
import HeroTamplate from '../components/HeroTamplate.vue'
</script>

<template>
   <div class="about-hero">
    <HeroTamplate
      :image="frivilligHero"
      title="Bevægelse, fællesskab og oplevelser for alle"
      text="Odense Idrætspark skaber rammerne for idræt, bevægelse og fællesskab i hele byen. Her mødes borgere, foreninger og klubber for at dyrke motion, oplevelser og glæden ved at være aktiv – uanset alder og niveau."
      :gradient="true"
    />
  </div>
</template>

<style scoped lang="scss">
</style>