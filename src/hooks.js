import { parseCookie, getUserFromToken } from "$lib/scripts/helper";


export function getSession({headers}){
    const cookie = headers.cookie || ''
    let token = parseCookie(cookie).userToken

    let user = getUserFromToken(token)

    return{
        user,
    }
}
