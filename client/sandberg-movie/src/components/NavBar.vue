<template>
  <nav class="navbar welcome is-info">
    <div class="container">
      <div class="navbar-brand">
        <router-link  class="navbar-item brand-text"  to="/" exact>
          The Sandberg Vault
        </router-link>
        <div class="burger navbar-burger" data-target="navMenu">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div id="navMenu" class="navbar-menu">
        <div class="navbar-start" v-if="isAuthenticated">
          <router-link class="navbar-item" :to="{name: 'Home'}" exact>
            Home
          </router-link>
          <div class="navbar-item has-dropdown is-hoverable" >
            <a  class="navbar-link" >
              Movies
            </a>
            <div class="navbar-dropdown is-boxed">
              <router-link  class="navbar-item"  :to="{name: 'MyMovies'}">
                My movies

              </router-link>
              <router-link  class="navbar-item"  :to="{name: 'MovieWishlist'}">
                My Wishlist
              </router-link>
              <router-link  class="navbar-item"  :to="{name: 'LoanedMovies'}">
                Loaned
              </router-link>
              <router-link  class="navbar-item"  :to="{name: 'BorrowedMovies'}">
                Borrowed
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
  document.addEventListener('DOMContentLoaded', function () {

    // Get all "navbar-burger" elements
    var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {

      // Add a click event on each of them
      $navbarBurgers.forEach(function ($el) {
        $el.addEventListener('click', function () {

          // Get the target from the "data-target" attribute
          let target = $el.dataset.target;
          let $target = document.getElementById(target);

          // Toggle the class on both the "navbar-burger" and the "navbar-menu"
          $el.classList.toggle('is-active');
          $target.classList.toggle('is-active');

        });
      });
    }

  });

  import {mapGetters} from 'vuex';
  export default {
    name: "nav-bar",
    computed: {
      ...mapGetters(['isAuthenticated'])
    },
  }
</script>

<style scoped>
  nav.navbar {
    border-top: 4px solid #276cda;
    margin-bottom: 1rem;
  }
  .navbar-item.brand-text {
    font-weight: 800;
  }
  .navbar-item, .navbar-link {
    font-size: 14px;
    font-weight: 700;
  }
</style>
