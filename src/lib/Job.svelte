<script>
	import {fade} from 'svelte/transition'

	export let display = false;
	let form

</script>



{#if display}
<form class="main" transition:fade bind:this={form}>
	<div class="head">
		<h2>
			Tambah Informasi
		</h2>
		<div class="close" on:click="{_=>display=false}"></div>
	</div>
			<hr>
	<div class="main">
		<div class="control">
		<label for="posisi">Posisi</label>
		<input type="text" id="posisi" placeholder="Posisi Yang Dibutuhkan">
	</div>
		
	<div class="control">
		<label for="nama">Nama Perusahaan</label>
		<input type="text" id="nama" placeholder="Nama Kantor Perusahaan">
	</div>
		
		<div class="control">
		<label for="alamat">Alamat</label>
			<textarea type="text" id="alamat" placeholder="Alamat Kantor Perusahaan"></textarea>
	</div>
		
	<div class="control">
		<label for="info">Informasi</label>
    <textarea type="text" id="info" placeholder="Informasi Seputar Deskripsi Pekerjaan Dan Persyaratan"></textarea>
	</div>
		
	<div class="control">
		<label for="exp">Kadaluarsa</label>
		<input type="text" id="exp" placeholder="Tanggal Ditutupnya Lowongan" onfocus="this.type='date'" onblur="if(!this.value) this.type='text'" pattern="\d{4}-\d{2}-\d{2}">
	</div>
	</div>
	
	<div class="foot">
		<button class="cancel" type="button" on:click="{_=>display=!display}">
			batal
		</button>
		<button class="submit" type="submit">
			tambah
		</button>
	</div>
	
</form>
<div class="blur" transition:fade on:click="{_=>display=false}"></div>

{/if}
<style>
	*{
		box-sizing:border-box;
	}
	.head{
		display:grid;
		margin:0 1em;
		grid-template-columns: 1fr auto; 
		align-items: center;
		position:relative;
	}
	
	.close{
		top:.25em;
		right:-.5em;
		width:1em;
		aspect-ratio:1;
		border-radius:50%;
		transform: translateY(-1em);
		position: relative;
		cursor:pointer;
		user-select:none;
	}
	
	.close::after, .close::before{
		position:absolute;
		top:50%;
		left:10%;
		content:'';
		width:80%;
		height:1px;
		background:black;
		transition: background 300ms ease;
	}
	
	.close::after{
		transform:rotate(45deg)
	}
		.close::before{
		transform:rotate(-45deg)
	}
	
.close:hover::before, .close:hover::after{
			background: #d44;
	}

	
	
	input, textarea{
		width:100%;
		transition: box-shadow 400ms ease;
		border-radius:4px;
	}
	
	input[type="text"]{
		height:2.4em
	}
	
	input:hover, textarea:hover{
	box-shadow: 0px 0px 1px 2px rgba(68,68,221,0.06) ;
	}
	
	label{
		font-weight:600;
	}
	
	input:focus-visible, textarea:focus-visible{
		border:1px solid blue;
		outline:0;
	}
	
	
	textarea{
		height:10ch
	}
	
	.submit, .cancel{
		background:#5555dd;
		color:white;
		border-radius:4px;
		padding:.5em 1em;
		transition: box-shadow 300ms linear;
		cursor:pointer;
	}
	
	.submit:hover, .cancel:hover{
		box-shadow: 0px 0px 1px 1px rgba(0,0,0,0.1);
	}
	
	.cancel{
		background:#dd5555;
		color:white;
	}
	
	.control{
	margin:.5em;
	}
	
	.foot{
		padding:.5em;
		display:flex;
		gap:.5em;
		justify-content:flex-end;
		background:#ddd;
		flex-wrap:wrap;
	}
	
	form{
		border-radius:12px;
		background:#fdfdfd;;
		overflow:hidden;
		margin:2em;
		box-shadow: 0px 0px 1px 2px rgba(0,0,0,0.1) ;
	}
	
		@media (min-width: 1000px){
		form{
			width:70vw;
			margin-inline:15vw;
		}
	}
	
	.blur{
		position:fixed;
		top:0;
		left:0;
		width:100vw;
		height:100vh;
		background: rgba(0,0,0,0.1);
		z-index:-1;
	}
	
</style>