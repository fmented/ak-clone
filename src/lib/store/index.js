import { hash } from "$lib/scripts/helper"

export const userList = ()=> [
    {
        username:'2017130',
        password: hash('whatever'),
    },
    {
        username:'admin',
        password: hash('admin'),
    },
    {
        username: 'x',
        password: hash('xxx'),
    }
]

export const tokenList = ()=> [
    {
        tokenId: '&gcbdfb5^bd*&%bdkl;cgsvxebj!xje',
        ref: userList()[0],
    },
    {
        tokenId: 'h83&h%Vv&sxeb,.sjxxhi{hsi_nkne=h',
        ref: userList()[1]
    },
    {
        tokenId: '@tgwv%gyg9&uguu^^5svv!vbsjb=+nln?',
        ref: userList()[2]
    }
]

export const info = ()=> [
    {
        id: 0,
        tanggal:"02-03-2021",
        informasi:"KALENDER AKADEMIK TAHUN AJARAN 2021 SAMPAI 2022 SEMESTER GANJIL",
        link:{
            href:"/",
            text:"KALENDER AKADEMIK TAHUN AJARAN 2021 SAMPAI 2022 SEMESTER GANJIL"
        }
    },
    {
        id: 1,
        tanggal:"05-03-2021",
        informasi:"JADWAL UTS TAHUN 2021",
        link:{
            href:"/",
            text:"JADWAL UTS TAHUN 2021"
        }
    },
    {
        id: 2,
        tanggal:"03-03-2021",
        informasi:"SEMINAR TEKNOLOGI DAN PENERAPANNYA",
        link:{
            href:"/",
            text:"SEMINAR TEKNOLOGI DAN PENERAPANNYA"
        }
    }
]

export const nilai = ()=> [
    {
        id:0,
        mata_kuliah:"Matematika diskrit",
        dosen:"Bapak Bapak",
        kehadiran:67,
        tugas:70,
        uts:89,
        uas:90,
        nilai_akhir:88,
        grade: "A",
        semester: 2
    },
    {
        id:1,
        mata_kuliah:"Algoritma",
        dosen:"Bapak Bapak",
        kehadiran:67,
        tugas:70,
        uts:89,
        uas:90,
        nilai_akhir:88,
        grade: "A",
        semester: 1
    },
    {
        id:2,
        mata_kuliah:"Komunikasi Data",
        dosen:"Bapak Bapak",
        kehadiran:67,
        tugas:70,
        uts:89,
        uas:90,
        nilai_akhir:88,
        grade: "A",
        semester: 3
    },
    {
        id:3,
        mata_kuliah:"Kalkulus",
        dosen:"Bapak Bapak",
        kehadiran:67,
        tugas:70,
        uts:89,
        uas:90,
        nilai_akhir:88,
        grade: "A",
        semester: 1
    },    
    {
        id:4,
        mata_kuliah:"Metode Numerik",
        dosen:"Ibu Ibu",
        kehadiran:67,
        tugas:70,
        uts:89,
        uas:90,
        nilai_akhir:88,
        grade: "A",
        semester: 2
    },
    {
        id:5,
        mata_kuliah:"Statistika",
        dosen:"Bapak Bapak",
        kehadiran:67,
        tugas:70,
        uts:89,
        uas:90,
        nilai_akhir:88,
        grade: "A",
        semester: 3
    },
    {
        id:6,
        mata_kuliah:"Mikrokontroler",
        dosen:"Bapak Bapak",
        kehadiran:67,
        tugas:70,
        uts:89,
        uas:90,
        nilai_akhir:88,
        grade: "A",
        semester: 4
    },
    {
        id:7,
        mata_kuliah:"Mikroprosesor",
        dosen:"Bapak Bapak",
        kehadiran:67,
        tugas:70,
        uts:89,
        uas:90,
        nilai_akhir:88,
        grade: "A",
        semester: 5
    },
    {
        id:8,
        mata_kuliah:"Bahasa Inggris",
        dosen:"Ibu Ibu",
        kehadiran:67,
        tugas:70,
        uts:89,
        uas:90,
        nilai_akhir:88,
        grade: "A",
        semester: 6
    },
    {
        id:9,
        mata_kuliah:"Kewarganegaraan",
        dosen:"Bapak Bapak",
        kehadiran:67,
        tugas:70,
        uts:89,
        uas:90,
        nilai_akhir:88,
        grade: "A",
        semester: 4
    },
    {
        id:10,
        mata_kuliah:"Fisika Dasar",
        dosen:"Ibu Ibu",
        kehadiran:67,
        tugas:70,
        uts:89,
        uas:90,
        nilai_akhir:88,
        grade: "A",
        semester: 5
    },
    {
        id:11,
        mata_kuliah:"Pemrograman Web",
        dosen:"Bapak Bapak",
        kehadiran:67,
        tugas:70,
        uts:89,
        uas:90,
        nilai_akhir:88,
        grade: "A",
        semester: 6
    },
    {
        id:12,
        mata_kuliah:"Sistem Informasi Geografis",
        dosen:"Bapak Bapak",
        kehadiran:67,
        tugas:70,
        uts:89,
        uas:90,
        nilai_akhir:88,
        grade: "A",
        semester: 7
    },
    {
        id:13,
        mata_kuliah:"Manajemen Proyek",
        dosen:"Bapak Bapak",
        kehadiran:67,
        tugas:70,
        uts:89,
        uas:90,
        nilai_akhir:88,
        grade: "A",
        semester: 8
    },
    {
        id:14,
        mata_kuliah:"Aljabar Linear",
        dosen:"Bapak Bapak",
        kehadiran:67,
        tugas:70,
        uts:89,
        uas:90,
        nilai_akhir:88,
        grade: "A",
        semester: 7
    },   
    {
        id:15,
        mata_kuliah:"Etika Profesi",
        dosen:"Bapak Bapak",
        kehadiran:67,
        tugas:70,
        uts:89,
        uas:90,
        nilai_akhir:88,
        grade: "A",
        semester: 8
    },   
]

