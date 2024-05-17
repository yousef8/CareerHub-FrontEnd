<template>
  <div class="mb-5 border border-3 p-4 border-subtle-secondary shadow rounded">
    <h2 class="text-center mb-3"><span class="text-primary">Hello</span> {{ user.name }}</h2>
    <div class="card">
      <div class="card-body row align-items-center">
        <div class="col-lg-3 col-md-4 col-sm-12 mb-3 mb-md-0 text-center m-auto">
          <img :src="user.profile_image ? user.profile_image : 'https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png'" alt="User Image" class="img-fluid rounded-circle mb-4" style="max-width: 150px;">

          <label for="imageUpload" class="btn btn-link">
            <i class="fas fa-camera fa-2x text-primary"></i>
            <input type="file" id="imageUpload" style="display: none" @change="handleImageChange">
          </label>
        </div>
        <div class="col-lg-9 col-md-8 col-sm-12"> 
          <div v-if="editing.name" class="mb-3">
            <input type="text" v-model="editedUser.name" class="form-control mb-2" placeholder="Name">
            <button @click="updateProfile('name')" class="btn btn-primary mb-2" :disabled="isUpdating.name">
              <span v-if="isUpdating.name">
                <span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
                <span role="status">Saving...</span>
              </span>
              <span v-else>Save</span>
            </button>
          </div>
          <div v-else>
            <div class="mb-3">
              <div class="d-flex justify-content-between align-items-center">
                <div class="fw-bold text-primary">Name:</div>
                <div class="fs-5">{{ user.name }}</div>
                <button @click="startEditing('name')" class="btn btn-link"><i class="fas fa-pen fs-5 text-primary"></i></button>
              </div>
            </div>
          </div>
          <div v-if="editing.email" class="mb-3">
            <input type="email" v-model="editedUser.email" class="form-control mb-2" placeholder="Email">
            <button @click="updateProfile('email')" class="btn btn-primary mb-2" :disabled="isUpdating.email">
              <span v-if="isUpdating.email">
                <span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
                <span role="status">Saving...</span>
              </span>
              <span v-else>Save</span>
            </button>
          </div>
          <div v-else>
            <div class="mb-3">
              <div class="d-flex justify-content-between align-items-center">
                <div class="fw-bold text-primary">Email:</div>
                <div  class="fs-5">{{ user.email }}</div>
                <button @click="startEditing('email')" class="btn btn-link"><i class="fas fa-pen fs-5 text-primary"></i></button>
              </div>
            </div>
          </div>
          <div v-if="editing.phone" class="mb-3">
            <input type="text" v-model="editedUser.phone_number" class="form-control mb-2" placeholder="Phone">
            <button @click="updateProfile('phone_number')" class="btn btn-primary mb-2" :disabled="isUpdating.phone">
              <span v-if="isUpdating.phone">
                <span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
                <span role="status">Saving...</span>
              </span>
              <span v-else>Save</span>
            </button>
          </div>
          <div v-else>
            <div class="mb-3">
              <div class="d-flex justify-content-between align-items-center">
                <div class="fw-bold text-primary">Phone:</div>
                <div  class="fs-5">{{ user.phone_number }}</div>
                <button @click="startEditing('phone')" class="btn btn-link"><i class="fas fa-pen fs-5 text-primary"></i></button>
              </div>
            </div>
          </div>
          <div v-if="updateSuccess" class="alert alert-success mt-3" role="alert">
            {{ updateSuccessMessage }}
          </div>
          <div v-if="updateError" class="alert alert-danger mt-3" role="alert">
            {{ updateErrorMessage }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/utilities/axios'; 

export default {
  data() {
    return {
      user: {},
      editedUser: {},
      editing: {
        name: false,
        email: false,
        phone: false,
        image: false
      },
      updateSuccess: false,
      updateSuccessMessage: '',
      updateError: false,
      updateErrorMessage: '',
      isUpdating: {
        name: false,
        email: false,
        phone: false,
        image: false
      }
    };
  },
  created() {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
      this.editedUser = { ...this.user };
    }
  },
  methods: {
    startEditing(key) {
      Object.keys(this.editing).forEach(editKey => {
        this.editing[editKey] = editKey === key;
      });
    },
    async updateProfile(key) {
      try {
        this.isUpdating[key] = true;
        const response = await api.put('/user', { [key]: this.editedUser[key] });
        console.log('Profile updated successfully:', response.data);
        this.user[key] = this.editedUser[key];
        this.editing[key] = false; 
        this.updateSuccess = true;
        this.updateSuccessMessage = 'Profile updated successfully!';
        setTimeout(() => {
          this.updateSuccess = false;
          this.updateSuccessMessage = '';
        }, 3000);
      } catch (error) {
        console.error('Error updating profile:', error);
        this.updateError = true;
        this.updateErrorMessage = 'Error updating profile. Please try again later.';
        setTimeout(() => {
          this.updateError = false;
          this.updateErrorMessage = '';
        }, 3000);
      } finally {
        this.isUpdating[key] = false;
      }
    },
    handleImageChange(event) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('profile_image', file);
      this.updateProfile(formData);
    }
  }
};
</script>

<style scoped>
.user-image {
  flex-shrink: 0; 
}
</style>
