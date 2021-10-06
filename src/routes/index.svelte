<script>
import { base } from '$app/paths';

import { setHead } from '$lib/scripts/helper';

import {fly} from 'svelte/transition'

let slide = 0

let delay = 1000
setTimeout(()=>slide=3, delay)

setHead({
    title:'Landing',
    caption:'Landing Page Akademik STTM'
})
</script>


<header>
    {#if slide == 1} 
    <div class="text" out:fly={{x:-100, delay:300}}  on:outroend="{()=>setTimeout(()=>slide=2, delay)}">
        <h1 in:fly={{y:-100, delay:300}} style="font-size: 28px;">Selamat Datang <span>di website</span></h1>
        <h1 in:fly={{y:-100, delay:500}} style="font-size: 20px;">AKADEMIK STTM CILEUNGSI</h1>
        <b class="item3" in:fly={{x:100, delay:700}}>Excellent - Moral - Proffesional</b>
        <span class="item4" in:fly={{y:100, delay:900}}>- Smart - Clean - Responsive - Elegant</span>
        <div in:fly={{y:100, delay:1100}} style="margin-top: 1em;" on:introend="{()=>setTimeout(()=>slide=0, delay)}">
            <span>Sekolah Tinggi Teknologi Muhammadiyah Cileungsi</span>
            <br>
            <span>Jln Anggrek Cileungsi</span>
            <br>
            <span>Telp. 0099949449</span>
        </div>
    </div>      
    <div class="image">
        <img src={base+'/logo.webp'} alt="logo" class="logo" in:fly={{x:100, delay:300}} out:fly={{y:-100, delay:200}} width=168 height=168>
    </div> 
   
   
   
   
    {:else if slide==2}
    <div class="text" out:fly={{x:100, delay:400}} on:outroend="{()=>setTimeout(()=>slide=3, delay)}">
        <h1 in:fly={{y:-100, delay:500}} style="font-size: 28px;">GUIDANCE</h1>
        <div in:fly={{x:-100, delay:700}} style="margin-top: 1em; font-size: 20px;" on:introend="{()=>setTimeout(()=>slide=0, delay)}">
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
    <div class="image">
        <img src={base+"/ps.png"} alt="img" in:fly={{y:100, delay:300}} out:fly={{y:-100, delay:200}} style="width: 40%;">
    </div>
    
    
    
    {:else if slide==3}
    <div class="text" out:fly={{y:-100, delay:400}} >
        <h1 style="font-size: 28px;" in:fly={{y:-100, delay:700}}>Mudah Diakses</h1>
        <b class="item3" in:fly={{x:100, delay:700}}>Responsive & Theme-Colored</b>
        <span style="font-size: 20px; margin-top: 2rem;" in:fly={{x:-100, delay:700}}>Sistem Akademik STTM Cileungsi dapat diakses menggunakan PC, Laptop</span>
    </div>
    <div class="image">
        <img src={base+'/mac.png'} alt="mac" class="mac" in:fly={{x:200, delay:100}} out:fly={{x:-100, delay:100}}>
        <img src={base+'/ipad.png'} alt="ipad" class="ipad" in:fly={{x:200, delay:900}} out:fly={{y:-100, delay:900}}>
        <img src={base+'/iphone.png'} alt="iphone" class="iphone" in:fly={{x:200, delay:500}} out:fly={{y:100, delay:500}}>
        <img src={base+'/macbook.png'} alt="macbook" class="macbook" in:fly={{x:100, delay:1200}} out:fly={{x:100, delay:1200}} on:introend="{()=>setTimeout(()=>slide=0, delay)}" on:outroend="{()=>setTimeout(()=>slide=1, delay)}" >
        <!-- <img src="http://akademiksttmc.ac.id/eArsip/assets/img/sliders/revolution/hint1-blue.png" alt="logo" class="up" in:fly={{y:-100, delay:1300}} out:fly={{y:-100, delay:1300}}>
        <img src="http://akademiksttmc.ac.id/eArsip/assets/img/sliders/revolution/hint2-blue.png" alt="logo" class="down" in:fly={{y:-100, delay:1400}} out:fly={{y:100, delay:1400}}> -->
    </div>

    {/if}
</header>

<a href={base+'/login'} >
    <main style=padding-bottom:0;>
        <div class="login-box">
            <div class="description">
            <h1 style="font-size: 3em;">🏛</h1>
            <h2>Single Sign On</h2>
            </div>
            <div class="description" style=background:white;color:black;>
                <h2>Login</h2>
                <h2>▶</h2>
            </div>
        </div>
    </main>
</a>

<style>


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
 display: grid;
 grid-template-rows: 1fr 1fr;
 grid-template-columns: 1fr;
 height: 70vh;
}  

/* .up{
    position: absolute;
    width: 40%;
    height: auto;
    top: 5%;
    right: 5%;
}

.down{
    position: absolute;
    width: 35%;
    height: auto;
    bottom: 3%;
    left: 2%;
    transform: rotate(-7.5deg);
} */

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
    margin:10% 3%;
    display: flex;
    flex-direction: column;
    width: calc(100% - 6%);
    height: 80%;
}

.image{
    height: 100%;
    width: 100%;
    display: grid;
    place-items: center;
    position: relative;
}


@media (orientation: landscape) and (min-width:800px){
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

    /* .mac{
        width:auto;
        height: 70%;
    }

    .ipad{
        width: auto;
        height: 45%;
    }

    .iphone{
        width: auto;
        height: 40%;
    }

    .macbook{
        width: auto;
        height: 50%;
    } */

    .text{
        margin:10% 3%;
        display: flex;
        flex-direction: column;
        width: calc(100% - 6%);
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


</style>