<template>
  <v-form>
    <v-container >
      <v-row>
        <h1 class="mx-auto mt-3">Registration</h1>
      </v-row>
      <v-row>
        <v-col cols="12" sm="8" offset-sm="2">
          <v-text-field
            v-model="name"
            :error-messages="nameErrors"
            :counter="10"
            name="name"
            label="Name"
            required
            @input="$v.name.$touch()"
            @blur="$v.name.$touch()"
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="8" offset-sm="2">
          <v-text-field
            v-model="email"
            :error-messages="emailErrors"
            label="E-mail"
            name="email"
            required
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4" offset-sm="2">
          <v-menu
            v-model="menu1"
            :close-on-content-click="false"
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="date"
                label="Education start date"
                prepend-icon="event"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker 
            v-model="education_start_date" 
            @input="menu1 = false"
            name="education_start_date"
            ></v-date-picker>
          </v-menu>
        </v-col>

        <v-col cols="12" sm="4">
          <v-menu
            v-model="menu2"
            :close-on-content-click="false"
            :return-value.sync="education_end_date"
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="date"
                label="Education end date"
                prepend-icon="event"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker 
            v-model="education_end_date"
            @input="menu2 = false"
            name="education_end_date"
            ></v-date-picker>
          </v-menu>
        </v-col>

        <v-col cols="12" sm="8" offset-sm="2">
          <v-text-field
          v-model="password"
          :error-messages="passErrors"
          label="Password"
          :append-icon="show_pass ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show_pass ? 'text' : 'password'"
          name="password"
          @click:append="show_pass = !show_pass"
          @input="$v.password.$touch()"
          @blur="$v.password.$touch()"
        ></v-text-field>
        </v-col>

        <v-col cols="12" sm="8" offset-sm="2">
          <v-text-field
            v-model="password_confirmation"
            :error-messages="passConfirmationErrors"
            label="Confirm password"
            name="password_confirmation"
            required
            :append-icon="show_pass_confirm ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show_pass_confirm ? 'text' : 'password'"
            @click:append="show_pass_confirm = !show_pass_confirm"
            @input="$v.password_confirmation.$touch()"
            @blur="$v.password_confirmation.$touch()"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="8" offset-sm="2">
          <v-checkbox
            v-model="terms"
            :error-messages="termsErrors"
            label="I agree terms and conditions"
            required
            @change="$v.terms.$touch()"
            @blur="$v.terms.$touch()"
          ></v-checkbox>
        </v-col>

        <v-col cols="12" sm="8" offset-sm="2">
          <v-btn color="success" class="mr-4" @click="submit">
            Register
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, minLength, email, sameAs } from 'vuelidate/lib/validators'

  export default {
    mixins: [validationMixin],

    validations: {
      name: { required },
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
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      education_start_date: '',
      education_end_date: '',
      terms: false,
      date: new Date().toISOString().substr(0, 10),
      menu1: false,
      menu2: false,
      show_pass: false,
      show_pass_confirm: false,
    }),

    computed: {
      nameErrors () {
        const errors = []
        if (!this.$v.name.$dirty) return errors
        !this.$v.name.required && errors.push('Name is required.')
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
        !this.$v.education_start_date.required && errors.push('Name is required.')
        return errors
      },
      passErrors () {
        const errors = []
        if (!this.$v.password.$dirty) return errors
        !this.$v.password.required && errors.push('Password is required')
        !this.$v.password.minLength && errors.push('Password must be at least 6 characters')
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
      submit () {
        if (this.formValidation) {
          this.$axios.post('https://test-api.updivision.work/api/register', this.$data, {
            headers: {
              Accept: 'application/json',
              'Access-Control-Allow-Origin': '*',
              "Content-Type": "*",
						},
						useCredentails: true
          }).then(res => {
						console.log(res)
          }).catch(err => console.log(err))
        }
      }
    },
  }
</script>