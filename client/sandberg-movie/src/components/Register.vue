<template>
  <div>
    <section class="hero is-fullheight">
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="column is-4 is-offset-4">
            <h3 class="title has-text-grey">Register</h3>
            <!--<p class="subtitle has-text-grey">Please register</p>-->
            <div class="box">
              <form>
                <div class="field">
                  <div class="control">
                    <input class="input" type="email" v-model="email" placeholder="Your Email" autofocus="" required>
                  </div>
                </div>
                <div class="field">
                  <div class="control">
                    <input class="input" type="password" v-model="password" placeholder="Your Password" required>
                  </div>
                </div>
                <div class="field">
                  <div class="control">
                    <input class="input" v-if="passwordsMatch" type="password" v-model='confirmPassword' placeholder="Reenter Password" title="Reenter Password" required>
                    <input class="input no_match" v-if="!passwordsMatch" type="password" v-model='confirmPassword' placeholder="Passwords don't match" title="Passwords don't match" required>
                  </div>
                </div>
                <a v-on:click="register" class="button is-block is-info" :disabled="!(email && passwordsMatch)">Register</a>
              </form>
            </div>
            <p class="has-text-grey">
              <router-link :to="{name: 'Login'}">
                <a>Login</a> &nbsp;·&nbsp;
              </router-link>
              <a href="../">Forgot Password</a>
            </p>
          </div>
          <div v-if="error" class="notification is-danger">
            {{error}}
            <button class="delete"></button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import NavBar from './NavBar.vue';
  const apiConnector = require('../js/apiConnector');
  export default {
    name: "Register",
    components: {
      NavBar,
      'nav-bar': NavBar
    },
    data() {
      return {
        password: '',
        confirmPassword: '',
        email: '',
        error: ''
      }
    },
    methods: {
      register: function() {
        if (this.password.length < 5) {
          this.error = "Password must be at least 5 characters long.";
          return;
        }
        apiConnector.registerUser(this.email, this.password)
          .then(response => {
            console.log(response);
            if (response.status === 400) {
              this.error = response.data.message;
            }
          })
          .catch(err => {
            console.log(err);
            this.error = err.data.message;
          });

        // console.log("RESPONSE");
        // console.log(res);
        // if (res.status === 400) {
        //   this.error = res.data.message;
        // }
      }
    },
    computed: {
      passwordsMatch: function() {
        return this.password === this.confirmPassword;
      },
      validForm: function () {
        return this.email && this.passwordsMatch;

      }
    }
  }
</script>

<style scoped>

</style>
