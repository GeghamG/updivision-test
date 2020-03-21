<template>
	<v-content class="register-bg">
		<v-card
			class="mx-auto mt-12 mb-12"
			max-width="600"
		>
			<v-row>
				<h1 class="mx-auto mt-12">Register</h1>
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

				<v-col 
					v-else-if="this.$data.success_msg"
					cols="12" 
					sm="10" 
					offset-sm="1"
				>
					<v-alert type="success">
					{{ this.$data.success_msg }}
					</v-alert>
				</v-col>

				<v-col cols="12" sm="10" offset-sm="1">
					<v-text-field
					v-model="name"
					:error-messages="nameErrors"
					prepend-icon="mdi-face"
					name="name"
					label="Name"
					required
					@input="$v.name.$touch()"
					@blur="$v.name.$touch()"
					></v-text-field>
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
					<v-menu
					min-width="290px"
					>
					<template v-slot:activator="{ on }">
						<v-text-field
						v-model="education_start_date"
						label="Education start date"
						:error-messages="eduStartDateErrors"
						@blur="$v.education_start_date.$touch()"
						prepend-icon="event"
						v-on="on"
						readonly
						></v-text-field>
					</template>
					<v-date-picker 
					v-model="education_start_date" 
					name="education_start_date"
					@input="start_date_menu = false"
					></v-date-picker>
					</v-menu>
				</v-col>

				<v-col cols="12" sm="10" offset-sm="1">
					<v-menu
					min-width="290px"
					>
					<template v-slot:activator="{ on }">
						<v-text-field
						v-model="education_end_date"
						label="Education end date"
						:error-messages="eduEndDateErrors"
						@blur="$v.education_end_date.$touch()"
						prepend-icon="event"
						v-on="on"
						readonly
						></v-text-field>
					</template>
					<v-date-picker 
					v-model="education_end_date"
					@input="end_date_menu = false"
					name="education_end_date"
					></v-date-picker>
					</v-menu>
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
					<v-text-field
					v-model="password_confirmation"
					:error-messages="passConfirmationErrors"
					label="Confirm password"
					prepend-icon="mdi-lock"
					name="password_confirmation"
					required
					:append-icon="show_pass_confirm ? 'mdi-eye' : 'mdi-eye-off'"
					:type="show_pass_confirm ? 'text' : 'password'"
					@click:append="show_pass_confirm = !show_pass_confirm"
					@input="$v.password_confirmation.$touch()"
					@blur="$v.password_confirmation.$touch()"
					></v-text-field>
				</v-col>

				<v-col cols="12" sm="10" offset-sm="1">
					<v-checkbox
					v-model="terms"
					:error-messages="termsErrors"
					label="I agree to the terms and conditions"
					required
					@change="$v.terms.$touch()"
					@blur="$v.terms.$touch()"
					></v-checkbox>
				</v-col>

				<v-col cols="12" sm="10" offset-sm="1">
					<v-btn 
					color="deep-purple" 
					class="mx-auto d-flex white--text v-size--large mb-0" 
					:rounded=true 
					@click="register"
					:loading="loading"
					>
					Get started
					</v-btn>
				</v-col>

				<v-col cols="12" sm="10" offset-sm="1">
					<p class="text-center">
					Already have an account?
					<router-link to="/login">
					Login
					</router-link>
					</p>
				</v-col>
			</v-form>
		</v-card>
	</v-content>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, minLength, email, sameAs } from 'vuelidate/lib/validators'

  export default {
    mixins: [validationMixin],

    validations: {
		name: { required, minLength: minLength(2) },
		email: { required, email },
		education_start_date: { required },
		education_end_date: { required },
		password: { required, minLength: minLength(6) },
		password_confirmation: { 
			required, 
			sameAsPassword: sameAs('password'),
			minLength: minLength(6),
		},
		terms: {
			checked (val) {
				return val
			},
		},
    },

    data: () => ({
		loading: false,
		name: '',
		email: '',
		password: '',
		password_confirmation: '',
		education_start_date: '',
		education_end_date: '',
		terms: false,
		start_date_menu: false,
		end_date_menu: false,
		show_pass: false,
		show_pass_confirm: false,
		rules: [
			{ message:'One lowercase letter required.', regex:/[a-z]+/ },
			{ message:"One uppercase letter required.",  regex:/[A-Z]+/ },
			{ message:"6 characters minimum.", regex:/.{6,}/ },
			{ message:"One number required.", regex:/[0-9]+/ }
		],
		errors: [],
		success_msg: ''
    }),

    computed: {
		nameErrors () {
			const errors = []
			if (!this.$v.name.$dirty) return errors
			!this.$v.name.required && errors.push('Name is required.')
			!this.$v.name.minLength && errors.push('Name must be at least 2 characters.')
			return errors
		},
		emailErrors () {
			const errors = []
			if (!this.$v.email.$dirty) return errors
			!this.$v.email.email && errors.push('Must be valid e-mail')
			!this.$v.email.required && errors.push('E-mail is required')  
			return errors
		},
		eduStartDateErrors () {
			const errors = []
			if (!this.$v.education_start_date.$dirty) return errors
			!this.$v.education_start_date.required && errors.push('Education start date is required.')
			!(this.$data.education_start_date < this.$data.education_end_date) && errors.push('Education start date must be lesser than start date.')
			return errors
		},
		eduEndDateErrors () {
			const errors = []
			if (!this.$v.education_end_date.$dirty) return errors
			!this.$v.education_end_date.required && errors.push('Education end date is required.')
					!(this.$data.education_start_date < this.$data.education_end_date) && errors.push('Education end date must be greater than start date.')
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
		passConfirmationErrors () {
			const errors = []
			if (!this.$v.password_confirmation.$dirty) return errors
			!this.$v.password_confirmation.required && errors.push('Password confirmation is required')
			!this.$v.password_confirmation.sameAsPassword && errors.push('Passwords doe\'s not match')
			return errors
		},
		termsErrors () {
			const errors = []
			if (!this.$v.terms.$dirty) return errors
			!this.$v.terms.checked && errors.push('You must agree to continue!')
			return errors
		},
		formValidation() {
			return !this.nameErrors.length && 
			!this.emailErrors.length &&
			!this.passErrors.length &&
			!this.passConfirmationErrors.length &&
			!this.termsErrors.length;
		}
    },

    methods: {
		register () {
			this.$v.$touch()
			if (this.formValidation) {          
				this.$store.dispatch('REGISTER', this.$data, {
					headers: {
						"Accept": 'application/json',
						"Content-Type": "application/json",
					},
					useCredentails: true
				}).then(() => {
					this.$data.success_msg = 'You are registered successfully';
				}).catch((err) => {
					this.$data.errors = err.response.data.errors;
				})
			}
		}
    },
}
</script>

<style>
	.register-bg {
		background-image: url('../assets/register_background.jpg');
		background-size: cover;
	}
</style>