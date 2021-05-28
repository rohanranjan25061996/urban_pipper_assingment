import {SEARCH_ERROR, SEARCH_REQUEST, SEARCH_SUCCESS} from "./actionTypes"
import debounce from "lodash/debounce"
import { searchAPIData } from "../utils"


const searchRequest = () => {

    return {
        type: SEARCH_REQUEST
    }
}

const searchSuccess = (payload) => {
    return{

        type: SEARCH_SUCCESS,
        payload
    }
}

const searchError = () => {
    return{
        type: SEARCH_ERROR
    }
}

const debounceSearch = debounce( async (query) => {
    return await searchAPIData(query)
}, 800, {leading: true})

const debounceSearchAPI = (data) => {
    return async function (dispatch) {
        dispatch(searchRequest())
    try {
        const results = await debounceSearch(data)
        console.log("results inside from => ", results)
        dispatch(searchSuccess(results))
    }catch(e) {
        dispatch(searchError())
    }
    }
}

export {debounceSearchAPI}

