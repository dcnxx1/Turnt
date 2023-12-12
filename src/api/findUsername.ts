import { API } from "./api"

export default async function findUsername(username: string) {
    try {
        return await API.get(`setup/find/'${username}`)
    } catch(err){
        console.log("ERR GET username ->>", err)
    }
}