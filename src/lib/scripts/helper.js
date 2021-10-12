import { browser } from "$app/env"
import { base } from "$app/paths"
import { tokenList } from '$lib/store'


export async function getJSON(url) {
    return (await (await fetch(url)).json())
}

export async function loginRequired({session}){
        if(!session.user){
        return {
            status:302,
            redirect: base+'/login'
            }
        }
    return {}
}

export function getUserFromToken(token){
    if (!token) return null
    let user
    try {
        user = tokenList().filter(i=>i.tokenId==clean(token))[0].ref.username

    } catch (error) {
        user = null
    }
    return user
}


export async function redirectIfLoggedIn({session}){
    if(session.user){
        return {
            status: 302,
            redirect: base+'/home'
        }
    }
    return {}
}


export function parseCookie(cookie){
    let v = {}

    cookie.split(' ').forEach(i=>{
        let c = i.split(';')[0].split('=')
        try {
            v[c[0]] = JSON.parse(c[1])
        } catch{
            v[c[0]] = c[1]     
        }
    })

    return v
}

export function readCookie(cookie, key) {
    const r = new RegExp(`(?<=^${key}=)(.*)`)

    const match = cookie.split(' ').filter(k=>k.startsWith(key))[0]

    if(!match) return null

    const result = match.match(r)
    if(!result) return null
    
    let parsed
    try {
        parsed = JSON.parse(result[0])
    } catch (error) {
        parsed = result[0]
    }
    return parsed

}

export function hash(str){
    const unit = new Uint16Array(str.length)
    for(let i = 0; i<unit.length; i++){
        unit[i] = str.charCodeAt(i)
    }

    const enc = String.fromCharCode(...new Uint8Array(unit.buffer))

    if (browser) return btoa(enc)
    return Buffer.from(enc).toString('base64')
}

export function clean(bin){

    let binary
    if(browser) binary = atob(bin)
    else binary = Buffer.from(bin, 'base64').toString()

    const bytes = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i)        
    }
    return String.fromCharCode(... new Uint16Array(bytes.buffer))
}