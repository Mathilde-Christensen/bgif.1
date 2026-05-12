<template>
  <section class="admin">
    <h1>Admin galleri</h1>

    <form @submit.prevent="uploadImage" class="form">
      <input v-model="title" type="text" placeholder="Billedtitel" />

      <select v-model="selectedCategory" required>
        <option disabled value="">Vælg kategori</option>
        <option value="koncerter">Koncerter</option>
        <option value="loppemarked">Loppemarked</option>
        <option value="heartland">Heartland Festival</option>
        <option value="staevner">Stævner</option>
      </select>

      <input type="file" accept="image/*" @change="handleFile" />

      <button type="submit" :disabled="isUploading">
        {{ isUploading ? "Uploader..." : "Upload billede" }}
      </button>
    </form>

    <p v-if="message">{{ message }}</p>
  </section>
</template>

<script setup>
import { ref } from "vue"
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage"
import { getDatabase, ref as dbRef, push, set } from "firebase/database"

const title = ref("")
const file = ref(null)
const selectedCategory = ref("")
const isUploading = ref(false)
const message = ref("")

function handleFile(event) {
  file.value = event.target.files[0]
}

async function uploadImage() {
  if (!file.value || !selectedCategory.value) {
    message.value = "Vælg både billede og kategori"
    return
  }

  isUploading.value = true
  message.value = ""

  try {
    const storage = getStorage()
    const database = getDatabase()

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
      createdAt: Date.now()
    })

    title.value = ""
    file.value = null
    selectedCategory.value = ""
    message.value = "Billedet er uploadet!"
  } catch (error) {
    console.error(error)
    message.value = "Der skete en fejl ved upload"
  } finally {
    isUploading.value = false
  }
}
</script>