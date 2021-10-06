<script>
import { getJSON, setHead } from "$lib/scripts/helper";

import SortableTable from "$lib/SortableTable.svelte";
import {base} from '$app/paths'
import Tabs from "$lib/Tabs.svelte";
import { onMount } from "svelte";

let semester = [1, 2, 3, 4, 5, 6, 7, 8]

let result = []

let column =  ['id', 'mata_kuliah', 'dosen', 'tugas', 'uts', 'uas', 'nilai_akhir', 'grade']

 
onMount(async()=>{
    semester.forEach(async i => {
        let data = await getJSON(`${base}/nilai/semester/${i}.json`)
        result = [...result, data]
    })


})

setHead({
    title:'SIA - Nilai',
    caption: 'Mahasiswa / Lihat / Nilai'
})

$: tabs = !result.length? [] : result.map((v, i)=> {
    console.log(v);
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

<main>
    <Tabs items={tabs}></Tabs>
</main>