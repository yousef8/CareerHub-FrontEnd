<template>
  <footer class="bg-dark text-white">
    <div class="container py-3">
      <div class="row justify-content-center">
        <div class="col-md-6 text-center mb-4">
          <button
            v-for="icon in icons"
            :key="icon"
            class="btn btn-outline-light mx-2"
          >
            <i class="fab" :class="icon"></i>
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 text-center mb-3">
          Five minds, one mission: Abanoub, Fatma, Steven, Youssef, and Mona, led by Engineer Noha  <i class="fas fa-heart fa-beat"></i>, weaving innovation into every aspect of our project.
        </div>
      </div>
      <hr class="bg-light">
      <div class="row">
        <div class="col-md-12 text-center">
          {{ new Date().getFullYear() }} — <strong>&copy; 2024 . All rights reserved.</strong>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      icons: ['fab fa-facebook-f', 'fab fa-hackerrank', 'fab fa-linkedin-in', 'fab fa-github']
    };
  }
};
</script>

<style scoped>

</style>
