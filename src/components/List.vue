<template>
    <v-container grid-list-md>
    <v-layout row>
      <v-flex>
        <v-card>
          <v-toolbar>
            <v-toolbar-title>{{cat.name}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
              dark
              color="teal"
              @click.stop="drawer = !drawer"
            >
            Фильтры
          </v-btn>
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
    <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
        right
      >
        <v-list class="pt-0" dense>
          <v-divider></v-divider>
          <v-container>
            <p><strong>Выберите фильтр:</strong></p>
            <div v-for="item in filter_list"
                 v-bind:key="item.id"
                 fluid>
              <v-checkbox v-model="filter_selected"
                          v-bind:label="item.name"
                          v-bind:value="item.id"
                          ></v-checkbox>
            </div>
          </v-container>
        </v-list>
      </v-navigation-drawer>
    </v-container>
</template>


<script>

export default {
  name: 'List',
  props: {
    id: String,
    category: String,
    main_url: String,
  },
  data () {
    return {
      drawer: null,
      filter_list: '',
      filter_selected: [],
      filter_string: '',
      cat: '',
      tags: '',
      items: '',
    }
  },
  methods: {
    getArticles: function (category) {
    //Get articles for this category
      axios
        .get(this.main_url + 'articles/?' + category + '=' + this.id + '&format=json')
        .then(response => (this.items = response.data));
    },
    getListInfo: function (category) {
    //Get info for this category
      if (category == "category"){
        category = "categorie"
      }
      axios
        .get(this.main_url + category + 's/' + this.id + '/?format=json')
        .then(response => (this.cat = response.data));
    },
    getFilter: function () {
    //Get items for filtring
      if (this.category == "category") {
        axios
          .get(this.main_url + 'tags/?&format=json')
          .then(response => (this.filter_list = response.data));
      } else if (this.category == "tag") {
        axios
          .get(this.main_url + 'categories/?&format=json')
          .then(response => (this.filter_list = response.data));
      }
    },
    getFiltredItems: function () {
      this.filter_string = '';
      for (var i = 0; i < this.filter_selected.length; i++){
        if (this.category == 'category') {
          this.filter_string = this.filter_string + "&tag=" + this.filter_selected[i];
        } else if (this.category == 'tag') {
          this.filter_string = this.filter_string + "&category=" + this.filter_selected[i]
        }
      }
      axios
        .get(this.main_url + 'articles/?' + this.category + '=' + this.id + this.filter_string + '&format=json')
        .then(response => (this.items = response.data));
      }
  },
  mounted() {
    this.getArticles(this.category);
    this.getListInfo(this.category);
    this.getFilter();
  },
  watch: {
    '$route' (to, from) {
      this.filter_selected = [];
      this.getArticles(this.category);
      this.getListInfo(this.category);
      this.getFilter();
    },
    filter_selected: function (new_filter_selected, old_filter_selected) {
      this.getFiltredItems();
    },
  }
}
</script>

<style scoped>
  .list-link {
     text-decoration: none;
  }
</style>