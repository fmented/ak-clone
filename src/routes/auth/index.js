import { base } from "$app/paths"
import { setContext } from "svelte"
import {context} from '$app/stores'

const user = [
    {
        username:2017130,
        password:'whatever'
    }
]


export async function post({body}){
    const username = body.username
    const password = body.password

    const u = user.filter(i=>i.username == username)[0]
    const authenticated = u && u.password == password

    if(!authenticated){

        return {
            body:{
                error : 'incorrect username or password'
            },
            headers:{
                'set-cookie': [`authenticatedSession=${authenticated};`, `userSession=${null};`]
            },
            status:200,
        }
    }


    return {
        body:{
            error : '',
            authenticated
        },
        headers:{
            'set-cookie': [`authenticatedSession=${authenticated};`, `userSession=${u.username};`],
        },
        status:200,
    }
}