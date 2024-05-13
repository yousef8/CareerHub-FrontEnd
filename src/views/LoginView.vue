<template>
  <div class="login-container d-flex align-items-center">
    <div class="login-form container p-3 text-dark bg-white">
      <h1 class="my-4 text-center fw-semibold">Welcome Back!</h1>
      <p class="text-center">
        Didn't join CareerHub yet? <router-link to="/register">Sign up here</router-link>
      </p>
      <form @submit.prevent="handleSubmit" class="d-flex flex-column align-items-center">
        <div class="mb-3 w-75">
          <label for="email" class="form-label">Email</label>
          <input v-model="email" type="email" id="email" class="form-control" required />
        </div>
        <div class="my-1 w-75">
          <label for="password" class="form-label">Password</label>
          <input
            v-model="password"
            type="password"
            id="password"
            class="form-control"
            pattern=".{8,}"
            title="Password must be at least 8 characters long"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary my-4 w-25 fs-5">Login</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRoute, useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const email = ref('')
const password = ref('')
const router = useRouter()
const user = useUserStore()
const route = useRoute()

async function handleSubmit() {
  try {
    await user.login({ email: email.value, password: password.value })
    router.push({ name: 'home' })
  } catch (error) {
    let errorMessage = 'Login failed!'
    if (error.response && error.response.data.message) {
      errorMessage = error.response.data.message
    } else if (error.message) {
      errorMessage = error.message
    }
    toast.error(errorMessage)
  }
}

onMounted(() => {
  if (route.query.registered) {
    toast.success('Registered Successfully! Please log in')
  }
})
</script>

<style scoped>
.login-container {
  height: 100%;
  background-color: #ebebeb !important;
  background: radial-gradient(circle at 0px 0px, rgb(18, 70, 149), rgb(0, 112, 235)) 0px 0px / 100% 460px no-repeat;
}

.login-form {
  border-radius: 10px !important;
}

@media (max-width: 576px) {
  .btn {
    width: 80% !important;
  }
}
</style>
