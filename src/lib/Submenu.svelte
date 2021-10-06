
<script context='module'>
</script>

<script>
import {hasContext, onDestroy, onMount} from 'svelte'
import {slide} from 'svelte/transition'

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
    if([...e.path].includes(_)) return
    close()
}}/>

<div bind:this={_} on:click={handler} class=container>
    <div class="title">
        <span class={$$props.class} style={$$props.style} class:active>{display}</span>
        <span class=indicator>{active?'🔺':'🔻'}</span>
    </div>
    {#if active}        
        <menu in:slide={{delay:100, duration:100}} out:slide={{duration:100}} class:left={[...scope.keys()][0]==_}>
            <slot></slot>
        </menu>
    {/if}
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
    }

    .container{
        position: relative;
    }

    menu{
        background: white;
        padding-top: .25rem;
        padding-bottom: .5rem;
    }

    span{
        cursor: pointer;
    }
    
    @media (orientation: landscape) and (min-width:800px){
        menu{
            position: absolute;
            top:100%;
            right: 0;
            border: 1px solid black;
            margin-top: .25rem;
            width: max-content;
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