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

const BASE = import.meta.env.VITE_FIREBASE_DATABASE_URL?.replace(/\/$/, '')

const props = defineProps({
  title: {
    type: String,
    default: 'Overblik over frivillige aktiviteter',
  },
  onlyJoined: {
    type: Boolean,
    default: false,
  },
})

const selectedActivity = ref(null)
const activities = ref([])
const bookings = ref({})
const visibleCount = ref(6)
const loading = ref(false)
const error = ref('')

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

const joinedActivities = computed(() => {
  return activities.value.filter((activity) => {
    return bookings.value[String(activity.id)] === 1
  })
})

const visibleActivities = computed(() => {
  const list = props.onlyJoined
    ? joinedActivities.value
    : activities.value

  return list.slice(0, visibleCount.value)
})

const hasVisibleActivities = computed(() => {
  return visibleActivities.value.length > 0
})

const canLoadMore = computed(() => {
  if (props.onlyJoined) {
    return joinedActivities.value.length > visibleCount.value
  }

  return activities.value.length > visibleCount.value
})

onMounted(() => {
  loadActivities()
  loadBookings()
})

async function loadActivities() {
  if (!BASE) {
    error.value = 'Firebase URL mangler.'
    return
  }

  loading.value = true
  error.value = ''

  try {
    const res = await fetch(`${BASE}/activities.json`)

    if (!res.ok) {
      throw new Error(`GET ${res.status} ${res.statusText}`)
    }

    const raw = await res.json()

    activities.value = raw
      ? Object.entries(raw)
          .map(([id, activity]) => ({
            id,
            signedUp: signedUpPeople,
            ...activity,
          }))
          .sort((a, b) => {
            return `${a.date} ${a.start || '00:00'}`.localeCompare(
              `${b.date} ${b.start || '00:00'}`
            )
          })
      : []
  } catch (err) {
    console.error('[Activities][GET activities] failed:', err)
    error.value = 'Kunne ikke hente aktiviteter.'
  } finally {
    loading.value = false
  }
}

async function loadBookings() {
  if (!BASE) return

  try {
    const res = await fetch(`${BASE}/booking.json`)

    if (!res.ok) {
      throw new Error(`GET ${res.status} ${res.statusText}`)
    }

    const data = await res.json()

    bookings.value = data || {}
  } catch (err) {
    console.error('[Activities][GET booking] failed:', err)
  }
}

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
        v-if="props.onlyJoined && !hasVisibleActivities"
        class="activities__emptyText"
      >
        Du er ikke tilmeldt nogle aktiviteter endnu.
      </p>

      <div
        v-else
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

                <span
                  v-if="activity.subtitle"
                  class="activities__activitySubtitle"
                >
                  {{ activity.subtitle }}
                </span>
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
            </div>

            <div class="activities__actions">
              <button
                type="button"
                class="activities__infoButton"
                aria-label="Læs mere om aktiviteten"
                @click="openInfoDialog(activity)"
              >
                <img
                  class="activities__infoIcon"
                  :src="informationIcon"
                  alt=""
                >
              </button>

              <BookBtn :id="String(activity.id)" />
            </div>
          </div>
        </article>

        <button
          v-if="canLoadMore"
          type="button"
          class="activities__loadMore"
          @click="loadMoreActivities"
        >
          Vis flere
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

        <div class="activities__dialogActions">
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
  padding: 50px clamp(1.25rem, 6vw, 110px);
}

.activities__inner {
  display: grid;
  gap: 28px;
}

.activities__title {
  margin: 0 0 10px;
  font-family: f.$font-anton;
  font-size: clamp(2rem, 4vw, 3.4rem);
  text-transform: uppercase;
}

.activities__emptyText {
  margin: 0;
}

.activities__list {
  display: grid;
  gap: 26px;
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
}

/* Mobile first kort */
.activities__card {
  display: grid;
  gap: 24px;
  padding: 24px 20px;
  background-color: c.$color-white;
  border: 1px solid #cfcfcf;
  border-radius: 18px;
  box-shadow: 10px 12px 16px rgba(0, 0, 0, 0.18);
}

.activities__content {
  display: grid;
  gap: 18px;
}

.activities__activityTitle {
  margin: 0;
  font-family: f.$font-anton;
  font-size: 1.25rem;
  line-height: 1.2;
  text-transform: uppercase;
}

.activities__activitySubtitle {
  display: block;
}

.activities__metaItem {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  min-width: 0;
}

.activities__metaIcon {
  width: 28px;
  height: 28px;
  object-fit: contain;
  flex-shrink: 0;
  transform: scale(1.2);
}

.activities__time,
.activities__location {
  margin: 0;
  overflow-wrap: anywhere;
}

.activities__actions {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 28px;
  margin-top: auto;
}

