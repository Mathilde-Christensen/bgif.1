<script setup>
import HeroTamplate from '@/components/HeroTamplate.vue'
import loppemarkederHero from '@/assets/images/hero/Loppemarked_hero.webp'

import l1 from '@/assets/images/loppemarked/l1.webp'
import l2 from '@/assets/images/loppemarked/l2.webp'
import l3 from '@/assets/images/loppemarked/l3.webp'
import l4 from '@/assets/images/loppemarked/l4.webp'
import l5 from '@/assets/images/loppemarked/l5.webp'
import l6 from '@/assets/images/loppemarked/l6.webp'
import l7 from '@/assets/images/loppemarked/l7.webp'
import l9 from '@/assets/images/loppemarked/l9.webp'
import l10 from '@/assets/images/loppemarked/l10.webp'
import l11 from '@/assets/images/loppemarked/l11.webp'
import l12 from '@/assets/images/loppemarked/l12.webp'
import l13 from '@/assets/images/loppemarked/l13.webp'
</script>

<template>
    <div class="about-hero">
        <div class="hero">
        <HeroTamplate
            :image="loppemarkederHero"
            title="LOPPEMARKEDER I KLUBBEN"
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

        <section class="gallery">
            <img :src="l1" alt="Loppemarked i klubben">
            <img :src="l2" alt="Loppemarked i klubben">
            <img :src="l3" alt="Loppemarked i klubben">
            <img :src="l4" alt="Loppemarked i klubben">
            <img :src="l5" alt="Loppemarked i klubben">
            <img :src="l6" alt="Loppemarked i klubben">
            <img :src="l7" alt="Loppemarked i klubben">
            <img :src="l9" alt="Loppemarked i klubben">
            <img :src="l10" alt="Loppemarked i klubben">
            <img :src="l11" alt="Loppemarked i klubben">
            <img :src="l12" alt="Loppemarked i klubben">
            <img :src="l13" alt="Loppemarked i klubben">
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