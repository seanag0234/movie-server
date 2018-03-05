<template>
  <div class="modal" v-bind:class="{'is-active': showAdd}">
    <div class="modal-background" v-on:click="toggleShowAdd"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Add a {{capitalizedType}}</p>
        <button class="delete" v-on:click="toggleShowAdd" aria-label="close"></button>
      </header>
      <section class="modal-card-body">
        <div class="field">
          <label class="label">Title</label>
          <div class="control">
            <input class="input" v-bind:class="{'is-danger': !isValid}" v-model="item.title" type="text">
          </div>
        </div>

        <div class="field">
          <label class="label">Info</label>
          <div class="control">
            <input class="input" type="email" v-model="item.info">
          </div>
        </div>

        <status-selector :item="item"></status-selector>

        <type-selector :item="item" :options="options"></type-selector>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="createMovie" v-bind:disabled="!isValid">Add Movie</button>
        <button class="button" v-on:click="toggleShowAdd">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
  import TypeSelector from "./TypeSelector";
  import StatusSelector from "./StatusSelector";
    export default {
      components: {
        TypeSelector,
        StatusSelector
      },
      name: "add-modal",
      props: ['blankItem', 'options'],
      data() {
        return {
          item: Object.assign({}, this.blankItem)
        }

      },
      methods: {
        ...mapActions({
          addItem: 'addItem',
          toggleShowAddState: 'toggleShowAdd'
        }),
        toggleShowAdd: function () {
          if (this.showAdd) {
            this.newMovie = Object.assign({}, this.blankItem);
          }
          this.toggleShowAddState();
        },
        createMovie: function () {
          if (this.item.type === 'movie') {
            this.addItem(this.item);
          }
          this.item = Object.assign({}, this.blankItem);
          this.toggleShowAdd();
        },
      },
      computed: {
        ...mapGetters(['showAdd']),
        capitalizedType: function () {
          return this.item.type.charAt(0).toUpperCase() + this.item.type.slice(1);
        },
        isValid: function () {
          if (this.item.title === '') {
            return false
          }
          return true;
        },
      }
    }
</script>

<style scoped>

</style>
