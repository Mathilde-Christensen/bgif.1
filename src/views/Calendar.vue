<script setup>
import HeroTamplate from "@/components/HeroTamplate.vue";
import Activities from "@/components/Activities.vue";
import CalendarHero from "@/assets/images/hero/profilehero.webp";
</script>

<template>
  <main class="calendar">
    <HeroTamplate
      class="calendar__hero"
      :image="CalendarHero"
      :gradient="true"
      height="80vh"
      image-position="center center"
      title="Kalender"
      text="Find frivillige aktiviteter og meld dig til de arrangementer, der passer dig."
    />

    <section class="calendar__content">
      <Activities />
    </section>
  </main>
</template>

<style scoped lang="scss">
@use "@/assets/_color.scss" as c;
@use "@/assets/_font.scss" as f;
@use "@/assets/_button.scss" as btn;

.calendar {
  min-height: 100vh;
  background-color: c.$color-white;
}

.calendar__hero {
  min-height: 520px;
}

.calendar__content {
  position: relative;
  z-index: 2;
  margin-top: -70px;
  padding: 60px 0 80px;
  border-radius: 45px 45px 0 0;
  background-color: c.$color-white;
}

/* Mobile first */
.calendar__content :deep(.activities) {
  padding: 40px 1.5rem;
}

/* Tablet */
@media (min-width: 768px) {
  .calendar__hero {
    min-height: 620px;
  }

  .calendar__content {
    margin-top: -90px;
    padding: 70px 0 90px;
    border-radius: 55px 55px 0 0;
  }

  .calendar__content :deep(.activities) {
    padding: 60px clamp(2rem, 6vw, 80px);
  }
}

/* Desktop */
@media (min-width: 1100px) {
  .calendar__hero {
    min-height: 80vh;
  }

  .calendar__content {
    margin-top: -120px;
    padding: 80px 0 100px;
    border-radius: 65px 65px 0 0;
  }

  .calendar__content :deep(.activities) {
    padding: 70px clamp(1.5rem, 8vw, 110px);
  }
}
</style>