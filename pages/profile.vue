<template>
  <v-col>
    <v-card class="mx-auto pa-5" max-width="450" outlined>
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-4">Профиль пользователя</div>
          <v-list-item-title class="headline mb-1">{{ $store.state.auth.username }}</v-list-item-title>
          <v-list-item-subtitle>{{ $store.state.auth.email }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-avatar size="100" color="grey" rounded>
          <v-img :src="$store.state.auth.avatar"></v-img>
        </v-list-item-avatar>
      </v-list-item>
    </v-card>
  </v-col>
</template>

<script>
export default {
  middleware: "auth",
}
</script>
