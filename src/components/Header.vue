<script setup>
import Logo from '../assets/images/icons/bolbrologo.webp'
import Burger from '../assets/images/icons/burger-barwhite.webp'
import Home from '../assets/images/icons/homewhite.webp'
import CalendarLogo from '../assets/images/icons/calendarwhite.webp'
import Chat from '../assets/images/icons/chatwhite.webp'
import Profile from '../assets/images/icons/profilewhite.webp'

import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <header>
    <div class="header_mobil">
      <button
        class="hamburger"
        @click.stop="toggleMenu"
        :aria-expanded="isMenuOpen"
      >
        <img class="hamburger__img_mobil" :src="Burger" alt="burgermenu">
      </button>

      <nav class="mobil_nav" :class="{ open: isMenuOpen }">
        <ul class="mobil_nav_ul">
          <li><RouterLink to="/frivillig"><img :src="Home" alt="Home ikon"></RouterLink></li>
          <li><RouterLink to="/foreningsstrength"><img :src="CalendarLogo" alt="Calendar ikon"></RouterLink></li>
          <li><RouterLink to="/klodsterbakken"><img :src="Chat" alt="Chat ikon"></RouterLink></li>
          <li><RouterLink to="/havnebadet"><img :src="Profile" alt="Profile ikon"></RouterLink></li>
        </ul>
      </nav>

      <div class="mobil_header_logo">
        <RouterLink to="/">
          <img class="mobil_logo_img" :src="Logo" alt="Bolbro logo" />
        </RouterLink>
      </div>

    </div>

    <nav class="header_nav">
        <ul class="header_nav_ul">
          <li><RouterLink to="/frivillig"><img :src="Home" alt="Home ikon"></RouterLink></li>
          <li><RouterLink to="/foreningsstrength"><img :src="CalendarLogo" alt="Calendar ikon"></RouterLink></li>
          <li><RouterLink to="/klodsterbakken"><img :src="Chat" alt="Chat ikon"></RouterLink></li>
          <li><RouterLink to="/havnebadet"><img :src="Profile" alt="Profile ikon"></RouterLink></li>
        </ul>
    </nav>
  </header>
</template>