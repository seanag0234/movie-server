<template>
  <div class="container">

    <page-title :title="title"></page-title>

    <add-button></add-button>

    <item-table :items="movies"></item-table>

    <edit-modal :current-item="currentItem" :options="options"></edit-modal>

    <add-modal :blank-item="blankMovie" :options="options"></add-modal>

    <delete-modal :item="currentItem"></delete-modal>

  </div>
</template>

<script>
  import DeleteModal from '../DeleteModal'
  import AddModal from '../AddModal'
  import EditModal from '../EditModal'
  import ItemTable from '../ItemTable'
  import AddButton from '../AddButton'
  import PageTitle from '../PageTitle'
  import {mapGetters} from 'vuex';
  export default {
    name: "my-movies",
    components: {
      PageTitle,
      AddButton,
      ItemTable,
      AddModal,
      DeleteModal,
      EditModal,
    },
    data() {
      return {
        title: 'My Movies',
        blankMovie: {
          title: '',
          medium: 'DVD',
          info: '',
          type: 'movie',
          status: 'owned'
        },
        currentItem: {},
        options: [
          {value: 'DVD', name: 'DVD'},
          {value: 'Blu Ray', name: 'Blu Ray'}
        ]
      }
    },
    computed: {
      ...mapGetters([
        'isAuthenticated',
        'user'
      ]),
      movies: function () {
        return this.user.movies.filter(m => {
          return m.status === 'owned';
        }).sort((a, b) => {
          const titleA = a.title.toLowerCase();
          const titleB = b.title.toLowerCase();

          if (titleA < titleB) {
            return -1;
          }
          if (titleA > titleB) {
            return 1;
          }
          return 0;
        })
      },
    },
  }
</script>

<style scoped>

</style>
