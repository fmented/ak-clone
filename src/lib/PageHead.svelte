<script>
    import {base} from '$app/paths'
    import '../global.css'
    export let title
    export let description
</script>

<svelte:head>
    <title>{title}</title>
    <meta name="description" content={description}/>
    <link rel="preload" href="{base}/bitter/latin.woff2" as="font" type="font/woff2" crossorigin>
    <link rel="manifest" href="{base}/manifest.json">
    <link rel="apple-touch-icon" sizes="152x152" href="{base}/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="{base}/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="{base}/favicon-16x16.png">
    <link rel="mask-icon" href="{base}/safari-pinned-tab.svg" color="#5bbad5">
    <meta name="msapplication-TileColor" content="#00aba9">
    <style>
          @font-face {
            font-family: 'Bitter';
            font-style: normal;
            font-weight: 300;
            font-display: swap;
            src: url(/bitter/latin.woff2) format('woff2');
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }
    </style>
    <slot></slot>
</svelte:head>
