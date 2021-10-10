export function getSession({headers}){
    const cookie = headers.cookie

    let auth, user;

    try {
        auth = JSON.parse(cookie.split(';').filter(i=>i.includes('authenticatedSession'))[0].replace(' ', '').split('=')[1])
        user = JSON.parse(cookie.split(';').filter(i=>i.includes('userSession'))[0].replace(' ', '').split('=')[1])
    } catch (error) {
        auth = false,
        user = null
    }

    return{
        user,
        auth,
    }
}
