<script>
import {base} from '$app/paths'
</script>


<svelte:head>
    <link rel="stylesheet" href="{base}/global.css">
    <link rel="favicon" href="{base}/favicon.png">
    <title>Login</title>
    <meta name="description" content="Login Page">
    <link rel="manifest" href="{base}/manifest.json">
</svelte:head>

<main>

	<form>
		<div class='header' action='{base}/home'>
			<span class="logo">🎓</span>
			<b>
				SISTEM AKADEMIK - STTM CILEUNGSI
			</b>
			<span>SSO - Form Login</span>
		</div>
		<div class='main'>
			<div class="control">
				<label for="username">Nama Pengguna</label>
				<input id="username" type="text" placeholder="Username">
			</div>
			<div class="control">
				<label for="password">Password</label>
				<input id="password" type="password" placeholder="Password">
			</div>
			<button type="button" class="submit" on:click="{_=> window.location='/home'}">
				Login
			</button>
			<hr>
		</div>
		<div class="footer">
			<div class="info">
				<b>Sekolah Tinggi Teknologi Muhammadiyah Cileungsi</b>
                <address>
					<em>Perum PT.SC Jl.Anggrek No.25 Cileungsi-Bogor 16820  <a href="tel:021-82495502">021-82495502</a></em>
                    <br>
                    <em>All Right Reserved by : <a href="/">Fmented and ...</a> - 2016</em>
                </address>
			</div>
			<div class="links">
				<a href="/">🏠 Menu Utama</a>
				<a href="/">☑ e-Learning</a>
				<a href="/">📔 e-Perpus</a>
				<a href="/">☑ e-Arsip</a>
				<a href="/">🏠 e-Alumni</a>
			</div >
		</div>
	</form>
</main>
	
<style>
	
	label{
		margin-bottom: .5em;
    }
	
	:global(main){
		height:100vh;
		background: url(/sttm.webp);
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
		position:relative;
		display:grid;
		place-items:center;
	}
	
	form{
		border-radius:8px;
		background:#fdfdfd;;
		margin:.5em;
		box-shadow: var(--shadow) ;
        max-width: 90vw;
		max-height: 90%;
		overflow: hidden;
	}
	


    @media (orientation: landscape){
		form{
			overflow: auto;
		}


	}
	
	
	.info{
		display:flex;
		flex-direction:column;
		font-size:12px
	}
	
	.footer>.links{
		font-size: 12px;
		margin-top:1em;
		padding-bottom:3em;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-evenly;
	}
	
	input{
		width:100%;
		transition: box-shadow 400ms ease, border 300ms ease;
		border-radius:4px;
        height: 2em;
        padding: 1em;
        border: var(--border);
        font-size: 16px;
	}

	
	input:hover{
	    box-shadow: var(--shadow);
	}
	
	label{
		font-weight:600;
	}
	
	input:focus-visible, input:focus{
		border:1px solid var(--brand);
		outline:0;
	}
	
	.control{
        margin:.5em;
        margin-top:0;
	}
	
	.header{
		display:flex;
		flex-direction:column;
		align-items:center;
		padding:.5rem;
		text-align:center;
		margin-bottom:1.5rem;
		background:var(--brand);
		color:white;
	}
	
	.header>b{
		font-size:18px;
        margin-bottom: 1em;
	}

    .header>span{
        margin-top: 0;
    }
	
	.logo{
		font-size:48px;
	}
	
	.footer{
		padding:.5em;
		text-align:center;
		display:flex;
		flex-direction:column;
		gap:.5em;
	}
	
	
		.submit{
		background:var(--brand);
		color:var(--surface1);
		border-radius:4px;
		padding:.5em 1em;
		transition: box-shadow 300ms linear;
		cursor:pointer;
		margin:.5em;
		margin-top:1em;
		width:calc(100% - 1em);
        font-size: 16px;
	}
	
	.submit:hover{
		box-shadow: var(--shadow);
	}
	
</style>