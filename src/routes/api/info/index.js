import { getUserFromToken, parseCookie } from "$lib/scripts/helper"
import { info } from "$lib/store"

export async function get({headers}) {
    const result = info()
    // const user = getUserFromToken(parseCookie(headers.cookie).userToken)
    // if(user){
        return {
            body: {
                result
            }
        }
    // }

    // return {
    //     body: {
    //         message: ' Are you logged in?',
    //         result:[]
    //     }
    // }

}
