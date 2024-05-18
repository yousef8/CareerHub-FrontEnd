<template>
  <div class="card mb-3 d-flex">
    <div class="card-body">
      <router-link
        :to="`/jobs/${job.id}`"
        class="text-decoration-none text-dark d-flex justify-content-baseline"
      >
        <img
          v-if="user && user.cover_image"
          :src="user.cover_image"
          class="card-img-top"
          style="width: 100px; margin: 10px 10px"
          alt="Cover Image"
        />
        <h3 class="card-title text-primary mt-3">{{ job.title }}</h3>
      </router-link>
      <h6 class="card-subtitle mb-2 text-muted">{{ job.company }}</h6>
      <p class="card-text fs-5">
        <i class="fas fa-map-marker-alt text-secondary"></i> Location: {{ job.city }},
        {{ job.country }}
      </p>
      <p class="card-text fs-5">
        <i class="fas fa-dollar-sign text-secondary"></i> Salary: {{ formattedSalary }}
      </p>
      <p class="card-text fs-5">
        <i class="fas fa-clock text-secondary"></i> Experience: {{ job.min_exp_years }} -
        {{ job.max_exp_years }} years
      </p>
      <p class="card-text fs-5">
        <i class="fas fa-cog text-secondary"></i> Type:
        <span class="badge text-bg-success"> {{ job.type }}</span>
      </p>
      <p class="card-text fs-5">
        <i class="fas fa-globe text-secondary"></i> Remote: {{ job.remote_type }}
      </p>
      <p class="card-text fs-5">
        <i class="fas fa-star text-secondary"></i> Experience Level: {{ job.experience_level }}
      </p>
      <!-- <p class="card-text fs-5">
        <i class="fas fa-calendar-alt text-secondary"></i> Expires at: {{ formattedExpiresAt }}
      </p> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    job: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {}
  },
  computed: {
    formattedSalary() {
      const minSalary = this.formatNumberToK(this.job.min_salary)
      const maxSalary = this.formatNumberToK(this.job.max_salary)
      return `${minSalary} - ${maxSalary}`
    },
    formattedExpiresAt() {
      const dateTimeParts = this.job.expires_at
      const datePart = dateTimeParts[0]
      const formattedDate = new Date(datePart).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
      return formattedDate
    }
  },
  methods: {
    formatNumberToK(number) {
      if (number >= 1000) {
        return `${(number / 1000).toFixed(1)}k`
      }
      return number
    },
    fetchUser() {}
  },
  created() {
    const userData = localStorage.getItem('user')
    if (userData) {
      this.user = JSON.parse(userData)
      this.editedUser = { ...this.user }
    }
  },
  mounted() {
    this.userData
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
