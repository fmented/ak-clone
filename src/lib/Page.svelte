<script>
    import Navbar from './Navbar.svelte'
    import {base} from '$app/paths'
    export let title
    export let description
    let close
    let page
</script>

<svelte:head>
    <link rel="icon" href="{base}/favicon.png" />
	<link rel="stylesheet" href="{base}/global.css">
    <title>{title}</title>
    <meta name="description" content={description}/>
    <link rel="manifest" href="{base}/manifest.json">

</svelte:head>

<Navbar {title} caption={description} bind:close/>

<svelte:body on:click={e=>{
    if([...e.path].includes(page)) close()
}}/>

<main bind:this={page}>
    <slot/>
</main>