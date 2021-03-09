<template>
	
	<div v-bind:id="notification.id" class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-delay="1500">
		<div class="toast-header">
			<strong class="mr-auto px-2">{{notification.type}}</strong>
			<button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
				<span aria-hidden="true">&times;</span>
			</button>
		</div>
		<div class="toast-body">
			{{notification.message}}
		</div>
	</div>
</template>

<script>
import $ from 'jquery';
import { mapActions } from 'vuex';

export default {
	props: ["notification"],
	mounted() {
		/* È necessario creare dei riferimenti costanti per evitare che jquery referenzi degli oggetti ormai scomparsi
		vuex distrugge la notifica, vue distrugge la componente ma jquery deve ancora completare l'evento */
		const id = this.notification.id;
		const f = this.removeNotification;

		$('#'+id).toast('show');
		
		$('#'+id).on('hidden.bs.toast', function(){
			$('#'+id).unbind();
			f(id);
		});
	},
	methods: {
		...mapActions(["removeNotification"]),
	}
}
</script>

<style scoped>
	
</style>