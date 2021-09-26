import { createRouter, createWebHashHistory } from 'vue-router'
import store from '../store'

import GuestLayout from '../layouts/GuestLayout.vue'

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import About from '../views/About.vue'

import DashboardLayout from '../layouts/DashboardLayout.vue'
import Settings from '../views/Settings.vue'
import Reports from '../views/Reports.vue'
import Dashboard from '../views/Dashboard.vue'
// import Logout from '../views/Logout.vue'

const routes= [
   

      {
        path: '/',
        component: GuestLayout,
        children: [
          {
            path: '/',
            name: 'Home',
            component: Home
          },
          {
            path: '/about',
            name: 'About',
            component: About
          },
          {
            path: '/login',
            name: 'Login',
            component: Login
          },
        ]
      },
      {
        path: '/dashboard',
        component: DashboardLayout,
        meta: {
          requiresAuth: true
        },
        children: [
          {
            path: '',
            name: 'Dashboard',
            component: Dashboard,
            meta: {
              roles: ['Admin', 'Standard']
            }
          },
          {
            path: '/settings',
            name: 'Settings',
            component: Settings,
            meta: {
              roles: ['Admin', 'Standard']
            }
          },
          {
            path: '/reports',
            name: 'Reports',
            component: Reports,
            meta: {
              roles: ['Admin']
            }
          },
        ]
      }
    ]
// keep it simple for now.
const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
  })

  router.beforeEach((to, from, next) => {
    if (to.meta?.requiresAuth && store.state.isAuthenticated) {
      // let users enter if authenticated
      if (to.meta?.roles?.includes(store.state.users.currentUser.role)) {
        next()
      } else {
        console.log('User is not authorized for route.')
      }
    } else if (to.meta?.requiresAuth) {
      // otherwise, route them to /login
      next('/login')
    } else {
      next()
    }
  })
  export default router;