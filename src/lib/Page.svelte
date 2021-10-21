<script>
    import Navbar from './Navbar.svelte'
    import PageHead from './PageHead.svelte';
    export let title
    export let description
    let close
    let page
</script>

<PageHead {title} {description}/>

<Navbar {title} caption={description} bind:close/>

<svelte:body on:click={e=>{
    const path = e.path || (e.composedPath && e.composedPath())
    if([...path].includes(page)) close()
}}/>

<main bind:this={page}>
    <slot/>
</main>