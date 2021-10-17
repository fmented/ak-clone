import { getUserFromToken, readCookie } from "$lib/scripts/helper";

export function getSession({headers}){
    const cookie = headers.cookie || ''
    let token = readCookie(cookie, 'userToken')
    let user = getUserFromToken(token)
    return{
        user,
    }
}
