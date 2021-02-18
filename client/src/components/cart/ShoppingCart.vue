<template>
  <div
    class="dropdown-menu p-2"
    style="min-width:320px; right:0; left:auto"
    aria-labelledby="triggerId">
		<strong v-if="cartItemCount == 0" class="px-2 text-center">Il carrello è vuoto. <br/></strong>
		<div v-for="item in getCartItems" :key="item.article._id">
			<div class="px-2 d-flex justify-content-between">
			<div>
				<strong>{{ item.article.name }}</strong>
				<br />
				{{ item.quantity }} x ${{ item.article.price }}
			</div>
			<div>
				<a
					href="#"
					class="badge badge-secondary text-white"
					@click.prevent="removeArticleFromCart(item.article)"
				>Rimuovi</a>
			</div>
			</div>
			<hr />
		</div>

		<div class="d-flex justify-content-between">
			<span>Totale: ${{ cartTotalPrice }}</span>
			<a href="#" @click.prevent="clearCartItems()">Svuota carrello</a>
		</div>
		<div v-if="cartItemCount > 0">
			<br/>
			<button type="button" @click.prevent="checkout()" class="btn primary-color text-white w-100"><b-icon-cart/> Completa acquisto</button>
		</div>
		</div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  computed: {
	...mapState(["cart"]),
	...mapGetters(["cartTotalPrice"]),
	...mapGetters(["cartItemCount"]),
	...mapGetters(["getCartItems"])
  },
  methods: {
	...mapActions(["removeArticleFromCart"]),
	...mapActions(["clearCartItems"]),
	...mapActions(["checkoutItems"]),
	...mapActions(["addNotification"]),
	checkout(){
			this.checkoutItems()
			.then(
				res => {
					if(res.data.success){
						this.addNotification({type:"Successo", message:"L'ordine è stato inoltrato con successo."});
					}
				}
			)
			.catch(
				() => {
					this.addNotification({type:"Errore", message:"Attenzione: l'ordine non è stato inoltrato a causa di un errore. Riprova."});
			});
		}
  }
};
</script>

<style>
</style>