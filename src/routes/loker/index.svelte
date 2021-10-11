<script context=module>
    import { loginRequired } from "$lib/scripts/helper";
    export const load = loginRequired
</script>


<script>
import FormControl from "$lib/FormControl.svelte";
import Modal from "$lib/Modal.svelte";
import SortableTable from "$lib/SortableTable.svelte";
import { onMount } from "svelte";
import { getJSON } from "$lib/scripts/helper";
import {base} from '$app/paths'
import Page from "$lib/Page.svelte";
import Spinner from "$lib/Spinner.svelte";


onMount(async ()=>{
    let data = await getJSON(base+'/api/lowongan')
    row=data.result
})


let row 

$: column = row? Object.keys(row[0]) : []

let modalActive = false

let form = {
    posisi:'',
    perusahaan: '',
    alamat: '',
    informasi: '',
    expired: undefined,
}
</script>

<Page title='Info Loker' description='Informai Lowongan Kerja'>
    {#if !row}
        <Spinner></Spinner>
        {:else}        
        <div class=btn-container>
            <button on:click={()=>modalActive=true}>Tambah</button>
            <button on:click={()=>window.print()}>Print</button>
        </div>
        <SortableTable {row} {column}></SortableTable>
    {/if}
</Page>


<Modal bind:active={modalActive}>
        <div slot="head"><h3>Tambah Lowongan Pekerjaan</h3></div>
        <div slot=content>
            <FormControl>
                <label for="posisi">Posisi</label>
                <input type="text" id="posisi" placeholder="Posisi Yang Dibutuhkan" bind:value={form.posisi}>
            </FormControl>
            
            <FormControl>
                <label for="nama">Nama Perusahaan</label>
                <input type="text" id="nama" placeholder="Nama Kantor Perusahaan" bind:value={form.perusahaan}>
            </FormControl>
                
            <FormControl>
                <label for="alamat">Alamat</label>
                <textarea type="text" id="alamat" placeholder="Alamat Kantor Perusahaan" bind:value={form.alamat} rows="3"></textarea>
            </FormControl>
            
            <FormControl>
                <label for="info">Informasi</label>
                <textarea type="text" id="info" placeholder="Informasi Seputar Deskripsi Pekerjaan Dan Persyaratan" bind:value={form.informasi} rows="3"></textarea>
            </FormControl>
            
            <FormControl>
                <label for="exp">Kadaluarsa</label>
                <input type="text" id="exp" placeholder="Tanggal Ditutupnya Lowongan" 
                onfocus="this.type='date'" onblur="if(!this.value) this.type='text'" pattern="\d{4}-\d{2}-\d{2}" bind:value={form.expired}>
            </FormControl>
        </div>
        
        <div slot=action let:close>
            <button class="cancel" type="button" on:click={close}>
                batal
            </button>
            <button class="submit" type="submit" on:click={()=>{form.id=row.length; row=[...row, form]; close()}}>
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