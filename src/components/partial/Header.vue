<template>
    <v-card color="grey lighten-1" flat tile>
      <v-toolbar color="deep-purple" >
        <router-link  tag="span" :to="{ name:'products'}">
            <v-btn
                v-if="this.isAuthenticated"
                text
                :x-large="true"
                color="white"
            >
                Home
            </v-btn>
        </router-link>

        <v-spacer></v-spacer>
        <v-btn 
            v-if="this.isAuthenticated"
            class="mr-3"
            text
            :x-large="true"
            color="white"
            :loading="this.loading"
            @click="logout" 
        >
          <span>Logout</span>
        </v-btn>
        
        <router-link v-else tag="span" :to="{ name:'login'}" >
            <v-btn
                class="mr-3"
                text
                :x-large="true"
                color="white"
            >
                Login
            </v-btn>
        </router-link>
        
        <router-link tag="span" :to="{ name:'register'}">
            <v-btn text :x-large="true" color="white" >Register</v-btn>
        </router-link>
      </v-toolbar>
    </v-card>
</template>

<script>
    export default {
		data: () => ({
			loading: false,
		}),
		computed: {
			isAuthenticated() {
				return this.$store.getters.isAuthenticated
			}
		},
        methods: {
            logout() {
				this.loading = true
                this.$store.dispatch('LOGOUT')
                .then(() => {
					this.loading = false
                    this.$router.push({name: 'login'})
                })
                .catch(() => {})
            }
        }
    }
</script>