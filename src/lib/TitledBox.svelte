<article  class={$$props.class}>
    <div>{$$props.name}</div>
    <div>
        <slot></slot>
    </div>
</article>

<style>
    article{
        display: block;
        border-radius: 8px 8px 0 0;
        overflow: hidden;
        border: 1px solid black;
        box-sizing: border-box;
    }

    div{
        padding: 1rem;
    }

    div:first-of-type{
        background: var(--brand);
        color: white;
        font-size: 18px;
        font-weight: 500;
        border-bottom: 2px solid black;
    }
</style>

