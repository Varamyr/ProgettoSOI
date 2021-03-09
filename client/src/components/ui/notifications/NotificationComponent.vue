<template>
	<div aria-live="polite" aria-atomic="true" style="position: fixed; left:0; bottom: 0; width:100%; min-height:200px; pointer-events: none;">
		<!-- Positioning -->
		<div style="position: fixed; bottom: 25px; right: 0; margin-right: 25px;">
			<!-- Notifications -->
			
			<notification-message style="pointer-events: auto;"
				v-for="notification in notifications" 
				:key="notification.id" 
				:notification="notification" 
			/>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import NotificationMessage from './NotificationMessage';

export default {
  components: {
		NotificationMessage 
	},
	computed: {
		...mapState({
			//IMPORTANTE
			/* Se voglio aggiornare la mia UI in base allo stato di un vettore devo specificare il modulo:
			se ho moduli namespaced posso evitare questa scrittura e usare quella normale es
			computed: ...mapState['modulo', 'vettore']
			se non ho moduli namespaced così
			computed: state => state.NOMEMODULO.vettore */
			notifications: state => state.Notifications.notificationList
		})
	}
}
</script>

<style scoped>
</style>