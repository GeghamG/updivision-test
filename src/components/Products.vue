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
				class="mt-12 col-10 offset-2"
			>
				<v-row class="width-90 mx-auto">
					<v-hover v-slot:default="{ hover }">
					<v-card
						:elevation="hover ? 10 : 3"
						:class="{ 'on-hover': hover }"
						class="mt-12 mt-n10 px-0 py-0"
					>
						<v-img
							:src="imgBasePath"
							class="card-img"
						></v-img>
					</v-card>
					</v-hover>	
				</v-row>
				<h3 class="mx-auto width-90 py-6 text-center color-purple">{{ product.name }}</h3>
				<v-row class="width-90 mx-auto">
					<v-col sm="6" class="d-flex align-items-center pl-0">
						<h3 class="price font-weight-light">$ {{ product.price }}</h3>
					</v-col>
					<v-col sm="6" class="d-flex justify-end pr-0">
						<v-btn :rounded=true class="btn-pink" @click="openDetails($event, product)">Details</v-btn>
					</v-col>
				</v-row>
			</v-card>
		</v-col>
		</v-row>
		
		<div class="text-center mt-12">
			<v-pagination
				v-model="page"
				:length="length"
				next-icon="mdi-chevron-right"
				prev-icon="mdi-chevron-left"
				:page="page"
				:total-visible="totalVisible"
			></v-pagination>
		</div>
		
		<v-dialog v-model="detailsPopup" persistent max-width="1000">
			<div v-if="this.$data.product" class="d-flex justify-space-between popup-card" >
				<div class="m-5">
					<v-img
						class="popup-img mx-5 my-5"
						:src="imgBasePath"
					></v-img>
				</div>
				<div class="">
					<v-col class="text-right pr-0 pb-0">
						<span class="group pa-2 close ml-auto" @click="closeDetails" >
							<v-icon :x-large="true" color="black" class="close">mdi-close</v-icon>
						</span>
					</v-col>
					<v-col class="mb-4 pr-8 pt-0">
						<h1 class="mb-3 color-purple mt-0">{{ this.$data.product.name }}</h1>
						<h3 class="mb-12 color-purple">$ {{ this.$data.product.price }}</h3>
					</v-col>
					<v-col class="mb-4 pr-8">
						<span>Description</span>
						<hr class="details-hr mt-2 mb-3 pr-8">
						<span>{{ this.$data.product.description }}</span>
						<div>
							<v-btn :prepend-icon="'fa-edit'" rounded class="mt-12 btn-pink" >Add to Cart</v-btn>
						</div>
					</v-col>
				</div>
			</div>
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
			singleProduct: {},
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
			openDetails(event, product) {
				this.$data.product = product
				this.$data.detailsPopup = true
			},
			getProducts () {
				this.$store.dispatch('getProducts', 2)
				.then((res) => {
					console.log(res);
				})
				.catch(({response}) => {
					if (response.data.errors) {
						this.$data.errors = response.data.errors
					} else if (response.data.message) {
						this.$data.errors = [[response.data.message]]
					}
				})
			}
		}
	}
</script>

<style>
	.products .content {
		max-width: 80%;
	}
	.card-img {
		height: 300px;
	}
	.width-90 {
		width: 90%;
	}
	.price {
		line-height: 2;
	}
	.popup-card {
		overflow: hidden;
		border: 10px solid black;
		border-radius: unset;
		background-color: #fff;
	}
	.popup-card > * {
		width: 50%;
	}
	.popup-img {
		height: calc(100% - 40px);
	}
	.close {
		font-weight: bold;
		cursor: pointer;
	}
	.color-purple {
		color: #e91e63!important;
	}
	.details-hr {
		height: 1px;
		border: none;
		background-color: darkgoldenrod;
	}
	.btn-pink {
		background: #e91e63!important;
		color: #fff!important;
	}
	.mt-n10.v-card {
		transition: .4s;
		cursor: pointer;
	}
	.mt-n10.v-card:not(.on-hover) {
		opacity: 0.95;
	}
</style>