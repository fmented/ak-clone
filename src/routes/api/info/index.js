import { getUserFromToken, readCookie } from "$lib/scripts/helper"
import { info } from "$lib/store"

export async function get({headers}) {
    const result = info()
    const user = getUserFromToken(readCookie(headers.cookie||'', 'userToken'))
    if(user){
        return {
            body: {
                message:'',
                result
            }
        }
    }

    return {
        body: {
            message: 'Are you logged in?',
            result:[]
        }
    }

}
