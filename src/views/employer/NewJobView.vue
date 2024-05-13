<template>
  <div class="job-posting-container d-flex align-items-center">
    <div class="job-posting-form container p-3 text-dark bg-white">
      <h1 class="my-4 text-center fw-semibold">Post a New Job</h1>
      <form @submit.prevent="handleSubmit" class="d-flex flex-column align-items-center">
        <div class="mb-3 w-75">
          <label for="title" class="form-label">Job Title</label>
          <input v-model="job.title" type="text" id="title" class="form-control" required />
          <div v-if="!job.title && submitted" class="invalid-feedback">Job Title is required.</div>
        </div>

        <div class="mb-3 w-75">
          <label for="description" class="form-label">Job Description</label>
          <textarea
            v-model="job.description"
            id="description"
            rows="5"
            class="form-control"
            required
          ></textarea>
          <div v-if="!job.description && submitted" class="invalid-feedback">
            Job description is required.
          </div>
        </div>
        <div class="mb-3 w-75">
          <label for="requirements" class="form-label">Job Requirements</label>
          <textarea
            v-model="job.requirements"
            id="requirements"
            rows="5"
            class="form-control"
            required
          ></textarea>
          <div v-if="!job.requirements && submitted" class="invalid-feedback">
            Job requirmenets are required.
          </div>
        </div>
        <div class="mb-3 w-75 d-flex flex-wrap justify-content-between">
          <div style="width: 400px">
            <label for="city" class="form-label">City</label>
            <input v-model="job.city" type="text" id="city" class="form-control" required />
            <div v-if="!job.city && submitted" class="invalid-feedback">City is required.</div>
          </div>
          <div style="width: 400px">
            <label for="country" class="form-label">Country</label>
            <input v-model="job.country" type="text" id="country" class="form-control" required />
            <div v-if="!job.country && submitted" class="invalid-feedback">
              Country is required.
            </div>
          </div>
        </div>
        <div class="mb-3 w-75 d-flex flex-wrap justify-content-between">
          <div style="width: 400px">
            <label for="minExpYears" class="form-label">Minimum Experience (Years)</label>
            <input
              v-model="job.min_exp_years"
              type="number"
              id="minExpYears"
              class="form-control"
              required
            />
          </div>
          <div style="width: 400px">
            <label for="maxExpYears" class="form-label">Maximum Experience (Years)</label>
            <input
              v-model="job.max_exp_years"
              type="number"
              id="maxExpYears"
              class="form-control"
              required
            />
          </div>
        </div>
        <div class="mb-3 w-75 d-flex flex-wrap justify-content-between">
          <div style="width: 400px">
            <label for="minSalary" class="form-label">Minimum Salary (Optional)</label>
            <input v-model="job.min_salary" type="number" id="minSalary" class="form-control" />
          </div>
          <div style="width: 400px">
            <label for="maxSalary" class="form-label">Maximum Salary (Optional)</label>
            <input v-model="job.max_salary" type="number" id="maxSalary" class="form-control" />
          </div>
        </div>
        <div class="mb-3 w-75 d-flex flex-wrap justify-content-between">
          <div style="width: 400px">
            <label for="type" class="form-label">Job Type</label>
            <select v-model="job.type" id="type" class="form-control" required>
              <option value="full-time">Full Time</option>
              <option value="part-time">Part Time</option>
              <option value="contract">Contract</option>
            </select>
          </div>
          <div style="width: 400px">
            <label for="remoteType" class="form-label">Remote Type</label>
            <select v-model="job.remote_type" id="remoteType" class="form-control" required>
              <option value="on-site">On-Site</option>
              <option value="remote">Remote</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>
          <div class="">
            <button class="btn btn-primary" @click="handleSubmit">submit</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      job: {
        title: '',
        description: '',
        requirements: '',
        city: '',
        country: '',
        min_salary: null,
        max_salary: null,
        min_exp_years: 0,
        max_exp_years: 0,
        type: '',
        remote_type: ''
      },
      submitted: false,
      requiredFields: ['title', 'description', 'requirements', 'city', 'country']
    }
  },
  methods: {
    handleSubmit(event) {
      event.preventDefault()
      this.submitted = true

      // Will Send the job data to the server here

      const hasEmptyFields = this.requiredFields.some((field) => !this.job[field])
      if (hasEmptyFields) {
        console.error('Please fill in all required fields.')
        return
      }

      console.log('Job submitted:', this.job)

      this.job = {
        title: '',
        description: '',
        requirements: '',
        city: '',
        country: '',
        min_salary: null,
        max_salary: null,
        min_exp_years: 0,
        max_exp_years: 0,
        type: '',
        remote_type: ''
      }
      this.submitted = false
    }
  }
}
</script>

<style scoped>
.job-posting-container {
  margin: 2rem auto;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #ebebeb !important;
  background: radial-gradient(circle at 0px 0px, rgb(18, 70, 149), rgb(0, 112, 235)) 0px 0px / 100%
    460px no-repeat;
}

.job-posting-form {
  padding: 2rem;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.form-label {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.mb-3 {
  margin-bottom: 1rem;
}

.form-control {
  width: 100%;
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 3px;
}

.form-control:focus {
  outline: none;
  border-color: #8bd2f4;
}

/* .btn {
  margin: 30px;
  margin-left: 0;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #1c4dff;
  color: #fff;
  background-image: linear-gradient(to bottom, #607ffa, #082aea);
} */

.invalid-feedback {
  display: none;
  color: #dc3545;
  font-size: 0.8rem;
  margin-top: 0.25rem;
}

.form-control:invalid + .invalid-feedback {
  display: block;
}
</style>
