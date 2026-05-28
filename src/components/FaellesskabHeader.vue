<!-- Kirja -->

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import bolbroLogo from '@/assets/images/icons/bolbrologo.webp'
import userIcon from '@/assets/images/icons/usericonblack.webp'
import burgerIcon from '@/assets/images/icons/burger-barwhite.webp'

const router = useRouter()
const isMenuOpen = ref(false)

function goToLogin() {
  isMenuOpen.value = false
  router.push('/login')
}

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function closeMenu() {
  isMenuOpen.value = false
}
</script>

<template>
  <header class="community-header">
    <div class="community-header__top">
      <nav class="community-header__topNav">
        <a href="#">Om Bolbro GIF</a>
        <a href="#">Café Cup</a>
        <a href="#">Baneudlejning</a>
        <a href="#">Bolbro boblen</a>
      </nav>
    </div>

    <div class="community-header__main">
      <RouterLink
        to="/faellesskab"
        class="community-header__logoLink"
        @click="closeMenu"
      >
        <img
          class="community-header__logo"
          :src="bolbroLogo"
          alt="Bolbro GIF logo"
        >
      </RouterLink>

      <button
        type="button"
        class="community-header__burger"
        :aria-expanded="isMenuOpen"
        aria-label="Åbn menu"
        @click="toggleMenu"
      >
        <img
          v-if="!isMenuOpen"
          class="community-header__burgerIcon"
          :src="burgerIcon"
          alt=""
        >
        <span
          v-else
          class="community-header__close"
        >
          ×
        </span>
      </button>

      <nav
        class="community-header__nav"
        :class="{ 'community-header__nav--open': isMenuOpen }"
      >
        <a href="#" @click="closeMenu">Håndbold</a>
        <a href="#" @click="closeMenu">Badminton</a>
        <a href="#" @click="closeMenu">Fodbold</a>
        <a href="#" @click="closeMenu">Amerikansk fodbold</a>
        <a href="#" @click="closeMenu">Yoga</a>
        <a href="#" @click="closeMenu">Bolbro GIF</a>

        <button
          type="button"
          class="community-header__login community-header__login--mobile"
          @click="goToLogin"
        >
          <img
            class="community-header__loginIcon"
            :src="userIcon"
            alt=""
          >
          <span>Log ind</span>
        </button>
      </nav>

      <button
        type="button"
        class="community-header__login community-header__login--desktop"
        @click="goToLogin"
      >
        <img
          class="community-header__loginIcon"
          :src="userIcon"
          alt=""
        >
        <span>Log ind</span>
      </button>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@use '@/assets/_color.scss' as c;
@use '@/assets/_font.scss' as f;

.community-header {
  position: relative;
  width: 100%;
  background-color: c.$color-white;
  border-bottom: 1px solid #d9d9d9;
  z-index: 100;
}

.community-header__top {
  display: none;
  background-color: c.$color-green;
  padding: 10px clamp(1.5rem, 5vw, 70px);
}

.community-header__topNav {
  display: flex;
  justify-content: flex-end;
  gap: 34px;

  a {
    color: c.$color-black;
    text-decoration: none;
    font-weight: 700;
    letter-spacing: 1.5px;

    &:hover {
      color: c.$color-black;
    }
  }
}

.community-header__main {
  display: grid;
  grid-template-columns: auto auto;
  align-items: center;
  justify-content: space-between;
  padding: 12px clamp(1.5rem, 5vw, 70px);
}

.community-header__logo {
  width: 50px;
  display: block;
}

.community-header__burger {
  width: 52px;
  height: 52px;
  border: 0;
  border-radius: 50%;
  background-color: c.$color-blue;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 300;
}

.community-header__burgerIcon {
  width: 27px;
  height: auto;
}

.community-header__close {
  color: c.$color-white;
  font-size: 2.3rem;
  line-height: 1;
}

.community-header__nav {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  display: none;
  background-color: c.$color-white;
  border-bottom: 1px solid #d9d9d9;
  padding: 28px clamp(1.5rem, 5vw, 70px);
  z-index: 250;

  a {
    color: c.$color-black;
    text-decoration: none;
    font-weight: 700;
    letter-spacing: 1.5px;

    &:hover {
      color: c.$color-black;
    }
  }
}

.community-header__nav--open {
  display: grid;
  gap: 22px;
}

.community-header__login {
  display: flex;
  align-items: center;
  gap: 8px;
  width: fit-content;
  border: 0;
  background: transparent;
  color: c.$color-black;
  font-weight: 800;
  text-transform: uppercase;
  cursor: pointer;
  transition: color 0.2s ease;
}

.community-header__login:hover {
  color: c.$color-green;
}

.community-header__loginIcon {
  width: 22px;
  height: 22px;
  object-fit: contain;
  transition: filter 0.2s ease;
}

.community-header__login:hover .community-header__loginIcon {
  filter: brightness(0) saturate(100%) invert(87%) sepia(42%) saturate(538%) hue-rotate(24deg) brightness(95%) contrast(87%);
}

.community-header__login--desktop {
  display: none;
}

.community-header__login--mobile {
  margin-top: 8px;
}

/* Tablet */
@media (min-width: 700px) {
  .community-header__main {
    padding-block: 14px;
  }

  .community-header__logo {
    width: 56px;
  }

  .community-header__burger {
    width: 56px;
    height: 56px;
  }

  .community-header__nav {
    padding-block: 34px;
  }
}

/* Desktop */
@media (min-width: 1100px) {
  .community-header__top {
    display: block;
  }

  .community-header__main {
    grid-template-columns: auto 1fr auto;
    gap: 24px;
    min-height: 100px;
    padding-block: 10px;
  }

  .community-header__logo {
    width: 60px;
  }

  .community-header__burger {
    display: none;
  }

  .community-header__nav {
    position: static;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: clamp(24px, 3vw, 52px);
    width: auto;
    padding: 0;
    border-bottom: 0;
    background-color: transparent;
  }

  .community-header__login--mobile {
    display: none;
  }

  .community-header__login--desktop {
    display: flex;
    font-size: 1rem;
  }
}
</style>S