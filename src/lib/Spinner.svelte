<div class="spinner">
    <div class="out">
        <div class="in"></div>
    </div>
</div>

<style>
    .spinner{
        max-height: 25vh;
        margin: 0 auto;
    }
    
    .out, .in{
        border: 8px solid var(--brand);
        width: 50%;
    }
    
    .out{
        border-top-color: transparent;
    }
    
    .in{
        border-bottom-color: transparent;
        width: 75%;
        
    }
    
    .in , .out, .spinner{
        aspect-ratio: 1;
        display: grid;
        place-items: center;
        border-radius: 50%;
        animation-name: spin;
        animation-duration: 1800ms;
        animation-timing-function: ease;
        animation-iteration-count: infinite;
        position: relative;
    }
    .in::before{
        content: '';
        background-color: var(--brand);
        aspect-ratio: 1;
        height: 50%;
        border-radius: 50%;
    }

    @keyframes spin{
        to{
            transform: rotate(360deg);
        }
    }

</style>