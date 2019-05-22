<template>
  <Search v-bind:search="search"/>
</template>

<script>
  import Search from '../components/Search'

  export default {
    components: {
      Search
    },
    props: {
      search: String,
  },
  }
</script>
