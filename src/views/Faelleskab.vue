<script setup>
import HeroTamplate from '@/components/HeroTamplate.vue';
import Faelleskab from '../assets/images/hero/Faelleskab_hero.webp'
import UdOverBanen from '../assets/images/UdOverBanen.webp'
import Citat from '@/components/Citat.vue';

</script>

<template>
    <div class="about-hero">
        <div class="hero">
        <HeroTamplate
            :image="Faelleskab"
            title="SAMMEN SKABER VI KLUBBEN"
            text="Bolbro GIF er drevet af fællesskab og frivillighed. Her løfter vi i flok – både til træning og til klubbens mange aktiviteter."
            :gradient="true"
        />
        </div>
    </div>

    <div class="overflow_box">
        <div class="tak_content">
            
            <div class="UdOverBanen_img_box">
                <img class="UdOverBanen_img" :src="UdOverBanen" alt="Mennesker i klubben">
            </div>

            <div class="tak_text">
                <h2 class="tak_text--title">ET FÆLLESSKAB DER RÆKKER UD OVER BANEN</h2>
                <p>
                    I Bolbro GIF handler det om meget mere end selve sporten. Vi støtter hinanden til kampe og skaber et stærkt sammenhold, der rækker ud over banen. Gennem fælles arrangementer som koncerter, loppemarkeder og andre events samler vi ind til klubben og styrker fællesskabet. Til sommer og vinter mødes vi på tværs af hold, lærer hinanden at kende og bliver en del af et fællesskab, hvor alle er velkomne.   
                </p>
            </div>
        </div>

        <div class="Aktiviteter">
            <h2 class="Aktiviteter--title">AKTIVITETER I KLUBBEN</h2>
            <p>Få et overblik over de forskellige aktiviteter og arrangementer i klubben. Klik dig ind og oplev billeder og stemning fra hver enkelt aktivitet.</p>

            
            <div class="activities_overview">
                <div class="activities_overview_box"> 
                    <RouterLink to="/" @click="closeMenu">
                        KONCERTER
                    </RouterLink>
                </div>

                <div class="activities_overview_box"> 
                    <RouterLink to="/" @click="closeMenu">
                        LOPPEMARKED
                    </RouterLink>
                </div>

                <div class="activities_overview_box"> 
                    <RouterLink to="/" @click="closeMenu">
                        HEARTLAND FESTIVAL
                    </RouterLink>
                </div>

                <div class="activities_overview_box"> 
                    <RouterLink to="/" @click="closeMenu">
                        STÆVNER
                    </RouterLink>
                </div>

            </div>

        </div>

    </div>

    <div class="about-citat">
        <div class="Citat">
        <Citat
            :image="Faelleskab"
            title="“ FOLK ER GODE TIL AT TRÆKKE HINANDEN MED IND I"
            titlecta="FÆLLESSKABET ”"
            :gradient="true"
        />
        </div>
    </div>

    <div class="overflow_box">
        <div class="tak_content">
            
            <div class="UdOverBanen_img_box">
                <img class="UdOverBanen_img" :src="UdOverBanen" alt="Mennesker i klubben">
            </div>

            <div class="tak_text">
                <h2 class="tak_text--title">ET FÆLLESSKAB DER RÆKKER UD OVER BANEN</h2>
                <p>
                    I Bolbro GIF handler det om meget mere end selve sporten. Vi støtter hinanden til kampe og skaber et stærkt sammenhold, der rækker ud over banen. Gennem fælles arrangementer som koncerter, loppemarkeder og andre events samler vi ind til klubben og styrker fællesskabet. Til sommer og vinter mødes vi på tværs af hold, lærer hinanden at kende og bliver en del af et fællesskab, hvor alle er velkomne.   
                </p>
            </div>
        </div>

        <div class="Aktiviteter">
            <h2 class="Aktiviteter--title">AKTIVITETER I KLUBBEN</h2>
            <p>Få et overblik over de forskellige aktiviteter og arrangementer i klubben. Klik dig ind og oplev billeder og stemning fra hver enkelt aktivitet.</p>

            
            <div class="activities_overview">
                <div class="activities_overview_box"> 
                    <RouterLink to="/" @click="closeMenu">
                        KONCERTER
                    </RouterLink>
                </div>

                <div class="activities_overview_box"> 
                    <RouterLink to="/" @click="closeMenu">
                        LOPPEMARKED
                    </RouterLink>
                </div>

                <div class="activities_overview_box"> 
                    <RouterLink to="/" @click="closeMenu">
                        HEARTLAND FESTIVAL
                    </RouterLink>
                </div>

                <div class="activities_overview_box"> 
                    <RouterLink to="/" @click="closeMenu">
                        STÆVNER
                    </RouterLink>
                </div>

            </div>

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

.about-citat {
  position: sticky;
  top: 0;
  height: 100vh;
  z-index: 0;
  overflow: hidden;
  margin-top: -120px; 
}

.hero {
  height: 100%;
}

.overflow_box {
  position: relative;
  margin-top: -25vh;
  background: c.$color-white;
  border-radius: 45px;
  padding: 70px 0 60px;
  z-index: 2;
  overflow: hidden;
}


.UdOverBanen_img {
    width: 100%;
    border-radius: 40px;
}

.tak_content {
    padding: 10px clamp(1.5rem, 8vw, 110px);
}

.tak_text--bold {
    padding: 10px 0px 40px 0px;
}

.tak_text--title {
    padding: 0px 0px 20px 0px;
}

.Aktiviteter {
    padding: 10px clamp(1.5rem, 8vw, 110px); 
}

.Aktiviteter--title {
    padding: 70px 0px 0px 0px;
}

.activities_overview_box {
    border-radius: 2.5rem;
    background: #0258C2;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 15.9375rem;
    height: 15.9375rem;
    padding: 10px 0px 10px 0px;
    margin: 0px 10px 0px 10px;
    text-align: center;
    border-radius: 2.5rem;
    background: c.$color-lblue;
    margin: 10px 0px 10px 0px;
}

.activities_overview :hover {
    background-color: c.$cta;
}

.activities_overview a {
    font-family: f.$font-anton;
    text-transform: uppercase;
    font-size: 1.25rem;
    color: c.$color-white;
}

@media (min-width: 768px) {
    .overflow_box {
        border-radius: 60px;
    }

    .activities_overview {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 20px 0px 10px 0px;
    }

}

@media (min-width: 1200px) {
    .overflow_box {
    border-radius: 80px;
  }

      .tak_content {
        display: flex;
    }

    .tak_video_box {
        width: 35%;
    }

    .tak_text {
        width: 65%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-left: 60px;
    }
}

</style>