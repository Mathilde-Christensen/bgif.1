<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { logout } from '@/stores/authState'

const router = useRouter()

function handleLogout() {
  logout()
  router.push('/login')
}

const BASE = import.meta.env.VITE_FIREBASE_DATABASE_URL?.replace(/\/$/, '')

const activities = ref([])
const loading = ref(false)
const error = ref('')
const editing = ref(null)

const form = ref({
  title: '',
  subtitle: '',
  date: '',
  start: '',
  end: '',
  location: '',
  task: '',
  description: '',
})

const showConfirm = ref(false)
const deleteTarget = ref(null)

onMounted(loadActivities)

const sortedActivities = computed(() => {
  return [...activities.value].sort((a, b) => {
    return `${a.date} ${a.start || '00:00'}`
      .localeCompare(`${b.date} ${b.start || '00:00'}`)
  })
})

async function loadActivities() {
  if (!BASE) {
    error.value = 'Firebase URL mangler i .env'
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
      ? Object.entries(raw).map(([id, activity]) => ({
          id,
          ...activity,
        }))
      : []
  } catch (err) {
    console.error('[Admin][GET activities] failed:', err)
    error.value = 'Kunne ikke hente aktiviteter.'
  } finally {
    loading.value = false
  }
}

function resetForm() {
  form.value = {
    title: '',
    subtitle: '',
    date: '',
    start: '',
    end: '',
    location: '',
    task: '',
    description: '',
  }

  editing.value = null
}

function makeDayTitle(dateString) {
  if (!dateString) return ''

  const date = new Date(dateString)

  const dayName = date.toLocaleDateString('da-DK', {
    weekday: 'long',
  })

  const day = date.getDate()
  const month = date.getMonth() + 1

  return `${dayName.charAt(0).toUpperCase()}${dayName.slice(1)} ${day}/${month}`
}

