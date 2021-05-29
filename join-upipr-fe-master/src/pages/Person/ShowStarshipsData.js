import React from "react";
import { getDataFromLocalStorage } from "../utils";

function ShowStarshipsData() {
    const [data, setData] = React.useState(null)
    const [isError, setError] = React.useState(false)

    React.useEffect(() => {
        getData()
    }, [])

    const getData = () => {
        const local_data = getDataFromLocalStorage('starships') // calling getDataFromLocalStorage function to get data from local storage
        if( local_data ){
            setData( local_data )
        }else{
            setError(true)
        }
    }
    return(
        <>
        <h3 className="showdata-head"> STARTSHIPS </h3>
       {isError ? <p className="show-error"> Sorry, Data Not Available! </p> :  <div className="showdata-div">
           
           {data && data.map((item) => <div>
            <p> Name : {item.name} </p>
           <p> Model {item.model} </p>
           <p> Length: {item.length} </p>
           <p> Max-Atmosphering-Speed : {item.max_atmosphering_speed} </p>
           <p> Vehicle-Class : {item.vehicle_class} </p>
           <p> Crew : {item.crew} </p>
           <p> Starship-Class : {item.starshipClass} </p>
           </div>)}
        </div>}
        </>
    )
}

export {ShowStarshipsData}