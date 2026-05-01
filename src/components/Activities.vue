<script setup>
import { ref, computed } from 'vue'
import informationIcon from '@/assets/images/icons/information.webp'
import clockIcon from '@/assets/images/icons/clock.webp'
import locationIcon from '@/assets/images/icons/locationpin.webp'
import calendarIcon from '@/assets/images/icons/calendar.webp'

const selectedActivity = ref(null)

const activities = ref([
  {
    id: 1,
    date: '2026-05-16',
    dayTitle: 'Lørdag 16/5',
    start: '16.00',
    end: '20.00',
    title: 'Koncert',
    location: 'Falen 95 5000 Odense C',
    description: 'Hjælp til opsætning, gæstemodtagelse og oprydning.'
  },
  {
    id: 2,
    date: '2026-06-18',
    dayTitle: 'Torsdag 18/6',
    start: '10.00',
    end: '14.00',
    title: 'Heartland Festival dag 1',
    location: 'Egeskov Slot, Egeskov Gade 22 5772 Kværndrup',
    description: 'Frivilligopgaver på festivalområdet.'
  },
  {
    id: 3,
    date: '2026-06-19',
    dayTitle: 'Fredag 19/6',
    start: '10.00',
    end: '14.00',
    title: 'Heartland Festival dag 2',
    location: 'Egeskov Slot, Egeskov Gade 22 5772 Kværndrup',
    description: 'Frivilligopgaver på festivalområdet.'
  },
  {
    id: 4,
    date: '2026-06-20',
    dayTitle: 'Lørdag 20/6',
    start: '10.00',
    end: '14.00',
    title: 'Heartland Festival dag 3',
    location: 'Egeskov Slot, Egeskov Gade 22 5772 Kværndrup',
    description: 'Frivilligopgaver på festivalområdet.'
  },
  {
    id: 5,
    date: '2026-08-14',
    dayTitle: 'Fredag 14/8',
    start: '18.30',
    end: '21.00',
    title: 'Unity (amerikansk fodbold)',
    location: 'Bolbro Parken, Falen 95 5000 Odense C',
    description: 'Hjælp med afvikling af arrangementet.'
  },
  {
    id: 6,
    date: '2026-09-06',
    dayTitle: 'Søndag 6/9',
    start: '11.00',
    end: '15.00',
    title: 'Loppemarked',
    location: 'Bolbro Hallen, Friggasvej 14 5200 Odense V',
    description: 'Hjælp med boder, gæster og praktiske opgaver.'
  }
])

const visibleCount = ref(6)

const visibleActivities = computed(() =>
  activities.value.slice(0, visibleCount.value)
)

function loadMoreActivities () {
  visibleCount.value += 3
}

function openInfoDialog (activity) {
  selectedActivity.value = activity
}

function closeInfoDialog () {
  selectedActivity.value = null
}

function signUpActivity (activity) {
  console.log('Tilmeldt aktivitet:', activity.title)
}
</script>

<template>
  <section class="activities">
        <div class="activities__inner">
            <h2 class="activities__title">
                Overblik over frivillige aktiviteter
            </h2>

            <div class="activities__list">
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

                            <button
                                type="button"
                                class="activities__signupButton"
                                @click="signUpActivity(activity)"
                                >
                                Tilmeld
                            </button>
                        </div>
                    </div>
                </article>
            </div>

            <button
                v-if="visibleCount < activities.length"
                type="button"
                class="activities__loadMore"
                @click="loadMoreActivities"
            >
                Indlæs mere
            </button>
        </div>

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

                <div class="activities__signedUpBox">
                    <div
                        v-for="person in selectedActivity.signedUp"
                        :key="person.name"
                        class="activities__signedUpPerson"
                    >
                        <div class="activities__personImage"></div>

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

                <button
                type="button"
                class="activities__dialogSignup"
                @click="signUpActivity(selectedActivity)"
                >
                Tilmeld
                </button>
            </div>
        </dialog>
    </section>
</template>

<style lang="scss" scoped>
@use '@/assets/_color.scss' as c;
@use '@/assets/_font.scss' as f;
@use '@/assets/_button.scss' as btn;

