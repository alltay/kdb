<template>
  <List v-bind:id="id"
        v-bind:category="category"
        v-bind:main_url="main_url"/>
</template>

<script>
  import List from '../components/List'

  export default {
    components: {
      List
    },
    props: {
      id: String,
      category: String,
      main_url: String,
  },
  }
</script>
