<template>
  <v-app>
    <v-content>
      <Register />
    </v-content>
  </v-app>
</template>

<script>
import Register from './components/Register';

export default {
  name: 'App',
  components: {
    Register
  },
  data: () => ({
    //
  }),
};
</script>