async function submitActivity() {
  if (!form.value.title || !form.value.date || !form.value.start) {
    error.value = 'Udfyld titel, dato og starttid.'
    return
  }

  const payload = {
    title: form.value.title,
    subtitle: form.value.subtitle,
    date: form.value.date,
    dayTitle: makeDayTitle(form.value.date),
    start: form.value.start,
    end: form.value.end,
    location: form.value.location,
    task: form.value.task,
    description: form.value.description,
    updatedAt: new Date().toISOString(),
  }

  loading.value = true
  error.value = ''

  try {
    if (editing.value) {
      const res = await fetch(`${BASE}/activities/${editing.value.id}.json`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        throw new Error(`PATCH ${res.status} ${res.statusText}`)
      }

      const index = activities.value.findIndex((activity) => {
        return activity.id === editing.value.id
      })

      if (index !== -1) {
        activities.value[index] = {
          id: editing.value.id,
          ...activities.value[index],
          ...payload,
        }
      }
    } else {
      const res = await fetch(`${BASE}/activities.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...payload,
          createdAt: new Date().toISOString(),
        }),
      })

      if (!res.ok) {
        throw new Error(`POST ${res.status} ${res.statusText}`)
      }

      const data = await res.json()

      activities.value.push({
        id: data.name,
        ...payload,
      })

      await fetch(`${BASE}/booking/${data.name}.json`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(0),
      })
    }

    resetForm()
  } catch (err) {
    console.error('[Admin][SAVE activity] failed:', err)
    error.value = 'Kunne ikke gemme aktiviteten.'
  } finally {
    loading.value = false
  }
}

function editActivity(activity) {
  editing.value = activity

  form.value = {
    title: activity.title || '',
    subtitle: activity.subtitle || '',
    date: activity.date || '',
    start: activity.start || '',
    end: activity.end || '',
    location: activity.location || '',
    task: activity.task || '',
    description: activity.description || '',
  }

  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

function openDeleteDialog(activity) {
  deleteTarget.value = activity
  showConfirm.value = true
}

function closeDeleteDialog() {
  deleteTarget.value = null
  showConfirm.value = false
}

async function deleteActivity() {
  if (!deleteTarget.value) return

  loading.value = true
  error.value = ''

  try {
    const activityId = deleteTarget.value.id

    const res = await fetch(`${BASE}/activities/${activityId}.json`, {
      method: 'DELETE',
    })

    if (!res.ok) {
      throw new Error(`DELETE ${res.status} ${res.statusText}`)
    }

    await fetch(`${BASE}/booking/${activityId}.json`, {
      method: 'DELETE',
    })

    activities.value = activities.value.filter((activity) => {
      return activity.id !== activityId
    })

    closeDeleteDialog()

    if (editing.value?.id === activityId) {
      resetForm()
    }
  } catch (err) {
    console.error('[Admin][DELETE activity] failed:', err)
    error.value = 'Kunne ikke slette aktiviteten.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
    <main class="admin">
        <button
            type="button"
            class="admin__logout"
            @click="handleLogout"
        >
            LOG UD
        </button>
        <section class="admin__panel">
            <h1 class="admin__title">
                {{ editing ? 'Redigér aktivitet' : 'Opret aktivitet' }}
            </h1>

            <form
                class="admin__form"
                @submit.prevent="submitActivity"
            >
                <label class="admin__field">
                Titel *
                <input
                    v-model.trim="form.title"
                    class="admin__input"
                    type="text"
                    placeholder="Fx Koncert"
                >
                </label>

                <label class="admin__field">
                Undertitel
                <input
                    v-model.trim="form.subtitle"
                    class="admin__input"
                    type="text"
                    placeholder="Fx dag 1"
                >
                </label>

                <div class="admin__row">
                <label class="admin__field">
                    Dato *
                    <input
                    v-model="form.date"
                    class="admin__input"
                    type="date"
                    >
                </label>

                <label class="admin__field">
                    Starttid *
                    <input
                    v-model="form.start"
                    class="admin__input"
                    type="time"
                    >
                </label>

                <label class="admin__field">
                    Sluttid
                    <input
                    v-model="form.end"
                    class="admin__input"
                    type="time"
                    >
                </label>
                </div>

                <label class="admin__field">
                Lokation
                <input
                    v-model.trim="form.location"
                    class="admin__input"
                    type="text"
                    placeholder="Fx Bolbro Hallen, Friggasvej 14"
                >
                </label>

                <label class="admin__field">
                Opgave
                <input
                    v-model.trim="form.task"
                    class="admin__input"
                    type="text"
                    placeholder="Fx Bar, oprydning eller festivalhjælp"
                >
                </label>

                <label class="admin__field">
                 Beskrivelse
                    <textarea
                        v-model.trim="form.description"
                        class="admin__textarea"
                        rows="5"
                        placeholder="Beskriv hvad aktiviteten indebærer..."
                    ></textarea>
                </label>

                <div class="admin__actions">
                    <button
                        class="admin__button admin__button--primary"
                        type="submit"
                        :disabled="loading"
                    >
                        {{ loading ? 'Gemmer...' : editing ? 'Gem ændringer' : 'Opret aktivitet' }}
                    </button>

                    <button
                        v-if="editing"
                        class="admin__button admin__button--secondary"
                        type="button"
                        @click="resetForm"
                    >
                        Fortryd
                    </button>
                </div>

                <p
                    v-if="error"
                    class="admin__error"
                    >
                    {{ error }}
                </p>
            </form>
        </section>

            <section class="admin__panel">
            <h2 class="admin__subtitle">
                Aktivitetsoversigt
            </h2>

            <p v-if="loading">
                Henter...
            </p>

            <p v-else-if="!sortedActivities.length">
                Der er ikke oprettet aktiviteter endnu.
            </p>

            <ul
                v-else
                class="admin__list"
            >
                <li
                v-for="activity in sortedActivities"
                :key="activity.id"
                class="admin__item"
                >
                <div class="admin__itemContent">
                    <h3 class="admin__itemTitle">
                    {{ activity.title }}
                    <span v-if="activity.subtitle">
                        {{ activity.subtitle }}
                    </span>
                    </h3>

                    <p class="admin__itemText">
                    {{ activity.dayTitle }} · kl. {{ activity.start }}-{{ activity.end || '—' }}
                    </p>

                    <p
                    v-if="activity.location"
                    class="admin__itemText"
                    >
                    {{ activity.location }}
                    </p>
                </div>

                <div class="admin__itemActions">
                    <button
                    class="admin__button admin__button--secondary"
                    type="button"
                    @click="editActivity(activity)"
                    >
                    Redigér
                    </button>

                    <button
                    class="admin__button admin__button--danger"
                    type="button"
                    @click="openDeleteDialog(activity)"
                    >
                    Slet
                    </button>
                </div>
            </li>
        </ul>
    </section>

    <Teleport to="body">
      <div
        v-if="showConfirm"
        class="admin__modal"
      >
        <div
          class="admin__modalBackdrop"
          @click="closeDeleteDialog"
        ></div>

        <div
          class="admin__modalBox"
          role="dialog"
          aria-modal="true"
        >
          <h2 class="admin__modalTitle">
            Slet aktivitet?
          </h2>

          <p class="admin__modalText">
            Er du sikker på, at du vil slette aktiviteten?
          </p>

          <div class="admin__modalActions">
            <button
              class="admin__button admin__button--secondary"
              type="button"
              @click="closeDeleteDialog"
            >
              Annuller
            </button>

            <button
              class="admin__button admin__button--danger"
              type="button"
              @click="deleteActivity"
            >
              Slet
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </main>
</template>

<style scoped lang="scss">
@use '@/assets/_color.scss' as c;
@use '@/assets/_font.scss' as f;
@use '@/assets/_button.scss' as btn;

.admin {
  display: grid;
  gap: 28px;
  padding: 120px clamp(1.25rem, 6vw, 110px) 80px;
  background-color: c.$color-white;
}

.admin__logout {
  position: fixed;
  top: 42px;
  right: 42px;
  z-index: 3000;

  background: transparent;
  border: none;
  padding: 0;

  color: c.$color-black;
  font-weight: 800;
  text-transform: uppercase;
  text-decoration: underline;

  cursor: pointer;

  transition: opacity 0.2s ease;
}

.admin__logout:hover {
  opacity: 0.7;
}

.admin__panel {
  display: grid;
  gap: 20px;
  padding: 26px;
  border-radius: 24px;
  background-color: #f6f6f6;
}

.admin__title,
.admin__subtitle {
  margin: 0;
  font-family: f.$font-anton;
  text-transform: uppercase;
}

.admin__title {
  font-size: clamp(2rem, 4vw, 3.2rem);
}

.admin__subtitle {
  font-size: clamp(1.5rem, 3vw, 2.2rem);
}

.admin__form {
  display: grid;
  gap: 18px;
}

.admin__field {
  display: grid;
  gap: 8px;
  font-weight: 700;
}

.admin__input,
.admin__textarea {
  width: 100%;
  padding: 13px 14px;
  border: 1px solid #cccccc;
  border-radius: 12px;
  font-family: f.$font-poppines;
  font-size: 1rem;
  box-sizing: border-box;
}

.admin__textarea {
  resize: vertical;
}

.admin__row {
  display: grid;
  gap: 18px;
}

.admin__actions,
.admin__itemActions,
.admin__modalActions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}

.admin__button {
  @include btn.smallButton;
}

.admin__button--primary {
  background-color: c.$color-lblue;
  color: c.$color-white;
}

.admin__button--primary:hover {
  background-color: c.$color-green;
}

.admin__button--secondary {
  background-color: transparent;
  color: c.$color-lblue;
  border: 3px solid c.$color-lblue;
}

.admin__button--secondary:hover {
  background-color: transparent;
  color: c.$color-green;
  border-color: c.$color-green;
}

.admin__button--danger {
  background-color: c.$color-lblue;
  color: c.$color-white;
}

.admin__button--danger:hover {
  background-color: c.$color-green;
}

.admin__button:disabled {
  opacity: 0.6;
  cursor: default;
  transform: none;
}
.admin__error {
  margin: 0;
  color: c.$color-blue;
  font-weight: 700;
}

.admin__list {
  display: grid;
  gap: 14px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.admin__item {
  display: grid;
  gap: 18px;
  padding: 20px;
  border-radius: 18px;
  background-color: c.$color-white;
  border: 1px solid #d8d8d8;
}

.admin__itemContent {
  display: grid;
  gap: 6px;
}

.admin__itemTitle {
  margin: 0;
  font-family: f.$font-anton;
  text-transform: uppercase;
}

.admin__itemTitle span {
  display: block;
}

.admin__itemText {
  margin: 0;
}

.admin__modal {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: grid;
  place-items: center;
}

.admin__modalBackdrop {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
}

.admin__modalBox {
  position: relative;
  width: min(92vw, 560px);
  display: grid;
  gap: 18px;
  padding: 42px;
  border-radius: 24px;
  background-color: c.$color-white;
}

.admin__modalTitle {
  margin: 0;
  font-family: f.$font-anton;
  text-align: center;
  text-transform: uppercase;
}

.admin__modalText {
  margin: 0;
  text-align: center;
}

.admin__modalActions {
  justify-content: center;
}

@media (min-width: 800px) {
  .admin {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr);
    align-items: start;
  }

  .admin__row {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .admin__item {
    grid-template-columns: 1fr auto;
    align-items: center;
  }

  .admin__itemActions {
    justify-content: flex-end;
  }
}
</style>