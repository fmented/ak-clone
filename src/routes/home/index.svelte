<script>
import Stack from "$lib/Stack.svelte";
import SortableTable from "$lib/SortableTable.svelte";
import TitledBox from "$lib/TitledBox.svelte";
import { onMount } from "svelte";
import { getJSON } from "$lib/scripts/helper";
import { base } from "$app/paths";
import Page from "$lib/Page.svelte";


onMount(async ()=>{
    let data = await getJSON( base+'/info.json')
    row=data
})


let row 

$: column = row? Object.keys(row[0]) : []


</script>

<Page title='SIA STTM - Home' description='Nama / Status / Jurusan'>
    <br>
    <Stack>
        <TitledBox name='Info Terbaru'>
            <SortableTable {row} {column}></SortableTable>
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