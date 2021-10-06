<script>
    import Navbar from '$lib/Navbar.svelte'
    import { page } from '$app/stores'
    import { navContext } from '../store';


</script>

<svelte:head>
    <title>{$navContext.title}</title>
    <meta name="description" content={$navContext.caption}>
</svelte:head>

{#if $page.path !== '/' && $page.path !== '/login'}
    <Navbar title={$navContext.title} caption={$navContext.caption} />
{/if}

<slot />