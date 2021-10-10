const userList = [
    {
        username:2017130,
        password:'whatever'
    },
    {
        username:'admin',
        password:'admin'
    },
    {
        username: 'x',
        password: 'xxx'
    }
]


export async function post({body}){
    const username = body.username
    const password = body.password

    const u = userList.filter(i=>i.username == username)[0]

    console.log(u, username, password)

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