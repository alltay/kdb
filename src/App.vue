<template>
 <v-app id="inspire">

   <v-navigation-drawer
      stateless
      value="true"
      clipped
      fixed
      v-model="drawer"
      app
    >
      <v-list>
        <v-list-tile v-bind:to="'/'">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Главная</v-list-tile-title>
        </v-list-tile>
  
        <v-list-group
          prepend-icon="account_circle"
          value="true"
        >
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-title>Документация</v-list-tile-title>
            </v-list-tile>
          </template>
          <v-list-group
            no-action
            sub-group
            value="true"
          >
            <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-title>По категориям</v-list-tile-title>
              </v-list-tile>
            </template>
  
            <v-list-tile
              v-for="cat in cats"
              v-bind:key="cat.id"
              v-bind:to="'/lists/category/' + cat.id"
            >
              <v-list-tile-title v-text="cat.name"></v-list-tile-title>
              <v-list-tile-action>
                <v-icon v-text=""></v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-group>
  
          <v-list-group
            sub-group
            no-action
          >
            <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-title>По отделам</v-list-tile-title>
              </v-list-tile>
            </template>
            <v-list-tile
              v-for="tag in tags"
              v-bind:key="tag.id"
              v-bind:to="'/lists/tag/' + tag.id"
            >
              <v-list-tile-title v-text="tag.name"></v-list-tile-title>
              <v-list-tile-action>
                <v-icon v-text=""></v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-group>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar app fixed clipped-left height="50px" color="blue-grey" dark>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Application</v-toolbar-title>

    <v-spacer></v-spacer>
    <form
        action=""
        novalidate="true">
       <v-text-field
          clearable
          solo-inverted
          hide-details
          label="Search"
          class="hidden-sm-and-down"
          v-model="search"
        ></v-text-field>
    </form>
    <v-btn 
       v-if="search"
       depressed
       large
       class="hidden-sm-and-down font-weight-bold"
       v-bind:to="'/search/?q=' + search"
       color="teal"
       prepend-inner-icon="search">
     <v-icon dark>search</v-icon>
    </v-btn>
    <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
    
        <router-view 
          v-bind:id="$route.params.id"
          v-bind:category="$route.params.category"
          v-bind:search="$route.params.search"
          v-bind:main_url = "main_url"/>

    </v-content>
    <v-footer app fixed>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import Article from './components/Article'

export default {
  name: 'App',
  components: {
    Article
  },
  props: {
    source: String
  },
  data () {
    return {
      drawer: true,
      main_url: 'http://127.0.0.1:8000/api/', 
      cats: [],
      tags: [],
      search: ""
    }
  },
  mounted() {
    axios
      .get(this.main_url + 'categories/?format=json')
      .then(response => (this.cats = response.data));
    axios
      .get(this.main_url + 'tags/?format=json')
      .then(response => (this.tags = response.data));
  },
}
</script>
<style>
  .v-text-field.v-text-field--solo .v-input__control {
    min-height: 44px;
  }
</style>