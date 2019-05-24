<template>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="blue-grey">
              <v-toolbar-title>Вход</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field prepend-icon="person"
                              name="login"
                              label="Логин"
                              type="text"
                              v-model="username"></v-text-field>
                <v-text-field id="password"
                              prepend-icon="lock"
                              name="password"
                              label="Пароль"
                              type="password"
                              v-model="password"></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
            <v-spacer></v-spacer>
              <v-btn color="primary" v-on:click="Login()">Войти</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
</template>


<script>

export default {
  name: 'Login',
  props: {
    main_url: String
  },
  data () {
    return {
      username: '',
      password: '',
    }
  },
  mounted() {
    if (!localStorage.token == "Token " || localStorage.token){
      this.$router.push({ name: 'Home' })
    }
  },
  methods: {
    Login: function () {
      //Send user data and recieve Token
      var vm = this
      this.axios
        .post(this.main_url + 'api-token-auth/', {"username": this.username, "password": this.password})
          .then(function (response) {
            localStorage.token = 'Token ' + response.data.token;
            vm.$router.go("/");
         })
    },
  }
}
</script>

<style scoped>
</style>