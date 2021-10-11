import { clean, hash } from "$lib/scripts/helper"
import { userList, tokenList } from "$lib/store"


export async function post({body}){
    
    const username = body.username
    const password = body.password


    const u = userList().filter(i=>i.username == clean(username))[0]

    const authenticated = u && u.password == password

    if(!authenticated){

        return {
            body:{
                error : 'incorrect username or password'
            },
            headers:{
                'set-cookie': `userToken=${null};`,
            },
            status:200,
        }
    }

    let token = tokenList().filter(i=>i.ref.username==clean(username))[0].tokenId

    return {
        body:{
            error : '',
            authenticated
        },
        headers:{
            'set-cookie': `userToken=${hash(token)};Secure;HttpOnly`,
        },
        status:200,
    }

}