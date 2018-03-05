<template>
  <div class="modal" v-bind:class="{'is-active': showEdit}">
    <div class="modal-background" v-on:click="toggleShowEdit"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Editing '{{currentItem.title}}'</p>
        <button class="delete" v-on:click="toggleShowEdit" aria-label="close"></button>
      </header>
      <section class="modal-card-body">
        <div class="field">
          <label class="label">Title</label>
          <div class="control">
            <input class="input" v-on:keyup.prevent="calcValidity" v-bind:class="{'is-danger': !isValid}" v-model="item.title" type="text">
          </div>
        </div>

        <div class="field">
          <label class="label">Info</label>
          <div class="control">
            <input class="input" type="email" v-model="item.info">
          </div>
        </div>

        <status-selector :item="item"></status-selector>

        <type-selector :options="options" :item="item"></type-selector>

        <!--<div class="field">-->
          <!--<label class="label">Type</label>-->
          <!--<div class="control select">-->
            <!--<select v-model="item.medium">-->
              <!--<option value="Blu Ray">Blu Ray</option>-->
              <!--<option value="DVD">DVD</option>-->
            <!--</select>-->
          <!--</div>-->
        <!--</div>-->
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="saveItem" v-bind:disabled="!isValid">Save Changes</button>
        <button class="button" v-on:click="toggleShowEdit">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
  import TypeSelector from './TypeSelector'
  import StatusSelector from "./StatusSelector";
  export default {
    components: {
      StatusSelector,
      TypeSelector},
    name: "edit-modal",
    props: ['options'],
    data() {
      return {
        isValid: true
      }
    },
    computed: {
      ...mapGetters(['showEdit', 'currentItem']),
      item: function () {
        return Object.assign({}, this.currentItem);
      },
    },
    methods: {
      ...mapActions({
        updateItem: 'updateItem',
        toggleShowEdit: 'toggleShowEdit'
      }),
      saveItem: function () {
        this.updateItem(this.item);
        this.toggleShowEdit();
      },
      calcValidity: function () {
        if (this.item.title === '') {
          this.isValid = false;
        } else {
          this.isValid = true;
        }

      }
    }
  }
</script>

<style scoped>

</style>
