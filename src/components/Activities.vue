<script setup>
import { ref, computed, onMounted } from 'vue'

import informationIcon from '@/assets/images/icons/information.webp'
import clockIcon from '@/assets/images/icons/clock.webp'
import locationIcon from '@/assets/images/icons/locationpin.webp'
import calendarIcon from '@/assets/images/icons/calendar.webp'

import boyImage from '@/assets/images/members/boy.webp'
import girlImage from '@/assets/images/members/girl.webp'
import dadImage from '@/assets/images/members/dad.webp'
import previousMemberImage from '@/assets/images/members/previousmember.webp'

import BookBtn from '@/components/BookBtn.vue'

const DB_URL = import.meta.env.VITE_FIREBASE_DATABASE_URL?.replace(/\/$/, '')

const selectedActivity = ref(null)

const props = defineProps({
  title: {
    type: String,
    default: 'Overblik over frivillige aktiviteter',
  },

  buttonText: {
    type: String,
    default: 'Tilmeld',
  },

  isJoined: {
    type: Boolean,
    default: false,
  },
})

const signedUpPeople = [
  {
    name: 'Mads Nielsen',
    team: 'Badminton senior',
    image: boyImage,
  },
  {
    name: 'Sofie Hansen',
    team: 'Håndbold damesenior',
    image: girlImage,
  },
  {
    name: 'Emil Larsen',
    team: 'Familie til medlem',
    image: dadImage,
  },
  {
    name: 'Freja Andersen',
    team: 'Tidligere medlem',
    image: previousMemberImage,
  },
]

const activities = ref([])
const visibleCount = ref(6)
const loading = ref(false)
const error = ref('')

onMounted(loadActivities)

async function loadActivities() {
  if (!DB_URL) {
    error.value = 'Firebase database-url mangler.'
    return
  }

  loading.value = true
  error.value = ''

  try {
    const res = await fetch(`${DB_URL}/activities.json`)

    if (!res.ok) {
      throw new Error('HTTP-fejl ved hentning af aktiviteter')
    }

    const rawActivities = (await res.json()) || {}

    activities.value = Object.entries(rawActivities)
      .map(([id, activity]) => {
        if (!activity) return null

        return {
          id,
          ...activity,
          signedUp: activity.signedUp || signedUpPeople,
        }
      })
      .filter(Boolean)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
  } catch (e) {
    console.error(e)
    error.value = 'Kunne ikke hente aktiviteter.'
  } finally {
    loading.value = false
  }
}

const visibleActivities = computed(() =>
  activities.value.slice(0, visibleCount.value)
)

function loadMoreActivities() {
  visibleCount.value += 3
}

function openInfoDialog(activity) {
  selectedActivity.value = activity
}

function closeInfoDialog() {
  selectedActivity.value = null
}
</script>

<template>
  <section class="activities">
    <div class="activities__inner">
      <h2 class="activities__title">
        {{ title }}
      </h2>

      <p
        v-if="loading"
        class="activities__message"
      >
        Indlæser aktiviteter...
      </p>

      <p
        v-if="error"
        class="activities__message activities__message--error"
      >
        {{ error }}
      </p>

      <div
        v-if="!loading && !error"
        class="activities__list"
      >
        <article
          v-for="activity in visibleActivities"
          :key="activity.id"
          class="activities__group"
        >
          <h3 class="activities__date">
            {{ activity.dayTitle }}
          </h3>

          <div class="activities__card">
            <div class="activities__content">
              <h4 class="activities__activityTitle">
                {{ activity.title }}
              </h4>

              <div class="activities__metaItem">
                <img
                  class="activities__metaIcon"
                  :src="clockIcon"
                  alt=""
                >

                <p class="activities__time">
                  Kl. {{ activity.start }} {{ activity.date.split('-').reverse().join('/') }}
                </p>
              </div>

              <div class="activities__metaItem">
                <img
                  class="activities__metaIcon"
                  :src="locationIcon"
                  alt=""
                >

                <p class="activities__location">
                  {{ activity.location }}
                </p>
              </div>

              <button
                type="button"
                class="activities__metaItem activities__infoButton"
                aria-label="Læs mere om aktiviteten"
                @click="openInfoDialog(activity)"
              >
                <img
                  class="activities__metaIcon activities__infoIcon"
                  :src="informationIcon"
                  alt=""
                >

                <span class="activities__infoText">
                  Læs mere
                </span>
              </button>
            </div>

            <div class="activities__actions">
              <BookBtn
                :id="String(activity.id)"
                :button-text="buttonText"
                :is-joined="isJoined"
              />
            </div>
          </div>
        </article>

        <button
          v-if="visibleCount < activities.length"
          type="button"
          class="activities__loadMore"
          @click="loadMoreActivities"
        >
          Indlæs mere
        </button>
      </div>
    </div>

    <Teleport to="body">
      <dialog
        v-if="selectedActivity"
        open
        class="activities__dialog"
      >
        <div class="activities__dialogContent">
          <button
            type="button"
            class="activities__dialogClose"
            aria-label="Luk informationsboksen"
            @click="closeInfoDialog"
          >
            X
          </button>

          <h3 class="activities__dialogTitle">
            {{ selectedActivity.title }}
          </h3>

          <div class="activities__dialogInfoList">
            <div class="activities__dialogInfoItem">
              <img
                class="activities__dialogIcon"
                :src="locationIcon"
                alt=""
              >

              <p class="activities__dialogMeta">
                {{ selectedActivity.location }}
              </p>
            </div>

            <div class="activities__dialogInfoItem">
              <img
                class="activities__dialogIcon"
                :src="clockIcon"
                alt=""
              >

              <p class="activities__dialogMeta">
                Kl. {{ selectedActivity.start }}
              </p>
            </div>

            <div class="activities__dialogInfoItem">
              <img
                class="activities__dialogIcon"
                :src="calendarIcon"
                alt=""
              >

              <p class="activities__dialogMeta">
                Dato {{ selectedActivity.date.split('-').reverse().join('.') }}
              </p>
            </div>

            <div class="activities__dialogInfoItem">
              <img
                class="activities__dialogIcon"
                :src="informationIcon"
                alt=""
              >

              <p class="activities__dialogMeta">
                {{ selectedActivity.task }}
              </p>
            </div>
          </div>

          <p class="activities__dialogDescription">
            {{ selectedActivity.description }}
          </p>

          <h4 class="activities__signedUpTitle">
            Tilmeldte
          </h4>

          <div class="activities__signedUpBox">
            <div
              v-for="person in selectedActivity.signedUp"
              :key="person.name"
              class="activities__signedUpPerson"
            >
              <img
                class="activities__personImage"
                :src="person.image"
                :alt="person.name"
              >

              <div>
                <p class="activities__personName">
                  {{ person.name }}
                </p>

                <p class="activities__personTeam">
                  {{ person.team }}
                </p>
              </div>
            </div>
          </div>

          <div class="activities__dialogButtonWrapper">
            <BookBtn :id="String(selectedActivity.id)" />
          </div>
        </div>
      </dialog>
    </Teleport>
  </section>
