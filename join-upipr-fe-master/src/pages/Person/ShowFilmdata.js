import React from "react";
import { getDataFromLocalStorage } from "../utils";

function ShowFilmData() {
    const [data, setData] = React.useState(null)
    const [isError, setError] = React.useState(false)

    React.useEffect(() => {
        getData()
    }, [])

    const getData = () => {
        const local_data = getDataFromLocalStorage('films') // calling getDataFromLocalStorage function to get data from local storage
        if( local_data ){
            setData( local_data )
        }else{
            setError(true)
        }
    }
    return(
        <>
        <h3 className="showdata-head"> FILM </h3>
       {isError ? <p className="show-error"> Sorry, Data Not Available! </p> :  <div className="showdata-div">
           {data && data.map((item) => <div key={item.title}>
            <h3>  {item.title} </h3>
           <p>  {item.opening_crawl} </p>
           </div>)}
        </div>}
        </>
    )
}

export {ShowFilmData}