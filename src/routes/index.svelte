<script context=module>
	export async function load({session}){
        if(session.auth && session.user){
            return {
                status:302,
                redirect: base+'/home'
            }
        }
        else return {}
    }
</script>

<script>
import { base } from '$app/paths';
import { onMount } from 'svelte';
import {fly} from 'svelte/transition'

let slide = 0
let intro = true
let delay = 1000
let read = false

setTimeout(()=>slide=1, delay)

$: getstate = n => slide==n && !read? 'running':'paused'

$: switchstate = ()=> intro=false

$: switchslide = (e)=>{
    let x = e.target.hasAttribute('last')
    if(x && !intro){
        intro=true
        if(slide==3){
            slide=1
        }
        else{
            slide=slide+1
        }
    }
}


function next() {
    intro=true
    if(slide==3){
        slide=1
    }
    else{
        slide=slide+1
    }
}

function prev() {
    intro=true
    if(slide==1){
        slide=3
    }
    else{
        slide=slide-1
    }
}

onMount(()=>{
    document.addEventListener('visibilitychange', e=>{
        read = document.hidden ? true : false
    })
})


$:console.log(slide);
</script>


<svelte:head>
    <link rel="stylesheet" href="{base}/global.css">
    <link rel="favicon" href="{base}/favicon.png">
    <title>Landing</title>
    <meta name="description" content="Landing Page">
    <link rel="manifest" href="{base}/manifest.json">
</svelte:head>

<header on:pointerdown={()=>read=!read}>

    <div class="text" class:top-out={slide==1&&!intro} style="--in:300ms; --out:1000ms; --state:{getstate(1)}" class:hide={slide!=1} last on:animationend={switchslide}>
        <h1 style="font-size: 24px; --in:300ms; --out:1000ms; --state:{getstate(1)}" class:top-in={slide==1}>Selamat Datang <span>di website</span></h1>
        <h1 style="font-size: 20px; --in:400ms; --out:1000ms; --state:{getstate(1)}" class:top-in={slide==1}>AKADEMIK STTM CILEUNGSI</h1>
        <b class="item3" style="--in:500ms; --out:1000ms; --state:{getstate(1)}" class:top-in={slide==1}>Excellent - Moral - Proffesional</b>
        <span class="item4" style="--in:600ms; --out:1000ms; --state:{getstate(1)}" class:left-in={slide==1}>Smart - Clean - Responsive - Elegant</span>
        <div style="margin-top: 1em; --in:700ms; --out:1000ms; --state:{getstate(1)}" class:right-in={slide==1} on:animationend={()=>switchstate(1)}>
            <span>Sekolah Tinggi Teknologi Muhammadiyah Cileungsi</span>
            <br>
            <span>Jln Anggrek Cileungsi</span>
            <br>
            <span>Telp. 0099949449</span>
        </div>
    </div>      
    <div class="image" class:hide={slide!=1}>
        <img src='{base}/logo.webp' alt="logo" class="logo" width=168 height=168 style="--in:400ms; --out:1000ms; --state:{getstate(1)}" class:right-in={slide==1 && intro} class:bottom-out={slide==1&&!intro}>
    </div> 
   
   
   
   
    <div class="text" class:hide={slide!=2}>
        <h1 style="font-size: 24px; --in:400ms; --out:1100ms; --state:{getstate(2)}" class:left-in={slide==2 && intro} last on:animationend={switchslide} class:bottom-out={slide==2 && !intro}>GUIDANCE</h1>
        <div style="margin-top: 1em; font-size: 20px; --in:700ms; --out:1000ms; --state:{getstate(2)}" class:top-in={slide==2 && intro} class:left-out={slide==2&&!intro} on:animationend={switchstate}>
            <span>e-Arsip</span>
            <br>
            <span>e-Learning</span>
            <br>
            <span>e-Arsip</span>
            <br>
            <span>e-Learning</span>
            <br>
            <span>Accesibility, Central, Responsive, User friendly</span>
        </div>
    </div>
    <div class="image" class:hide={slide!=2}>
        <img src="{base}/ps.png" alt="img" style="width: 40%; --in:400ms; --out:1000ms; --state:{getstate(2)}" class:bottom-in={slide==2&&intro} class:right-out={slide==2&!intro}>
    </div>
    

    <div class="text" last class:hide={slide!=3} style="--in:400ms; --out:1200ms; --state:{getstate(3)}" class:right-out={slide==3 && !intro} on:animationend={switchslide}>
        <h1 style="font-size: 24px; --in:400ms; --state:{getstate(3)}" class:top-in={slide==3}>Mudah Diakses</h1>
        <b class="item3" style="--in:700ms; --state:{getstate(3)}" class:right-in={slide==3}>Responsive & Theme-Colored</b>
        <span style="font-size: 20px; margin-top: 2rem; --in:1100ms; --state:{getstate(3)}" class:left-in={slide==3}>Sistem Akademik STTM Cileungsi dapat diakses menggunakan PC, Laptop</span>
    </div>
    <div class="image" class:hide={slide!=3}>
        <img src='{base}/mac.png' alt="mac" class="mac" style="--in:800ms; --out:1000ms; --state:{getstate(3)}" class:right-in={slide==3&&intro} class:bottom-out={slide==3&&!intro}>
        <img src='{base}/ipad.png' alt="ipad" class="ipad" style="--in:1100ms; --out:1100ms; --state:{getstate(3)}" class:right-in={slide==3&&intro} class:left-out={slide==3&&!intro}>
        <img src='{base}/iphone.png' alt="iphone" class="iphone" style="--in:1400ms; --out:1200ms; --state:{getstate(3)}" class:right-in={slide==3&&intro} class:left-out={slide==3&&!intro}>
        <img src='{base}/macbook.png' alt="macbook" class="macbook" style="--in:1500ms; --out:3100ms; --state:{getstate(3)}" class:right-in={slide==3&&intro} class:right-out={slide==3&&!intro} on:animationend={switchstate}>
    </div>

        <div class="nextbtn" class:hide={!read} on:pointerdown={next}>▶</div>
        <div class="prevbtn" class:hide={!read} on:pointerdown={prev}>◀</div>

