import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const loggedIn = ref(false)

  function login() {
    loggedIn.value = true
  }

  function logout() {
    loggedIn.value = false
  }

  return { loggedIn, login, logout }
})
