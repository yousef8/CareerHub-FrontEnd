<template>
  <main class="container h-100 d-flex align-items-center">
    <div class="row align-items-center gap-5">
      <section class="col text-center title-section">
        <h1 class="text-primary">Welcome to CareerHub</h1>
        <h4 class="text-secondary my-3">We connect employers with the world's finest potential!</h4>
        <button class="btn btn-outline-primary mt-4 py-2 px-4" @click="$router.push('/register')">Let's start</button>
      </section>
      <section class="col d-flex justify-content-center">
        <img class="img-fluid" src="@/assets/images/landing.png" alt="working">
      </section>
    </div>
  </main>
</template>

<style scoped>
.title-section {
  padding: 0 100px;
}

img {
  min-width: 35vw;
}
</style>
