<script context=module>
    import { loginRequired } from "$lib/scripts/helper";
    const semester = [1, 2, 3, 4, 5, 6, 7, 8,]

    export const load = async ({fetch ,session}) =>{
        if(!session.user) return loginRequired({session})

        let result = []
        for (let i of semester) {
            let res = await fetch(`${base}/api/nilai/${i}`)
            let data = (await res.json()).result
            result.push(data)
        }
    

        return {
            props: {
                result
            }
        }
    }
</script>


<script>
import SortableTable from "$lib/SortableTable.svelte";
import {base} from '$app/paths'
import Tabs from "$lib/Tabs.svelte";
import Page from "$lib/Page.svelte";

export let result = []

let column =  ['id', 'mata_kuliah', 'dosen', 'tugas', 'uts', 'uas', 'nilai_akhir', 'grade']

 
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
            maxHeight:'50vh'
        },
        label: i==8? 'Semua Nilai': `Semester: ${i+1}`
    }
})


</script>

<Page title='Lihat Nilai' description='Lihat Nilai Hasil Studi'>
    <Tabs items={tabs}></Tabs>
</Page>
