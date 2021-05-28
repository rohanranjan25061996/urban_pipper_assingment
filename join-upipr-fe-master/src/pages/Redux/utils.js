// Making API Call here
import Axios from "axios"

let hits = 0
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

const searchAPIData = async (query) => {
    await sleep(800)
    return Axios.get(`${process.env.REACT_APP_BASE_URL}?search=${query}`)
    .then((res) => {
        return res.data.results
    })
    .catch((err) => console.log(err))
}

export {searchAPIData}
