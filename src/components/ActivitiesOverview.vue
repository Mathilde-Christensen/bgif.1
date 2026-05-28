<!-- Mathilde -->

<script setup>
import { ref } from 'vue'

const currentIndex = ref(0)

const activities = [
  { title: 'Koncerter', link: '/koncerter' },
  { title: 'Loppemarked', link: '/loppemarkeder' },
  { title: 'Heartland Festival', link: '/hardland' },
  { title: 'Stævner', link: '/staevner' }
]

function nextSlide() {
  currentIndex.value =
    currentIndex.value === activities.length - 1 ? 0 : currentIndex.value + 1
}

function prevSlide() {
  currentIndex.value =
    currentIndex.value === 0 ? activities.length - 1 : currentIndex.value - 1
}
</script>

<template>
  <section class="Aktiviteter">
    <h2 class="Aktiviteter--title">AKTIVITETER I KLUBBEN</h2>

    <p>
      Få et overblik over de forskellige aktiviteter og arrangementer i klubben.
      Klik dig ind og oplev billeder og stemning fra hver enkelt aktivitet.
    </p>

    <div class="activities_slider">
      <button class="slider_btn" type="button" @click="prevSlide">
        ‹
      </button>

      <div class="activities_overview">
        <div
          v-for="(activity, index) in activities"
          :key="activity.title"
          class="activities_overview_box"
          :class="{ active: currentIndex === index }"
        >
          <RouterLink :to="activity.link">
            {{ activity.title }}
          </RouterLink>
        </div>
      </div>

      <button class="slider_btn" type="button" @click="nextSlide">
        ›
      </button>
    </div>

    <div class="slider_dots">
      <button
        v-for="(activity, index) in activities"
        :key="activity.title"
        type="button"
        class="dot"
        :class="{ active: currentIndex === index }"
        @click="currentIndex = index"
      ></button>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '@/assets/_color.scss' as c;
@use '@/assets/_font.scss' as f;

.Aktiviteter {
  padding: 10px clamp(1.5rem, 8vw, 110px);
}

.Aktiviteter--title {
  padding: 70px 0 0;
}

.activities_slider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  padding: 24px 0 10px;
}

.activities_overview {
  width: 15.9375rem;
  height: 15.9375rem;
  position: relative;
}

.activities_overview_box {
  position: absolute;
  inset: 0;
  border-radius: 2.5rem;
  background: c.$color-lblue;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  opacity: 0;
  pointer-events: none;
  transform: translateX(20px);
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.activities_overview_box.active {
  opacity: 1;
  pointer-events: auto;
  transform: translateX(0);
}

.activities_overview_box:hover {
  background-color: c.$color-green;
}

.activities_overview_box a {
  font-family: f.$font-anton;
  text-transform: uppercase;
  font-size: 1.25rem;
  color: c.$color-white;
  text-decoration: none;
}

.slider_btn {
  border: none;
  background: transparent;
  color: c.$color-blue;
  font-size: 2.5rem;
  cursor: pointer;
}

.slider_dots {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 8px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background: c.$color-lblue;
  opacity: 0.4;
  cursor: pointer;
}

.dot.active {
  opacity: 1;
  background: c.$color-green;
}

@media (min-width: 768px) {
  .activities_slider {
    display: block;
  }

  .activities_overview {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 20px;
    position: static;
  }

  .activities_overview_box {
    position: static;
    width: 15.9375rem;
    height: 15.9375rem;
    opacity: 1;
    pointer-events: auto;
    transform: none;
  }

  .slider_btn,
  .slider_dots {
    display: none;
  }
}
</style>