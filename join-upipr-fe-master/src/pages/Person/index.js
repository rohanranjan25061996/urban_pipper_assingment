import React from 'react';
import { useParams } from 'react-router';
import './index.css';
import Axios from "axios"
import {GiBodyHeight, GiFleshyMass} from "react-icons/gi"
import vehicles from "./Images/car.png"
import films from "./Images/film.png"
import species from "./Images/species.png"
import starships from "./Images/starships.png"
import { ShowFilmData } from './ShowFilmdata';
import { refineData } from '../utils';
import {ShowVehiclesData} from "./showVehiclesData"
import { ShowStarshipsData } from './ShowStarshipsData';
import { ShowSpeciesData } from './ShowSpeciesData';
import Loader from "react-loader-spinner";

function Person() {
  const { id } = useParams()
  const [data, setData] = React.useState([])
  const [isLoading, setLoading] = React.useState(false)
  const [isError, setError] = React.useState(false)
  const [activeFilm, setActiveFilm] = React.useState(false) // if we want to show Person film data, this one will active
  const [activeVehciles, setActiveVehicles] = React.useState(false) // if we want to show Person Vechciles data, this one will active
  const [activeStarships, setActiveStarships] = React.useState(false) // if we want to show Person Start ship data, this one will active
  const [activeSpecies, setActiveSpecies] = React.useState(false) // if we want to show Person Species data, this one will active
  React.useEffect(() => {
    console.log(id)
    getDataFromAPI()
  }, [])

  const getDataFromAPI = () => {
    setLoading(true)
    setError(false)
    Axios.get(`${process.env.REACT_APP_PUBLIC_URL}?search=${id}`)
    .then((res) => {
      setLoading(false)
      setError(false)
      setData(res.data.results)
      const temp = res.data.results
      localStorage.clear() // if we get new data, then first we have clear previous data from result.
      refineData(temp) // Here we are passing data to refineData() function, becuse in API there is some data which is object. For more in deatils move utils.js file
    })
  }

  // This function will run when user clicks on Film icon, activeFilm state will activate others will unactivate
  const onFilmData = () => {
    if(activeVehciles || activeSpecies || activeStarships){
      setActiveVehicles(false)
      setActiveStarships(false)
      setActiveSpecies(false);
    }
    setActiveFilm(true)
  }

  // This function will run when user clicks on Vehicles icon, activeVehicles state will activate others will unactivate
  const onVehiclesData = () => {
    if(activeFilm || activeSpecies || activeStarships){
      setActiveFilm(false)
      setActiveStarships(false)
      setActiveSpecies(false);
    }

    setActiveVehicles(true)
  }

  // This function will run when user clicks on Startships icon, activeStartships state will activate others will unactivate
  const onStarshipsData = () => {

    if(activeFilm || activeSpecies || activeVehciles){
      setActiveFilm(false)
      setActiveSpecies(false);
      setActiveVehicles(false)
    }

    setActiveStarships(true)
  }

  // This function will run when user clicks on Species icon, activeSpecies state will activate others will unactivate
  const onSpeciesData = () => {

    if(activeFilm || activeStarships || activeVehciles){
      setActiveFilm(false)
      setActiveVehicles(false)
      setActiveStarships(false)
    }

    setActiveSpecies(true)
  }

  return (
    <>
    <div className="person">
      <h1>{data.length != 0 && data[0].name}</h1>
      {isError && <p className="show-error"> Sorry, Data Not Available! </p>}
      <div className="main-card">
        {isLoading && <Loader type="Circles" color = "#ffeb0f" height="80" width="80" /> }
        {data && !isError && data.map((item) => <div className="card-container">
         <div className="details-1">
         <span> <GiBodyHeight color = "white" size = "30" /> {item.height}</span>
         <span>  <GiFleshyMass color = "white" size = "30" /> {item.mass} </span>
         </div>
         <div className="details-2">
           <span> Hair Color -: {item.hair_color.charAt(0).toUpperCase() + item.hair_color.slice(1)}  </span>
           <br></br>
           <span> Skin Color -: {item.skin_color.charAt(0).toUpperCase() + item.skin_color.slice(1)} </span>
           <br></br>
           <span> Eye Color -: {item.eye_color.charAt(0).toUpperCase() + item.eye_color.slice(1)} </span>
           <br></br>
           <span> Gender -: {item.gender.charAt(0).toUpperCase() + item.gender.slice(1)} </span>
         </div>
        </div>)}
      </div>
      <div className = "details-3">
        {!isLoading &&   <div>
          <img src = {vehicles} alt = {vehicles} width = "50" onClick = {onVehiclesData} />
          <img src = {films} alt = {films} width = "50" onClick = {onFilmData}/>
          <img src = {starships} alt = {starships} width = "50" onClick = {onStarshipsData}/>
          <img src = {species} alt = {species} width = "50" onClick = {onSpeciesData}/>
        </div>}
      </div >
    </div>
    <div className="show-container">
      {activeFilm && <ShowFilmData />}
    </div>
    <div className="show-container">
      {activeVehciles && <ShowVehiclesData />}
    </div>
    <div className="show-container">
      {activeStarships && <ShowStarshipsData />}
    </div>
    <div className="show-container">
      {activeSpecies && <ShowSpeciesData />}
    </div>
    </>
  );
}

export default Person;
