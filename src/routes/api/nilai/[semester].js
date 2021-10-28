import { getUserFromToken, readCookie } from "$lib/scripts/helper"
import { nilai } from "$lib/store"

export async function get({params, headers}) {
    const {semester} = params
    const result = semester == 'all' ? nilai() : nilai().filter(i=>i.semester==semester)
    const user = getUserFromToken(readCookie(headers.cookie, 'userToken'))
    if(result.length && user){
        return {
            body: {
                message:'',
                result
            }
        }
    }

    return {
        body: {
            message: ' Are you logged in?',
            result:[]        
        }
    }

}
