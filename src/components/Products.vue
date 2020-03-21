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
				class="mt-12 col-8 offset-2"
			>
				<v-row class="width-90 mx-auto">
					<v-card
						class="mt-12 mt-n10  px-0 py-0"
						elevation="10"
					>
						<v-img
							:src="imgBasePath"
							class="card-img"
						></v-img>
					</v-card>
				</v-row>
				<h2 class="mx-auto py-12 text-center">{{ product.name }}</h2>
				<v-row class="width-90 mx-auto">
					<v-col sm="6" class="d-flex align-items-center">
						<h3 class="price font-weight-light">$ {{ product.price }}</h3>
					</v-col>
					<v-col sm="6" class="d-flex justify-end">
						<v-btn :rounded=true color="error" @click="openDetails">Details</v-btn>
					</v-col>
				</v-row>
			</v-card>
		</v-col>
		</v-row>
		
		<div class="text-center">
			<v-pagination
				v-model="page"
				:length="length"
				next-icon="mdi-chevron-right"
				prev-icon="mdi-chevron-left"
				:page="page"
				:total-visible="totalVisible"
			></v-pagination>
		</div>
		
    <v-dialog v-model="detailsPopup" persistent max-width="800">
      <v-card class="d-flex justify-space-between popup-card" >
				<div class="flex-grow-1">
					<v-img
						class="popup-img"
						:src="imgBasePath"
					></v-img>
				</div>
				<div class="flex-grow-1">
					<span class="group pa-2 close" @click="closeDetails" >
						<v-icon :x-large="true" color="black" class="close">mdi-close</v-icon>
					</span>
					<v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>
				</div>
      </v-card>
    </v-dialog>
	</v-content>
</v-container>
</template>

<script>
	import { mapGetters } from 'vuex'
	
	export default {
		mounted() {
			this.$store.dispatch('getProducts')
			.then(res => {
				this.products = res.data.data
				console.log(res.data);
			})
			.catch(err => console.log(err))
		},
		computed: {
			...mapGetters(['accessToken'])
		},
		data: () => ({
			detailsPopup: false,
			length: 3,
			page: 1,
			totalVisible: 0,
			per_page: 2,
			products: [],
			errors: [],
			imgBasePath: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg', // 'https://test-api.updivision.work/api/images/'
		}),
		methods: {
			closeDetails() {
				this.$data.detailsPopup = false
			},
			openDetails() {
				this.$data.detailsPopup = true
			}
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
	.width-90 {
		width: 90%;
	}
	.price {
    line-height: 2;
	}
	.popup-card {
		overflow: hidden;
	}
	.popup-img {
    width: 400px;
    height: 480px;
	}
	.close {
		font-weight: bold;
		cursor: pointer;
	}
</style>