<template>
	<div class="container">
		<div class="card">
			<div class="card-body">
				<div class="row">
					<div class="col md-12">
						<div class="row">
							<div class="col md-4 align-self-center p-2">
								<select class="custom-select mr-sm-2" id="inlineFormCustomSelect">
								<option selected>Categoria articoli...</option>
								<option value="1">Schede video</option>
								<option value="2">Monitor</option>
							</select>
							</div>
							<div class="col md-4 align-self-center p-2">
								<select class="custom-select mr-sm-2" id="inlineFormCustomSelect">
								<option selected>Ordinamento articoli...</option>
								<option value="1">Prezzo crescente</option>
								<option value="2">Prezzo decrescente</option>
							</select>
							</div>
							<div class="col md-4 align-self-center prezzo p-2">
								<div class="row">
									<div class="form-inline range">
										<div>Prezzo desiderato:</div>
										<input type="number" class="form-control" name="" id="" placeholder="Min" min="0">
										<input type="number" class="form-control" name="" id="" placeholder="Max" min="0">
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

export default {
	created() {
		
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