</template>

<style lang="scss" scoped>
@use '@/assets/_color.scss' as c;
@use '@/assets/_font.scss' as f;
@use '@/assets/_button.scss' as btn;

.activities {
  padding: 50px 1.5rem;
}

.activities__inner {
  display: grid;
  gap: 28px;
}

.activities__title {
  margin: 0 0 10px;
  font-family: f.$font-anton;
  font-size: clamp(2rem, 8vw, 3.4rem);
  text-transform: uppercase;
  color: c.$color-blue;
}

.activities__list {
  display: grid;
  gap: 28px;
}

.activities__group {
  display: grid;
  gap: 14px;
}

.activities__date {
  margin: 0;
  font-family: f.$font-anton;
  font-size: 1.5rem;
  text-transform: uppercase;
  color: c.$color-blue;
}

.activities__card {
  display: grid;
  gap: 28px;
  padding: 28px 24px;
  background-color: c.$color-white;
  border: 1px solid #cfcfcf;
  border-radius: 22px;
  box-shadow: 10px 12px 16px rgba(0, 0, 0, 0.18);
}

.activities__content {
  display: grid;
  gap: 22px;
}

.activities__activityTitle {
  margin: 0;
  font-family: f.$font-anton;
  font-size: 1.5rem;
  line-height: 1.15;
  text-transform: uppercase;
  color: c.$color-blue;
}

.activities__metaItem {
  display: grid;
  grid-template-columns: 36px 1fr;
  align-items: center;
  gap: 16px;
}

.activities__metaIcon {
  width: 30px;
  height: 30px;
  object-fit: contain;
}

.activities__time,
.activities__location {
  margin: 0;
  font-family: f.$font-anton;
  font-size: 1rem;
  line-height: 1.3;
  text-transform: uppercase;
  color: c.$color-blue;
  white-space: normal;
}

.activities__actions {
  display: grid;
  justify-items: center;
  gap: 20px;
}

.activities__infoButton {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
}

.activities__infoIcon {
  width: 30px;
  height: 30px;
  object-fit: contain;
  transition: transform 0.2s ease;
  transform-origin: center;
}

.activities__infoButton:hover .activities__infoIcon {
  transform: scale(1.3);
}

.activities__signupButton {
  @include btn.smallButton;
}

.activities__loadMore {
  justify-self: center;
  margin-top: 30px;
  border: none;
  background: transparent;
  font-family: f.$font-anton;
  font-size: 1.2rem;
  text-decoration: underline;
  color: c.$color-blue;
  cursor: pointer;
}

/* Modal */
.activities__dialog {
  position: fixed;
  inset: 50% auto auto 50%;
  transform: translate(-50%, -50%);
  width: min(92%, 760px);
  max-height: 90vh;
  padding: 0;
  border: none;
  border-radius: 35px;
  background-color: c.$color-white;
  box-shadow: 0 16px 35px rgba(0, 0, 0, 0.3);
  z-index: 1001;
  overflow: hidden;
}

