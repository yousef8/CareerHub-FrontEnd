<template>
  <div class="mb-5 border border-3 p-4 border-secondary rounded">
    <h2 class="text-center">User Profile</h2>
    <div class="card">
      <div class="card-body row align-items-center">
        <div class="col-md-auto mb-3 mb-md-0">
          <img src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png" alt="User Image" class="img-fluid rounded-circle" style="max-width: 150px;">
        </div>
        <div class="col-md">
          <div v-for="(info, key) in user" :key="key" class="mb-3">
            <div class="d-flex justify-content-between">
              <div v-if="!editing[key]" class="flex-grow-1">
                <span class="fw-bold">{{ key }}:</span>
                <span>{{ info }}</span>
              </div>
              <div v-else>
                <input type="text" v-model="user[key]" class="form-control">
              </div>
              <button v-if="!editing[key]" @click="startEditing(key)" class="btn btn-link"><i class="fas fa-pen fs-5 text-primary"></i></button>
              <button v-else @click="updateProfile(key)" class="btn btn-primary">Save</button>
            </div>
          </div>
          <div v-if="updateSuccess" class="alert alert-success mt-3" role="alert">
            Profile updated successfully!
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
      user: {
        name: "John Doe",
        email: "john@example.com",
        address: "123 Main Street, City, Country",
        phone: "123-456-7890"
        // Add more user information here as needed
      },
      editing: {},
      updateSuccess: false
    };
  },
  methods: {
    startEditing(key) {
      this.editing = { [key]: true };
    },
    updateProfile(key) {
      this.editing = {};
      this.updateSuccess = true;
      setTimeout(() => {
        this.updateSuccess = false;
      }, 3000); // Hide success message after 3 seconds
    }
  }
};
</script>

<style>
/* You can add custom styles here if needed */
.user-image {
  flex-shrink: 0; /* Prevent the image from shrinking */
}
</style>
