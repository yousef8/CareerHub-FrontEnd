<template>
    <div class="register-container d-flex align-items-center">
        <div class="register-form container text-dark bg-white">
            <h1 class="my-4 text-center fw-semibold">Sign up to join CareerHub</h1>
            <p class="text-center">Already have an account? <router-link to="/login">Login instead</router-link></p>
            <form @submit.prevent="handleSubmit" class="d-flex flex-column align-items-center">
                <div class="mb-3 w-75">
                    <label for="name" class="form-label">Name</label>
                    <input v-model="name" type="text" id="name" class="form-control">
                    <p v-if="!nameValid && formSubmitted" class="text-danger mt-1">Please enter a valid name</p>
                </div>
                <div class="mb-3 w-75">
                    <label for="email" class="form-label">Email</label>
                    <input v-model="email" type="email" id="email" class="form-control">
                    <p v-if="!emailValid && formSubmitted" class="text-danger mt-1">Please enter a valid email address</p>
                </div>
                <div class="mb-3 w-75">
                    <label for="password" class="form-label">Password</label>
                    <input v-model="password" type="password" id="password" class="form-control">
                    <p v-if="!passwordValid && formSubmitted" class="text-danger mt-1">Password must be at least 8 characters long</p>
                </div>
                <div class="mb-3 w-75">
                    <label for="confirm-password" class="form-label">Confirm Password</label>
                    <input v-model="confirmPassword" type="password" id="confirm-password" class="form-control"
                    >
                    <p v-if="!confirmPasswordValid && formSubmitted" class="text-danger mt-1">Passwords do not match</p>
                </div>
                <div class="mb-3 w-75">
                    <label for="phone-number" class="form-label">Phone Number</label>
                    <input v-model="phoneNumber" type="tel" id="phone-number" class="form-control">
                    <p v-if="!phoneValid && formSubmitted" class="text-danger mt-1">Please enter a valid phone number</p>
                </div>
                <div class="mb-3 w-75">
                    <label for="profile-image" class="form-label">Profile Image</label>
                    <input type="file" accept="image/*" id="profile-image" class="form-control"
                        @change="handleProfileImageChange">
                </div>
                <div class="mb-3 w-75">
                    <label for="cover-image" class="form-label">Cover Image</label>
                    <input type="file" accept="image/*" id="cover-image" class="form-control"
                        @change="handleCoverImageChange">
                </div>
                <div class="mb-3 w-75">
                    <label for="role" class="form-label">Role</label>
                    <select v-model="role" id="role" class="form-select">
                        <option value="" disabled>Select Role</option>
                        <option value="employer">Employer</option>
                        <option value="candidate">Candidate</option>
                    </select>
                    <p v-if="!roleValid && formSubmitted" class="text-danger mt-1">Please select a role</p>
                </div>
                <button type="submit" class="btn btn-primary my-4 w-25 fs-5" :disabled="!formValid && formSubmitted">Register</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            phoneNumber: '',
            profileImage: null,
            coverImage: null,
            role: '',
            formSubmitted: false
        };
    },
    computed: {
        nameValid() {
            return this.name.length > 0;
        },
        emailValid() {
            return /\S+@\S+\.\S+/.test(this.email);
        },
        passwordValid() {
            return this.password.length >= 8;
        },
        confirmPasswordValid() {
            return this.password === this.confirmPassword;
        },
        phoneValid() {
            return /^01[0125][0-9]{8}$/.test(this.phoneNumber);
        },
        roleValid() {
            return this.role !== '';
        },
        formValid() {
            return this.nameValid && this.emailValid && this.passwordValid && this.confirmPasswordValid && this.phoneValid && this.roleValid;
        },
    },
    methods: {
        handleProfileImageChange(event) {
            this.profileImage = event.target.files[0];
        },
        handleCoverImageChange(event) {
            this.coverImage = event.target.files[0];
        },
        handleSubmit() {
            this.formSubmitted = true;
            if (this.formValid) {
                alert(`Name: ${this.name}, Email: ${this.email}, Password: ${this.password}, Phone Number: ${this.phoneNumber}, Role: ${this.role}, Profile Image ${this.profileImage}`);
                console.log(this.profileImage);
                console.log(this.coverImage);
            }
        },
    },
};
</script>

<style scoped>
.register-container {
    height: 100%;
    background-color: #ebebeb !important;
    background: radial-gradient(circle at 0px 0px, rgb(18, 70, 149), rgb(0, 112, 235)) 0px 0px / 100% 460px no-repeat;
    padding: 70px;
}

.register-form {
    border-radius: 10px;
}

@media (max-width: 576px) {
    .register-container {
        padding: 30px;
    }

    .register-form {
        width: 100%;
    }

    .btn {
        width: 80% !important;
    }
}
</style>