<script setup>
import HeroTamplate from '@/components/HeroTamplate.vue';
import koncerterHero from '../assets/images/hero/hero_koncerter.webp'

</script>

<template>
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
                Det er frivillige fra klubben, der står for at få det hele til at fungere, og det er en del af det, der også er med til at få penge ind til klubben.
                Samtidig er det en af de ting, hvor man mødes lidt på tværs og får en anden oplevelse af klubben end bare træning og kampe.
                Her kan du finde billeder fra koncerterne.
            </p>
        </div>
    

    </div>

</template>

<style scoped lang="scss">
@use '@/assets/_color.scss' as c;
@use '@/assets/_font.scss' as f;
@use '@/assets/_button.scss' as btn;

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


</style>