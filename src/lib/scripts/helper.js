import { base } from "$app/paths"


export async function getJSON(url) {
    return (await (await fetch(url)).json())
}

export async function loginRequired({session}){
    
    if(!session.auth || !session.user){
        return {
            status:301,
            redirect: base+'/login'
        }
    }
    return {}
}