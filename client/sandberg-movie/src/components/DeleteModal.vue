<template>
  <div class="modal" v-bind:class="{'is-active': showDelete}">
    <div class="modal-background" v-on:click="toggleShowDelete"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Delete</p>
        <button class="delete" v-on:click="toggleShowDelete" aria-label="close"></button>
      </header>
      <section class="modal-card-body">

        <div class="field">
          <span>Are you sure you want to delete {{currentItem.title}}?</span>
        </div>

      </section>
      <footer class="modal-card-foot">
        <button class="button is-danger" @click="removeItem">Delete</button>
        <button class="button" v-on:click.prevent="toggleShowDelete">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
    export default {
      name: "delete-modal",
      data() {
        return {
          // show: false,
          // currentItem: {}
        }
      },
      computed: {
        ...mapGetters(['showDelete', 'currentItem'])
      },
      methods: {
        ...mapActions({
          deleteItem: 'deleteItem',
          toggleShowDelete: 'toggleShowDelete'
        }),
        removeItem: function () {
          this.toggleShowDelete();
          this.deleteItem(this.currentItem);
        },
      }
    }
</script>

<style scoped>

</style>
