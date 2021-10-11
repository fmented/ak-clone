import { getUserFromToken, parseCookie } from "$lib/scripts/helper"
import { nilai } from "$lib/store"

export async function get({params, headers}) {
    const {semester} = params
    const result = nilai().filter(i=>i.semester==semester)
    const user = getUserFromToken(parseCookie(headers.cookie).userToken)
    if(result.length && user){
        return {
            body: {
                result
            }
        }
    }

    return {
        body: {
            message: ' Are you logged in?',
            result:[]        }
    }

}
