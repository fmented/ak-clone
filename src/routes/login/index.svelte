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
			<span class="logo">
				<svg width="48" height="48" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white"><path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838l-2.727 1.17 1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zm5.99 7.176A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"></path></svg>
			</span>
			<b style="color: white;">
				SISTEM AKADEMIK - STTM CILEUNGSI
			</b>
			<span style="color: white;">SSO - Form Login</span>
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
			<div style="text-align: center;">
				<strong style=" color: #d45;">{error}</strong>
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
                    <em>All Right Reserved by : <a href="https://github.com/fmented/ak-clone">Fmented and ...</a> - 2016</em>
                </address>
			</div>
			<div class="links">
				<a href="/" rel=external><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" ><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg> Menu Utama</a>
				<a href="/" rel=external><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3.5 3.75a.25.25 0 01.25-.25h13.5a.25.25 0 01.25.25v10a.75.75 0 001.5 0v-10A1.75 1.75 0 0017.25 2H3.75A1.75 1.75 0 002 3.75v16.5c0 .966.784 1.75 1.75 1.75h7a.75.75 0 000-1.5h-7a.25.25 0 01-.25-.25V3.75z"></path><path d="M6.25 7a.75.75 0 000 1.5h8.5a.75.75 0 000-1.5h-8.5zm-.75 4.75a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75zm16.28 4.53a.75.75 0 10-1.06-1.06l-4.97 4.97-1.97-1.97a.75.75 0 10-1.06 1.06l2.5 2.5a.75.75 0 001.06 0l5.5-5.5z"></path></svg> e-Learning</a>
				<a href="/" rel=external><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" ><path d="M0 0h24v24H0z" fill="none"></path><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"></path></svg> e-Perpus</a>
				<a href="/" rel=external><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z"></path><path fill-rule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg> e-Arsip</a>
				<a href="/" rel=external><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838l-2.727 1.17 1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zm5.99 7.176A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"></path></svg> e-Alumni</a>
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
		position:relative;
		display:grid;
		place-items:center;
	}

	:global(main::before){
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
		background-image: var(--bg);
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
		filter: brightness(.6);
	}

	form{
		border-radius:8px;
		background: transparent;
		margin:.5em;
		box-shadow: var(--shadow) ;
        max-width: 90vw;
		max-height: 90%;
		overflow: auto;
		border: var(--border);
		backdrop-filter: blur(8px) contrast(.2) opacity(90%) brightness(3);
	}
	

	@media(prefers-color-scheme: dark){
		:global(main::before){
			filter: brightness(.2);
		}

		form{
			backdrop-filter: blur(8px) contrast(.2) opacity(50%) brightness(.1);
		}
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
		white-space: nowrap;
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
	}
	
	.header>b{
		font-size:18px;
        margin-bottom: 1em;
	}

    .header>span{
        margin-top: 0;
    }
	
	.logo > svg{
		font-size:48px;
	}
	
	.footer{
		padding:1em;
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

	a svg{
		width: 1em;
		vertical-align: bottom;
	}


</style>