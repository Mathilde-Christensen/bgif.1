<script setup>
import { ref, onMounted } from 'vue'

const BASE = import.meta.env.VITE_FIREBASE_DATABASE_URL?.replace(/\/$/, '')

const props = defineProps({
  id: { type: String, required: true },
})

const status = ref(0)
const loading = ref(false)
const error = ref('')

const showConfirm = ref(false)
const pendingAction = ref(null)

const showContactForm = ref(false)
const message = ref('')
const messageError = ref('')
const messageSuccess = ref('')

const PATH = `${BASE}/booking/${encodeURIComponent(props.id)}.json`

onMounted(load)

async function load() {
  loading.value = true
  error.value = ''

  try {
    const res = await fetch(PATH)

    if (!res.ok) {
      throw new Error(`GET ${res.status} ${res.statusText}`)
    }

    const data = await res.json()

    status.value = (data === 0 || data === 1)
      ? data
      : 0

  } catch (e) {
    console.error('[BookButton][GET] failed:', e)
    error.value = 'Kunne ikke hente status.'
  } finally {
    loading.value = false
  }
}

function openConfirm() {
  pendingAction.value = status.value === 1
    ? 'leave'
    : 'join'

  showConfirm.value = true
}

function closeConfirm() {
  showConfirm.value = false
  pendingAction.value = null
}

async function confirmAction() {
  if (!pendingAction.value) return

  await toggleOnServer()
  closeConfirm()
}

function openContactForm() {
  showConfirm.value = false
  showContactForm.value = true
}

function closeContactForm() {
  showContactForm.value = false
  message.value = ''
  messageError.value = ''
  messageSuccess.value = ''
}

