<script setup>
import { ref } from 'vue'

import HeroTamplate from '@/components/HeroTamplate.vue'
import Faelleskab from '../assets/images/hero/Faelleskab_hero.webp'
import UdOverBanen from '../assets/images/UdOverBanen.webp'
import Citat from '@/components/Citat.vue'
import CitatImg from '../assets/images/citat_img.webp'
import Medlem from '../assets/images/Medlem.webp'

const showTrialModal = ref(false)

function openTrialModal() {
  showTrialModal.value = true
}

function closeTrialModal() {
  showTrialModal.value = false
}

function sendTrialForm() {
  showTrialModal.value = false
}
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
            :image="CitatImg"
            title="“ FOLK ER GODE TIL AT TRÆKKE HINANDEN MED IND I"
            titlecta="FÆLLESSKABET ”"
            :gradient="true"
        />
        </div>
    </div>

    <div class="overflow_box">
        <div class="tak_content">
            
            <div class="UdOverBanen_img_box">
                <img class="UdOverBanen_img" :src="Medlem" alt="Mennesker i klubben">
            </div>

            <div class="tak_text">
                <h2 class="tak_text--title">BLIV EN DEL AF BOLBRO GIF</h2>
                <p>
                    Her kan du møde nye mennesker og blive en del af en hverdag med aktiviteter, grin og gode oplevelser. Uanset om du er ny, øvet eller bare nysgerrig, er der plads til dig. Kom forbi for at opleve stemningen og mærk, om det er noget for dig
                </p>

                <button type="button" class="laes_mere_button" @click="openTrialModal">
                    Book en prøvetræning
                </button>
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

    <div v-if="showTrialModal" class="trial_modal_backdrop" @click.self="closeTrialModal">
        <div class="trial_modal">
            <button class="trial_modal_close" @click="closeTrialModal">X</button>

            <input class="trial_input" type="text" placeholder="Navn">
            <input class="trial_input" type="number" placeholder="Alder">

            <select class="trial_input">
            <option value="">Sport</option>
            <option>Fodbold</option>
            <option>Håndbold</option>
            <option>Badminton</option>
            <option>Gymnastik</option>
            </select>

            <select class="trial_input">
            <option value="">Niveau</option>
            <option>Begynder</option>
            <option>Let øvet</option>
            <option>Øvet</option>
            </select>

            <input class="trial_input" type="tel" placeholder="Mobilnummer">

            <textarea class="trial_textarea" placeholder="Besked?"></textarea>

            <button class="trial_send" @click="sendTrialForm">
                Send
            </button>
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

.laes_mere_button {
  @include btn.bigButton;
  justify-self: center;
  min-width: 320px;
  margin: 20px 0px 0px 0px;
}

.trial_modal_close {
  background: transparent;
  border: none;
  font-family: f.$font-anton;
  font-size: 1.7rem;
  line-height: 1;
  color: c.$color-black;
  cursor: pointer;
  transition: transform 0.2s ease, color 0.2s ease;
  display: flex;
  justify-content: right;
}

.trial_modal_close:hover {
  color: c.$cta;
}

.trial_modal_backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  z-index: 9999;
  display: grid;
  place-items: center;
  padding: 16px;
}

.trial_modal {
  position: relative;
  width: min(88vw, 520px);
  max-height: 88vh;
  overflow-y: auto;
  background: c.$color-white;
  border-radius: clamp(28px, 5vw, 55px);
  padding: clamp(28px, 5vw, 48px);
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.trial_input,
.trial_textarea {
  width: 100%;
  border: 2px solid c.$color-lblue;
  border-radius: 22px;
  padding: 12px 20px;
  font: inherit;
  color: c.$color-black;
  background: c.$color-white;
}

.trial_input::placeholder,
.trial_textarea::placeholder {
  color: c.$color-black;
  opacity: 1;
}

.trial_input:focus,
.trial_textarea:focus {
  outline: none;
  border: 4px solid c.$cta;
}

.trial_textarea {
  min-height: 120px;
  resize: none;
}

select.trial_input {
  appearance: none;
  -webkit-appearance: none;
  background-image: linear-gradient(45deg, transparent 50%, c.$color-blue 50%),
    linear-gradient(135deg, c.$color-blue 50%, transparent 50%);
  background-position:
    calc(100% - 22px) 50%,
    calc(100% - 14px) 50%;
  background-size: 8px 8px, 8px 8px;
  background-repeat: no-repeat;
  cursor: pointer;
}

.trial_send {
  @include btn.button(btn.$button-small);
  align-self: center;
  border: 0;
  margin-top: 8px;
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