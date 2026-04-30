<script setup>
import Logo from '../assets/images/icons/bolbrologo.webp'
import Burger from '../assets/images/icons/burger-barwhite.webp'
import Home from '../assets/images/icons/homewhite.webp'
import CalendarLogo from '../assets/images/icons/calendarwhite.webp'
import Chat from '../assets/images/icons/chatikonwhite.webp'
import Profile from '../assets/images/icons/usericonwhite.webp'

import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}
</script>

<template>
  <header>
    <div class="header_mobil">

        <button
            class="hamburger"
            @click.stop="toggleMenu"
            :aria-expanded="isMenuOpen"
            aria-label="Åbn menu"
        >
            <span v-if="!isMenuOpen">
            <img class="hamburger__img_mobil" :src="Burger" alt="burgermenu">
            </span>

            <span v-else class="hamburger__close">×</span>
        </button>

        <nav class="mobil_nav" :class="{ open: isMenuOpen }">
            <ul class="mobil_nav_ul">
            <li>
                <RouterLink to="/" @click="closeMenu">
                <img :src="Home" alt="Home ikon">
                Hjem
                </RouterLink>
            </li>

            <li>
                <RouterLink to="/calendar" @click="closeMenu">
                <img :src="CalendarLogo" alt="Calendar ikon">
                Kalender
                </RouterLink>
            </li>

            <li>
                <RouterLink to="/chat" @click="closeMenu">
                <img :src="Chat" alt="Chat ikon">
                Chat
                </RouterLink>
            </li>

            <li>
                <RouterLink to="/profil" @click="closeMenu">
                <img :src="Profile" alt="Profile ikon">
                Profil
                </RouterLink>
            </li>
            </ul>
        </nav>
       

    </div>

    <nav class="header_nav">
        <ul class="header_nav_ul">
            <li><RouterLink to="/"><img class="logo_img" :src="Logo" alt="Bolbro logo" /></RouterLink></li>
                <ul class="nav_box_ul">
                    <li><RouterLink to="/"><img :src="Home" alt="Home ikon">Hjem</RouterLink></li>
                    <li><RouterLink to="/calendar"><img :src="CalendarLogo" alt="Calendar ikon">Kalender</RouterLink></li>
                    <li><RouterLink to="/chat"><img :src="Chat" alt="Chat ikon">Chat</RouterLink></li>
                    <li><RouterLink to="/profil"><img :src="Profile" alt="Profile ikon">Profil</RouterLink></li>
                </ul>
        </ul>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
@use '../assets/_color.scss' as c;
@use '../assets/_font.scss' as f;

header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}


.header_mobil {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 35px 38px;
  z-index: 1000;
}

.mobil_logo_img {
  width: 55px;
  position: relative;
  z-index: 1002;
}

.hamburger {
  width: 95px;
  height: 95px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.45);
  background: rgba(254, 254, 254, 0.31);
  backdrop-filter: blur(3.5px);
  -webkit-backdrop-filter: blur(3.5px);
  box-shadow:
    inset 3px 4px 11.7px 6px rgba(43, 43, 43, 0.25),
    0 8px 25px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: fixed;
  top: 35px;
  right: 38px;
  z-index: 1003;
}

.hamburger__img_mobil {
  width: 48px;
}

.hamburger__close {
  color: white;
  font-size: 60px;
  line-height: 1;
  font-weight: 200;
}

.mobil_nav {
  position: fixed;
  top: 35px;
  right: 38px;
  width: 95px;
  height: 95px;
  border-radius: 50%;
  background: rgba(254, 254, 254, 0.31);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow:
    inset 3px 4px 11.7px 6px rgba(43, 43, 43, 0.25),
    0 8px 25px rgba(0, 0, 0, 0.25);
  z-index: 1001;
  overflow: hidden;
  transition: all 0.55s ease;
  display: flex;
  justify-content: center;
  align-items: center;
}

.mobil_nav.open {
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  border-radius: 0;
}

.mobil_nav_ul {
  list-style: none;
  padding: 0;
  margin: 0;
  opacity: 0;
  transform: scale(0.8);
  transition: all 0.25s ease 0.25s;
  display: flex;
  flex-direction: column;
  gap: 50px;
  align-items: center;
  pointer-events: none;
}

.mobil_nav.open .mobil_nav_ul {
  opacity: 1;
  transform: scale(1);
  pointer-events: auto;
}

.mobil_nav_ul li {
  color: white;
  font-size: 22px;
  text-align: center;
}

.mobil_nav_ul a {
  color: white;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.mobil_nav_ul img {
  width: 45px;
  height: 45px;
  object-fit: contain;
}


.header_nav {
  display: none;
}

@media (min-width: 600px) {
  .header_mobil {
    display: none;
  }

  .header_nav {
    display: block;
    padding: 38px 80px 0;
  }

  .header_nav_ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .logo_img {
    width: 55px;
  }

  .nav_box_ul {
    list-style: none;
    margin: 0 auto;
    padding: 8px 35px;
    min-width: 380px;
    border-radius: 40px;
    background: rgba(254, 254, 254, 0.31);
    backdrop-filter: blur(3.5px);
    -webkit-backdrop-filter: blur(3.5px);
    box-shadow:
      inset 3px 4px 11.7px 6px rgba(43, 43, 43, 0.25);
    border: 1px solid rgba(255, 255, 255, 0.35);

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 35px;

    li {
      color: white;
      font-size: 11px;
      text-align: center;
    }

    a {
      color: white;
      text-decoration: none;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
    }

    img {
      width: 22px;
      height: 22px;
      object-fit: contain;
    }
  }
}
</style>