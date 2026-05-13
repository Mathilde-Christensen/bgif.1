<script setup>
import { ref, watch } from "vue"
import { storage, database } from "@/firebase"

import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from "firebase/storage"

import {
  ref as dbRef,
  push,
  set,
  onValue,
  remove,
  update
} from "firebase/database"

const title = ref("")
const file = ref(null)
const selectedCategory = ref("")
const isUploading = ref(false)
const message = ref("")
const images = ref([])

function handleFile(event) {
  file.value = event.target.files[0]
}

watch(selectedCategory, () => {
  if (!selectedCategory.value) return

  const galleryRef = dbRef(database, `gallery/${selectedCategory.value}`)

  onValue(galleryRef, (snapshot) => {
    const data = snapshot.val()

    images.value = data
      ? Object.entries(data)
          .map(([id, image]) => ({
            id,
            ...image
          }))
          .sort((a, b) => a.order - b.order)
      : []
  })
})

async function uploadImage() {
  if (!file.value || !selectedCategory.value) {
    message.value = "Vælg både billede og kategori"
    return
  }

  isUploading.value = true
  message.value = ""

  try {
    const fileName = `${Date.now()}-${file.value.name}`

    const imageRef = storageRef(
      storage,
      `gallery/${selectedCategory.value}/${fileName}`
    )

    await uploadBytes(imageRef, file.value)

    const imageUrl = await getDownloadURL(imageRef)

    const newImageRef = push(
      dbRef(database, `gallery/${selectedCategory.value}`)
    )

    await set(newImageRef, {
      title: title.value,
      url: imageUrl,
      fileName: fileName,
      category: selectedCategory.value,
      createdAt: Date.now(),
      order: images.value.length
    })

    title.value = ""
    file.value = null
    message.value = "Billedet er uploadet!"
  } catch (error) {
    console.error(error)
    message.value = "Der skete en fejl ved upload"
  } finally {
    isUploading.value = false
  }
}

async function deleteImage(image) {
  try {
    const imageStorageRef = storageRef(
      storage,
      `gallery/${selectedCategory.value}/${image.fileName}`
    )

    await deleteObject(imageStorageRef)

    await remove(
      dbRef(database, `gallery/${selectedCategory.value}/${image.id}`)
    )

    message.value = "Billedet er slettet"
  } catch (error) {
    console.error(error)
    message.value = "Der skete en fejl ved sletning"
  }
}

async function moveImage(index, direction) {
  const newIndex = index + direction

  if (newIndex < 0 || newIndex >= images.value.length) return

  const currentImage = images.value[index]
  const otherImage = images.value[newIndex]

  try {
    await update(
      dbRef(database, `gallery/${selectedCategory.value}/${currentImage.id}`),
      {
        order: otherImage.order
      }
    )

    await update(
      dbRef(database, `gallery/${selectedCategory.value}/${otherImage.id}`),
      {
        order: currentImage.order
      }
    )
  } catch (error) {
    console.error(error)
    message.value = "Rækkefølgen kunne ikke ændres"
  }
}
</script>

<template>
  <section class="admin">
    <h1>Admin galleri</h1>

    <form @submit.prevent="uploadImage" class="form">
      <input
        v-model="title"
        type="text"
        placeholder="Billedtitel"
      />

      <select v-model="selectedCategory" required>
        <option disabled value="">Vælg kategori</option>
        <option value="koncerter">Koncerter</option>
        <option value="loppemarked">Loppemarked</option>
        <option value="heartland">Heartland Festival</option>
        <option value="staevner">Stævner</option>
      </select>

      <input
        type="file"
        accept="image/*"
        @change="handleFile"
      />

      <button type="submit" :disabled="isUploading">
        {{ isUploading ? "Uploader..." : "Upload billede" }}
      </button>
    </form>

    <p v-if="message">{{ message }}</p>

    <div class="admin_gallery">
      <div
        v-for="(image, index) in images"
        :key="image.id"
        class="admin_image_card"
      >
        <img :src="image.url" :alt="image.title" />

        <p>{{ image.title }}</p>

        <div class="buttons">
          <button type="button" @click="moveImage(index, -1)">
            Op
          </button>

          <button type="button" @click="moveImage(index, 1)">
            Ned
          </button>

          <button type="button" @click="deleteImage(image)">
            Slet
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.admin {
  padding: 40px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 500px;
}

input,
select,
button {
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #ccc;
}

.admin_gallery {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-top: 40px;
}

.admin_image_card img {
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 20px;
}

.buttons {
  display: flex;
  gap: 8px;
}
</style>