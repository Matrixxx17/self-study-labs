import axios from "axios"

const api = axios.create({
    baseURL: "http://dummyjson.com",
    timeout: 10000,
})
export default api 