<template>
    <footer class="footer">
      <div class="columns">
        <div class="column is-offset-one-quarter is-half">
          <a class="button is-info" href="https://github.com/seanag0234/vue-creative-project" target="_blank"><i style="padding-right: 5px" class="fa fa-github" aria-hidden="true"></i> Github</a>
        </div>
      </div>
    </footer>
</template>

<script>
    export default {
        name: "MyFooter"
    }
</script>

<style scoped>
  .footer {
    position:fixed;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 1rem;
    /*background-color: inherit;*/
    text-align: center;
  }

</style>
