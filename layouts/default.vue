<template>
  <v-app dark>
    <v-app-bar fixed app>
      <v-toolbar-title v-text="'nuxt-simple-profile'" />
      <v-spacer />
      <v-btn v-if="$store.state.auth" color="success" outlined @click="logout">Выйти</v-btn>
      <v-btn v-else to="login" color="success" outlined>Войти</v-btn>
    </v-app-bar>
    <v-main>
      <v-container class="fill-height">
        <nuxt />
      </v-container>
    </v-main>
    <v-footer app>
      <span>daniil-zav@yandex.ru</span>
    </v-footer>
  </v-app>
</template>

<script>
const Cookie = process.client ? require("js-cookie") : undefined

export default {
  data() {
    return {}
  },
  methods: {
    logout() {
      this.$router.push("/")
      Cookie.remove("auth")
      this.$store.commit("setAuth", null)
    },
  },
}
</script>
