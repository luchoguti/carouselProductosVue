<template>
	<div id="app"  class="container">
		<div class="row">
			<div class="col-md-12">
				<h2>Listado de <b>Productos</b></h2>
				<div id="myCarousel" class="carousel slide" data-ride="carousel" data-interval="0">
					<!-- Carousel indicators -->
					<ol class="carousel-indicators" >
						<li v-for="items in cantidadArray" data-target="#myCarousel" :data-slide-to="items" :class="carousel_indicators(items)"></li>
					</ol>   
					<!-- Wrapper for carousel items -->
					<div class="carousel-inner">
						<div :class="carousel_item(key)" v-for="items,key in sections">
							<div class="row">
								<div class="col-sm-3" v-for="item in items">
									<div class="thumb-wrapper">
										<div class="img-box">
											<img :src="item.image" class="img-responsive img-fluid" alt="">
										</div>
										<div class="thumb-content">
											<h4>{{ item.name }}</h4>
											<a href="#" class="btn btn-primary">Add to Cart</a>
										</div>						
									</div>
								</div>
							</div>
						</div>
					</div>
					<!-- Carousel controls -->
					<a class="carousel-control left carousel-control-prev" href="#myCarousel" data-slide="prev">
						<i class="fa fa-angle-left"></i>
					</a>
					<a class="carousel-control right carousel-control-next" href="#myCarousel" data-slide="next">
						<i class="fa fa-angle-right"></i>
					</a>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import axios from 'axios';
export default {
	name: 'app',
	data(){
		return {
			lists:[],
			cantidadArray:0,
			cantIttems:4,
			contador:0,
		}
	},
	created: function(){
		this.postTokenAcess();
		this.getDataProductos();
	},
	methods:{
		postTokenAcess: function(){
			var urlToken= 'http://raphael.vpstage.com/api/OAuth/token';
			axios.post(urlToken,{
				"grant_type": "client_credentials",
				"client_id": "5520d3dfd99b9b828e81ca82e6613834",
				"client_secret": "623cd7b0cba32adafc66b52304d01410",
				"scope": "OrderList Order User UserList Campaign Product Category CampaignCategory Banner BannerPosition FuzzySearch"
			}).then(response =>{
				var tokenResponse=response.data.access_token;
				localStorage.setItem('token',tokenResponse);
			}).catch(e => {
				console.log('Error: ' + e)
			});
		},
		getDataProductos: function(){
			var urlProductos="http://raphael.vpstage.com/api/Product/list";
			axios.post(urlProductos,{
				"access_token":localStorage.getItem('token'),
				"limit": 20
			}).then(response =>{
				this.lists = response.data;
				this.cantidadArray = ((response.data.products).length)/this.cantIttems;
			}).catch(e => {
				console.log('Error: ' + e)
			});
		},
		carousel_item: function(value){
	        var theClass = 'item carousel-item ';
	        if(value == 1){
	            theClass += 'active';
	        }
	        return theClass;
	    },
	    carousel_indicators:function(value){
	    	var theClass = '';
	        if(value == 1){
	            theClass += 'active';
	        }
	        return theClass;
	    }
	},
	computed: {
	    sections() {
	      let sections = [], size = this.cantIttems;
	      let items = [...this.lists.products];
	      while (items.length > 0){
	        sections.push(items.splice(0, size));
	      }
	      return sections;
    	}
  	}
}
</script>
<style>
@import './assets/css/carousel.css';
</style>