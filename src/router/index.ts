import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import NotFoundView from '../views/NotFoundView.vue'

import JobsView from '../views/candidate/JobsView.vue'
import JobDetailsView from '../views/candidate/JobDetailsView.vue'
import ProfileApplicationsView from '../views/candidate/ProfileApplicationsView.vue'

import NewJobView from '../views/employer/NewJobView.vue'
import EditJobView from '../views/employer/EditJobView.vue'
import OverviewView from '../views/employer/OverviewView.vue'

import AdminView from '../views/admin/AdminView.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/jobs',
      name: 'jobs',
      component: JobsView
    },
    {
      path: '/jobs/:id',
      name: 'job-details',
      component: JobDetailsView
    },
  
    {
      path: '/my',
      name: 'profile-applications',
      component: ProfileApplicationsView
    },
    {
      path: '/jobs/new',
      name: 'new-job',
      component: NewJobView
    },
    {
      path: '/jobs/:id/edit',
      name: 'edit-job',
      component: EditJobView
    },
    {
      path: '/overview',
      name: 'employer-overview',
      component: OverviewView
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView
    },
    {
      path: '/:pathMatch(.*)*',
      component: NotFoundView
    }
  ]
})

export default router
