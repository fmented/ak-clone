<script context="module">
    import {loginRequired} from '$lib/scripts/helper'
    
    export const load = async ({fetch ,session}) =>{
        if(!session.user) return loginRequired({session})
        let res = await fetch(base+'/api/info')
        let data = (await res.json()).result
        return {
            props: {
                data
            }
        }
    }
</script>

<script>
import Stack from "$lib/Stack.svelte";
import SortableTable from "$lib/SortableTable.svelte";
import TitledBox from "$lib/TitledBox.svelte";
import { base } from "$app/paths";
import Page from "$lib/Page.svelte";
import { session } from '$app/stores';


export let data

let column = ['id', 'tanggal', 'informasi', 'link']

</script>

<Page title='SIA STTM - Home' description='{$session.user=='admin'?'Fauki Prayitno ':$session.user} / Mahasiswa / Informatika'>
    <br>
    <Stack template='55% calc(45% - 2em)'>
        <TitledBox name='Info Terbaru'>
            <SortableTable row={data} {column}></SortableTable>
        </TitledBox>
        <TitledBox name='Visi dan Misi'>
            <div>
                <b>Visi:</b>
                <br>
                <p>Menjadi Perguruan Teknik Yang Unggul Berdasarkan Nilai-Nilai Islam</p>
            </div>
            <div>
                <b>Misi:</b>
                <ol>
                    <li>
                        Menyelenggarakan Pendidikan Tinggi dalam bidang teknologi
                    </li>
                    <li>
                        Menyelenggaran Penelitian dan Pengabdian Masyarakat dalam penerapan teknologi
                    </li>
                    <li>
                        Menyelenggarakan Pengelolaan Perguruan Tinggi berdasarkan Al-Qur’an dan As-sunah
                    </li>
                    <li>
                        Mengembangkan peserta didik agar menguasai pengetahuan dan penerapan teknologi yang mempunyai landasan Islam yang kokoh
                    </li>
                </ol>
            </div>
        </TitledBox>
    </Stack>
    <br>
</Page>

<style>
    ol{
        padding: 0 1rem;
    }
    
    div{
        margin-bottom: 1rem;
    }
</style>