</header>

<main style=padding-bottom:0;>
    <a class="login-box" href="{base}/login">
        <div class="description">
            <h1 style="font-size: 3em;">🏛</h1>
            <h2>Single Sign On</h2>
        </div>
        <div class="description" style=background:white;color:black;>
                <h2>Login</h2>
                <h2>▶</h2>
            </div>
        </a>
    </main>

<style>


:root{
    --headerheight: 70vh;
    --headerwidth: 100vw;
}

*{
    user-select: none;
}

.nextbtn, .prevbtn{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 3rem;
    aspect-ratio: 1;
    cursor: pointer;
    opacity: .3;
    will-change: transform,opacity;
    color: var(--brand);
    transition: transform 300ms ease, opacity 200ms ease;
}

.nextbtn:hover, .prevbtn:hover{
    opacity: 1;
}

.prevbtn{
    left: 5%;
}

.nextbtn{
    right: 5%;
}

.item3{
    background: var(--brand);
    color: white;
    width: max-content;
    padding: 4px 8px;
    font-size: 12px;
    margin: .25rem 0;
}


.item4{
    padding-top: 1rem;
}

main{
    display: flex;
    align-items: center;
    justify-content: center;
    margin: .5em;
    height: calc(30vh - 2em);
}

.login-box{
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid black;
    width: 100%;
    box-shadow: 0 0 1px 1px rgba(0,0,0,.1) ;
}

.login-box>.description{
    display: flex;
    align-items: baseline;
    gap:2rem;
    justify-content: space-between;
    padding: 1rem;
    background: var(--brand);
    color: white;
}

