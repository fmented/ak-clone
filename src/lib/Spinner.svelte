<div class="spinner">
    <div class="out">
        <div class="in">
        </div>
    </div>
    <p>Please Wait</p>
</div>

<style>

    *{
        box-sizing: content-box;
    }
    .spinner{
        max-height: 25vh;
        margin: 0 auto;
    }
    
    .out, .in{
        --r: 0deg;
        border-width: 8px;
        border-style: solid;
        height: 40%;
        border-image: linear-gradient(to bottom, var(--error, #f63), var(--brand, #66d)) 1 100%;
        animation-name: spin-out;
        animation-duration: 1500ms;
    }
    
    p{
        position: absolute;
        bottom: 0%;
        text-align: center;
        font-weight: bolder;
        animation: txt 1500ms ease-in-out infinite;
        animation-direction: alternate;
    }
 
    .in{
        animation-name: spin-in;
        border-image: linear-gradient(to top, var(--error, #f63), var(--brand, #66d)) 1 100%;
        height: calc(100%);
        transform: rotate(90deg);
        --r: 90deg;
        z-index: -1;
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