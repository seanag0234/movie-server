<template>
  <div>
    <nav class="navbar is-info">
      <div class="container">
        <div class="navbar-brand">
          <!--<a class="navbar-item has-text-weight-bold" href="#">MYLOGO</a>-->
          <a class="navbar-item">
            <!--<img src="../assets/logo.png"  alt="Bulma">-->
          </a>
          <div class="navbar-burger burger" data-target="navMenu">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div class="navbar-menu" id="navMenu">
          <div class="navbar-start">
            <div class="navbar-item has-dropdown is-hoverable">
              <a href="#" class="navbar-link is-active"><i class="material-icons md-36" style="padding-right: 10px">movie_filter</i>Browse</a>
              <div class="navbar-dropdown">
                <a href="#" class="navbar-item">Amazing Product</a>
                <a href="#" class="navbar-item">Superior Quality</a>
                <a href="#" class="navbar-item">Another Amazing Product</a>
              </div>
            </div>
          </div>
          <div class="navbar-end">
            <a href="index.html" class="navbar-item">Home</a>
            <a href="/secondary.html" class="navbar-item">Services</a>
            <a href="#" class="navbar-item">Docs</a>
            <a href="#" class="navbar-item">Contact</a>
          </div>
        </div>
      </div>
    </nav>
  </div>
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
          var target = $el.dataset.target;
          var $target = document.getElementById(target);

          // Toggle the class on both the "navbar-burger" and the "navbar-menu"
          $el.classList.toggle('is-active');
          $target.classList.toggle('is-active');

        });
      });
    }

  });
    export default {
        name: "nav-bar"
    }
</script>

<style lang="sass" scoped>
  /*@import "../assets/sass/main.sass"dd*/

</style>
