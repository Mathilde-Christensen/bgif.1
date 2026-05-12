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
                Loppemarkederne i Bolbro GIF er også noget, der bliver arrangeret af klubben selv.
                Her er det frivillige fra klubben, der står for det praktiske – alt fra opsætning til afvikling – og det er med til at få det hele til at hænge sammen. Samtidig er det en måde at få samlet penge ind til klubben på.
                Det er også en af de dage, hvor der sker lidt andet end det sædvanlige, og hvor man møder folk fra klubben på en anden måde end til træning.
                Her kan du se billeder fra nogle af de loppemarkeder, vi har holdt.
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