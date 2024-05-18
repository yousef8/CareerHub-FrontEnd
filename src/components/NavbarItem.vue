<template>
  <nav class="navbar navbar-expand-lg px-2 m-0" style="background-color: #2784fc">
    <a class="navbar-brand fs-2 ms-2 me-lg-5 fw-bold text-white" style="font-family: 'Dancing Script', cursive"
      href="#">
      <router-link to="/" class="text-decoration-none text-white">CareerHub</router-link>
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <div class="navbar-nav me-auto">
        <a class="nav-item nav-link fs-4 me-lg-4 rounded-3">
          <router-link to="/jobs" class="text-decoration-none text-white">Jobs</router-link>
        </a>
      </div>
      <div class="d-flex mx-auto mx-lg-0 w-75  w-lg-auto mt-2">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"
          v-model="searchStore.query" />
        <router-link to="/jobs">
          <button class="btn btn-outline-dark me-3 fw-bold text-white">Search</button>
        </router-link>
      </div>
      <div class="navbar-nav ms-auto fs-4 mt-2  me-5">
        <router-link :to="{ name: 'login' }"
          class="text-decoration-none nav-item nav-link fs-4 me-4 p-2 rounded-5 text-white"
          v-if="!authStore.isLogged">Login</router-link>
        <router-link :to="{ name: 'register' }"
          class="text-decoration-none nav-item nav-link fs-4 me-4 p-2 rounded-5 text-white"
          v-if="!authStore.isLogged">Register</router-link>

        <li class="nav-item dropdown rounded-3 me-2" v-if="authStore.isLogged">
          <a class="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button"
            data-bs-toggle="dropdown" aria-expanded="false">
            {{ authStore.user?.name }}
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <router-link :to="{ name: 'profile-applications' }" class="text-decoration-none text-white">
              <li><a class="dropdown-item fs-5" href="#">Profile</a></li>
            </router-link>
            <router-link v-if="authStore.user?.role === 'employer'" :to="{ name: 'employer-overview' }"
              class="text-decoration-none text-white">
              <li><a class="dropdown-item fs-5">Overview</a></li>
            </router-link>
            <router-link v-if="authStore.user?.role === 'admin'" :to="{ name: 'admin' }"
              class="text-decoration-none text-white">
              <li><a class="dropdown-item fs-5">Admin Panel</a></li>
            </router-link>
            <router-link :to="{ name: 'logout' }" class="text-decoration-none text-white">
              <li><a class="dropdown-item fs-5">Logout</a></li>
            </router-link>
          </ul>
        </li>
        <div class="profile-image-container ms-2 p-1" v-if="authStore.isLogged && authStore.user?.profile_image">
          <img :src="authStore.user?.profile_image" class="rounded-circle" width="40" height="40" />
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { useUserStore } from '@/stores/user'
import { useSearchStore } from '@/stores/search'

export default {
  name: 'NavbarItem',
  data() {
    return {
      authStore: useUserStore(),
      searchStore: useSearchStore()
    }
  },
  methods: {
    sendQuery(e: Event) {
      e.preventDefault()
      this.searchStore.setSearchQuery(this.searchStore.query)
    }
  }
}
</script>

<style>
.nav-item:hover {
  background-color: rgba(18, 18, 18, 0.75);
}
</style>