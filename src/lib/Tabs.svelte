<script>
	import {fade, slide} from 'svelte/transition'
  export let items = [];
  export let activeTabValue = 0;

  const handleClick = tabValue => () => (activeTabValue = tabValue);
</script>

<ul>
{#each items as item}
	<li class={activeTabValue === item?.value ? 'active' : ''} transition:fade>
		<span on:click={handleClick(item?.value)}>{item?.label}</span>
	</li>
{/each}
</ul>
{#each items as item}
	{#if activeTabValue == item?.value}
	<div class="box" in:slide={{delay:400, duration:300}} out:slide={{duration:200}}>
		<svelte:component this={item?.component}  {...item?.props}/>
	</div>
	{/if}
{/each}
<style>

	.box {
    padding: .5rem;
	border: 1px solid #dee2e6;
    border-radius: 0 0 4px 4px;
    border-top: 0;
	}
  ul {
    display: flex;
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
    border-bottom: 1px solid #dee2e6;
    flex-wrap: wrap;
    overflow: hidden;
  }

	li {
		margin-bottom: -1px;
	}

  span {
    border: 1px solid transparent;
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
    display: block;
    padding: 0.5rem 1rem;
    cursor: pointer;
	position:relative;
	user-select: none;
  }

  span:hover {
    border-color: #e9ecef #e9ecef #dee2e6;
  }

  li.active > span {
    color: var(--brand);
    border-color: #dee2e6 #dee2e6 #fff;
  }
	
	li > span::before{
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
	
	li.active > span::before{
			transform: scaleX(1);
			opacity:1;
	}
</style>