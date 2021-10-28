<script>
    import {base} from '$app/paths'
    export let title
    export let description
</script>

<svelte:head>
    <title>{title}</title>
    <meta name="description" content={description}/>
    <link rel="stylesheet" href="{base}/font.min.css">
	<link rel="stylesheet" href="{base}/global.min.css">
    <link rel="manifest" href="{base}/manifest.json">
    <link rel="apple-touch-icon" sizes="152x152" href="{base}/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="{base}/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="{base}/favicon-16x16.png">
    <link rel="mask-icon" href="{base}/safari-pinned-tab.svg" color="#5bbad5">
    <meta name="msapplication-TileColor" content="#00aba9">
    <slot></slot>
</svelte:head>
