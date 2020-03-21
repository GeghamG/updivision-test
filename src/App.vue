<template>
  <v-app>
    <v-card
      color="grey lighten-1"
      flat
      tile
    >
      <v-toolbar
        color="deep-purple"
      >
        <v-btn
          v-if="this.isAuthenticated"
          text
          :x-large="true"
          color="white"
        >
          <router-link 
            tag="span"
            :to="{ name:'products'}"
          >Home</router-link>
        </v-btn>

        <v-spacer></v-spacer>
        <v-btn 
          v-if="this.isAuthenticated"
          class="mr-3"
          text
          :x-large="true"
          color="white"
        >
          <span @click="logout">Logout</span>
        </v-btn>
        
        <v-btn 
          v-else
          class="mr-3"
          text
          :x-large="true"
          color="white"
        >
          <router-link 
            tag="span"
            :to="{ name:'login'}"
          >Login</router-link>
        </v-btn>

        <v-btn
          text
          :x-large="true"
          color="white"
        >
          <router-link 
            tag="span"
            :to="{ name:'register'}"
          >Register</router-link>
        </v-btn>
      </v-toolbar>
    </v-card>
    <router-view></router-view>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated
    }
  },
  data: () => ({
    //
  }),
  methods: {
    logout() {
      this.$store.dispatch('LOGOUT')
      .then(() => this.$router.push({name: 'login'}))
      .catch(() => {})
    }
  }
};
</script>
