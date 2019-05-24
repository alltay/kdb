<template>
  <Login v-bind:main_url="main_url"/>
</template>

<script>
  import Login from '../components/Login'

  export default {
    components: {
      Login
    },
    props: {
      main_url: String
    },
  }
</script>
