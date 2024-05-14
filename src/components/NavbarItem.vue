<template>
  <nav class="navbar navbar-expand-lg px-2 m-0 " style=" background-color: #2784FC;">
    <a class="navbar-brand fs-1 ms-2 me-lg-5 fw-bold text-white" style="font-family: 'Dancing Script', cursive;" href="#"> 
    <router-link to="/" class="text-decoration-none text-white">CareerHub</router-link>
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <div class="navbar-nav me-auto  ">
        <a class="nav-item nav-link fs-4 me-lg-4 rounded-5">
          <router-link to="/jobs" class="text-decoration-none text-white">Jobs</router-link>
        </a>
        <a class="nav-item nav-link fs-4 me-lg-4 rounded-5">
          <router-link to="/" class="text-decoration-none text-white">Employers</router-link>
        </a>
      </div>
      <form class="d-flex mx-auto mx-lg-0 w-100 w-lg-auto mt-2"> <!-- Centered search bar -->
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-dark me-3 fw-bold text-white" type="submit">Search</button>
      </form>
      <div class="navbar-nav ms-auto fs-4  mt-2">
        <a class="nav-item nav-link fs-4 me-4 p-2 rounded-5 ">
          <router-link to="/login" class="text-decoration-none text-white">Login</router-link>
        </a>
        <a class="nav-item nav-link fs-4 me-4 p-2 rounded-5 ">
          <router-link to="/register" class="text-decoration-none text-white">Register</router-link>
        </a>
        <li class="nav-item dropdown rounded-3">
          <a class=" nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <router-link to="/my" class="text-decoration-none text-white"><li><a class="dropdown-item fs-5" href="#">Profile</a></li></router-link>
            <li><a class="dropdown-item fs-5" href="#">Logout</a></li>
          </ul>
        </li>
        <i class="fa-regular fa-circle-user fs-2 m-3"></i>
      </div>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style>
.nav-item:hover {
  background-color: black;
}
</style>
