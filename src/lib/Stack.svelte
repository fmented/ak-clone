<script>
    export let gap = '2em'
	export let template = '1fr 1fr'
</script>

<div style={`--gap:${gap}; --template:${template}; ${$$props.style}`}>
	<slot></slot>
</div>

<style>
	div{
		display:grid;
		grid-template-rows: auto auto;
		grid-template-columns:1fr;
		align-items:baseline;
		grid-gap: calc(var(--gap) / 4);
	}
	
	@media (orientation: landscape) and (min-width:800px){
			div{
				grid-template-columns: var(--template);
				grid-template-rows:1fr;
				grid-gap: var(--gap);
			}
	}
</style>