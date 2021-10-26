<div class="spinner">
    <strong>Please Wait ...</strong>
    <div class="out">
        <div class="in">
        </div>
    </div>
</div>

<style>

    *{
        box-sizing: content-box;
    }
    .spinner{
        max-height: min(40vh, 200px);
        margin: 0 auto;
        padding: 1rem;
    }
    .out, .in{
        border-width: 8px;
        border-style: solid;
        height: 40%;
        border-image: linear-gradient(to bottom, var(--secondary, #65b), var(--brand, #66d)) 1 100%;
        animation-name: spin-out;
        animation-duration: 1500ms;
    }
    
    strong{
        position: absolute;
        bottom: 0;
        text-align: center;
        animation: txt 1500ms ease-in-out infinite;
        animation-direction: alternate;
        color: #66d;
    }
 
    .in{
        animation-name: spin-in;
        border-image: linear-gradient(to bottom, var(--secondary, #65b), var(--brand, #66d)) 1 100%;
        height: calc(100%);
        transform: rotate(90deg);
    }


    
    div{
        aspect-ratio: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
    }

    div:not(.spinner){
        animation-timing-function: ease-in-out;
        animation-iteration-count: infinite;
        animation-direction: alternate;
    }
    

    @keyframes spin-out{
        to{
            transform: rotate(-90deg );
        }
    }

    @keyframes spin-in{
        to{
            transform: rotate(calc(1turn - 90deg) );
        }
    }

    @keyframes txt{
        to{
            transform: translateY(50%);
        }
    }



</style>