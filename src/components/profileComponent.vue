<template>
  <div class="mb-5 border border-3 p-4 border-secondary rounded">
    <h2 class="text-center">User Profile</h2>
    <div class="card">
      <div class="card-body row align-items-center">
        <div class="col-md-auto col-sm-12 mb-3 mb-md-0 text-center"> <!-- Added col-sm-12 for full width on smaller screens -->
          <img :src="user.profile_image ? user.profile_image : 'https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png'" alt="User Image" class="img-fluid rounded-circle" style="max-width: 150px;">
        </div>
        <div class="col-md-12 col-sm-12"> 
          <div v-if="editing.name || editing.email || editing.phone" class="mb-3">
            <input type="text" v-model="user.name" class="form-control mb-2" placeholder="Name">
            <input type="text" v-model="user.email" class="form-control mb-2" placeholder="Email">
            <input type="text" v-model="user.phone_number" class="form-control mb-2" placeholder="Phone">
            <button @click="updateProfile('name')" class="btn btn-primary mb-2">Save</button>
          </div>
          <div v-else>
            <div class="mb-3 col">
              <div class="d-flex justify-content-between align-items-center">
                <div class="fw-bold">Name:</div>
                <div>{{ user.name }}</div>
                <button @click="startEditing('name')" class="btn btn-link"><i class="fas fa-pen fs-5 text-primary"></i></button>
              </div>
            </div>
            <div class="mb-3">
              <div class="d-flex justify-content-between align-items-center">
                <div class="fw-bold">Email:</div>
                <div>{{ user.email }}</div>
                <button @click="startEditing('email')" class="btn btn-link"><i class="fas fa-pen fs-5 text-primary"></i></button>
              </div>
            </div>
            <div class="mb-3">
              <div class="d-flex justify-content-between align-items-center">
                <div class="fw-bold">Phone:</div>
                <div>{{ user.phone_number }}</div>
                <button @click="startEditing('phone')" class="btn btn-link"><i class="fas fa-pen fs-5 text-primary"></i></button>
              </div>
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
      user: {},
      editing: {
        name: false,
        email: false,
        phone: false
      },
      updateSuccess: false
    };
  },
  created() {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    }
  },
  methods: {
    startEditing(key) {
      this.editing = { ...this.editing, [key]: true };
    },
    updateProfile(key) {
      this.editing = { ...this.editing, [key]: false };
      this.updateSuccess = true;
      setTimeout(() => {
        this.updateSuccess = false;
      }, 3000); 
    }
  }
};
</script>

<style scoped>
.user-image {
  flex-shrink: 0; 
}
</style>
