<script context=module>
    import { redirectIfLoggedIn } from '$lib/scripts/helper';
    export const load = redirectIfLoggedIn
</script>

<script>
import {base} from '$app/paths'
import PageHead from '$lib/PageHead.svelte';
import { hash } from '$lib/scripts/helper';

let username
let password
let error


async function login() {
	if(!(username && password)) return error = 'please fill all field'
	error = ''
	
	const req = await fetch(base+'/auth', {
		method: 'POST',
		body: JSON.stringify({
			username: hash(username),
			password: hash(password)
		}),
		headers:{
			'content-type': 'application/json'
		}
	})

	const res = await req.json()
	error = res.error
	if(res.authenticated) window.location = base+'/home'
}

$: password, error=''
$: username, error=''


</script>


<svelte:body on:keyup={e=>{if(e.key=='Enter') login()}} />

<PageHead title=Login description='Halaman Login'/>

<main style="--bg:url({base}/sttm.webp)">

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
				<input id="username" type="text" placeholder="Username" bind:value={username} name="username" required autocomplete="off">
			</div>
			<div class="control">
				<label for="password">Password</label>
				<input id="password" type="password" placeholder="Password" bind:value={password} name="password" required>
			</div>
			{#if error}
			<div style="text-align: center; color: #d45;">
				<strong>{error}</strong>
			</div>
			{/if}
			<button type="button" class="submit" on:click={login}>
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
				<a href="/" rel=external>🏠 Menu Utama</a>
				<a href="/" rel=external>☑ e-Learning</a>
				<a href="/" rel=external>📔 e-Perpus</a>
				<a href="/" rel=external>☑ e-Arsip</a>
				<a href="/" rel=external>🏠 e-Alumni</a>
			</div >
		</div>
	</form>
</main>
	
<style>
	
	label{
		margin-bottom: .5em;
    }

	input{
		width: 100%;
	}
	
	:global(main){
		height:100vh;
		background: var(--bg);
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
		overflow: auto;
	}
	
	
	
	.info{
		display:flex;
		flex-direction:column;
	}
	
	.footer>.links{
		margin-top:1em;
		display: flex;
		flex-wrap: wrap;
		gap: .5rem;
		justify-content: center;
	}
	
	
	label{
		font-weight:600;
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
		align-content: center;
		font-size: .85rem;
		padding-bottom: 2rem;
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