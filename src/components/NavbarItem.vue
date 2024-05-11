<template>
  <nav class="navbar navbar-expand-lg px-2 m-0 bg-success-subtle">
    <a class="navbar-brand fs-1 ms-2 me-lg-5 fw-bold" style="font-family: 'Dancing Script', cursive;" href="#">CareerHub</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <div class="navbar-nav me-auto  ">
        <a class="nav-item nav-link fs-4 me-lg-4 rounded-5">
          <router-link to="/" class="text-decoration-none text-dark">Home</router-link>
        </a>
        <a class="nav-item nav-link fs-4 me-lg-4 rounded-5">
          <router-link to="/jobs" class="text-decoration-none text-dark">Jobs</router-link>
        </a>
        <a class="nav-item nav-link fs-4 me-lg-4 rounded-5">
          <router-link to="/" class="text-decoration-none text-dark">Employers</router-link>
        </a>
      </div>
      <form class="d-flex mx-auto mx-lg-0 w-100 w-lg-auto mt-2"> <!-- Centered search bar -->
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-dark me-3 fw-bold" type="submit">Search</button>
      </form>
      <div class="navbar-nav ms-auto fs-4  mt-2">
        <a class="nav-item nav-link fs-4 me-4 p-2 rounded-5 ">
          <router-link to="/" class="text-decoration-none text-dark">Login</router-link>
        </a>
        <a class="nav-item nav-link fs-4 me-4 p-2 rounded-5 ">
          <router-link to="/" class="text-decoration-none text-dark">Register</router-link>
        </a>
        <li class="nav-item dropdown rounded-3">
          <a class=" nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <router-link to="/dynamic" class="text-decoration-none text-dark"><li><a class="dropdown-item" href="#">Profile</a></li></router-link>
            <li><a class="dropdown-item" href="#">Logout</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
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
  background-color: white;
}
</style>
