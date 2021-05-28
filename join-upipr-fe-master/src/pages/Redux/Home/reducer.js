import { SEARCH_ERROR, SEARCH_REQUEST, SEARCH_SUCCESS } from "./actionTypes"


const initState = {
    data: [],
    query: "",
    isLoading: false,
    isError: false,
}

const searchReducer = (state = initState, {type, payload}) =>{
    // console.log("type and payload from searchReducer", type, payload)
    switch(type){

        case SEARCH_REQUEST:{

            return{
                ...state,
                isLoading: true,
                isError: false,
            }
        }

        case SEARCH_SUCCESS:{
            return{
                ...state,
                isLoading: false,
                isError: false,
                data: payload
            }
        }

        case SEARCH_ERROR:{
            return{
                ...state,
                isLoading: false,
                isError: true,
            }
        }

        default:
            return state
    }
}

export {searchReducer}