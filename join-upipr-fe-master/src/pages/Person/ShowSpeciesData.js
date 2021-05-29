import React from "react";
import { getDataFromLocalStorage } from "../utils";

function ShowSpeciesData() {
    const [data, setData] = React.useState(null)
    const [isError, setError] = React.useState(false)

    React.useEffect(() => {
        getData()
    }, [])

    const getData = () => {
        const local_data = getDataFromLocalStorage('species') // calling getDataFromLocalStorage function to get data from local storage

        // if data available in local storage this if condition will run, otherwise else
        if( local_data ){
            setData( local_data )
        }else{
            setError(true)
        }
    }
    return(
        <>
        <h3 className="showdata-head"> SPECIES </h3>
       {isError ? <p className="show-error"> Sorry, Data Not Available! </p> :  <div className="showdata-div">
           {data && data.map((item) => <div>
            <p> Name : {item.name.charAt(0).toUpperCase() + item.name.slice(1)} </p>
            <p> Classification : {item.classification.charAt(0).toUpperCase() + item.classification.slice(1)} </p>
            <p> Designation : {item.designation.charAt(0).toUpperCase() + item.designation.slice(1)} </p>
            <p> Average-Lifespan : {item.average_lifespan} </p>
           </div>)}
        </div>}
        </>
    )
}

export {ShowSpeciesData}