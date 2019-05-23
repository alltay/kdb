<template>
  <Search v-bind:search="search"
          v-bind:main_url="main_url"/>
</template>

<script>
  import Search from '../components/Search'

  export default {
    components: {
      Search
    },
    props: {
      search: String,
      main_url: String
  },
  }
</script>
