<template>
  <div class="mb-5 border border-3 p-4  border-secondary rounded">
    <h2 class="text-center">Applications</h2>
    <div v-if="applications.length === 0" class="text-center">No applications found.</div>
    <div v-else>
      <div v-for="(application, index) in applications" :key="index" class="card mb-3">
        <div class="card-body">
          <h5 class="card-title">Application ID: {{ application.id }}</h5>
          <p class="card-text">Applicant Name: {{ application.applicantName }}</p>
          <p class="card-text">Job Title: {{ application.jobTitle }}</p>
          <p class="card-text">Status: {{ application.status }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      applications: [
        {
          id: 1,
          applicantName: "John Doe",
          jobTitle: "Software Engineer",
          status: "Pending"
        },
        {
          id: 2,
          applicantName: "Jane Smith",
          jobTitle: "Data Analyst",
          status: "Accepted"
        }
        // Add more application objects here as needed
      ]
    };
  }
};
</script>

<style>
/* You can add custom styles here if needed */
</style>
