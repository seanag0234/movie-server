<template>
  <div class="container">
    <div class="columns">
      <div class="column is-centered">
        <!--<nav class="breadcrumb" aria-label="breadcrumbs">-->
          <!--<ul>-->
            <!--<li class="is-active"><router-link to="/">Home</router-link></li>-->
          <!--</ul>-->
        <!--</nav>-->
        <section class="hero is-info welcome is-small">
          <div class="hero-body">
            <div class="container">
              <h1 class="title">
                Hey {{user.name}}! :)
              </h1>
              <h2 class="subtitle">
                I hope you are having a great day!
              </h2>
            </div>
          </div>
        </section>
        <section class="info-tiles">
          <div class="tile is-ancestor has-text-centered">
            <div class="tile is-parent">
              <article class="tile is-child box">
                <p class="title">{{user.movies.length}}</p>
                <p class="subtitle">Movies Owned</p>
              </article>
            </div>
            <!--<div class="tile is-parent">-->
              <!--<article class="tile is-child box">-->
                <!--<p class="title">{{user.movies.loaned.length}}</p>-->
                <!--<p class="subtitle">Movies Loaned</p>-->
              <!--</article>-->
            <!--</div>-->
            <!--<div class="tile is-parent">-->
              <!--<article class="tile is-child box">-->
                <!--<p class="title">{{user.movies.borrowed.length}}</p>-->
                <!--<p class="subtitle">Movies Borrowed</p>-->
              <!--</article>-->
            <!--</div>-->
            <!--<div class="tile is-parent">-->
              <!--<article class="tile is-child box">-->
                <!--<p class="title">{{user.movies.wishList.length}}</p>-->
                <!--<p class="subtitle">Wishlished Movies</p>-->
              <!--</article>-->
            <!--</div>-->
          </div>
        </section>
        <div class="columns">
          <div class="column is-6">
            <div class="card events-card">
              <header class="card-header">
                <p class="card-header-title">
                  Recent Activity
                </p>
                <!--<a href="#" class="card-header-icon" aria-label="more options">-->
                  <!--<span class="icon">-->
                    <!--<i class="fa fa-angle-down" aria-hidden="true"></i>-->
                  <!--</span>-->
                <!--</a>-->
              </header>
              <div class="card-table">
                <div class="content">
                  <table class="table is-fullwidth is-striped is-hoverable">
                    <tbody>
                    <tr>
                      <td class="is-hidden-mobile"></td>
                      <th>Title</th>
                      <th>Status</th>
                    </tr>
                    <tr v-for="movie in recentActivity" :key="movie.id" @click="goToMovie(movie)">
                      <td width="5%" class="is-hidden-mobile"><i class="fa fa-film" aria-hidden="true"></i></td>
                      <td>{{movie.title}}</td>
                      <td>{{statusMap[movie.status]}}</td>
                      <!--<td><a class="button is-small is-primary" href="#">Action</a></td>-->
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <footer class="card-footer">
                <!--<a href="#" class="card-footer-item">view all</a>-->
              </footer>
            </div>
          </div>
          <div class="column is-6">
            <div class="card">
              <header class="card-header">
                <p class="card-header-title">
                  Movie Search
                </p>
                <a href="#" class="card-header-icon" aria-label="more options">
                  <!--<span class="icon">-->
                    <!--<i class="fa fa-angle-down" aria-hidden="true"></i>-->
                  <!--</span>-->
                </a>
              </header>
              <div class="card-content">
                <div class="content">
                  <div class="control has-icons-left has-icons-right">
                    <input v-model.trim="search" class="input is-large" type="text" placeholder="">
                    <span class="icon is-medium is-left">
                      <i class="fa fa-search"></i>
                    </span>
                    <!--<span class="icon is-medium is-right">-->
                      <!--<i class="fa fa-check"></i>-->
                    <!--</span>-->
                  </div>
                </div>
                  <table class="table is-fullwidth is-striped is-hoverable" v-if="searchResults.length > 0">
                    <tbody>
                    <tr v-for="result in searchResults" :key="result.id">
                      <td width="5%"><i class="fa fa-film" aria-hidden="true"></i></td>
                      <td><router-link to="/my-movies">{{result.title}}</router-link></td>
                    </tr>
                    </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
  import router from '../router/index'
  export default {
    name: 'Home',
    data () {
      return {
        search: '',
        searchResults: []
      }
    },
    computed: {
      ...mapGetters([
        'isAuthenticated',
        'user',
        'statusMap'
      ]),
      recentActivity: function() {
        return this.allMovies.slice(0, 5);
      },
      allMovies: function () {
        return this.user.movies.slice(0).sort((a, b) => {
          if (a.updatedAt > b.updatedAt) {
            return -1;
          }
          if (a.updatedAt < b.updatedAt) {
            return 1
          }
          return 0;
        });
      },
    },
    watch: {
      search: function(value, oldValue) {
        if (value === '') {
          this.searchResults = [];
        } else if (value !== oldValue) {
          this.doSearch();
        }
      },
    },
    methods: {
      ...mapActions({
        logout: 'logout'
      }),
      doSearch: function () {
        this.searchResults = this.allMovies.filter(movie => {
          let title = movie.title.toLowerCase();
          return title.includes(this.search.toLowerCase());
        })
          .sort((a, b) => {
            if (a.title < b.title) {
              return -1;
            }
            if (a.title > b.title) {
              return 1;
            }
            return 0;
          });
      },
      goToMovie: function (movie) {
        router.push(`/my-movies?movie=${movie.id}`)
      }
    }
}
</script>
<style scoped>
</style>
