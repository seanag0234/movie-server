<template>
  <div class="field">
    <label class="label">Type</label>
    <div class="control select">
      <select v-model="item.medium">
        <option v-for="option in options" :key="option.value" :value="option.value">{{option.name}}</option>
      </select>
    </div>
  </div>
</template>

<script>
  export default {
    name: "type-selector",
    props: ['item', 'options']
  }
</script>

<style scoped>

</style>
