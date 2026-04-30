<script setup>
import frivilligHero from '../assets/images/hero/frivillig_hero.webp'
import HeroTamplate from '../components/HeroTamplate.vue'
import Tak from '../assets/images/tak_for_sidst/frivillig.mp4'
import Activities from '../components/Activities.vue'

</script>

<template>
    <div class="about-hero">
        <div class="hero">
        <HeroTamplate
            :image="frivilligHero"
            title="SE HVOR DU KAN HJÆLPE"
            text="Få overblik, vælg aktiviteter og engagér dig – helt uden besvær"
            :gradient="true"
        />
        </div>
    </div>

    <div class="overflow_box">
        <div class="tak_content">
            <video class="tak_video" :src="Tak"></video>

            <div class="tak_text">
                <h2>Tak for sidst</h2>
                <p>I sidste uge var frivillige fra klubben med til koncert i Odense, hvor de stod for bar og oprydning.Det gav et overskud på 12.500 kr., som går til nyt udstyr og aktiviteter i klubben.
                    Tak til alle der var med 💚
                </p>

                <button>Lær mere</button>
            </div>
        </div>

        <Activities />

    </div>


</template>

<style scoped lang="scss">
@use '@/assets/_color.scss' as c;
@use '@/assets/_font.scss' as f;
@use '@/assets/_button.scss' as btn;

.about-hero {
  position: relative;
  z-index: 0;
}

.hero {
  position: sticky;
  top: 0;
  z-index: 0;
}

.overflow_box {
  position: relative;
  margin-top: -12vh;
  background: c.$color-white;
  border-radius: 45px 45px 0 0;
  padding: 70px 24px 60px;
  z-index: 2;
}

.tak_video {
    width: 50%;
}

@media (min-width: 768px) {
  .about-hero {
    height: 78vh;
  }

  .overflow_box {
    margin-top: 68vh;
    border-radius: 60px 60px 0 0;
    padding: 100px 30px 60px;
  }
}

@media (min-width: 1200px) {
  .about-hero {
    height: 80vh;
  }

  .overflow_box {
    margin-top: 70vh;
  }
}
</style>