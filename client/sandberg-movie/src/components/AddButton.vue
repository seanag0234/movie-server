<template>
  <div class="columns" style="">
    <div class="column">
      <a @click="toggleShowAdd" class="button is-info has-text-weight-bold">Add<i style="padding-left: 8px" class="fa fa-plus-circle" aria-hidden="true"></i></a>
    </div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex';
  export default {
    name: "add-button",
    methods: {
      ...mapActions({
        toggleShowAdd: 'toggleShowAdd',
      }),
    }
  }
</script>

<style scoped>

</style>
