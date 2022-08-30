import axios from "axios"

const wordsApi = axios.create(
    {
        baseURL: '/api'
    }
)

export default wordsApi