<script>
    import Submenu from "./Submenu.svelte";
    export let title = ''
    export let caption = ''

    let active = false

    let scope = new Map()
    let closeAll

    let menu
    const close = _ => active = false
</script>


<svelte:body on:click={e=>{
    if(active){
        if ([...e.path].includes(menu)) return
        console.log(e);
                
    }
}}/>

<header>
    <nav>
        <li class="header">
            <img src=logo.webp alt=logo width=167 height=168>
            <div class=text>
                <span class="title">{title}</span>
                <span class=caption>{caption}</span>
            </div>
        </li>
        <li class=toggler>
            <button on:click={()=>{closeAll(); active=!active}}>
                {!active ? '🔽':'🔼'}
            </button>
        </li>
    </nav>
    <menu class:mobile-show={active} bind:this={menu}>
        <li>
            <Submenu display='🏠 Beranda' bind:scope bind:closeAll>
                <li>
                    <a href=/home>🏫 Beranda</a>
                </li>
                <li>
                    <a href=/login>🚪 Logout</a>
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
                <li>
                    <a href=/nilai>📄 Nilai</a>
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
                <li>
                    <a href="/loker">🏢 Info Lowker</a>
                </li>
            </Submenu>
        </li>

    </menu>

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
        color: black;
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
        padding: 0 2%;
        grid-template-rows: clamp(8vh, 120px, 15vh);
    }

    .toggler{
        display: flex;
        flex-direction: row-reverse;
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
        padding: 0;
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
        border-top: 1px solid rgba(0,0,0,.05);
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
    }

    .caption{
        color: white;
        background: var(--brand);
        padding: .25rem;
    }


    @media (orientation: landscape) and (min-width:800px){
        menu, .mobile-show{
            display: flex;
            justify-content: space-evenly;
            gap: 2em;
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
            display: flex;
            align-items: baseline;
            justify-content: space-between;
        }
        nav{
            grid-template-columns: 1fr;
        }
    }

    header{
        top: 0;
        background: white;
        z-index: 99;
        border-bottom: 2px solid black;
        position: sticky;
    }


</style>