import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Logout from '../views/Logout.vue'
import Register from '../views/Register.vue'
import store from '../store/index'
import MyProfile from '../views/MyProfile.vue'
import CreateProfile from '../views/CreateProfile.vue'
import CalendarView from '../views/CalendarView.vue'
import DailyView from '../views/DailyView.vue'
import FoodLog from '../views/FoodLog.vue'
import MealView from '../views/MealView.vue'
import AnalyticsView from '../views/AnalyticsView.vue'

Vue.use(Router);

/**
 * The Vue Router is used to "direct" the browser to render a specific view component
 * inside of App.vue depending on the URL.
 *
 * It also is used to detect whether or not a route requires the user to have first authenticated.
 * If the user has not yet authenticated (and needs to) they are redirected to /login
 * If they have (or don't need to) they're allowed to go about their way.
 */

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/logout",
      name: "logout",
      component: Logout,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/create-profile",
      name: "create-profile",
      component: CreateProfile,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/my-profile",
      name: "my-profile",
      component: MyProfile,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/calendar",
      name: "calendar",
      component: CalendarView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/daily-view',
      name: 'daily-view',
      component: DailyView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/meal/:mealId',
      name: 'meal',
      component: MealView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/food-log/:mealId',
      name: 'food-log',
      component: FoodLog,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/analytics',
      name: 'analytics',
      component: AnalyticsView,
      meta: {
        requiresAuth: true
    }
  }
  ]
})

router.beforeEach((to, from, next) => {
  // Determine if the route requires Authentication
  const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);

  // If it does and they are not logged in, send the user to "/login"
  if (requiresAuth && store.state.token === "") {
    next("/login");
  } else {
    // Else let them go to their next destination
    next();
  }
});

export default router;
