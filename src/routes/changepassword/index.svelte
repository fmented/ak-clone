<script context=module>
    import { loginRequired } from "$lib/scripts/helper";
    export const load = loginRequired
</script>


<script>
import FormControl from "$lib/FormControl.svelte";
import Page from "$lib/Page.svelte";
import TitledBox from "$lib/TitledBox.svelte";
import { session } from "$app/stores";

let showpassword = false

let oldpass
let newpass
let confirmpass

$: match = confirmpass==newpass 
$: indicator = (newpass && confirmpass) ? (match?'😄':'😢') : ''
</script>


<Page title='Ganti Password' description='Ganti Password'>
        <TitledBox name='Ganti Password {indicator}' class='box-container'>
            <FormControl>
                <label for=username>Username</label>
                <input type="text" readonly value={$session.user} id=username>
            </FormControl>
            <FormControl>
                <label for=oldpass>Password Lama</label>
                <input type={showpassword?'text':'password'} id=oldpass on:input={e=>{oldpass=e.target.value}}>
            </FormControl>
            <FormControl>
                <label for=newpass>Password Baru</label>
                <input type={showpassword?'text':'password'} id=newpass on:input={e=>{newpass=e.target.value}}>
            </FormControl>
            <FormControl>
                <label for=confirmpass>Konfirmasi Password</label>
                <input type={showpassword?'text':'password'} id=confirmpass on:input={e=>{confirmpass=e.target.value}}>
            </FormControl>
            <div class="checkbox-container">
                <input type=checkbox id=showpassword on:click={()=>showpassword=!showpassword}>
                <label for=showpassword>Tampilkan Password</label>
            </div>
            <div class="btn-container">
                <button>Proses</button>
            </div>
        </TitledBox>
</Page>

<style>

    @media (orientation:landscape) and (min-width:800px){

        :global(.box-container){
            max-width: 40%;
            min-width: 600px;
            margin: 0 auto;
        }
/* 
        :global(main){
            max-width: 100vw;
        } */
    }

    .btn-container{
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: 1rem;
    }

    .checkbox-container{
        padding-top: 2rem;
        display: flex;
        align-items: center;
        gap: 1rem;
    }
</style>