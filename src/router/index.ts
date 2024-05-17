import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { toast } from 'vue3-toastify'

const HomeView = () => import('@/views/HomeView.vue');
const NotFoundView = () => import('@/views/NotFoundView.vue');
const LoginView = () => import('@/views/LoginView.vue');
const RegisterView = () => import('@/views/RegisterView.vue');
const LogoutView = () => import('@/views/LogoutView.vue');

const JobsView = () => import('@/views/candidate/JobsView.vue');
const JobDetailsView = () => import('@/views/candidate/JobDetailsView.vue');
const ProfileApplicationsView = () => import('@/views/candidate/ProfileApplicationsView.vue');

const NewJobView = () => import('@/views/employer/NewJobView.vue');
const EditJobView = () => import('@/views/employer/EditJobView.vue');
const OverviewView = () => import('@/views/employer/OverviewView.vue');

const AdminView = () => import('@/views/admin/AdminView.vue');
const AdminAnalyticsView = () => import('@/views/admin/AdminAnalyticsView.vue');

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
      meta: { employerOnly: true },
      component: NewJobView
    },
    {
      path: '/jobs/:id/edit',
      name: 'edit-job',
      meta: { employerOnly: true },
      component: EditJobView
    },
    {
      path: '/overview',
      name: 'employer-overview',
      meta: { employerOnly: true },
      component: OverviewView
    },
    {
      path: '/admin',
      name: 'admin',
      meta: { adminOnly: true },
      component: AdminView
    },
    {
      path: '/admin/analytics',
      name: 'admin-analytics',
      meta: { adminOnly: true },
      component: AdminAnalyticsView
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView
    }
  ]
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  if (to.meta.authOnly && !userStore.isLogged) {
    next({ name: 'login' })
  } else if (to.meta.guestOnly && userStore.isLogged) {
    next({ name: 'home' })
  } else if (to.meta.employerOnly && (!userStore.isLogged || !userStore.isEmployer)) {
    next({ name: 'home' })
  } else if (to.meta.adminOnly && (!userStore.isLogged || !userStore.isAdmin)) {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
