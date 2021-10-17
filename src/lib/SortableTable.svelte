<script>
    import {fade} from 'svelte/transition'
    import {flip} from 'svelte/animate'
import PrintableArea from './PrintableArea.svelte'
import Stack from './Stack.svelte'


export let data_id = 'id'

let limit = 10
let search = ''
let page = 0

export let row = []

export let column = []
	
let sortBy = {col: data_id};

$: sort = (column) => {

    let col = (column==sortBy.col) ? data_id : column
    sortBy.col = col

    
    let sortStandard = (a, b) => 
        (a[col] < b[col]) 
        ? -1 
        : (a[col] > b[col]) 
        ? 1  
        : 0;

    let sortLink = (a, b) =>
        (a[col]?.text < b[col]?.text) 
        ? -1  
        : (a[col]?.text > b[col]?.text) 
        ? 1  
        : 0;

    
    paginatedTable = column === 'link' ?  paginatedTable.sort( sortLink ) : paginatedTable.sort(sortStandard)
}




$: filteredTable = row.filter(data=>JSON.stringify(Object.values(data)).includes(search))



$: paginatedTable = filteredTable.filter((_, i)=>i>=limit*page && i<limit*(page+1))


$: paginate = Math.ceil(filteredTable.length / limit) || 1


$: if(!filteredTable.length || page+1>paginate) page = 0

const capitalize = string=>string.toUpperCase().replace('_', ' ')

let currentSort = sortBy.col

$: sort(currentSort)

</script>

<style>
:global(*){
    box-sizing: border-box;
    scroll-behavior: smooth;
}

:root{
    --mobile-head-column: 40%;
    --row-accent: var(--readonly);
}




table{
    width: 100%;
    border-collapse: collapse;
}

thead{
    visibility: collapse;
}

tr{
    display: flex;
    flex-direction: column;
    margin-bottom: .5rem;
}


.wrap{
    display: grid;
    grid-template-columns: var(--mobile-head-column) calc( 100% - var(--mobile-head-column) );
    align-items: center;
    grid-gap: .5rem;
}

th > .wrap{
    grid-template-columns: auto 1fr;
    text-align: left;
}

td{
    overflow: hidden;
    border: 1px solid var(--text);
}

td > .wrap{
    padding: 0 .25rem;
}

tbody tr td >.wrap{
    background-image: linear-gradient(90deg, var(--brand) var(--mobile-head-column), var(--surface1) var(--mobile-head-column));
}

tbody tr td:nth-child(even) > .wrap{
    background-image: linear-gradient(90deg, var(--brand) var(--mobile-head-column), var(--row-accent) var(--mobile-head-column));;
}


td > .wrap > span:first-child{
    color: var(--surface1);
}

.fake-label{
    word-wrap: break-word;
    white-space: nowrap;
}


td:first-of-type{
    border-radius: 4px 4px 0 0;
}

td:last-of-type{
    border-radius: 0 0 4px 4px;
}

.wrap > *{
    padding: .25rem;
}

th{
    padding: 0 .25rem;
}


.sorter{
    padding: 0;
    padding-bottom: 1rem;
}

section{
    margin-top: 1rem;
}


