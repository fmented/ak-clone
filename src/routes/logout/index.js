import { base } from "$app/paths";

export async function get(){
    return{
        headers:{
            'set-cookie': [`authenticatedSession=${false};`, `userSession=${null};`],
            Location: base+'/login'
        },
        status:302,

    }
}