<template>
  <v-container grid-list-md>
    <v-layout row>
      <v-flex>
        <v-card>
          <v-toolbar>
            <v-toolbar-title>Результаты поиска</v-toolbar-title>
          </v-toolbar>
          <v-list two-line>
            <template v-for="(item, index) in items">
              <v-list-tile v-bind:key="index"
                           avatar
                           ripple
                           >
                <v-list-tile-content>
                  <v-list-tile-title>
                    <router-link 
                      v-bind:to="'/article/' + item.id"
                      v-bind:class="'list-link'">
                      {{ item.name }}
                    </router-link>
                  </v-list-tile-title>
                  <v-list-tile-sub-title> Отделы:
                    <span v-for="tag in item.tag">{{ tag.name }} </span>
                  </v-list-tile-sub-title>
                  <v-list-tile-sub-title> Категории: 
                    <span v-for="category in item.category">{{ category.name }} </span>
                  </v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-list-tile-action-text>15 мин</v-list-tile-action-text>
                  <v-icon color="grey lighten-1" v-on:click="alert()">star_border</v-icon>
                </v-list-tile-action>
              </v-list-tile>
              <v-divider v-if="index + 1 < items.length" v-bind:key="`divider-${index}`"></v-divider>
            </template>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
    </v-container>
</template>


<script>

export default {
  name: 'Search',
  props: {
    id: String,
    category: String,
    search: String,
    main_url: String
  },
  data () {
    return {
      cat: '',
      items: [],
    }
  },
  methods: {
    getResults: function () {
      this.items = [];
      if (this.search) {
        axios
          .get(this.main_url + 'articles/?search=' + this.search + '&format=json')
          .then(response => (this.items = response.data));
      }
    },
  },
  mounted() {
    this.getResults();
  },
  watch: {
    '$route' (to, from) {
      this.getResults();
    }
 }
}
</script>

<style scoped>
  .list-link {
     text-decoration: none;
  }
</style>