@media print, (orientation: landscape) and (min-width:800px){

    tbody tr:nth-child(even) td >.wrap{
    background-image: none;
    }

    tbody tr:nth-child(even) {
        background: var(--row-accent);
    }

    .sorter{
        grid-template-columns: auto 1fr;
    }

    tbody tr:nth-child(odd) td >.wrap{
    background-image: none
    }
    
    thead{
        visibility: visible;
        background: var(--brand);
        cursor: pointer;
        border-collapse: collapse;
        border-radius: 4px 4px 0 0;
    }

    th:first-of-type{
        border-radius: 4px 0 0 0;
    }

    th:last-of-type{
        border-radius: 0 4px 0 0;
    }

    td, th{
        min-width: 4rem;
        max-width: 8rem;
    }

    td:hover, th:hover{
        box-shadow: var(--shadow) inset;
    }


    tr {
        display: table-row;
    }



    td > .wrap{
        grid-template-columns: 1fr;
    }

    td > .wrap > .fake-label{
        visibility: collapse;
        display: none;
    }

    th .wrap{
        font-size: .8rem;
        word-wrap: break-word;
        display: flex;
        flex-wrap: wrap;
        gap:0;
    }

    td:first-of-type, td:last-of-type{
        border-radius: 0;
    }

    .sorter:first-of-type{
        display: none;
    }

    td{
        border: 0;
    }

    th :first-of-type{
        border-radius: 8px 0 0 0;
        overflow: hidden;
    }
    

}

td .wrap .fake-label{
    font-size: .8rem;
}


.paginator{
    display: grid;
    grid-template-columns: auto 1fr auto;
    padding: .25rem 0;
    text-align: center;
}

.paginator > *{
    padding: .5rem;
}

.paginator>span{
    font-size: 1.25rem;
}

input, select{
    width: calc(100% - 1ch);
}

@media print{
    th, td{
        box-shadow: var(--shadow) inset;
    }
}

</style>


<section> 


{#if row.length}
    
<Stack gap='5%'>
    <div class="wrap sorter">
        <label for="sortBy">Urutkan</label>
        <select bind:value="{currentSort}" id=sortBy>
            {#each column as field}
            <option value={field}>{capitalize(field)}</option>
            {/each}
        </select>
    </div>

    <div class="wrap sorter">
        <label for=paginateBy>Tampilkan</label>
        <select id=paginateBy bind:value={limit}>
            {#each Array(5) as _, i}
            <option value={(i+1)*10}>{(i+1)*10}</option>
            {/each}
        </select>
    </div>
    
    <div class="wrap sorter">
        <label for=search>Pencarian</label>
        <input id=search bind:value={search} type="search">
    </div>
</Stack>
{/if}

<PrintableArea>
<table>
    <thead>
        <tr>
            {#each column as field}
                {#if field != data_id}
                    <th on:click={()=>currentSort =  currentSort!=field? field: data_id} title="Sort By {capitalize(field)}">    
                        <div class="wrap">
                            {#if currentSort === field}
                            <span>🔺</span>
                            {:else}
                            <span>🔶</span>
                            {/if}
                            <span>
                                {capitalize(field)}
                            </span>
                        </div>
                    </th>
                {/if}
            {/each}
                </tr>
            </thead>
            <tbody>
            {#if paginatedTable.length}
                    
                {#each paginatedTable as data (data)}
                <tr animate:flip={{duration:400}}>
                    {#each column as field}
                    {#if field != data_id}                            
                    <td transition:fade title={capitalize(field)}>
                        <div class=wrap>
                            <span class=fake-label>
                                {field==data_id?'No.': capitalize(field)}
                            </span>
                            <span>
                                {#if field == 'link'}
                                <a href="{data[field].href}">{data[field].text}</a>
                                {:else}
                                {data[field]}
                                {/if}
                            </span>
                        </div>
                    </td>
                    {/if}
                    {/each}
                </tr>
                {/each}
            {:else}
                <tr>
                    <td colspan={column.length} style=text-align:center;border-radius:0;padding:1rem>No Data To Show</td>
                </tr>
            {/if}
        </tbody>
    </table>
</PrintableArea>
{#if paginate>1}
    
<div class="paginator">
    {#if page==0}
            <button disabled>Prev</button>
            {:else}
            <button on:click={()=>page--}>Prev</button>
            {/if}
            
            <span>{page+1} / {paginate}</span>
            
            {#if page+1 == paginate}
            <button disabled>Next</button>
            {:else}
            <button on:click={()=>page++}>Next</button>
            {/if}
        </div>
    {/if}
    

</section>
