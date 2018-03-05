import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import Register from '../components/Register'
import Home from '../components/Home'
import MyMovies from '../components/movie/MyMovies'
import LoanedMovies from '../components/movie/LoanedMovies'
import MovieWishlist from '../components/movie/MovieWishlist'
import BorrowedMovies from '../components/movie/BorrowedMovies'
import {state} from '../main.js'

Vue.use(Router);
let router = new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/',
      name: 'Home',
      meta: {requiresAuth: true},
      component: Home
    },
    {
      path: '/movies/mine',
      name: 'MyMovies',
      meta: {requiresAuth: true},
      component: MyMovies
    },
    {
      path: '/movies/loaned',
      name: 'LoanedMovies',
      meta: {requiresAuth: true},
      component: LoanedMovies
    },
    {
      path: '/movies/wish-list',
      name: 'MovieWishlist',
      meta: {requiresAuth: true},
      component: MovieWishlist
    },
    {
      path: '/movies/borrowed',
      name: 'BorrowedMovies',
      meta: {requiresAuth: true},
      component: BorrowedMovies
    }
  ]
});


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!state.isAuthenticated) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
});

export default router
