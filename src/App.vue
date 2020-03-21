<template>
	<v-app>
		<Header />
		<router-view></router-view>
	</v-app>
</template>

<script>
	import Header from './components/partial/Header'

	export default {
		components: {'Header': Header},
		name: 'App',
	};
</script>
