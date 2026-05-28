<!-- Mathilde -->

<script setup>
import HeroTamplate from '@/components/HeroTamplate.vue'
import koncerterHero from '@/assets/images/hero/hero_koncerter.webp'
import k1 from '@/assets/images/koncerter/k1.webp'
import k2 from '@/assets/images/koncerter/k2.webp'
import k3 from '@/assets/images/koncerter/k3.webp'
import k5 from '@/assets/images/koncerter/k5.webp'
import k6 from '@/assets/images/koncerter/k6.webp'
import k7 from '@/assets/images/koncerter/k7.webp'
import k8 from '@/assets/images/koncerter/k8.webp'
import k9 from '@/assets/images/koncerter/k9.webp'
import k10 from '@/assets/images/koncerter/k10.webp'
import k11 from '@/assets/images/koncerter/k11.webp'
import k12 from '@/assets/images/koncerter/k12.webp'
import k13 from '@/assets/images/koncerter/k13.webp'
import FaellesskabHeader from '@/components/FaellesskabHeader.vue'

</script>

<template>
  <FaellesskabHeader />
  <div class="about-hero">
    <div class="hero">
      <HeroTamplate
        :image="koncerterHero"
        title="KONCERTER I KLUBBEN"
        :gradient="true"
      />
    </div>
  </div>

  <div class="overflow_box">
    <div class="content">
      <p>
        Koncerterne i Bolbro GIF er noget, der bliver lavet af klubben selv.
        Det er frivillige fra klubben, der står for at få det hele til at fungere,
        og det er en del af det, der også er med til at få penge ind til klubben.
        Samtidig er det en af de ting, hvor man mødes lidt på tværs og får en anden
        oplevelse af klubben end bare træning og kampe.
        Her kan du finde billeder fra koncerterne.
      </p>
    </div>

    <section class="gallery">
      <img :src="k1" alt="Koncert i klubben">
      <img :src="k13" alt="Koncert i klubben">
      <img :src="k2" alt="Koncert i klubben">
      <img :src="k3" alt="Koncert i klubben">
      <img :src="k5" alt="Koncert i klubben">
      <img :src="k6" alt="Koncert i klubben">
      <img :src="k7" alt="Koncert i klubben">
      <img :src="k8" alt="Koncert i klubben">
      <img :src="k9" alt="Koncert i klubben">
      <img :src="k10" alt="Koncert i klubben">
      <img :src="k11" alt="Koncert i klubben">
      <img :src="k12" alt="Koncert i klubben">
    </section>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/_color.scss' as c;

.about-hero {
  position: sticky;
  top: 0;
  height: 100vh;
  z-index: 0;
}

.hero {
  height: 100%;
}

.overflow_box {
  position: relative;
  margin-top: -25vh;
  background: c.$color-white;
  border-radius: 45px 45px 0 0;
  padding: 70px 0px 60px;
  z-index: 2;
}

.content {
  padding: 10px clamp(1.5rem, 8vw, 110px);
}

.gallery {
  padding: 10px clamp(1.5rem, 8vw, 110px);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
}

.gallery img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 28px;
}
</style>