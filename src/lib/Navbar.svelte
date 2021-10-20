<script>
import { browser } from "$app/env";

import { base } from "$app/paths";
import {slide, fly} from 'svelte/transition'
    import Submenu from "./Submenu.svelte";
    export let title = ''
    export let caption = ''

    let active = false

    let scope = new Map()
    let closeAll

    export const close = _ => {closeAll(); active = false}
</script>


<svelte:body on:scroll={close}/>

<header>
    <nav>
        <li class="header">
            <img src='{base}/logo.webp' alt=logo width=167 height=168 on:click="{()=>window.location="/"}">
            <div class=text>
                <span class="title">{title}</span>
                <span class=caption>{caption}</span>
            </div>
        </li>
        <li class=toggler>
            <button on:click={()=>{closeAll(); active=!active}}>
                {#if !active}
                <svg width="1em" in:fly={{y:100}}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" color="var(--brand)"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                {:else}
                <svg width="1em" in:fly={{y:100}}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" color="var(--brand)"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                {/if}
            </button>
        </li>
    </nav>
    {#key active}
    <menu class:mobile-show={active} transition:slide>
        <li>
            <Submenu display='🏠 Beranda' bind:scope bind:closeAll>
                <li class="link-like">
                    <a href='{base}/home' on:click={close} rel=external>🏫 Beranda</a>
                </li>
                <li class="link-like">
                    <a href='{base}/changepassword' on:click={close} rel=external>🔑 Ganti Password</a>
                </li>
                <li class="link-like">
                    <a href='{base}/logout' on:click={close} rel=external>🚪 Logout</a>
                </li>
            </Submenu>
        </li>
        <li>
            <Submenu display='📝 Input' bind:scope>
                <li>
                    <p>🚧 Under Construction</p>
                </li>
            </Submenu>
        </li>
        <li>
            <Submenu display='👀 Lihat' bind:scope>
                <li class="link-like">
                    <a href='{base}/nilai' on:click={close} rel=external>📄 Nilai</a>
                </li>
            </Submenu>
        </li>
        <li>
            <Submenu display='📃 Pengajuan' bind:scope>
                <li>
                    <p>🚧 Under Construction</p>
                </li>
            </Submenu>
        </li>
        <li>
            <Submenu display="📰 Artikel" bind:scope>
                <li>
                    <p>🚧 Under Construction</p>
                </li>

            </Submenu>
        </li>
        <li>
            <Submenu display='🔗 Tautan' bind:scope>
                <li class="link-like">
                    <a href='{base}/loker' on:click={close} rel=external>🏢 Info Lowker</a>
                </li>
            </Submenu>
        </li>

    </menu>
{/key}
</header>


<style>
    :global(.blue){
        background: blue;
    }

    *{
        box-sizing: border-box;
    }

    a{
        text-decoration: none;
        color: var(--text);
    }

    a::before{
        display: none;
    }

    .mobile-show{
        display: block;
    }

    nav{
        display: grid;
        grid-template-columns: 80% 15%;
        grid-gap: 3%;
        padding: .5rem auto;
        grid-template-rows: clamp(8vh, 120px, 15vh);
    }

    .toggler{
        display: flex;
        flex-direction: row-reverse;
        overflow: hidden;
    }


    
    .toggler>button{
        font-size: 36px;
        text-align: end;
        background: transparent;
        outline: 0;
        border: 0;
        cursor: pointer;
        aspect-ratio: 1/1;
        padding: 0;
        width: min-content;

    }

    .header{
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 0 1rem;
    }

    .text{
        display: flex;
        flex-direction: column;
    }

    .header > img {
        height: 60%;
        width: auto;
    }

    li{
        list-style: none;
    }

    menu{
        padding: 0 .5rem;
        display: none;
    }

    menu>li{
        padding: .25rem 0;
        font-size: 18px;
        border-top: 1px solid var(--overlay);
    }

    menu>li:first-child{
        border: 0;
    }

    li li {
        padding: 0 0.5rem;
        font-size: 16px;
        position: relative;
    }

    .title{
        color: var(--brand);
        font-size: clamp(18px, 18px, 5rem);
        font-weight: 700;
    }

    .caption{
        color: var(--surface1);
        background: var(--brand);
        padding: .25rem;
    }


    @media (orientation: landscape) and (min-width:800px){
        menu, .mobile-show{
            display: flex;
            justify-content: space-evenly;
            border-radius: 0;
            border: 0;
        }

        a::before{
            display: absolute;
        }

        a:hover::before{
          transform: scaleX(1);  
        }

        menu>li{
            border: 0;
            transition: background-color 300ms ease;
        }

        menu>li:hover{
            background-color: rgba(0,0,0,.05);
        }

        .toggler{
            display: none;
        }
        li li{
            padding: .25rem;
        }
	
        header{
            max-width: 100% !important;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        nav{
            grid-template-columns: 1fr;
        }

    }

    header{
        top: 0;
        background: var(--surface1);
        z-index: 99;
        border-bottom: 2px solid var(--brand);
        position: sticky;
        user-select: none;
    }


</style>