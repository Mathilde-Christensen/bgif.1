<!-- Mathilde -->

<script setup>
import HeroTamplate from '@/components/HeroTamplate.vue'
import Staevne_hero from '@/assets/images/hero/Staevne_hero.webp'

import s1 from '@/assets/images/staevne/s1.webp'
import s2 from '@/assets/images/staevne/s2.webp'
import s3 from '@/assets/images/staevne/s3.webp'
import s4 from '@/assets/images/staevne/s4.webp'
import s6 from '@/assets/images/staevne/s6.webp'
import s7 from '@/assets/images/staevne/s7.webp'
import s8 from '@/assets/images/staevne/s8.webp'
import s9 from '@/assets/images/staevne/s9.webp'
import s10 from '@/assets/images/staevne/s10.webp'
import s11 from '@/assets/images/staevne/s11.webp'
import s13 from '@/assets/images/staevne/s13.webp'
import s14 from '@/assets/images/staevne/s14.webp'
import s15 from '@/assets/images/staevne/s15.webp'
import s16 from '@/assets/images/staevne/s16.webp'
import s17 from '@/assets/images/staevne/s17.webp'
import s18 from '@/assets/images/staevne/s18.webp'
import FaellesskabHeader from '@/components/FaellesskabHeader.vue'
</script>

<template>
    <FaellesskabHeader />
    <div class="about-hero">
        <div class="hero">
        <HeroTamplate
            :image="Staevne_hero"
            title="STÆVNER"
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

        <section class="gallery">
            <img :src="s1" alt="Stævne i klubben">
            <img :src="s2" alt="Stævne i klubben">
            <img :src="s3" alt="Stævne i klubben">
            <img :src="s4" alt="Stævne i klubben">
            <img :src="s6" alt="Stævne i klubben">
            <img :src="s7" alt="Stævne i klubben">
            <img :src="s8" alt="Stævne i klubben">
            <img :src="s9" alt="Stævne i klubben">
            <img :src="s10" alt="Stævne i klubben">
            <img :src="s11" alt="Stævne i klubben">
            <img :src="s13" alt="Stævne i klubben">
            <img :src="s14" alt="Stævne i klubben">
            <img :src="s15" alt="Stævne i klubben">
            <img :src="s16" alt="Stævne i klubben">
            <img :src="s17" alt="Stævne i klubben">
            <img :src="s18" alt="Stævne i klubben">
        </section>
    

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