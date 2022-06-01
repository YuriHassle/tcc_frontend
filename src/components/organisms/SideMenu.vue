<template>
  <v-navigation-drawer
    :value="visible"
    app
    temporary
    @input="() => this.$emit('update:visible')"
  >
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">
          {{ this.$store.state.user.user.name }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item
        v-for="item in items"
        :key="item.title"
        link
        @click="() => handleMenuClick(item)"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'SideMenu',
  props: ['visible'],
  data() {
    return {
      items: [
        { title: 'Funcionários', icon: 'mdi-account', path: 'employees' },
        { title: 'Itens', icon: 'mdi-view-dashboard', path: 'items' },
        { title: 'Serviços', icon: 'mdi-image', path: 'services' },
        { title: 'Pacotes', icon: 'mdi-help-box', path: 'packages' },
      ],
    }
  },
  methods: {
    handleMenuClick(item) {
      if (this.$router.history.current.name !== item.path) {
        this.$router.push({ name: `${item.path}` })
      }
    },
  },
}
</script>

<style></style>
