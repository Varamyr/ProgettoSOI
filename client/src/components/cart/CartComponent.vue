<template>
  <div
    class="dropdown-menu p-2"
    style="min-width:320px; right:0; left:auto"
    aria-labelledby="triggerId"
  >
    <div v-for="item in cart" :key="item.article.id">
      <div class="px-2 d-flex justify-content-between">
        <div>
          <strong>{{ item.article.title }}</strong>
          <br />
          {{ item.quantity }} x ${{ item.article.price }}
        </div>
        <div>
          <a
            href="#"
            class="badge badge-secondary"
            @click.prevent="removeProductFromCart(item.article)"
          >remove</a>
        </div>
      </div>
      <hr />
    </div>

    <div class="d-flex justify-content-between">
      <span>Total: ${{ cartTotalPrice }}</span>
      <a href="#" @click.prevent="clearCartItems()">Clear Cart</a>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  computed: {
	...mapState(["cart"]),
	...mapGetters(["cartTotalPrice"]),
	...mapGetters(["getCartItems"])
  },
  mounted() {
    this.getCartItems();
  },

  methods: {
   ...mapActions(["removeArticleFromCart"]),
	...mapActions(["clearCartItems"])
  }
};
</script>

<style>
</style>