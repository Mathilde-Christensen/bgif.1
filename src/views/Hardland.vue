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
                Bolbro GIF er en del af Heartland Festival.
                Her er det frivillige fra klubben, der tager afsted og hjælper til med forskellige opgaver under festivalen. Det er nogle lidt anderledes dage, hvor man er sammen på en anden måde end i klubben, og hvor man oplever noget helt andet end den normale hverdag.
                Det er også en af de ting, hvor man lærer hinanden bedre at kende på tværs, fordi man arbejder sammen over flere dage.
                Her kan du se billeder fra, når vi har været afsted.
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
</style>