<script context=module>
    import { loginRequired } from "$lib/scripts/helper";
    export const load = loginRequired
</script>


<script>
import { getJSON } from "$lib/scripts/helper";
import SortableTable from "$lib/SortableTable.svelte";
import {base} from '$app/paths'
import Tabs from "$lib/Tabs.svelte";
import { onMount } from "svelte";
import Page from "$lib/Page.svelte";
import Spinner from "$lib/Spinner.svelte";

let semester = [1, 2, 3, 4, 5, 6, 7, 8, 'all']

let result = []

let column =  ['id', 'mata_kuliah', 'dosen', 'tugas', 'uts', 'uas', 'nilai_akhir', 'grade']

 
onMount(async()=>{
    semester.forEach(async i => {
        let data = await getJSON(`${base}/api/nilai/${i}`)
        result = [...result, data.result]
    })
})


$: tabs = !result.length? [] : result.map((v, i)=> {
    return {
        component: SortableTable,
        value: i,
        props: {
            row: v,
            column: i!=8? column : [...column, 'semester'],
            maxHeight:'25rem'
        },
        label: i!=8? `Semester: ${i+1}`: 'Semua Nilai'
    }
})


</script>

<Page title='Lihat Nilai' description='Lihat Nilai Hasil Studi'>
    {#if !result.length}
    <Spinner></Spinner>
        {:else}
        <Tabs items={tabs}></Tabs>
    {/if}
</Page>
