<div>
	<slot></slot>
</div>

<style>
	div{
		display:grid;
		grid-template-rows: auto 1fr;
		grid-template-columns:1fr;
		align-items:baseline;
		padding-bottom:1rem;
		gap: .25rem;
	}
	@media (orientation: landscape) and (min-width:600px){
			div{
				display:grid;
				grid-template-columns: 30% 70%;
				grid-template-rows:1fr;
			}
	}
</style>