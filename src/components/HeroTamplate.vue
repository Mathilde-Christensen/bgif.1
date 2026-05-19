<script setup>
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  text: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    required: true,
  },
  gradient: {
    type: Boolean,
    default: false,
  },
  height: {
    type: String,
    default: "90vh",
  },
  imagePosition: {
    type: String,
    default: "center center",
  },
});
</script>

<template>
  <section
    class="hero-tamplate"
    :class="{ 'hero-tamplate--gradient': gradient }"
    :style="{ height: height }"
  >
    <img
      class="hero-tamplate__image"
      :src="image"
      :style="{ objectPosition: imagePosition }"
      alt=""
    >

    <div
      v-if="title || text"
      class="hero-tamplate__content"
    >
      <h1
        v-if="title"
        class="hero-tamplate__title"
        v-html="title"
      ></h1>

      <p
        v-if="text"
        class="hero-tamplate__text"
        v-html="text"
      ></p>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '../assets/_color.scss' as c;
@use '../assets/_font.scss' as f;

.hero-tamplate {
  position: relative;
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
}

.hero-tamplate--gradient::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.75) 0%,
    rgba(0, 0, 0, 0.35) 45%,
    rgba(0, 0, 0, 0.75) 100%
  );
}

.hero-tamplate__image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  z-index: 0;
}

.hero-tamplate__content {
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: c.$color-green;
  text-align: center;
  padding: 0 3rem;
}

.hero-tamplate__title {
  color: c.$color-green;
  text-transform: uppercase;
}

.hero-tamplate__text {
  color: c.$color-white;
  font-weight: 600;
}
</style>