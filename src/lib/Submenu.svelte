
<script context='module'>
</script>

<script>
import { onDestroy, onMount} from 'svelte'

import {slide, fly } from 'svelte/transition'

export let display = 'submenu'
export let scope = new Map()
let _

const update = _ => scope = scope

onMount(()=>{
    scope.set(_, false)
    update()
})

onDestroy(()=>{
    scope.delete(_)
    update()
})


export function closeAll(){
    [...scope.keys()].forEach(i=>{
        scope.set(i, false)
    })
    update()
}

function open(){
    closeAll()
    scope.set(_, true)
    update()
}

function close() {
    scope.set(_, false)
    update()
}

function handler(){
    if(active) return close()
    return open()
}

$: active = scope.get(_)
</script>

<svelte:body on:click={e=>{
    const path = e.path || (e.composedPath && e.composedPath())
    if([...path].includes(_)) return
    close()
}}/>

<div bind:this={_} on:click={handler} class=container>
    <div class="title">
        <span class={$$props.class} style={$$props.style} class:active>{display}</span>
        <span class=indicator>
            {#if active}
            <svg width="2em" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" color="var(--brand)"><path d="M0 0h24v24H0z" fill="none"></path><path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"></path></svg>
            {:else}
            <svg width="2em" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" color="var(--brand)"><path d="M0 0h24v24H0z" fill="none"></path><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path></svg>
            {/if}
        
        </span>
    </div>
    {#key active}        
        <menu class:left={[...scope.keys()][0]==_} in:fly={{duration: 300, x:-100}} out:slide={{duration:300}} class:active={active}>
            <slot></slot>
        </menu>
    {/key}
</div>


<style>
    :global(*){
        box-sizing: border-box;
    }

    .indicator{
        font-size: xx-small;
    }

    .title{
        display: flex;
        justify-content: space-between;
        z-index: 1;
    }

    .container{
        position: relative;
    }

    menu{
        background: var(--surface1);
        padding-top: .25rem;
        padding-bottom: .5rem;
        transform: translateZ(0);
        display: none;
    }

    menu.active{
        display: block;
    }

    span{
        cursor: pointer;
    }
    
    @media (orientation: landscape) and (min-width:800px){
        menu{
            position: absolute;
            top:100%;
            right: 0;
            margin-top: .25rem;
            width: max-content;
            border: var(--border);

        }

        .left{
            left: 0;
        }


        span::before{
		content:'';
		position:absolute;
		bottom:0;
		left:0;
		height:3px;
		background: var(--brand);
		width:100%;
		transform-origin:0 50%;
		transform: scaleX(0);
		opacity:0;
		transition: transform 300ms ease, opacity 200ms ease-out;
	}
	
        span.active::before{
                transform: scaleX(1);
                opacity:1;
        }

        .indicator{
            visibility: collapse;
        }
    }


</style>