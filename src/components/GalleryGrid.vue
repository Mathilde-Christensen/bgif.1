<script setup>
import { ref, onMounted } from 'vue'
import { getDatabase, ref as dbRef, onValue } from 'firebase/database'

const props = defineProps({
  category: {
    type: String,
    required: true
  }
})

const images = ref([])

onMounted(() => {
  const database = getDatabase()

  const galleryRef = dbRef(database, `gallery/${props.category}`)

  onValue(galleryRef, (snapshot) => {
    const data = snapshot.val()

    images.value = data
      ? Object.entries(data).map(([id, image]) => ({
          id,
          ...image
        }))
      : []
  })
})
</script>

<template>
  <section class="gallery">
    <p v-if="images.length === 0" class="empty">
      Der er endnu ingen billeder i dette galleri.
    </p>

    <img
      v-for="image in images"
      :key="image.id"
      :src="image.url"
      :alt="image.title"
      class="gallery_image"
    />
  </section>
</template>

<style scoped lang="scss">
.gallery {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
  margin-top: 40px;
}

.gallery_image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 28px;
}

.empty {
  grid-column: 1 / -1;
}

@media (min-width: 768px) {
  .gallery {
    grid-template-columns: repeat(4, 1fr);
  }

  .gallery_image {
    height: 230px;
  }
}
</style>