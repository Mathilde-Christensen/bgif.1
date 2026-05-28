<!-- Mathilde -->

<script setup>
import Insta1 from '../assets/images/instagram/insta1.webp'
import Insta2 from '../assets/images/instagram/insta2.webp'
import Insta3 from '../assets/images/instagram/insta3.webp'
import Insta4 from '../assets/images/instagram/insta4.webp'

const instaUrl = 'https://www.instagram.com/bolbrohandball/';
</script>

<template>
  <section class="about-section about-section--white">
    <div class="about-container">
      <h2>FØLG MED I KLUBBEN</h2>
      <p>Følg med på Instagram og se, hvad der sker i Bolbro GIF. Her deler vi indhold fra hverdagen, aktiviteter og alt det, der er med til at skabe livet i klubben.</p>

      <div class="about-feed">
        <article class="about-feed-card">
          <a
            :href="instaUrl"
            target="_blank"
            rel="noopener"
            class="about-feed-card__link"
          >
            <img :src="Insta1" alt="Opslag fra Instagram" />
            <div class="about-feed-card__overlay">
              <span>Udforsk opslag</span>
            </div>
          </a>
        </article>

        <article class="about-feed-card">
          <a
            :href="instaUrl"
            target="_blank"
            rel="noopener"
            class="about-feed-card__link"
          >
            <img :src="Insta2" alt="Opslag fra Instagram" />
            <div class="about-feed-card__overlay">
              <span>Udforsk opslag</span>
            </div>
          </a>
        </article>

        <article class="about-feed-card">
          <a
            :href="instaUrl"
            target="_blank"
            rel="noopener"
            class="about-feed-card__link"
          >
            <img :src="Insta3" alt="Instagramopslag" />
            <div class="about-feed-card__overlay">
              <span>Udforsk opslag</span>
            </div>
          </a>
        </article>

        <article class="about-feed-card">
          <a
            :href="instaUrl"
            target="_blank"
            rel="noopener"
            class="about-feed-card__link"
          >
            <img :src="Insta4" alt="Opslag fra Instagram" />
            <div class="about-feed-card__overlay">
              <span>Udforsk opslag</span>
            </div>
          </a>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '@/assets/_color.scss' as c;
@use '@/assets/_font.scss' as f;
@use '@/assets/_button.scss' as btn;

.about-section {
  background-color: c.$color-white;
  color: c.$color-black;
}

.about-container {
  margin: 0 auto;
  padding: 3rem clamp(1.5rem, 8vw, 110px);
}

.about-container h2 {
  font-family: f.$font-anton;
  text-transform: uppercase;
  color: c.$color-black;
  margin-bottom: 1rem;
}

.about-container p {
  font-family: f.$font-poppines;
  color: c.$color-black;
}

.about-follow {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 2.5rem 0;
}

.about-follow__avatar {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: c.$color-lblue;
  color: c.$color-white;
  display: grid;
  place-items: center;
  font-family: f.$font-anton;
  font-size: 1.5rem;
}

.about-follow__avatar::before {
  content: "IG";
}

.about-follow__info {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.about-follow__handle {
  margin: 0;
}

.about-follow__handle-link {
  font-family: f.$font-poppines;
  font-weight: 700;
  color: c.$color-blue;
  text-decoration: none;
}

.about-follow__handle-link:hover {
  color: c.$color-green;
}

.about-follow__btn {
  @include btn.smallButton;
  text-decoration: none;
}

.about-feed {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-top: 2rem;
}

.about-feed-card {
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  min-height: 220px;
}

.about-feed-card__link {
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
}

.about-feed-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;
}

.about-feed-card__overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding-inline: 1rem;
  background: rgba(0, 0, 0, 0.409);
  color: c.$color-white;
  font-family: f.$font-anton;
  text-transform: uppercase;
  opacity: 0;
  transition: opacity 0.25s ease;
}

.about-feed-card:hover img {
  transform: scale(1.04);
}

.about-feed-card:hover .about-feed-card__overlay {
  opacity: 1;
}

@media (min-width: 600px) {
  .about-feed {
    grid-template-columns: repeat(2, 1fr);
  }

  .about-follow__avatar {
    width: 90px;
    height: 90px;
  }
}

@media (min-width: 1024px) {
  .about-container {
    padding-block: 4rem;
  }

  .about-feed {
    grid-template-columns: repeat(4, 1fr);
  }

  .about-follow__avatar {
    width: 110px;
    height: 110px;
  }
}
</style>