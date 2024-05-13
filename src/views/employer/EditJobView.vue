<template>
  <div class="job-posting-container d-flex align-items-center">
    <div class="job-posting-form container p-3 text-dark bg-white">
      <h1 class="my-4 text-center fw-semibold">Edit Job post</h1>
      <form @submit.prevent="handleSubmit" class="d-flex flex-column align-items-center">
        <div class="mb-3 w-75">
          <label for="title" class="form-label">Job Title</label>
          <button class="edit-b" @click.prevent="toggleEdit('title')">Edit</button>
          <input
            v-model="job.title"
            type="text"
            id="title"
            class="form-control"
            :disabled="!this.activeFields.title"
          />
          <div v-if="!job.title && submitted" class="invalid-feedback">Job Title is required.</div>
        </div>

        <div class="mb-3 w-75">
          <label for="description" class="form-label">Job Description</label>
          <button class="edit-b" @click.prevent="toggleEdit('description')">Edit</button>
          <textarea
            v-model="job.description"
            id="description"
            rows="5"
            class="form-control"
            required
            :disabled="!this.activeFields.description"
          ></textarea>
          <div v-if="!job.description && submitted" class="invalid-feedback">
            Job description is required.
          </div>
        </div>
        <div class="mb-3 w-75">
          <label for="requirements" class="form-label">Job Requirements</label>
          <button class="edit-b" @click.prevent="toggleEdit('requirements')">Edit</button>
          <textarea
            v-model="job.requirements"
            id="requirements"
            rows="5"
            class="form-control"
            required
            :disabled="!this.activeFields.requirements"
          ></textarea>
          <div v-if="!job.requirements && submitted" class="invalid-feedback">
            Job requirmenets are required.
          </div>
        </div>
        <div class="mb-3 w-75 d-flex flex-wrap justify-content-between">
          <div style="width: 400px">
            <label for="city" class="form-label">City</label>
            <button class="edit-b" @click.prevent="toggleEdit('city')">Edit</button>
            <input
              v-model="job.city"
              type="text"
              id="city"
              class="form-control"
              required
              :disabled="!this.activeFields.city"
            />
            <div v-if="!job.city && submitted" class="invalid-feedback">City is required.</div>
          </div>
          <div style="width: 400px">
            <label for="country" class="form-label">Country</label>
            <button class="edit-b" @click.prevent="toggleEdit('country')">Edit</button>
            <input
              v-model="job.country"
              type="text"
              id="country"
              class="form-control"
              required
              :disabled="!this.activeFields.country"
            />
            <div v-if="!job.country && submitted" class="invalid-feedback">
              Country is required.
            </div>
          </div>
        </div>
        <div class="mb-3 w-75 d-flex flex-wrap justify-content-between">
          <div style="width: 400px">
            <label for="minExpYears" class="form-label">Minimum Experience (Years)</label>
            <button class="edit-b" @click.prevent="toggleEdit('min_exp_years')">Edit</button>
            <input
              v-model="job.min_exp_years"
              type="number"
              id="minExpYears"
              class="form-control"
              required
              :disabled="!this.activeFields.min_exp_years"
            />
          </div>
          <div style="width: 400px">
            <label for="maxExpYears" class="form-label">Maximum Experience (Years)</label>
            <button class="edit-b" @click.prevent="toggleEdit('max_exp_years')">Edit</button>
            <input
              v-model="job.max_exp_years"
              type="number"
              id="maxExpYears"
              class="form-control"
              required
              :disabled="!this.activeFields.max_exp_years"
            />
          </div>
        </div>
        <div class="mb-3 w-75 d-flex flex-wrap justify-content-between">
          <div style="width: 400px">
            <label for="minSalary" class="form-label">Minimum Salary (Optional)</label>
            <button class="edit-b" @click.prevent="toggleEdit('min_salary')">Edit</button>
            <input
              v-model="job.min_salary"
              type="number"
              id="minSalary"
              class="form-control"
              :disabled="!this.activeFields.min_salary"
            />
          </div>
          <div style="width: 400px">
            <label for="maxSalary" class="form-label">Maximum Salary (Optional)</label>
            <button class="edit-b" @click.prevent="toggleEdit('max_salary')">Edit</button>
            <input
              v-model="job.max_salary"
              type="number"
              id="maxSalary"
              class="form-control"
              :disabled="!this.activeFields.max_salary"
            />
          </div>
        </div>
        <div class="mb-3 w-75 d-flex flex-wrap justify-content-between">
          <div style="width: 400px">
            <label for="type" class="form-label">Job Type</label>
            <button class="edit-b" @click.prevent="toggleEdit('type')">Edit</button>
            <select
              v-model="job.type"
              id="type"
              class="form-control"
              required
              :disabled="!this.activeFields.type"
            >
              <option value="full-time">Full Time</option>
              <option value="part-time">Part Time</option>
              <option value="contract">Contract</option>
            </select>
          </div>
          <div style="width: 400px">
            <label for="remoteType" class="form-label">Remote Type</label>
            <button class="edit-b" href="" @click.prevent="toggleEdit('remote_type')">Edit</button>
            <select
              v-model="job.remote_type"
              id="remoteType"
              class="form-control"
              required
              :disabled="!this.activeFields.remote_type"
            >
              <option value="on-site">On-Site</option>
              <option value="remote">Remote</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>
          <button class="submit-b" @click="handleSubmit">Update</button>
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
        title: 'Software Engineer - Front-End',
        description:
          'We are looking for a talented and passionate front-end engineer to join our growing team. You will be responsible for building and maintaining user interfaces for our web applications. This is a great opportunity to work on cutting-edge technologies and make a real impact on our product.',
        requirements:
          '- Proven experience with HTML, CSS, and Javascript\n- Experience with a front-end framework like React or Vue.js (a plus)\n- Strong understanding of web development best practices\n- Excellent communication and collaboration skills',
        city: 'San Francisco',
        country: 'USA',
        min_salary: 100000,
        max_salary: 120000,
        min_exp_years: 2,
        max_exp_years: 5,
        type: 'Full-Time',
        remote_type: 'Hybrid (office and remote work possible)'
      },
      submitted: false,
      requiredFields: ['title', 'description', 'requirements', 'city', 'country'],
      activeFields: {
        title: false,
        description: false,
        requirements: false,
        city: false,
        country: false,
        min_salary: false,
        max_salary: false,
        min_exp_years: false,
        max_exp_years: false,
        type: false,
        remote_type: false
      }
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

      this.submitted = false
    },
    toggleEdit(field) {
      this.activeFields[field] = true
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

.submit-b {
  margin: 30px;
  margin-left: 0;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #1c4dff;
  color: #fff;
  background-image: linear-gradient(to bottom, #607ffa, #082aea);
}

.invalid-feedback {
  display: none;
  color: #dc3545;
  font-size: 0.8rem;
  margin-top: 0.25rem;
}

.form-control:invalid + .invalid-feedback {
  display: block;
}

.edit-b {
  color: blue;
  text-decoration: none;
  cursor: pointer;
  background-color: transparent;
  border: none;
}

.edit-b:hover {
  text-decoration: underline;
}
</style>
