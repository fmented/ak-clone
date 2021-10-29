<script context=module>
    import { redirectIfLoggedIn } from '$lib/scripts/helper';
    export const load = redirectIfLoggedIn
</script>

<script>
import { base } from '$app/paths';
import PageHead from '$lib/PageHead.svelte';
import { onMount } from 'svelte';

let slide = 0
let intro = true
let read = false


$: getstate = n => slide==n && !read? 'running':'paused'

$: switchstate = ()=> intro=false

$: switchslide = (e)=>{
    let x = e.target.hasAttribute('title')
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

function goToSlide(n) {
    intro = true
    slide = n
}

let isLoaded

onMount(()=>{
    slide=1
    document.addEventListener('visibilitychange', _=>{
        read = document.hidden ? true : false
    })
    isLoaded=true
})

</script>


<PageHead title='Web Akademik' description='Landing Page'>
</PageHead>

<header on:pointerdown={()=>read=!read} class:bg2={slide==3} class:bg1={slide!=3}>

    <div class="text" class:top-out={slide==1&&!intro} style="--out:2000ms; --state:{getstate(1)}" class:hide={slide!=1} title="last" on:animationend={switchslide}>
        <h1 style="font-size: 24px; --in:300ms; --state:{getstate(1)}" class:top-in={slide==1}>Selamat Datang <span>di website</span></h1>
        <h1 style="font-size: 20px; --in:400ms; --state:{getstate(1)}" class:top-in={slide==1}>AKADEMIK STTM CILEUNGSI</h1>
        <b class="item3" style="--in:500ms; --state:{getstate(1)}" class:top-in={slide==1}>Excellent - Moral - Professional</b>
        <span class="item4" style="--in:600ms; --state:{getstate(1)}" class:left-in={slide==1}>Smart - Clean - Responsive - Elegant</span>
        <div style="margin-top: 1em; --in:700ms; --state:{getstate(1)}" class:right-in={slide==1} on:animationend={switchstate}>
            <span>Sekolah Tinggi Teknologi Muhammadiyah Cileungsi</span>
            <br>
            <span>Jln Anggrek Cileungsi</span>
            <br>
            <span>Telp. 0099949449</span>
        </div>
    </div>      
    <div class="image" class:hide={slide!=1}>
        <img src='{base}/logo.webp' alt="logo" class="logo" width=168 height=168 style="--in:400ms; --out:2000ms; --state:{getstate(1)}" class:right-in={slide==1 && intro} class:bottom-out={slide==1&&!intro}>
    </div> 
   
   
   
   
    <div class="text" class:hide={slide!=2}>
        <h1 style="font-size: 24px; --in:300ms; --out:2100ms; --state:{getstate(2)}" class:left-in={slide==2 && intro} title="last" on:animationend={switchslide} class:top-out={slide==2 && !intro}>GUIDANCE</h1>
        <div style="margin-top: 1em; font-size: 20px; --in:500ms; --out:2050ms; --state:{getstate(2)}" class:top-in={slide==2 && intro} class:left-out={slide==2&&!intro} on:animationend={switchstate}>
            <span>e-Arsip</span>
            <br>
            <span>e-Learning</span>
            <br>
            <span>e-Perpus</span>
            <br>
            <span>e-Alumni</span>
            <br>
            <span>Accesibility, Central, Responsive, User friendly</span>
        </div>
    </div>
    <div class="image" class:hide={slide!=2}>
        <img src="{base}/ps.webp" alt="img" style="--in:400ms; --out:1950ms; --state:{getstate(2)}" class=ps class:bottom-in={slide==2&&intro} class:right-out={slide==2&!intro} height=300 width=300>
    </div>
    

    <div class="text" title="last" class:hide={slide!=3} style="--in:300ms; --out:2100ms; --state:{getstate(3)}" class:top-out={slide==3 && !intro} on:animationend={switchslide}>
        <h1 style="font-size: 24px; --in:500ms; --state:{getstate(3)}" class:top-in={slide==3}>Mudah Diakses</h1>
        <b class="item3" style="--in:400ms; --state:{getstate(3)}" class:right-in={slide==3}>Responsive & Theme-Colored</b>
        <span style="font-size: 20px; margin-top: 2rem; --in:500ms; --state:{getstate(3)}" class:left-in={slide==3}>Sistem Akademik STTM Cileungsi dapat diakses menggunakan PC, Laptop</span>
    </div>
    <div class="image" class:hide={slide!=3}>
        <img src='{base}/mac.webp' alt="mac" class="mac" style="--in:400ms; --out:2000ms; --state:{getstate(3)}" class:right-bounce-in={slide==3&&intro} class:bottom-out={slide==3&&!intro}>
        <img src='{base}/ipad.webp' alt="ipad" class="ipad" style="--in:600ms; --out:2000ms; --state:{getstate(3)}" class:right-bounce-in={slide==3&&intro} class:left-out={slide==3&&!intro}>
        <img src='{base}/iphone.webp' alt="iphone" class="iphone" style="--in:800ms; --out:2000ms; --state:{getstate(3)}" class:right-bounce-in={slide==3&&intro} class:left-out={slide==3&&!intro}>
        <img src='{base}/macbook.webp' alt="macbook" class="macbook" style="--in:1000ms; --out:1900ms; --state:{getstate(3)}" class:right-bounce-in={slide==3&&intro} class:right-out={slide==3&&!intro} on:animationend={switchstate}>
    </div>

        <div class="nextbtn" class:hide={!read} on:pointerdown={next}>▶</div>
        <div class="prevbtn" class:hide={!read} on:pointerdown={prev}>◀</div>

        <div class="dots" class:hide={!read}>
            {#each Array(3) as _, i }
                <strong on:pointerdown={()=>{if(slide!=i+1) goToSlide(i+1)}} class:current={slide==i+1}>🔵</strong>
            {/each}
        </div>

</header>

<main style=padding-bottom:1rem; class:left-in={isLoaded}>
    <a class="login-box" href="{base}/login" rel=external>
        <div class="description">
            <svg width=3em xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white"><path fill-rule="evenodd" d="M10.496 2.132a1 1 0 00-.992 0l-7 4A1 1 0 003 8v7a1 1 0 100 2h14a1 1 0 100-2V8a1 1 0 00.496-1.868l-7-4zM6 9a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1zm3 1a1 1 0 012 0v3a1 1 0 11-2 0v-3zm5-1a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
            <h2 style="color: white;">Single Sign On</h2>
        </div>
        <div class="description" style=background:var(--surface1);color:var(--text);>
                <h2>Login</h2>
                <svg width="2em" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </div>
        </a>
    </main>

<style>


:root{
    --headerheight: 70vh;
    --headerwidth: 100vw;
}

svg{
    vertical-align: bottom;
}

*{
    user-select: none;
}


.dots{
    position: absolute;
    bottom: 5%;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap:1rem
}

.dots strong{
    opacity: .3;
    will-change: opacity, transform;
    color: var(--brand)
}

.dots .current{
    transform: scale(1.2);
    opacity: .75;
}

.dots strong:hover{
    opacity: .75;
}

.nextbtn, .prevbtn{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 3rem;
    aspect-ratio: 1/1;
    cursor: pointer;
    opacity: .3;
    will-change: transform,opacity;
    color: var(--brand);
    transition: transform 300ms ease, opacity 200ms ease;
}

.nextbtn:hover, .prevbtn:hover{
    opacity: .75;
}

.prevbtn{
    left: 5%;
}

.nextbtn{
    right: 5%;
}

.item3{
    background: var(--brand);
    color: var(--surface1);
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
    padding: 2em;
}

.login-box{
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    overflow: hidden;
    border: var(--border);
    width: 100%;
    box-shadow: 0 0 1px 1px rgba(0,0,0,.1) ;
}

.login-box>.description{
    display: flex;
    align-items: center;
    gap:2rem;
    justify-content: space-between;
    padding: 1rem;
    background: var(--brand);
    color: var(--surface1);
}

header{
 overflow: hidden;
 height: 70vh;
 position: relative;
}  

header::before, header::after{
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-size: cover;
    background: url(/bg1.jpg);
    opacity: 0;
    will-change: opacity;
    transition: opacity 500ms linear;
}


header::after{
    z-index: -1;
    background: url(/bg2.jpg);
}

header.bg1::before, header.bg2::after{
    opacity: 1;
}

@media(prefers-color-scheme:dark){
    header::before, header::after{
        filter: invert(.9);
    }
}

.mac{
    position: absolute;
    width:50%;
    left: 25%;
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
}

.image{
    height: 50%;
    width: 100%;
    display: grid;
    place-items: center;
    position: absolute;
    left: 0;
    top:50%;
}

.logo{
    height:60%;
    width: auto;
}

.ps{
    width: 25%; 
    height:auto;
}
*[style*=--state]{
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
        padding: 1em;
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
        height: auto;
        width: 30%;
    }

    .ps{
        width: 30%; 
        height:auto;
    }

    
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

.right-bounce-in{
    animation: right-no-opacity 1000ms cubic-bezier(0, 1.5, 0.75, 1) backwards;
    animation-delay: var(--in);
    animation-play-state: var(--state);
    opacity: 1;
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
        opacity: .2;
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
        opacity: .2;
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
        opacity: .2;
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
        opacity: .2;
    }
    90%{
        opacity: 1;
    }
}

@keyframes right-no-opacity{
    0%{
        transform: translateX(calc(1 * var(--headerwidth)));
        opacity: 0;
    }
    90%{
        opacity: 1;
    }
}
</style>