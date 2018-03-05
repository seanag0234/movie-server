<template>
  <div class="field">
    <label class="label">Status</label>
    <div class="control select">
      <select v-model="item.status">
        <option value="owned">In my library</option>
        <option value="loaned">Loaned out</option>
        <option value="borrowed">Borrowed</option>
        <option value="wishList">Wish List</option>
      </select>
    </div>
  </div>
</template>

<script>
  export default {
    name: "status-selector",
    props: ['item']
  }
</script>

<style scoped>

</style>