export const lowongan = ()=> [

    {
        id:0,
         perusahaan:"Holcim Tbk.",
         informasi: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, voluptas aspernatur ratione consequuntur incidunt quisquam ex corporis soluta sapiente necessitatibus. Aspernatur odio quam tenetur id dolores quidem amet, reprehenderit distinctio!",
         expired: "2021-09-12",
         posisi:"Driver",
         alamat:"Bogor"
     },
     {
         id:1,
         perusahaan:"Indocement Tbk.",
         informasi: "sit amet consectetur adipisicing elit. Eligendi, voluptas aspernatur ratione consequuntur incidunt quisquam ex corporis soluta sapiente necessitatibus. Aspernatur odio quam tenetur id dolores quidem amet, reprehenderit distinctio!",
         expired: "2022-09-12",
         posisi:"Safety Control",
         alamat:"Bogor"
     }, {
         id:2,
         perusahaan:"Telkom Tbk.",
         informasi: "dolor sit amet consectetur adipisicing elit. Eligendi, voluptas aspernatur ratione consequuntur incidunt quisquam ex corporis soluta sapiente necessitatibus. Aspernatur odio quam tenetur id dolores quidem amet, reprehenderit distinctio!",
         expired: "2021-12-12",
         posisi:"Mechanic",
         alamat:"Bogor"
     }, {
         id:3,
         perusahaan:"Federal Tbk.",
         informasi: "Ipsum dolor sit amet consectetur adipisicing elit. Eligendi, voluptas aspernatur ratione consequuntur incidunt quisquam ex corporis soluta sapiente necessitatibus. Aspernatur odio quam tenetur id dolores quidem amet, reprehenderit distinctio!",
         expired: "2022-08-12",
         posisi:"Maintenance",
         alamat:"Bogor"
     }
]