import { navContext } from "../../store";



export function setHead(param){
    navContext.set(param)
}

export async function getJSON(url) {
    return (await (await fetch(url)).json())
}