header{
 background: url(/bg1.jpg);
 overflow: hidden;
 height: 70vh;
 position: relative;
 animation-iteration-count: 1;
}  

.mac{
    position: absolute;
    width:50%;
    left: 15%;
    height: auto;
    bottom:15%;
}

.ipad{
    position: absolute;
    width:30%;
    left: 1%;
    bottom:15%;
    height: auto;
}

.iphone{
    position: absolute;
    width:12%;
    left: 32%;
    bottom:10%;
    height: auto;
}

.macbook{
    position: absolute;
    width:50%;
    right: 1%;
    bottom:15%;
    height: auto;
}

.text{
    position: absolute;
    left: 0;
    top:0;
    padding: 5% 3%;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 50%;
    overflow: hidden;
}

.image{
    height: 50%;
    width: 100%;
    display: grid;
    place-items: center;
    position: relative;
    position: absolute;
    left: 0;
    top:50%;
    overflow: hidden;
}


[style*="--state"]{
    will-change: transform,opacity;
}

@media (orientation: landscape) and (min-width:800px){
    :root{
        --headerheight:60vh;
        --headerwidth:50vw;
    }
    header{
        height: 60vh;
        grid-template-rows: 1fr;
        grid-template-columns: 1fr 1fr;
    }

    main{
        justify-content: flex-end;
        height: max-content;
    }

    .login-box{
        width: max-content;
    }

    .text{
        height: 100%;
        width: 50%;
    }

    .image{
        height: 100%;
        left: 50%;
        top:0;
        width: 50%;
    }

    .logo{
        height: 30%;
        width: auto;
    }

    
}

.logo{
    height:70%;
    width: auto;
}

.text > h1{
    font-size: 18px;
}

h1>span{
    font-size: 12px;
}


.hide{
    transform: scaleY(0);
}


.top-in{
    animation: top 600ms ease backwards;
    animation-delay: var(--in);
    animation-play-state: var(--state);
}

.top-out{
    animation: top 600ms ease forwards;
    animation-direction: reverse;
    animation-delay: var(--out);
    animation-play-state: var(--state);
}

.bottom-in{
    animation: bottom 600ms ease backwards;
    animation-delay: var(--in);
    animation-play-state: var(--state);
}

.bottom-out{
    animation: bottom 600ms ease forwards;
    animation-direction: reverse;
    animation-delay: var(--out);
    animation-play-state: var(--state);
}

.left-in{
    animation: left 600ms ease backwards;
    animation-delay: var(--in);
    animation-play-state: var(--state);
}

.left-out{
    animation: left 600ms ease forwards;
    animation-direction: reverse;
    animation-delay: var(--out);
    animation-play-state: var(--state);
}

.right-in{
    animation: right 600ms ease backwards;
    animation-delay: var(--in);
    animation-play-state: var(--state);
}

.right-out{
    animation: right 1s ease forwards;
    animation-direction: reverse;
    animation-delay: var(--out);
    animation-play-state: var(--state);
}

@keyframes top{
    0%{
        transform: translateY(calc(-1 * var(--headerheight)));
        opacity: 0;
    }
    50%{
        opacity: .1;
    }
    90%{
        opacity: 1;
    }
}

@keyframes bottom{
    0%{
        transform: translateY(calc(1 * var(--headerheight)));
        opacity: 0;
    }
    50%{
        opacity: .1;
    }
    90%{
        opacity: 1;
    }
}

@keyframes left{
    0%{
        transform: translateX(calc(-1 * var(--headerwidth)));
        opacity: 0;
    }
    50%{
        opacity: .1;
    }
    90%{
        opacity: 1;
    }
}

@keyframes right{
    0%{
        transform: translateX(calc(1 * var(--headerwidth)));
        opacity: 0;
    }
    50%{
        opacity: .1;
    }
    90%{
        opacity: 1;
    }
}
</style>