<script context=module>
    import { loginRequired } from "$lib/scripts/helper";

    export const load = async ({fetch ,session}) =>{
        if(!session.user) return loginRequired({session})
        let res = await fetch(base+'/api/lowongan')
        let data = (await res.json()).result
        return {
            props: {
                data
            }
        }
    }
</script>


<script>
import FormControl from "$lib/FormControl.svelte";
import Modal from "$lib/Modal.svelte";
import SortableTable from "$lib/SortableTable.svelte";
import {base} from '$app/paths'
import Page from "$lib/Page.svelte";

export let data 
let close

$: column = data? Object.keys(data[0]) : []

let modalActive = false

let posisi,perusahaan,alamat,informasi,expired,error

function add() {
    if(posisi && perusahaan && alamat && informasi && expired){
        error = ''
        let form = {
            posisi,
            perusahaan,
            alamat,
            informasi,
            expired
        }
        data = [...data, form] 
        close()
        return
    }
    error='Please Input All Field' 
}

$: valid = posisi&&perusahaan&&alamat&&informasi&&expired
</script>

<svelte:body on:keyup={e=>{if(e.key=='Enter' && modalActive && valid) add()}} />

<Page title='Info Loker' description='Informai Lowongan Kerja'>      
    <div class=btn-container>
        <button on:click={()=>modalActive=true}>Tambah</button>
        <button on:click={()=>window.print()}>Print</button>
    </div>
    <SortableTable row={data} {column} maxHeight=65vh></SortableTable>
</Page>


<Modal bind:active={modalActive} bind:close>
        <div slot="head"><h3 style="color: white;">Tambah Lowongan Pekerjaan</h3></div>
        <div slot=content>

            <FormControl>
                <label for="posisi">Posisi</label>
                <input type="text" id="posisi" placeholder="Posisi Yang Dibutuhkan" bind:value={posisi}>
            </FormControl>
            
            <FormControl>
                <label for="nama">Nama Perusahaan</label>
                <input type="text" id="nama" placeholder="Nama Kantor Perusahaan" bind:value={perusahaan}>
            </FormControl>
                
            <FormControl>
                <label for="alamat">Alamat</label>
                <textarea type="text" id="alamat" placeholder="Alamat Kantor Perusahaan" bind:value={alamat} rows="3"></textarea>
            </FormControl>
            
            <FormControl>
                <label for="info">Informasi</label>
                <textarea type="text" id="info" placeholder="Informasi Seputar Deskripsi Pekerjaan Dan Persyaratan" bind:value={informasi} rows="3"></textarea>
            </FormControl>
            
            <FormControl>
                <label for="exp">Kadaluarsa</label>
                <input type="text" id="exp" placeholder="Tanggal Ditutupnya Lowongan" 
                onfocus="this.type='date'" onblur="if(!this.value) this.type='text'" pattern="\d{4}-\d{2}-\d{2}" bind:value={expired}>
            </FormControl>
            
            {#if error && !valid}
            <div style=" text-align: center;">
                <strong style=" color: #d45;">{error}</strong>
            </div>
            {/if}
        </div>
        
        <div slot=action>
            <button class="cancel" type="button" on:click={close}>
                batal
            </button>
            <button class="submit" type="submit" on:click={add}>
                tambah
            </button>
        </div>
        
</Modal>

<style>
    div{
        overflow: auto;
    }

    .btn-container{
        display: flex;
        gap: 1rem;
    }

</style>