.activities__infoButton {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
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

.activities__loadMore {
  justify-self: center;
  margin-top: 30px;
  border: none;
  background: transparent;
  font-family: f.$font-anton;
  font-size: 1.2rem;
  text-decoration: underline;
  cursor: pointer;
}

/* Dialog mobile first */
.activities__dialog {
  position: fixed;
  inset: 50% auto auto 50%;
  transform: translate(-50%, -50%);
  width: min(92vw, 760px);
  max-height: 88dvh;
  padding: 0;
  border: none;
  border-radius: 28px;
  background-color: c.$color-white;
  box-shadow: 0 16px 35px rgba(0, 0, 0, 0.3);
  z-index: 1001;
  overflow: hidden;
}

.activities__dialog::backdrop {
  background-color: rgba(0, 0, 0, 0.45);
}

.activities__dialogContent {
  position: relative;
  display: grid;
  gap: 16px;
  max-height: 88dvh;
  padding: 34px 22px 28px;
  overflow-y: auto;
  background-color: c.$color-white;
}

.activities__dialogTitle {
  margin: 0;
  padding-right: 42px;
  font-family: f.$font-anton;
  font-size: clamp(1.7rem, 7vw, 2.4rem);
  line-height: 1.1;
  text-transform: uppercase;
}

.activities__dialogClose {
  position: absolute;
  top: 22px;
  right: 24px;
  border: none;
  background: transparent;
  font-family: f.$font-anton;
  font-size: 1.6rem;
  cursor: pointer;
  z-index: 2;
}

.activities__dialogInfoList {
  display: grid;
  gap: 12px;
}

.activities__dialogInfoItem {
  display: grid;
  grid-template-columns: 32px 1fr;
  align-items: start;
  gap: 12px;
}

.activities__dialogIcon {
  width: 28px;
  height: 28px;
  object-fit: contain;
}

.activities__dialogMeta {
  margin: 0;
  font-family: f.$font-anton;
  font-size: 0.95rem;
  line-height: 1.3;
  text-transform: uppercase;
  overflow-wrap: anywhere;
}

.activities__dialogDescription {
  margin: 8px 0 0;
  font-family: f.$font-poppines;
  font-size: 0.95rem;
  line-height: 1.55;
  text-transform: none;
}

.activities__signedUpTitle {
  margin: 4px 0 -4px;
  font-family: f.$font-anton;
  font-size: 1rem;
  line-height: 1.25;
  text-transform: uppercase;
}

.activities__signedUpBox {
  display: grid;
  gap: 18px;
  max-height: 180px;
  overflow-y: auto;
  padding: 18px;
  border: 1px solid #dddddd;
  border-radius: 22px;
  scrollbar-width: auto;
  scrollbar-color: c.$color-black #eeeeee;
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
  width: 56px;
  height: 56px;
  flex-shrink: 0;
  border-radius: 50%;
  object-fit: cover;
}

.activities__personName {
  margin: 0;
  font-family: f.$font-poppines;
  font-size: 1rem;
  font-weight: 700;
}

.activities__personTeam {
  margin: 0;
  font-family: f.$font-poppines;
  font-size: 0.95rem;
  line-height: 1.4;
}

.activities__dialogActions {
  display: flex;
  justify-content: center;
  padding-top: 4px;
}

/* Tablet */
@media (min-width: 700px) {
  .activities {
    padding-top: 70px;
  }

  .activities__card {
    padding: 28px 32px;
  }

  .activities__content {
    gap: 20px;
  }

  .activities__actions {
    justify-content: center;
  }

  .activities__dialog {
    width: min(88vw, 720px);
    border-radius: 38px;
  }

  .activities__dialogContent {
    padding: 42px 42px 34px;
  }

  .activities__signedUpBox {
    max-height: 200px;
    padding: 22px 34px;
  }

  .activities__personImage {
    width: 64px;
    height: 64px;
  }
}

/* Desktop */
@media (min-width: 1050px) {
  .activities__card {
    grid-template-columns: 1fr auto;
    align-items: center;
    gap: 32px;
    padding: 22px 32px;
  }

  .activities__content {
    grid-template-columns:
      minmax(150px, 0.8fr)
      minmax(210px, 1fr)
      minmax(260px, 1.3fr);
    align-items: center;
    gap: 32px;
  }

  .activities__activityTitle {
    max-width: 190px;

    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .activities__time {
    white-space: nowrap;
  }

  .activities__location {
    max-width: 420px;
  }

  .activities__actions {
    justify-content: flex-end;
  }

  .activities__dialog {
    width: min(86vw, 760px);
    border-radius: 45px;
  }

  .activities__dialogContent {
    padding: 36px 56px 34px;
  }

  .activities__dialogClose {
    right: 48px;
  }
}
</style>