import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import LogoutView from '@/views/LogoutView.vue'
import RegisterView from '@/views/RegisterView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

import JobsView from '@/views/candidate/JobsView.vue'
import JobDetailsView from '@/views/candidate/JobDetailsView.vue'
import ProfileApplicationsView from '@/views/candidate/ProfileApplicationsView.vue'

import NewJobView from '@/views/employer/NewJobView.vue'
import EditJobView from '@/views/employer/EditJobView.vue'
import OverviewView from '@/views/employer/OverviewView.vue'

import AdminView from '@/views/admin/AdminView.vue'

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
      meta: { guestOnly: true },
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      meta: { guestOnly: true },
      component: RegisterView
    },
    {
      path: '/logout',
      name: 'logout',
      component: LogoutView
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
      meta: { authOnly: true },
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
      meta: { adminOnly: true },
      component: AdminView
    },
    {
      path: '/:pathMatch(.*)*',
      component: NotFoundView
    }
  ]
})

router.beforeEach((to, from) => {
  const userStore = useUserStore()
  console.log(from)

  if (to.meta.guestOnly && userStore.isLogged) {
    toast.error('You are already logged in !!!')
    return false
  }

  if (to.meta.authOnly && !userStore.isLogged) {
    toast.error('You must be login first !!!')
    return false
  }

  if (to.meta.adminOnly && (!userStore.isLogged || !userStore.isAdmin)) {
    toast.error('Only Admins Allowed !!!')
    return false
  }
})

export default router
