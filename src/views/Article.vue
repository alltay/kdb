<template>
  <Article v-bind:id="id" 
           v-bind:main_url="main_url"/>
</template>

<script>
  import Article from '../components/Article'

  export default {
    components: {
      Article
    },
    props: {
      id: String,
      main_url: String
    },
  }
</script>
