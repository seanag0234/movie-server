<template>
  <div class="columns">
    <div class="column">
      <section class="hero is-info welcome is-small">
        <div class="hero-body no-padding">
          <div class="container page-title">
            <h1 class="title">
              {{title}}
            </h1>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
    export default {
      name: "page-title",
      props: ['title']
    }
</script>

<style scoped>

</style>
