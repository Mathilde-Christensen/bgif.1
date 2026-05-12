import { ref } from 'vue'

export const role = ref(localStorage.getItem('role') || null)

export function loginAsUser() {
  role.value = 'user'
  localStorage.setItem('role', 'user')
}

export function loginAsAdmin() {
  role.value = 'admin'
  localStorage.setItem('role', 'admin')
}

export function logout() {
  role.value = null
  localStorage.removeItem('role')
}