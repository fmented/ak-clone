<script>
import { getJSON } from "$lib/scripts/helper";

import SortableTable from "$lib/SortableTable.svelte";
import {base} from '$app/paths'
import Tabs from "$lib/Tabs.svelte";
import { onMount } from "svelte";
import Page from "$lib/Page.svelte";

let semester = [1, 2, 3, 4, 5, 6, 7, 8]

let result = []

let column =  ['id', 'mata_kuliah', 'dosen', 'tugas', 'uts', 'uas', 'nilai_akhir', 'grade']

 
onMount(async()=>{
    semester.forEach(async i => {
        let data = await getJSON(`${base}/nilai/semester/${i}.json`)
        result = [...result, data]
    })


})


$: tabs = !result.length? [] : result.map((v, i)=> {
    return {
        component: SortableTable,
        value: i,
        props: {
            row: v,
            column:column
        },
        label: `Semester: ${i+1}`
    }
})


</script>

<Page title='Lihat Nilai' description='Lihat Nilai Hasil Studi'>
    <Tabs items={tabs}></Tabs>
</Page>
