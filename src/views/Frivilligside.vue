<script setup>
import frivilligHero from '../assets/images/hero/frivillig_hero.webp'
import HeroTamplate from '../components/HeroTamplate.vue'
import Tak from '../assets/images/tak_for_sidst/frivillig.mp4'
import Activities from '../components/Activities.vue'
</script>

<template>
   <div class="hero">
    <HeroTamplate
      :image="frivilligHero"
      title="SE HVOR DU KAN HJÆLPE"
      text="Få overblik, vælg aktiviteter og engagér dig – helt uden besvær"
      :gradient="true"
    />
  </div>

  <div class="overflow_box">
    <div class="tak_content">
        <video :src="Tak"></video>

        <div class="tak_text">
            <h2>Tak for sidst</h2>
            <p>I sidste uge var frivillige fra klubben med til koncert i Odense, hvor de stod for bar og oprydning.Det gav et overskud på 12.500 kr., som går til nyt udstyr og aktiviteter i klubben.
                Tak til alle der var med 💚
            </p>
        </div>
    </div>

  </div>


</template>

<style scoped lang="scss">
</style>