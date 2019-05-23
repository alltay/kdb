<template>
  <v-container grid-list-md>
     <div class="text-xs-center">
      <v-progress-circular
        :size="50"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>
  </v-container>
</template>


<script>

export default {
  name: 'Loading',

}

</script>

<style scoped>
</style>