<template>
  <div>
    <nav-bar></nav-bar>
    <section class="hero is-fullheight">
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="column is-4 is-offset-4">
            <h3 class="title has-text-grey">Login</h3>
            <p class="subtitle has-text-grey">Please login to the <b>Sandberg Movie Repository</b></p>
            <div class="box">
              <form>
                <div class="field">
                  <div class="control">
                    <input class="input is-large" type="email" placeholder="Your Email" autofocus="">
                  </div>
                </div>
                <div class="field">
                  <div class="control">
                    <input class="input is-large" type="password" placeholder="Your Password">
                  </div>
                </div>
                <div class="field">
                  <label class="checkbox">
                    <input type="checkbox">
                    Remember me
                  </label>
                </div>
                <a v-on:click="temp" class="button is-block is-info is-large">Login</a>
              </form>
            </div>
            <p class="has-text-grey">
              <a href="../">Sign Up</a> &nbsp;·&nbsp;
              <a href="../">Forgot Password</a> &nbsp;·&nbsp;
              <a href="../">Need Help?</a>
            </p>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
  import NavBar from './NavBar.vue';
export default {
  name: 'Login',
  components: {
    NavBar,
    'nav-bar': NavBar
  },
  data() {
    return {
      count: 0
    }
  },
  methods: {
    temp: function () {
      console.log("CLICKED");
      this.count += 1;
    }
  }
}


</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
