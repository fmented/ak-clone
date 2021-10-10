<script>
    import {base} from '$app/paths'
    export let title
    export let description
</script>

<svelte:head>
    <link rel="icon" href="{base}/favicon.png" />
	<link rel="stylesheet" href="{base}/global.css">
    <title>{title}</title>
    <meta name="description" content={description}/>
    <link rel="manifest" href="{base}/manifest.json">
</svelte:head>