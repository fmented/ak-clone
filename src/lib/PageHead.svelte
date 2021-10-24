<script>
    import {base} from '$app/paths'
    export let title
    export let description
</script>

<svelte:head>
    <title>{title}</title>
    <meta name="description" content={description}/>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Bitter:wght@300&display=swap" rel="stylesheet">
	<link rel="stylesheet" href="{base}/global.css">
    <link rel="manifest" href="{base}/manifest.json">
    <link rel="apple-touch-icon" sizes="152x152" href="{base}/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="{base}/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="{base}/favicon-16x16.png">
    <link rel="mask-icon" href="{base}/safari-pinned-tab.svg" color="#5bbad5">
    <meta name="msapplication-TileColor" content="#00aba9">
    <meta name="theme-color" content="#ffffff">
    <slot></slot>
</svelte:head>