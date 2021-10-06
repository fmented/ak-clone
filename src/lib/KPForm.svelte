<script>
    import FormControl from './FormControl.svelte'
    import Stack from './Stack.svelte'
</script>
    

<h1>Pengajuan KP</h1>
<Stack>
    <FormControl>
        <label for=name>Nama</label>
        <input id=name>
    </FormControl>
    <FormControl>
        <label for=tel>Telp.</label>
        <input type=tel id=tel>
    </FormControl>
</Stack>

<Stack>
    <FormControl>
        <label for=mail>Email</label>
        <input id=mail type=email>
    </FormControl>
    <FormControl>
        <label for=sel>Tahun Akademik.</label>
        <select id=sel>
            <option value=1>Semester Ganjil 2021/2022</option>
        </select>
    </FormControl>
</Stack>

<Stack>
    <FormControl>
        <label for=title>Judul</label>
        <textarea id=title></textarea>
    </FormControl>
    <FormControl>
        <label for=file>Unggah</label>
        <input id=file type=file>
    </FormControl>
</Stack>

<Stack>
    <FormControl>
        <label for=ins>Nama Instansi</label>
        <textarea id=ins></textarea>
    </FormControl>
    <FormControl>
        <label for=addr>Alamat Instansi</label>
        <textarea id=addr></textarea>
    </FormControl>
</Stack>

<style>
    h1{
        padding-bottom: 1.5em;
        margin: 0;
    }
    input, select, textarea{
        border-radius:4px;
        padding: .5rem .25rem;
    }
    @media (orientation:landscape){
        input, select, textarea{
            max-width:500px;
            min-width:100px
        }
    }
    
</style>