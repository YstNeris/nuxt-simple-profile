<template>
  <v-col>
    <v-card class="mx-auto pa-5" max-width="450" outlined>
      <v-card-title>Авторизация</v-card-title>
      <v-alert v-if="form.userFindError" outlined type="error">Неверный пользователь или пароль</v-alert>
      <v-form id="form" ref="form" v-model="form.valid" lazy-validation @submit.prevent="submit">
        <v-card-text>
          <v-text-field v-model="auth.email" :rules="rules.email" label="Email" name="email" prepend-icon="mdi-email" type="email"></v-text-field>
          <v-text-field v-model="auth.password" :rules="rules.password" label="Пароль" name="password" prepend-icon="mdi-lock" type="password"></v-text-field>
        </v-card-text>
        <v-card-actions class="pb-5 px-5">
          <v-btn block :loading="form.loading" type="submit" form="form">Войти</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-col>
</template>

<script>
const Cookie = process.client ? require("js-cookie") : undefined

export default {
  middleware: "noAuth",
  data() {
    return {
      form: {
        valid: false,
        loading: false,
        userFindError: false,
      },
      auth: {
        email: "",
        password: "",
      },
      rules: {
        email: [v => !!v || "E-mail необходимо заполнить", v => /.+@.+\..+/.test(v) || "E-mail введён неверно"],
        password: [v => !!v || "Пароль необходимо заполнить"],
      },
    }
  },
  methods: {
    submit() {
      this.$refs.form.validate()
      if (this.form.valid && this.auth.email && this.auth.password) {
        this.form.userFindError = false
        this.form.loading = true
        this.$store.dispatch("auth", this.auth).then(user => {
          if (!user) {
            this.form.userFindError = true
            this.form.loading = false
          } else {
            this.$router.push("/profile")
            Cookie.set("auth", user)
            this.$store.commit("setAuth", user)
          }
        })
      }
    },
  },
}
</script>
