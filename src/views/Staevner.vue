<script setup>
import HeroTamplate from '@/components/HeroTamplate.vue';
import Staevne_hero from '../assets/images/hero/Staevne_hero.webp'

</script>

<template>
    <div class="about-hero">
        <div class="hero">
        <HeroTamplate
            :image="Staevne_hero"
            title="KONCERTER I KLUBBEN"
            :gradient="true"
        />
        </div>
    </div>

    <div class="overflow_box">
        <div class="content">
            <p>
                Stævnerne i Bolbro GIF er noget, der bliver løftet af klubben selv.
                Der er mange ting, der skal gå op, og derfor er der også brug for en del frivillige til at få det hele til at fungere – både før, under og efter. Det er med til at skabe nogle gode rammer for dagene, så det hele kører, som det skal.
                Samtidig er det en af de ting, hvor man er sammen på en anden måde end til træning, og hvor man møder flere fra klubben på tværs.
                Her kan du se billeder fra nogle af de stævner, vi har været en del af.
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