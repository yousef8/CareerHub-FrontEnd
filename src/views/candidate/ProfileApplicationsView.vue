<template>
  <div>
    <div class="row g-0 m-5">
      <ul
        class="breadcrumb py-2 bg-body-secondary rounded table-light w-50 m-auto justify-content-around p3 text-center"
      >
        <li class="breadcrumb-item">
          <a
            href="#"
            class="text-dark text-decoration-none fs-4 fw-bold"
            @click="targetcomponent = 'profileComponent'"
            >Profile</a
          >
        </li>
        <li class="breadcrumb-item" v-if="authStore.user && authStore.user.role !== 'employer'">
          <a
            href="#"
            class="text-dark text-decoration-none fs-4 fw-bold"
            @click="targetcomponent = 'applicationComponent'"
            >Application</a
          >
        </li>
      </ul>
    </div>
    <div class="row g-0 text-center w-50 m-auto">
      <keep-alive>
        <component :is="targetcomponent" />
      </keep-alive>
    </div>
  </div>
</template>

<script lang="ts">
import profileComponent from '../../components/profileComponent.vue'
import applicationComponent from '../../components/applicationComponent.vue'
import { useUserStore } from '@/stores/user'

export default {
  data() {
    return {
      targetcomponent: 'profileComponent'
    }
  },

  components: {
    profileComponent,
    applicationComponent
  },
  setup() {
    const authStore = useUserStore();
    return {
      authStore,
    };
  }
}
</script>

<style>
/* Add your styles here if needed */
</style>
