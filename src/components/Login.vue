<template>
<v-content class="login-bg">
  <v-card
    class="mx-auto mb-12 mt-30"
    max-width="600"
  >
		<v-row>
			<h1 class="mx-auto py-12 fixed text-center">Login</h1>
		</v-row>
		<v-form class="mt-5">
			<v-col 
				v-if="this.$data.errors"
				cols="12" 
				sm="10" 
				offset-sm="1"
			>
				<v-alert
					v-for="err in this.$data.errors" 
					:key="err[0]"
					dense
					outlined
					type="error"
				>
					{{ err[0] }}
				</v-alert>
			</v-col>
			
			<v-col cols="12" sm="10" offset-sm="1">
				<v-text-field
					v-model="email"
					:error-messages="emailErrors"
					prepend-icon="mdi-email"
					label="E-mail"
					name="email"
					required
					@input="$v.email.$touch()"
					@blur="$v.email.$touch()"
				></v-text-field>
			</v-col>
			
			<v-col cols="12" sm="10" offset-sm="1">
				<v-text-field
					v-model="password"
					:error-messages="passErrors"
					label="Password"
					prepend-icon="mdi-lock"
					:append-icon="show_pass ? 'mdi-eye' : 'mdi-eye-off'"
					:type="show_pass ? 'text' : 'password'"
					name="password"
					@click:append="show_pass = !show_pass"
					@input="$v.password.$touch()"
					@blur="$v.password.$touch()"
				></v-text-field>
			</v-col>

			<v-col cols="12" sm="10" offset-sm="1">
				<v-btn text 
				@click="login"
				:x-large="true"
				class="mx-auto d-flex mb-0">
					Lets Go
				</v-btn>
			</v-col>

			<v-col cols="12" sm="10" offset-sm="1">
				<p class="text-center">
					Don't have an account?
					<router-link to="/register">
					Register
					</router-link>
				</p>
			</v-col>
		</v-form>
	</v-card>
</v-content>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, minLength, email } from 'vuelidate/lib/validators'
	import { mapGetters } from 'vuex'
	
	export default {
		mixins: [validationMixin],
		validations: {
		email: { required, email },
		password: { required, minLength: minLength(6) },
		},
		computed: {
			emailErrors () {
				const errors = []
				if (!this.$v.email.$dirty) return errors
				!this.$v.email.email && errors.push('Must be valid e-mail')
				!this.$v.email.required && errors.push('E-mail is required')  
				return errors
			},
      passErrors () {
        const errors = []
        if (!this.$v.password.$dirty) return errors
        !this.$v.password.required && errors.push('Password is required')
        !this.$v.password.minLength && errors.push('Password must be at least 6 characters')
				for (let condition of this.rules) {
					if (!condition.regex.test(this.password)) {
						errors.push(condition.message)
					}
				}
        return errors
      },
      formValidation() {
        return !this.emailErrors.length && !this.passErrors.length
			},
			...mapGetters(['accessToken'])
		},
		data: () => ({
      email: '',
      password: '',
      show_pass: false,
			rules: [
				{ message:'One lowercase letter required.', regex:/[a-z]+/ },
				{ message:"One uppercase letter required.",  regex:/[A-Z]+/ },
				{ message:"6 characters minimum.", regex:/.{6,}/ },
				{ message:"One number required.", regex:/[0-9]+/ }
			],
			errors: []
		}),
		methods: {
      login () {
        if (this.$v.$touch() || this.formValidation) {
					this.$store.dispatch('login', this.$data)
					.then(() => {
            this.$router.push({ name: 'products'})
					})
					.catch(err => {
						if (err.response.data.errors) {
							this.$data.errors = err.response.data.errors
						} else if (err.response.data.message) {
							this.$data.errors = [[err.response.data.message]]
						}
					})
        }
      }
		}
	}
</script>

<style>
	.fixed {
		min-width: 80%;
    background: #9b39b3;
    color: #fff;
    border-radius: 6px;
    margin-top: -60px!important;
	}
	.mt-30 {
    margin-top: 120px!important;
	}
  .login-bg {
    background-image: url('../assets/login_background.jpg');
    background-size: cover;
  }
</style>