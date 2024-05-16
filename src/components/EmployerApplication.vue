<template>
  <div class="application-container">
    <h2 class="application-heading">Applications</h2>
    <div v-if="applications.length === 0" class="no-applications">No applications found.</div>
    <div v-else>
      <div v-for="(application, index) in applications" :key="index" class="application-card">
        <div class="card-body">
          <h5 class="card-title">Application ID: {{ application.id }}</h5>
          <p class="card-text">Applicant Name: {{ application.applicantName }}</p>
          <p class="card-text">Job Title: {{ application.jobTitle }}</p>
          <div class="action-buttons">
            <button class="btn btn-primary"><i class="fas fa-eye"></i> View Details</button>
            <button class="btn btn-success"><i class="fas fa-check"></i> Approve</button>
            <button class="btn btn-danger"><i class="fas fa-times"></i> Reject</button>
          </div>
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
          applicantName: 'John Doe',
          jobTitle: 'Software Engineer',
          status: 'Pending'
        },
        {
          id: 2,
          applicantName: 'Jane Smith',
          jobTitle: 'Data Analyst',
          status: 'Accepted'
        }
      ]
    }
  }
}
</script>

<style>
/* Style the application container */
.application-container {
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.application-heading {
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.no-applications {
  text-align: center;
  color: #ccc;
  font-style: italic;
}

.application-card {
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 4px;
  margin-bottom: 1rem;
  padding: 1rem;
}

.card-title {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.card-text {
  margin-bottom: 0.5rem;
}

.action-buttons {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.btn {
  margin-right: 0.5rem;
}

.btn-success {
  background-color: #28a745;
  color: #fff;
  border-color: #28a745;
}

.btn-danger {
  background-color: #dc3545;
  color: #fff;
  border-color: #dc3545;
}
</style>
