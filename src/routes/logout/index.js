import { base } from "$app/paths";

export async function get(){
    return{
        headers:{
            'set-cookie': [`userToken=${null};`],
            Location: base+'/login'
        },
        status:302,

    }
}