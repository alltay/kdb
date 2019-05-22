<template>
    <v-container grid-list-md>
      <v-toolbar height="40px">
        <v-toolbar-title>{{input.name}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn flat v-on:click="edit=!edit" v-if="!edit">Редактировать</v-btn>
          <v-btn flat v-on:click="edit=!edit, saveText()" v-if="edit">Сохранить</v-btn>
          <v-btn flat v-on:click="edit=!edit" v-if="edit">Отменить</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-layout>
        <v-flex xs12 v-if="edit">
          <textarea :value="input.text" @input="update" v-if="edit"></textarea>
        </v-flex>
        <v-flex>
          <v-card>
            <v-card-text v-html="compiledMarkdown">
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
          <v-card>
      <v-card-text>
        <div class="text-lg-left">
          Категории: <span v-for="cat in input.category">
            <v-btn flat small color="primary" v-bind:to="'/lists/category/' + cat.id">{{cat.name}}</v-btn> </span>
        </div>
        <div class="text-md-left">
          Отделы: <span v-for="tag in input.tag">
              <v-btn flat small color="primary" v-bind:to="'/lists/tag/' + tag.id">{{tag.name}}</v-btn>
            </span>
        </div>
      </v-card-text>
    </v-card>
    </v-container>
</template>

<script>

import marked from 'marked'
import lodash from 'lodash'

export default {
  name: 'Article',
  components: {marked, lodash},
  props: {
    id: String,
    msg: String,
    main_url: String,
  },
  data () {
    return {
      cats: '',
      items: '',
      input: {text:'# hello'},
      edit: false,
    }
  },
  mounted() {
    axios
      .get(this.main_url + 'articles/' + this.id + '/?format=json')
      .then(response => (this.input = response.data));
  },
  computed: {
    compiledMarkdown: function () {
      return marked(this.input.text, { sanitize: true })
    }
  },
  methods: {
    update: _.debounce(function (e) {
      this.input.text = e.target.value
    }, 300),

    saveText: function () {
      axios
        .put(this.main_url + 'articles/' + this.id + '/?format=json', this.input)
        .then(response => (this.cats = response.data))
        .then(alert("Сохранено"));
      }
  }
}
</script>

<style scoped>
  textarea {
      width: 100%;
      height: auto;
      min-height: 100%;
      background: white;
  }
</style>