async function sendMessage() {

  if (!message.value.trim()) {
    messageError.value = 'Skriv en besked først.'
    return
  }

  loading.value = true
  messageError.value = ''
  messageSuccess.value = ''

  try {

    const messageRes = await fetch(`${BASE}/messages.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        activityId: props.id,
        message: message.value,
        createdAt: new Date().toISOString(),
      }),
    })

    if (!messageRes.ok) {
      throw new Error(`POST ${messageRes.status} ${messageRes.statusText}`)
    }

    const bookingRes = await fetch(PATH, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(0),
    })

    if (!bookingRes.ok) {
      throw new Error(`PUT ${bookingRes.status} ${bookingRes.statusText}`)
    }

    status.value = 0
    messageSuccess.value = 'Beskeden blev sendt.'

    setTimeout(() => {
      closeContactForm()
    }, 1200)

  } catch (e) {
    console.error('[BookButton][MESSAGE] failed:', e)
    messageError.value = 'Beskeden kunne ikke sendes.'
  } finally {
    loading.value = false
  }
}

async function toggleOnServer() {

  loading.value = true
  error.value = ''

  try {

    const next = status.value === 1
      ? 0
      : 1

    const res = await fetch(PATH, {
      method: 'PUT',

      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(next),
    })

    if (!res.ok) {
      throw new Error(`PUT ${res.status} ${res.statusText}`)
    }

    status.value = next

  } catch (e) {
    console.error('[BookButton][PUT] failed:', e)
    error.value = 'Kunne ikke gemme status.'
  } finally {
    loading.value = false
  }
}
</script>

<template>

  <button
    @click="openConfirm"
    :disabled="loading"
    :class="{ active: status === 1 }"
  >
    {{ status === 1 ? 'TILMELDT' : 'TILMELD' }}
  </button>

  <!-- Bekræft modal -->

  <div
    v-if="showConfirm"
    class="modal-backdrop"
  >

    <div
      class="modal"
      role="dialog"
      aria-modal="true"
    >

      <h2 class="modal__title">
        Bekræft din
        {{ pendingAction === 'join' ? 'tilmelding' : 'afmelding' }}
      </h2>

      <p
        v-if="pendingAction === 'join'"
        class="modal__text"
      >
        Skulle du blive forhindret, så husk at afmelde dig hos den ansvarlige for eventet.
      </p>

      <p
        v-else
        class="modal__text"
      >
        Vil du melde fra? Kontakt den ansvarlige for aktiviteten.
      </p>

      <div class="modal__actions">

        <button
          class="btn btn--outline"
          @click="closeConfirm"
          :disabled="loading"
        >
          ANNULLER
        </button>

        <button
          class="btn btn--solid"
          @click="pendingAction === 'join'
            ? confirmAction()
            : openContactForm()"
          :disabled="loading"
        >
          {{ pendingAction === 'join' ? 'TILMELD' : 'KONTAKT' }}
        </button>

      </div>
    </div>
  </div>

  <!-- Kontakt modal -->

  <div
    v-if="showContactForm"
    class="modal-backdrop"
  >

    <div
      class="modal modal--contact"
      role="dialog"
      aria-modal="true"
    >

      <h2 class="modal__title">
        Kontakt ansvarlig
      </h2>

      <p class="modal__text">
        Skriv en besked til den ansvarlige for aktiviteten.
      </p>

      <textarea
        v-model="message"
        class="modal__textarea"
        placeholder="Skriv din besked her..."
      ></textarea>

      <div class="modal__actions">

        <button
          class="btn btn--outline"
          @click="closeContactForm"
          :disabled="loading"
        >
          ANNULLER
        </button>

        <button
          class="btn btn--solid"
          @click="sendMessage"
          :disabled="loading"
        >
          {{ loading ? 'SENDER...' : 'SEND' }}
        </button>

      </div>

      <p
        v-if="messageSuccess"
        class="success"
      >
        {{ messageSuccess }}
      </p>

      <p
        v-if="messageError"
        class="error"
      >
        {{ messageError }}
      </p>

    </div>
  </div>

  <p
    v-if="error"
    class="error"
  >
    {{ error }}
  </p>

</template>

<style lang="scss" scoped>

@use '@/assets/_color.scss' as c;
@use '@/assets/_font.scss' as f;
@use '@/assets/_button.scss' as btn;

button {
  @include btn.button(btn.$button-small);

  border: 0;
  cursor: pointer;
}

button.active {
  background: c.$color-blue;
}

button:disabled {
  opacity: 0.6;
  cursor: default;
  transform: none;
}

.modal-backdrop {
  position: fixed;
  inset: 0;

  background: rgba(0, 0, 0, .35);

  display: grid;
  place-items: center;

  z-index: 999;
}

.modal {
  width: min(640px, 92vw);

  min-height: 300px;

  background: c.$color-white;

  border-radius: 14px;

  z-index: 1000;

  box-shadow:
    0 20px 40px rgba(0,0,0,.25),
    0 2px 6px rgba(0,0,0,.15);

  padding: 50px;

  display: flex;
  flex-direction: column;
  justify-content: center;
}

.modal--contact {
  gap: 16px;
}

.modal__title {
  font-weight: 600;

  font-size: clamp(24px, 3.2vw, 40px);

  line-height: 1.1;

  margin: 0 0 12px;

  text-align: center;

  color: c.$color-blue;
}

.modal__text {
  font-size: 16px;

  line-height: 1.6;

  margin: 0 0 20px;

  text-align: center;

  color: c.$color-blue;
}

.modal__textarea {
  width: 100%;

  min-height: 120px;

  resize: none;

  border: 2px solid c.$color-lblue;

  border-radius: 14px;

  padding: 16px;

  font-family: f.$font-poppines;
  font-size: 1rem;

  color: c.$color-blue;
}

.modal__textarea:focus {
  outline: none;
  border-color: c.$cta;
}

.modal__actions {
  display: flex;

  gap: 20px;

  justify-content: center;

  margin-top: 8px;
}

.btn {
  @include btn.button(btn.$button-small);

  font-weight: 900;
}

.btn--outline {
  background: transparent;

  color: c.$color-lblue;

  border: 3px solid c.$color-lblue;
}

.btn--outline:hover {
  color: c.$cta;

  border-color: c.$cta;

  background-color: transparent;
}

.error {
  margin-top: 10px;

  color: c.$color-lblue;

  text-align: center;
}

.success {
  margin-top: 10px;

  color: c.$color-blue;

  text-align: center;
}

</style>