<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { role } from '@/stores/authState'

import bolbroLogo from '@/assets/images/icons/bolbrologo.webp'
import userIcon from '@/assets/images/icons/usericonblack.webp'

const router = useRouter()

const loginText = computed(() => {
  if (role.value === 'admin') return 'Administrator'
  if (role.value === 'user') return 'Min side'
  return 'Log ind'
})

function goToLogin() {
  router.push('/login')
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
      <RouterLink to="/faellesskab" class="community-header__logoLink">
        <img
          class="community-header__logo"
          :src="bolbroLogo"
          alt="Bolbro GIF logo"
        >
      </RouterLink>

      <nav class="community-header__nav">
        <a href="#">Håndbold</a>
        <a href="#">Badminton</a>
        <a href="#">Fodbold</a>
        <a href="#">Amerikansk fodbold</a>
        <a href="#">Yoga</a>
        <a href="#">Bolbro GIF</a>
      </nav>

      <button
        type="button"
        class="community-header__login"
        @click="goToLogin"
      >
        <img
          class="community-header__loginIcon"
          :src="userIcon"
          alt=""
        >
        <span>{{ loginText }}</span>
      </button>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@use '@/assets/_color.scss' as c;
@use '@/assets/_font.scss' as f;

.community-header {
  width: 100%;
  background-color: c.$color-white;
  border-bottom: 1px solid #d9d9d9;
  z-index: 100;
}

.community-header__top {
  display: none;
  background-color: c.$cta;
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
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 24px;
  padding: 10px clamp(1.5rem, 5vw, 70px);
}

.community-header__logo {
  width: 50px;
  display: block;
}

.community-header__nav {
  display: none;

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

.community-header__login {
  display: flex;
  align-items: center;
  gap: 8px;
  border: 0;
  background: transparent;
  color: c.$color-black;
  font-weight: 800;
  text-transform: uppercase;
  cursor: pointer;
}

.community-header__login span {
  transition: color 0.2s ease, transform 0.2s ease;
}

.community-header__login:hover span {
  color: c.$color-lblue;
  transform: translateY(-2px);
}

.community-header__loginIcon {
  width: 22px;
  height: 22px;
  object-fit: contain;
}

@media (min-width: 900px) {
  .community-header__top {
    display: block;
  }

  .community-header__main {
    min-height: 100px;
  }

  .community-header__logo {
    width: 60px;
  }

  .community-header__nav {
    display: flex;
    justify-content: center;
    gap: clamp(24px, 3vw, 52px);
  }

  .community-header__login {
    font-size: 1rem;
  }
}
</style>