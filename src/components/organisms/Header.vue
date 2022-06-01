<template>
  <v-container>
    <v-app-bar app dense absolute>
      <v-app-bar-nav-icon v-if="showSideMenu" @click.prevent="drawer = true" />
      <v-app-bar-title> Inn Manager</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-menu v-if="isUserAuthenticated" offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn depressed v-bind="attrs" v-on="on">
            {{ loggedUser.name }}
            <v-icon>mdi-menu-down</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item-group
            v-model="selectedDotMenu"
            @change="handleDotMenuClick()"
          >
            <v-list-item
              link
              dense
              v-for="item in dotsMenu"
              :key="item.slug"
              :value="item.slug"
            >
              <v-list-item-title>
                {{ item.label }}
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
    </v-app-bar>
    <SideMenu v-if="showSideMenu" :visible.sync="drawer" />
  </v-container>
</template>

<script>
import SideMenu from './SideMenu.vue'
import { mapState } from 'vuex'
export default {
  name: 'Header',
  components: { SideMenu },
  data() {
    return {
      isInHomePage: false,
      drawer: false,
      selectedDotMenu: '',
      dotsMenu: [
        {
          slug: 'inns',
          label: 'Pousadas',
          icon: 'mdi-home',
        },
        {
          slug: 'logout',
          label: 'Logout',
          icon: 'mdi-logout',
        },
      ],
    }
  },
  computed: {
    ...mapState('essential', ['showSideMenu']),
    isUserAuthenticated() {
      return this.$store.state.user.loginStatus.loggedIn
    },
    loggedUser() {
      return this.$store.state.user.user
    },
  },
  methods: {
    handleDotMenuClick() {
      if (this.selectedDotMenu === 'logout') {
        this.$store.dispatch('user/logout')
      }
      if (
        this.selectedDotMenu === 'inns' &&
        this.$router.history.current.name !== 'home'
      ) {
        this.$router.push({ name: 'home' })
      }
      this.selectedDotMenu = ''
    },
  },
}
</script>

<style scoped></style>
