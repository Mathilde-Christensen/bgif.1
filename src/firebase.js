import { initializeApp } from "firebase/app"

import { getDatabase } from "firebase/database"

import { getStorage } from "firebase/storage"


const firebaseConfig = {
  apiKey: "AIzaSyDZtt1vxZN99yh1rCiXMXFHKNRFcvCXpuE",
  authDomain: "bgif-b18a5.firebaseapp.com",
  databaseURL: "https://bgif-b18a5-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "bgif-b18a5",
  storageBucket: "bgif-b18a5.firebasestorage.app",
  messagingSenderId: "546874216542",
  appId: "1:546874216542:web:14166d77d29c77ec6b24cf"
};


const app = initializeApp(firebaseConfig);

export const database = getDatabase(app)

export const storage = getStorage(app)