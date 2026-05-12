<script setup>
import { useRouter } from 'vue-router'
import { loginAsUser, loginAsAdmin } from '@/stores/authState'

import FaellesskabHeader from '@/components/FaellesskabHeader.vue'

const router = useRouter()

function handleUserLogin() {
  loginAsUser()
  router.push('/frivilligside')
}

function handleAdminLogin() {
  loginAsAdmin()
  router.push('/admin')
}
</script>

<template>
    <FaellesskabHeader />
  
    <main class="login">
      <section class="login__box">
        <h1 class="login__title">
          Log ind som
        </h1>
  
        <div class="login__options">
          <button
            type="button"
            class="login__button"
            @click="handleUserLogin"
          >
            Medlem / frivillig
          </button>
  
          <button
            type="button"
            class="login__button login__button--admin"
            @click="handleAdminLogin"
          >
            Administrator
          </button>
        </div>
      </section>
    </main>
</template>

<style scoped lang="scss">
@use '@/assets/_color.scss' as c;
@use '@/assets/_font.scss' as f;
@use '@/assets/_button.scss' as btn;

.login {
  min-height: 70vh;
  display: grid;
  place-items: center;
  padding: 40px clamp(1.5rem, 5vw, 70px);
  background-color: c.$color-white;
}

.login__box {
  width: 100%;
  max-width: 500px;
  background-color: c.$color-white;
  border-radius: 40px;
  padding: clamp(30px, 5vw, 60px);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);

  display: grid;
  gap: 28px;
}

.login__title {
  margin: 0;
  text-align: center;
  color: c.$color-black;
}

.login__options {
  display: grid;
  gap: 18px;
}

.login__button {
  @include btn.bigButton;

  border: none;
  width: 100%;
}

.login__button--admin {
  background-color: c.$color-blue;

  &:hover {
    opacity: 0.9;
  }
}
</style>