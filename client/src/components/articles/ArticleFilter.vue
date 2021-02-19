<template>
	<div class="container">
		<div class="card">
			<div class="card-body">
				<div class="row">
					<div class="col md-12">
						<div class="row">
							<div class="col md-4 align-self-center p-2">
								<select class="custom-select mr-sm-2" id="category" @change="changed($event)">
									<option value="default" selected>Categoria articoli...</option>
									<option value="gpu">Schede video</option>
									<option value="monitor">Monitor</option>
									<option value="cpu">Processori</option>
									<option value="mobo">Schede madri</option>
									<option value="ram">Memoria</option>
									<option value="dissipator">Dissipatori</option>
									<option value="psu">Alimentatori</option>
									<option value="hdd">Dischi rigidi</option>
									<option value="ssd">Dischi a stato solido</option>
									<option value="case">PC Case</option>
									<option value="peripherals">Periferiche</option>
								</select>
							</div>
							<div class="col md-4 align-self-center p-2">
								<select class="custom-select mr-sm-2" id="orderby" @change="changed($event)">
									<option value="asc" selected>Prezzo crescente</option>
									<option value="desc">Prezzo decrescente</option>
								</select>
							</div>
							<div class="col md-4 align-self-center prezzo p-2">
								<div class="row">
									<div class="form-inline range">
										<div>Prezzo desiderato:</div>
										<input type="number" class="form-control" name="minPrice" id="minPrice" placeholder="Min" min="0" @keyup="changed($event)">
										<input type="number" class="form-control" name="manPrice" id="maxPrice" placeholder="Max" min="0" @keyup="changed($event)">
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {mapActions} from 'vuex';

export default {
	methods: {
		changed(event){
			//var targetId = event.currentTarget.id;
			var componentId = event.currentTarget.id;
			var newValue = event.currentTarget.value;
			this.updateFilters({
				type: componentId,
				newValue: newValue
			});
			
			/*switch (componentId){
				case "category":
					this.updateFilters({category: newValue});
					break;
				case "orderby":
					this.updateFilters({orderby: newValue});
					break;
				case "minPrice":
					this.updateFilters({minPrice: newValue});
					break;
				case "maxPrice":
					this.updateFilters({maxPrice: newValue});
					break;
				default:
					break;
			}*/
		},
		...mapActions(['updateFilters'])
	}
}
</script>

<style scoped>
/* Tolgo le frecce da input type number */
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

input[type=number]{
	width: 80px;
	margin-left: 10px;
}

select{
	width: fit-content;
}

.prezzo{
	min-width: 300px;
}

.range{
	margin: 0 auto;
}
</style>