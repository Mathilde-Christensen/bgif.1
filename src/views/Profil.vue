<script setup>
import Activities from "@/components/Activities.vue";
import HeroTamplate from "@/components/HeroTamplate.vue";
import ProfileHero from "@/assets/images/hero/profilehero.webp";
</script>

<template>
  <HeroTamplate
    class="profile__hero"
    :image="ProfileHero"
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
          :only-joined="true"
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
  overflow-x: hidden;
}

.profile__hero {
  position: sticky;
  top: 0;
  z-index: 1;
}

.overflow_box {
  position: relative;
  z-index: 2;
  margin-top: -18vh;
  padding: 55px 0 45px;
  background: c.$color-white;
  border-radius: 32px 32px 0 0;
  overflow-x: hidden;
}

.profile__content {
  position: relative;
  margin-top: -30px;
  padding: 0 0 80px;
  border-radius: 32px 32px 0 0;
  overflow-x: hidden;
}

.profile__user {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  transform: translateY(-65px);
  text-align: center;
}

.profile__image {
  width: 145px;
  height: 145px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center 10%;
}

.profile__info {
  transform: translateY(0);
}

.profile__title {
  margin: 0;
  color: c.$cta;
}

.profile__details {
  margin-top: 20px;
}

.profile__text {
  margin: 5px 0;
}

.profile__calendar-box {
  width: 94%;
  max-width: 100%;
  margin: -25px auto 0;
  padding: 28px 18px;
  border-radius: 28px;
  background-color: #f6f6f6;
  box-sizing: border-box;
  overflow: hidden;
}

section.activities.profile__activities {
  width: 100%;
  max-width: 100%;
  padding: 0;
  box-sizing: border-box;
}

.profile__activities :deep(.activities__inner),
.profile__activities :deep(.activities__list),
.profile__activities :deep(.activities__group),
.profile__activities :deep(.activities__card) {
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
}

.profile__activities :deep(.activities__title) {
  color: #222222;
  font-size: 28px;
  text-transform: uppercase;
}

.profile__activities :deep(.activities__card) {
  display: grid;
  grid-template-columns: 1fr;
  gap: 22px;
  min-width: 0;
  height: auto;
  padding: 24px 20px;
}

.profile__activities :deep(.activities__content) {
  display: grid;
  grid-template-columns: 1fr;
  gap: 18px;
  min-width: 0;
}

.profile__activities :deep(.activities__actions) {
  justify-content: center;
  flex-wrap: wrap;
}

.profile__activities :deep(.activities__activityTitle) {
  max-width: 100%;
}

.profile__activities :deep(.activities__time),
.profile__activities :deep(.activities__location) {
  white-space: normal;
  overflow-wrap: anywhere;
}

@media (min-width: 700px) {
  .overflow_box {
    margin-top: -22vh;
    padding: 65px 0 55px;
    border-radius: 40px 40px 0 0;
  }

  .profile__content {
    margin-top: -40px;
  }

  .profile__user {
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    gap: 35px;
    transform: translateY(-75px);
    text-align: left;
  }

  .profile__image {
    width: 170px;
    height: 170px;
    transform: translateY(10px);
  }

  .profile__info {
    transform: translateY(-25px);
  }

  .profile__calendar-box {
    width: 92%;
    margin-top: -35px;
    padding: 32px 24px;
    border-radius: 35px;
  }

  .profile__activities :deep(.activities__title) {
    font-size: 34px;
  }

  .profile__activities :deep(.activities__card) {
    padding: 28px 26px;
  }
}

@media (min-width: 1300px) {
  .overflow_box {
    margin-top: -25vh;
    padding: 70px 0 60px;
    border-radius: 45px 45px 0 0;
  }

  .profile__content {
    margin-top: -45px;
    border-radius: 45px 45px 0 0;
  }

  .profile__user {
    gap: 55px;
  }

  .profile__image {
    width: 190px;
    height: 190px;
  }

  .profile__info {
    transform: translateY(-35px);
  }

  .profile__calendar-box {
    width: 86%;
    padding: 35px 28px;
  }

  .profile__activities :deep(.activities__card) {
    grid-template-columns: 1fr auto;
    align-items: center;
    gap: 32px;
    padding: 22px 32px;
  }

  .profile__activities :deep(.activities__content) {
    grid-template-columns:
      minmax(150px, 0.8fr)
      minmax(210px, 1fr)
      minmax(260px, 1.3fr);
    align-items: center;
    gap: 32px;
  }

  .profile__activities :deep(.activities__actions) {
    justify-content: flex-end;
    flex-wrap: nowrap;
  }
}
</style>