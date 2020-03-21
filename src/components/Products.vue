<template>
<v-container class="products fluid">
	<v-content
		class="content mx-auto"
	>
	<v-row>
		<v-col 
			v-for="product in this.products"
			:key="product.id"
			cols="12" 
			:sm="12 / products.length"
		>
			<v-card
				class="mt-12"
			>
				<v-row class="img-row mx-auto">
					<v-img
						:src="imgBasePath"
						class="card-img mx-auto mt-n10"
					></v-img>
				</v-row>
				<h1 class="mx-auto py-12 text-center">{{ product.name }}</h1>
			</v-card>
		</v-col>
		</v-row>
		
		<div class="text-center">
			<v-pagination
				v-model="page"
				:circle="circle"
				:disabled="disabled"
				:length="length"
				:next-icon="nextIcon"
				:prev-icon="prevIcon"
				:page="page"
				:total-visible="totalVisible"
			></v-pagination>
		</div>
	</v-content>
</v-container>
</template>

<script>
	import { mapGetters } from 'vuex'
	
	export default {
		mounted() {
			this.$store.dispatch('getProducts')
			.then(res => {
				console.log(res.data);
				
				this.products = res.data.data
			})
			.catch(err => console.log(err))
		},
		computed: {
			...mapGetters(['accessToken'])
		},
		data: () => ({
			circle: false,
			disabled: false,
			length: 3,
			nextIcon: 'navigate_next',
			nextIcons: ['mdi-chevron-right', 'mdi-arrow-right', 'mdi-menu-right'],
			prevIcon: 'navigate_before',
			prevIcons: ['mdi-chevron-left', 'mdi-arrow-left', 'mdi-menu-left'],
			page: 2,
			totalVisible: 2,

			per_page: 2,
			products: [],
			errors: [],
			imgBasePath: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg', // 'https://test-api.updivision.work/api/images/'
		}),
		methods: {
      // getProducts () {
			// 	this.$store.dispatch('getProducts', 2)
			// 	.then((res) => {
			// 		console.log(res);
			// 	})
			// 	.catch(({response}) => {
			// 		if (response.data.errors) {
			// 			this.$data.errors = response.data.errors
			// 		} else if (response.data.message) {
			// 			this.$data.errors = [[response.data.message]]
			// 		}
			// 	})
      // }
		}
	}
</script>

<style>
	.products .content {
		max-width: 80%;
	}
	.card-img {
		height: 500px;
		border-radius: 5px;
	}
	.img-row {
		width: calc(100% - 40px);
	}
</style>