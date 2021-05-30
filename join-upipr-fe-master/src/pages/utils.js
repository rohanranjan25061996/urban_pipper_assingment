import Axios from "axios"


// This callAPI function take one argument which is API URL and its return a promise
const callAPI = (url) => {
    url = url.replace("http", "https")
    return Axios.get(url)
}


// In this function putting data into local storage with corresponding key.
const putDataInLocalStorage = (data, key) => {

    // In this if condition will run when corresponding key value persent in local storage, if not then else condition will run
    if(localStorage.getItem(key) !== null){
        let local = localStorage.getItem(key)
        local = JSON.parse(local)
        local.push(data)
        localStorage.setItem(key, JSON.stringify(local))
    }else{
        let arr = []
        arr.push(data)
        localStorage.setItem(key, JSON.stringify(arr))
    }
}


// In this function, here we are calling link or API one by one and result data pass to putDataInLocalStorage function,
// It take two arguments result data from API and key.
const workingOnObject = (obj, key) => {
   
    obj.map((item) =>{
        callAPI(item)
        .then((res) => {
            putDataInLocalStorage(res.data, key)
        })
    })
}

// Here we are mapping into data, and storing all keys in keys variable and then again mapping data throught keys
// whenever we find keys corresponding value type is object, then we are again calling workingOnObject function as argumnet key and value of that key.
const refineData = (data) => {
    data.map((item) => {
        const keys = Object.keys(item)
        keys.map((k) => {
            if(typeof item[k] == 'object'){
                workingOnObject(item[k], k)
            }
        })
    })
}


// In this function take only one arguments which is key, get data from local storage corresponding key, after parsing data it will return
const getDataFromLocalStorage = (key) =>{

    // if given key data is available in local storage that if condition will be run and it return data, else return null (it means data not available)
    if(localStorage.getItem(key) != null){
        let local = localStorage.getItem(key)
        local = JSON.parse(local)
        return local
    }else{
        return null
    }
}

export {callAPI, refineData, getDataFromLocalStorage}