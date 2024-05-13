<template>
  <div class="register-container d-flex align-items-center">
    <div class="register-form container text-dark bg-white">
      <h1 class="my-4 text-center fw-semibold">Sign up to join CareerHub</h1>
      <p class="text-center">
        Already have an account? <router-link to="/login">Login instead</router-link>
      </p>
      <form @submit.prevent="handleSubmit" class="d-flex flex-column align-items-center">
        <div class="mb-3 w-75">
          <label for="name" class="form-label">Name</label>
          <input v-model="name" type="text" id="name" class="form-control" />
          <p v-if="!nameValid && formSubmitted" class="text-danger mt-1">
            Please enter a valid name
          </p>
        </div>
        <div class="mb-3 w-75">
          <label for="email" class="form-label">Email</label>
          <input v-model="email" type="email" id="email" class="form-control" />
          <p v-if="!emailValid && formSubmitted" class="text-danger mt-1">
            Please enter a valid email address
          </p>
        </div>
        <div class="mb-3 w-75">
          <label for="password" class="form-label">Password</label>
          <input v-model="password" type="password" id="password" class="form-control" />
          <p v-if="!passwordValid && formSubmitted" class="text-danger mt-1">
            Password must be at least 8 characters long
          </p>
        </div>
        <div class="mb-3 w-75">
          <label for="confirm-password" class="form-label">Confirm Password</label>
          <input
            v-model="confirmPassword"
            type="password"
            id="confirm-password"
            class="form-control"
          />
          <p v-if="!confirmPasswordValid && formSubmitted" class="text-danger mt-1">
            Passwords do not match
          </p>
        </div>
        <div class="mb-3 w-75">
          <label for="phone-number" class="form-label">Phone Number</label>
          <input v-model="phoneNumber" type="tel" id="phone-number" class="form-control" />
          <p v-if="!phoneValid && formSubmitted" class="text-danger mt-1">
            Please enter a valid phone number
          </p>
        </div>
        <div class="mb-3 w-75">
          <label for="profile-image" class="form-label">Profile Image</label>
          <input
            type="file"
            accept="image/*"
            id="profile-image"
            class="form-control"
            @change="handleProfileImageChange"
          />
        </div>
        <div class="mb-3 w-75">
          <label for="cover-image" class="form-label">Cover Image</label>
          <input
            type="file"
            accept="image/*"
            id="cover-image"
            class="form-control"
            @change="handleCoverImageChange"
          />
        </div>
        <div class="mb-3 w-75">
          <label for="role" class="form-label">Role</label>
          <select v-model="role" id="role" class="form-select">
            <option value="" disabled>Select Role</option>
            <option value="employer">Employer</option>
            <option value="candidate">Candidate</option>
          </select>
          <p v-if="!roleValid && formSubmitted" class="text-danger mt-1">Please select a role</p>
        </div>
        <button
          type="submit"
          class="btn btn-primary my-4 w-25 fs-5"
          :disabled="!formValid && formSubmitted"
        >
          Register
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const phoneNumber = ref('')
const profileImage = ref(null)
const coverImage = ref(null)
const role = ref('')
const formSubmitted = ref(false)
const user = useUserStore()
const router = useRouter()

const nameValid = computed(() => name.value.length > 0)
const emailValid = computed(() => /\S+@\S+\.\S+/.test(email.value))
const passwordValid = computed(() => password.value.length >= 8)
const confirmPasswordValid = computed(() => password.value === confirmPassword.value)
const phoneValid = computed(() => /^01[0125][0-9]{8}$/.test(phoneNumber.value))
const roleValid = computed(() => role.value !== '')
const formValid = computed(
  () =>
    nameValid.value &&
    emailValid.value &&
    passwordValid.value &&
    confirmPasswordValid.value &&
    phoneValid.value &&
    roleValid.value
)

function handleProfileImageChange(event) {
  profileImage.value = event.target.files[0]
}

function handleCoverImageChange(event) {
  coverImage.value = event.target.files[0]
}

async function handleSubmit() {
  try {
    formSubmitted.value = true
    if (!formValid.value) {
      return
    }
    const fd = new FormData()
    fd.append('name', name.value)
    fd.append('email', email.value)
    fd.append('phone_number', phoneNumber.value)
    fd.append('password', password.value)
    fd.append('password_confirmation', password.value)
    fd.append('role', role.value)

    if (profileImage.value) {
      fd.append('profile_image', profileImage.value)
    }

    if (coverImage.value) {
      fd.append('cover_image', coverImage.value)
    }
    await user.register(fd)

    router.push({ name: 'login', query: { registered: 'true' } })
  } catch (error) {
    if (error.response) {
      toast.error(`Error : error.response.data.message`)
      Object.values(error.response.data.errors).forEach((errorList) => {
        errorList.forEach((error) => {
          toast.error(error)
        })
      })
    } else {
      toast(error.message)
    }
  }
}
</script>

<style scoped>
.register-container {
  background-color: #ebebeb !important;
  background: radial-gradient(circle at 0px 0px, rgb(18, 70, 149), rgb(0, 112, 235)) 0px 0px / 100%
    460px no-repeat;
  padding: 70px;
}

.register-form {
  border-radius: 10px;
}

@media (max-width: 576px) {
  .register-container {
    padding: 30px;
  }

  .register-form {
    width: 100%;
  }

  .btn {
    width: 80% !important;
  }
}
</style>
