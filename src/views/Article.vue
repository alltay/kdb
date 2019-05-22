<template>
  <Article v-bind:id="id"/>
</template>

<script>
  import Article from '../components/Article'

  export default {
    components: {
      Article
    },
    props: {
      id: String
    },
  }
</script>