.activities {
  padding: 70px clamp(1.5rem, 8vw, 110px);
  background-color: c.$color-white;
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
  color: c.$color-blue;
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
  color: c.$color-blue;
}

.activities__card {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 24px;
  height: 90px;
  padding: 0 32px;
  overflow: hidden;
  background-color: c.$color-white;
  border: 1px solid #cfcfcf;
  border-radius: 18px;
  box-shadow: 10px 12px 16px rgba(0, 0, 0, 0.18);
}

.activities__content {
  display: grid;
  grid-template-columns: minmax(150px, 0.8fr) minmax(210px, 1fr) minmax(260px, 1.3fr);
  align-items: center;
  gap: 32px;
}

.activities__activityTitle {
  margin: 0;
  max-width: 190px;
  font-family: f.$font-anton;
  font-size: 1.15rem;
  line-height: 1.2;
  text-transform: uppercase;
  color: c.$color-blue;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.activities__metaItem {
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 0;
}

.activities__metaIcon {
  width: 28px;
  height: 28px;
  object-fit: contain;
  flex-shrink: 0;
}

.activities__time,
.activities__location {
  margin: 0;
  font-family: f.$font-anton;
  font-size: 1rem;
  line-height: 1.2;
  text-transform: uppercase;
  color: c.$color-blue;
  white-space: nowrap;
}

.activities__actions {
  display: flex;
  align-items: center;
  gap: 28px;
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

.activities__dialog {
  width: min(90%, 900px);
  padding: 0;
  border: none;
  border-radius: 45px;
  background-color: c.$color-white;
  box-shadow: 0 16px 35px rgba(0, 0, 0, 0.3);
}

.activities__dialog::backdrop {
  background-color: rgba(0, 0, 0, 0.85);
}

.activities__dialogContent {
  position: relative;
  display: grid;
  gap: 24px;
  padding: 52px 72px;
  background-color: c.$color-white;
  border-radius: 45px;
}

.activities__dialogClose {
  position: absolute;
  top: 34px;
  right: 56px;
  border: none;
  background: transparent;
  font-family: f.$font-anton;
  font-size: 3rem;
  color: c.$color-blue;
  cursor: pointer;
}

.activities__dialogTitle {
  margin: 0;
  font-family: f.$font-anton;
  font-size: 3rem;
  text-transform: uppercase;
  color: c.$color-blue;
}

.activities__dialogInfoList {
  display: grid;
  gap: 14px;
}

.activities__dialogInfoItem {
  display: flex;
  align-items: center;
  gap: 22px;
}

.activities__dialogIcon {
  width: 40px;
  height: 40px;
  object-fit: contain;
}

.activities__dialogMeta {
  margin: 0;
  font-family: f.$font-anton;
  font-size: 1.4rem;
  line-height: 1.2;
  text-transform: uppercase;
  color: c.$color-blue;
}

.activities__dialogDescription {
  margin: 12px 0 0;
  font-family: f.$font-poppines;
  font-size: 1rem;
  line-height: 2;
  color: c.$color-blue;
}

.activities__signedUpBox {
  display: grid;
  gap: 20px;
  max-height: 260px;
  overflow-y: auto;
  padding: 28px 40px;
  border: 1px solid #dddddd;
  border-radius: 22px;
}

.activities__signedUpPerson {
  display: flex;
  align-items: center;
  gap: 24px;
}

.activities__personImage {
  width: 64px;
  height: 64px;
  flex-shrink: 0;
  border-radius: 50%;
  background-color: #d9d9d9;
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
  @include btn.smallButton;
  justify-self: center;
  min-width: 320px;
}

@media (max-width: 900px) {
  .activities__card {
    grid-template-columns: 1fr;
    height: auto;
    min-height: 120px;
    padding: 20px;
  }

  .activities__content {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .activities__activityTitle {
    max-width: none;
  }

  .activities__actions {
    justify-content: space-between;
  }
  .activities__dialogContent {
  padding: 40px 28px;
}

.activities__dialogClose {
  top: 22px;
  right: 28px;
  font-size: 2.4rem;
}

.activities__dialogTitle {
  font-size: 2.2rem;
}

.activities__dialogMeta {
  font-size: 1.1rem;
}

.activities__dialogSignup {
  min-width: 220px;
}
}
</style>