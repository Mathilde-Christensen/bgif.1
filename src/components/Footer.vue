<script setup>
import facebookIcon from '../assets/images/icons/facebook_logo_secondary.webp'
import instagramIcon from '../assets/images/icons/instagram_glyph_white.webp'
</script>

<template>
  <footer class="footer">
    <div class="footer__content">

      <section class="footer__section">
        <h3 class="footer__heading">Bolbro GIF</h3>
        <p class="footer__text">
          Friggasvej 22,<br>
          5200 Odense V
        </p>
      </section>

      <section class="footer__section">
        <h3 class="footer__heading">Bolbro Parken</h3>
        <p class="footer__text">
          Falen 95,<br>
          5000 Odense C
        </p>
      </section>

      <section class="footer__section">
        <h3 class="footer__heading">Kontakt</h3>
        <p class="footer__text">
          +45 40 31 81 55<br>
          <a class="footer__link" href="mailto:mail@bolbrogif.dk">
            mail@bolbrogif.dk
          </a>
        </p>
      </section>

      <section class="footer__section">
        <h3 class="footer__heading">Følg med</h3>

        <div class="footer__socials">
          <a class="footer__social-link" href="#" aria-label="Facebook">
            <img class="footer__icon" :src="facebookIcon" alt="Facebook ikon">
          </a>

          <a class="footer__social-link" href="#" aria-label="Instagram">
            <img class="footer__icon" :src="instagramIcon" alt="Instagram ikon">
          </a>
        </div>
      </section>

    </div>
  </footer>
</template>

<style scoped lang="scss">
@use '../assets/_color.scss' as c;
@use '../assets/_font.scss' as f;

.footer {
    background-color: c.$color-lblue;
    color: c.$color-white;
    padding: 70px clamp(1.5rem, 8vw, 110px);
    border-radius: 2rem 2rem 0 0;
    z-index: 2;
    * {
        color: c.$color-white;
    }

    &__content {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    &__section {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    &__heading {
        margin: 0;
        text-transform: uppercase;
    }

    &__text {
        margin: 0;
        line-height: 1.4;
    }

    &__link {
        color: c.$color-white;
        text-decoration: underline;
    }

    &__socials {
        display: flex;
        gap: 1rem;
        align-items: center;
    }

    &__icon {
        width: 2.5rem;
        height: 2.5rem;
        object-fit: contain;
    }
}

/* Tablet */
@media (min-width: 768px) {
  .footer {
    padding: 2.5rem 3rem;

    &__content {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 2.5rem;
    }
  }
}

/* Desktop */
@media (min-width: 1024px) {
    .footer {
        padding: 3rem 5rem;

        &__content {
            grid-template-columns: repeat(4, 1fr);
            align-items: start;
        }
    }
}
</style>