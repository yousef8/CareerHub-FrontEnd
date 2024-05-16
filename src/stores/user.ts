import type { LoginCredentials } from '@/interfaces/LoginCredentials'
import type { User } from '@/interfaces/User'
import api from '@/utilities/axios'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(JSON.parse(localStorage.getItem('user') || 'null'))
  const token = ref<string | null>(localStorage.getItem('token'))

  const isLogged = computed(() => !!token.value)
  const isAdmin = computed(() => user.value?.role === 'admin')
  const isCandidate = computed(() => user.value?.role === 'candidate')
  const isEmployer = computed(() => user.value?.role === 'employer')

  async function register(formData: FormData) {
    await api.post<User>('/register', formData)
  }

  async function login(credentials: LoginCredentials) {
    const res = await api.post<{ user: User; token: string }>('/login', credentials)
    setUser(res.data)
  }

  function logout() {
    user.value = null
    token.value = null
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  function setUser(data: { token: string; user: User }) {
    user.value = data.user
    token.value = data.token
    setLocalStorage(data)
  }

  function setLocalStorage(data: { token: string; user: User }) {
    localStorage.setItem('user', JSON.stringify(data.user))
    localStorage.setItem('token', data.token)
  }

  return {
    user,
    token,
    isLogged,
    isAdmin,
    isCandidate,
    isEmployer,
    login,
    register,
    logout
  }
})
