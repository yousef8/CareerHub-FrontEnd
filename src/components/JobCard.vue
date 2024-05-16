<template>
  <div class="card mb-3">
    <div class="card-body">
      <router-link :to="`/jobs/${job.id}`" class="text-decoration-none text-dark">
        <h3 class="card-title text-primary">{{ job.title }}</h3>
      </router-link>
      <h6 class="card-subtitle mb-2 text-muted">{{ job.company }}</h6>
      <p class="card-text">Location: {{ job.city }}, {{ job.country }}</p>
      <p class="card-text">Salary: {{ job.min_salary }} - {{ job.max_salary }}</p>
      <p class="card-text">Experience: {{ job.min_exp_years }} - {{ job.max_exp_years }} years</p>
      <p class="card-text">Type: {{ job.type }}</p>
      <p class="card-text">Remote: {{ job.remote_type }}</p>
      <p class="card-text">Experience Level: {{ job.experience_level }}</p>
      <p class="card-text">Expires at: {{ job.expires_at }}</p>
      <p class="card-text">Approved: {{ job.is_approved ? 'Yes' : 'No' }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    job: Object
  }
}
</script>

<style scoped>
.card {
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-size: 1.5rem;
  font-weight: bold;
}

.card-subtitle {
  font-size: 1rem;
}

.card-text {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}
</style>
