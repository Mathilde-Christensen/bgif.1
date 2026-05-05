<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const openIndex = ref(null)
const faqRef = ref(null)

const toggleFaq = (index) => {
  openIndex.value = openIndex.value === index ? null : index
}

const closeOnOutsideClick = (event) => {
  if (faqRef.value && !faqRef.value.contains(event.target)) {
    openIndex.value = null
  }
}

onMounted(() => {
  document.addEventListener('click', closeOnOutsideClick)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', closeOnOutsideClick)
})

const faqs = [
  {
    question: 'Hvordan kommer jeg igang?',
    answer:
      'Du kan nemt komme i gang ved at gå til frivillighedskalenderen og se aktuelle aktiviteter. Her kan du læse om opgaverne og tilmelde dig direkte. Du behøver ikke have erfaring – det vigtigste er, at du har lyst til at være med. Har du spørgsmål, kan du altid finde kontaktpersonen på aktiviteten.'
  },
  {
    question: 'Hvor meget tid skal jeg bruge som frivillig?',
    answer:
      'Du bestemmer selv, hvor meget tid du vil lægge. Mange aktiviteter er enkeltstående eller fleksible, så du kan vælge det, der passer ind i din hverdag. Du kan både tage enkelte vagter eller engagere dig mere fast – alt efter hvad du har tid og lyst til.'
  },
  {
    question: 'Hvordan får jeg overblik over aktiviteter og mine tilmeldinger?',
    answer:
      'På din profil kan du se et samlet overblik over alle de aktiviteter, du er tilmeldt. I kalenderen kan du samtidig se kommende events og filtrere dem efter interesse. På den måde har du altid ét sted, hvor du kan holde styr på det hele.'
  },
  {
    question: 'Hvad hvis jeg ikke kender nogen i forvejen?',
    answer:
      'Du er langt fra den eneste – mange starter uden at kende nogen. Som frivillig bliver du hurtigt en del af fællesskabet, fordi du samarbejder med andre om konkrete opgaver. Det er en god måde at lære nye mennesker at kende på i en tryg og uformel ramme.'
  },
  {
    question: 'Hvad får jeg ud af at være frivillig?',
    answer:
      'Som frivillig bliver du en aktiv del af fællesskabet og er med til at gøre en forskel i klubben. Samtidig får du nye erfaringer, kompetencer og relationer, som du kan tage med videre – både socialt og på dit CV.'
  }
]
</script>

<template>
  <section class="faq" ref="faqRef">

    <h2 class="faq__title">VIL DU GIVE EN HÅND MED?</h2>

    <div
      v-for="(item, index) in faqs"
      :key="index"
      class="faq_item"
      :class="{ open: openIndex === index }"
      @click="toggleFaq(index)"
    >
      <div class="faq_header">
        <h3>{{ item.question }}</h3>
        <button class="faq_icon" type="button" @click.stop="toggleFaq(index)">
          {{ openIndex === index ? '-' : '+' }}
        </button>
      </div>

      <div v-if="openIndex === index" class="faq_body">
        <p>{{ item.answer }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '@/assets/_color.scss' as c;
@use '@/assets/_font.scss' as f;

.faq {
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 70px clamp(1.5rem, 8vw, 110px);
}

.faq_item {
  background: c.$color-white;
  border: 1px solid rgba(0, 0, 0, 0.18);
  border-radius: 12px;
  box-shadow: 8px 10px 16px rgba(0, 0, 0, 0.22);
  padding: 22px 28px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.faq_item:hover {
  transform: translateY(-2px);
  box-shadow: 10px 12px 18px rgba(0, 0, 0, 0.25);
}

.faq_header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.faq_icon {
  background: none;
  border: none;
  font-size: 2rem;
  font-weight: 800;
  line-height: 1;
  transition: color 0.2s ease, transform 0.2s ease;
}

.faq_item:hover .faq_icon {
  color: c.$cta;
  transform: scale(1.15);
}

.faq_body {
  margin-top: 18px;
  max-width: 900px;
}

.faq_item.open {
  padding-bottom: 56px;
}
</style>