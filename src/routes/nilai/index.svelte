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

let semester = [1, 2, 3, 4, 5, 6, 7, 8,]

let result = []

let column =  ['id', 'mata_kuliah', 'dosen', 'tugas', 'uts', 'uas', 'nilai_akhir', 'grade']

 
onMount(async()=>{
    semester.forEach(async i => {
        let data = await getJSON(`${base}/api/nilai/${i}`)
        result = [...result, data.result]
    })
})

$: if(result.length == 8){
    const all = [...result].flat()
    result = [...result, all]
}


$: tabs = !result.length? [] : result.map((v, i)=> {
    return {
        component: SortableTable,
        value: i,
        props: {
            row: v,
            column: i==8? [...column, 'semester']: column ,
            maxHeight:'25rem'
        },
        label: i==8? 'Semua Nilai': `Semester: ${i+1}`
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
