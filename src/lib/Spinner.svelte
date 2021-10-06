<div class="spinner">
    <div class="out">
        <div class="in"></div>
    </div>
</div>

<style>
    div{
        aspect-ratio: 1;
        display: grid;
        place-items: center;
        border-radius: 50%;
        animation-name: spin;
        animation-duration: 4s;
        animation-timing-function: ease-in-out;
        animation-iteration-count: infinite;
        position: relative;
    }

    .out, .in{
        border: 8px solid var(--brand);
        width: 50%;
    }

    .out{
        border-inline-color: transparent;
    }

    .in{
        border-block-color: transparent;
    }

    @keyframes spin{
        to{
            transform: rotate(360deg);
        }
    }

</style>