<script>
    import {fade, fly} from 'svelte/transition'
    import {onMount} from 'svelte'

    export let active = false
    let modal

    let doc

    onMount(()=>doc = document)

    function teleport(el) {
        document.body.appendChild(el)
    }

    export const close = ()=>active=false

    $: if(doc && active) doc.body.style.overflow = 'hidden'
    $: if(doc && !active) doc.body.style.overflow = 'auto'

</script>


{#if active}
<aside on:click={e=>{
    if([...e.path].includes(modal)) return
    active = false
    }} transition:fade use:teleport>
    <article bind:this={modal} in:fly={{y:-100}} out:fade>
        <div class=head>
            <slot name=head></slot>
        </div>
        <div class=content>
                <slot name=content></slot>
        </div>
        <div class=action>
            <slot name=action close={close}></slot>
        </div>
    </article>
</aside>
{/if}

<style>
    aside{
        position: fixed;
        top:0;
        left: 0;
        width: 100%;
        height: 100%;
        display: grid;
        place-items: center;
        background: rgba(0,0,0,.7);
        z-index: 99;
        box-shadow: var(--shadow);
    }

    article{
        min-width: 280px;
        max-width: 90%;
        min-height: 20%;
        max-height: 90%;
        display: grid;
        grid-template-rows: auto 1fr auto;
    }

    
    .head, .action, .content{
        border: 2px solid var(--text);
    }

    .head{
        border-radius: 8px 8px 0 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: var(--brand);
        font-size: large;
        font-weight: 600;
        color: var(--surface1);
    }

    .action{
        border-radius: 0 0 8px 8px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: .5rem;
        border-top: 0;
    }

    .content{
        padding: 1rem;
        border-bottom: 0;
        max-height: 100%;
        overflow-y: auto;
    }

    .content, .action{
        background-color: var(--surface1);
    }

    .head, .action{   
        padding: 1rem;
    }

    @media (orientation: landscape){
        article{
            max-width: 450px;
        }
    }


</style>