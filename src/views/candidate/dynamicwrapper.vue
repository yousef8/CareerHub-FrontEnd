<template>
  <div>
    <div class="row g-0 m-5">
      <ul class="breadcrumb py-2 bg-body-secondary rounded table-light w-50 m-auto justify-content-around p3 text-center">
        <li class="breadcrumb-item"><a href="#" class="text-dark text-decoration-none fs-4 fw-bold" @click="targetcomponent='profileComponent'">Profile</a></li>
        <li class="breadcrumb-item"><a href="#" class="text-dark text-decoration-none fs-4 fw-bold" @click="targetcomponent='applicationComponent'">Application</a></li>
      </ul>
    </div>
    <div class="row g-0 text-center w-50 m-auto">
    <keep-alive>
      <component :is="targetcomponent" />
    </keep-alive>
    </div>
  </div>
</template>

<script>
import profileComponent from './views/candidate/profileComponent';
import applicationComponent from './components/dynamicComponent/applicationComponent';

export default {
  data() {
    return {
      targetcomponent: 'profileComponent'
    }
  },

  components: {
    profileComponent,
    applicationComponent
  }
}
</script>

<style>
/* Add your styles here if needed */
</style>