.activities__dialogContent {
  position: relative;
  display: grid;
  gap: 16px;
  padding: 40px 28px;
  background-color: c.$color-white;
  border-radius: 35px;
}

.activities__dialogTitle {
  margin: 0;
  padding-right: 42px;
  font-family: f.$font-anton;
  font-size: 2rem;
  text-transform: uppercase;
  color: c.$color-blue;
}

.activities__dialogClose {
  position: absolute;
  top: 22px;
  right: 28px;
  border: none;
  background: transparent;
  font-family: f.$font-anton;
  font-size: 1.7rem;
  color: c.$color-blue;
  cursor: pointer;
  z-index: 1001;
}

.activities__dialogInfoList {
  display: grid;
  gap: 12px;
}

.activities__dialogInfoItem {
  display: grid;
  grid-template-columns: 34px 1fr;
  align-items: center;
  gap: 14px;
}

.activities__dialogIcon {
  width: 30px;
  height: 30px;
  object-fit: contain;
}

.activities__dialogMeta {
  margin: 0;
  font-family: f.$font-anton;
  font-size: 1rem;
  line-height: 1.25;
  text-transform: uppercase;
  color: c.$color-blue;
}

.activities__dialogDescription {
  margin: 10px 0 0;
  font-family: f.$font-poppines;
  font-size: 0.95rem;
  line-height: 1.55;
  text-transform: none;
  color: c.$color-blue;
}

.activities__dialogButtonWrapper {
  display: flex;
  justify-content: center;
}

.activities__signedUpTitle {
  margin: 4px 0 -4px;
  font-family: f.$font-anton;
  font-size: 1rem;
  line-height: 1.25;
  text-transform: uppercase;
  color: c.$color-blue;
}

.activities__signedUpBox {
  display: grid;
  gap: 18px;
  height: 200px;
  overflow-y: scroll;
  padding: 22px 24px;
  border: 1px solid #dddddd;
  border-radius: 22px;
  scrollbar-width: auto;
  scrollbar-color: c.$color-blue #eeeeee;
}

.activities__signedUpBox::-webkit-scrollbar {
  width: 12px;
}

.activities__signedUpBox::-webkit-scrollbar-track {
  background: #eeeeee;
  border-radius: 20px;
}

.activities__signedUpBox::-webkit-scrollbar-thumb {
  background-color: c.$color-blue;
  border-radius: 20px;
  border: 3px solid #eeeeee;
}

.activities__signedUpPerson {
  display: flex;
  align-items: center;
  gap: 18px;
}

.activities__personImage {
  width: 64px;
  height: 64px;
  flex-shrink: 0;
  border-radius: 50%;
  object-fit: cover;
}

.activities__personName {
  margin: 0;
  font-family: f.$font-poppines;
  font-size: 1rem;
  font-weight: 700;
  color: c.$color-blue;
}

.activities__personTeam {
  margin: 0;
  font-family: f.$font-poppines;
  font-size: 1rem;
  line-height: 1.4;
  color: c.$color-blue;
}

.activities__dialogSignup {
  @include btn.bigButton;
  justify-self: center;
  min-width: 220px;
}

/* Tablet */
@media (min-width: 768px) {
  .activities {
    padding: 60px clamp(2rem, 6vw, 80px);
  }

  .activities__card {
    padding: 32px;
  }

  .activities__content {
    grid-template-columns: 1fr 1fr;
    align-items: center;
  }

  .activities__activityTitle {
    grid-column: 1 / -1;
  }

  .activities__actions {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 28px;
  }

  .activities__dialog {
    width: min(86%, 760px);
    border-radius: 45px;
  }

  .activities__dialogContent {
    padding: 36px 56px 34px;
    border-radius: 45px;
  }

  .activities__dialogTitle {
    font-size: 2.2rem;
  }

  .activities__dialogClose {
    right: 48px;
  }

  .activities__signedUpBox {
    padding: 22px 40px;
  }

  .activities__signedUpPerson {
    gap: 24px;
  }

  .activities__dialogSignup {
    min-width: 320px;
  }
}

/* Desktop */
@media (min-width: 1100px) {
  .activities {
    padding: 70px clamp(1.5rem, 8vw, 110px);
  }

  .activities__card {
    grid-template-columns: 1fr auto;
    align-items: center;
    min-height: 95px;
    padding: 24px 34px;
  }

  .activities__content {
    grid-template-columns:
      minmax(150px, 0.8fr)
      minmax(210px, 1fr)
      minmax(260px, 1.3fr);
    gap: 32px;
  }

  .activities__activityTitle {
    grid-column: auto;
    max-width: 190px;
    font-size: 1.15rem;
  }

  .activities__actions {
    display: flex;
    gap: 28px;
  }

  .activities__time,
  .activities__location {
    white-space: nowrap;
  }
}
</style>