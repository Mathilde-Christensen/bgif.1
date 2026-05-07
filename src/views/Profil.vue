<script setup>
import Activities from "@/components/Activities.vue";
import HeroTamplate from "@/components/HeroTamplate.vue";
</script>

<template>
 <HeroTamplate
    class="profile__hero"
    image="/src/assets/images/hero/profilehero.webp"
    :gradient="true"
    height="450px"
    image-position="center 0%"
  />

  <div class="overflow_box">
    <section class="profile__content">
      <div class="profile__user">
        <img
          class="profile__image"
          src="@/assets/images/members/emma.webp"
          alt="Profilbillede af medlem Emma"
        />

        <div class="profile__info">
          <h1 class="profile__title">Hej Emma!</h1>

          <div class="profile__details">
            <p class="profile__text">
              <strong>Hold:</strong> Håndbold damesenior
            </p>
            <p class="profile__text">
              <strong>Rolle:</strong> Spiller
            </p>
            <p class="profile__text">
              <strong>Medlem siden:</strong> September 2021
            </p>
          </div>
        </div>
      </div>

      <section class="profile__calendar-box">
        <Activities
          title="Min kalender"
          button-text="Tilmeldt"
          :is-joined="true"
          class="profile__activities"
        />
      </section>
    </section>
  </div>  
    
</template>

<style scoped lang="scss">
@use '@/assets/_color.scss' as c;
@use '@/assets/_font.scss' as f;
@use '@/assets/_button.scss' as btn;

.profile {
  min-height: 100vh;
  background-color: c.$color-white;
}

.profile__hero {
  position: sticky;
  top: 0;
  z-index: 1;
}

.profile__hero :deep(.hero__img) {
  object-position: center 5%;
}

.profile__heroImage {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 105%;
  display: block;
}

.overflow_box {
  position: relative;
  z-index: 2;
  margin-top: -25vh;
  background: c.$color-white;
  border-radius: 45px 45px 0 0;
  padding: 70px 0 60px;
}

.profile__content {
  position: relative;
  margin-top: -45px;
  padding: 0 0 80px;
  border-radius: 45px 45px 0 0;
  background: c.$color-white;
}

.profile__user {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 55px;
  transform: translateY(-75px);
}

.profile__image {
  width: 190px;
  height: 190px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center 25%;
  transform: translateY(-20px);
}

.profile__info {
  transform: translateY(-35px);
}

.profile__title {
  margin: 0;
  color: c.$cta;
  text-transform: uppercase;
}

.profile__details {
  margin-top: 20px;
}

.profile__text {
  margin: 5px 0;
}

.profile__calendar-box {
  width: 86%;
  margin: -35px auto 0;
  padding: 35px 28px;
  border-radius: 35px;
  background-color: #f6f6f6;
}

/* Styling af Activities inde fra Profil.vue */
.profile__activities :deep(.activities) {
  background-color: transparent;
  padding: 0;
}

.profile__activities :deep(.activities__title) {
  margin: 0 0 28px;
  color: #222222;
  font-size: 34px;
  text-transform: uppercase;
}

.profile__activities :deep(.activities__card) {
  width: 100%;
  min-height: 95px;
  padding: 24px 34px;
  display: grid;
  grid-template-columns: 1fr 1.2fr 2.2fr auto auto;
  gap: 28px;
}

.profile__activities :deep(.activities__location) {
  white-space: normal;
  overflow-wrap: break-word;
}

.profile__activities :deep(.activities__button--joined) {
  background-color: #000f9f;
  color: c.$color-white;
}
</style>