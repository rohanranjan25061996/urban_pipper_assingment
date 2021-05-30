import React, { useCallback } from 'react';
import logo from './star-wars-logo.png';
import './index.css';
import Loader from "react-loader-spinner";
import { useHistory } from 'react-router';
import Axios from "axios"
import NotFound from '../NotFound';
// import {MoveCursor} from "./MoveCursor"

function HomePage() {
  const [cursor, setCursor] = React.useState(0)
  const history = useHistory()
  const [data, setData] = React.useState([])
  const [isLoading, setLoading] = React.useState(false)
  const [isError, setError] = React.useState(false)
  const queryRef = React.useRef()

  // Creating a debounce function as a arguments it take a function and return function
  const debounce = (func) => {
    let timer;
    return function(...args) {
      const context = this
      if(timer) clearTimeout(timer)
      timer = setTimeout(() => {
        // here we are just simply calling function which take as arguments a debounce (func)
        timer = null;
        func.apply(context, args)
      }, 500)
    }
  }
  // In handelSearchQuery function calling Axios to get data from API, set the result data to in our DATA.
  // BASE URL is persent in .env file, that why here we are using process.env
  const handelSearchQuery = (e) => {
    setLoading(true)
    setError(false)
    Axios.get(`${process.env.REACT_APP_PUBLIC_URL}?search=${queryRef.current.value}`)
    .then((res) => {
      setData(res.data.results)
      setLoading(false)
    })
    .catch((err) => {
      setError(true)
    })
  }
  // here we call debounce function with handelSearchQuery function as a arguments, 
  // On every render this debounce function returning a new function, that we don't want thats why here we also use useCallback hook.
  // By using useCallback hook it will provide us a memoized callback
  const optimizeVersion = useCallback( debounce( handelSearchQuery ), [] )

  // handelKeyDown function using for show effect when user press key up and down.
  const handelKeyDown = (e) => {
    if(e.keyCode == 38 && cursor > 0){
      setCursor(prev => prev - 1)
      inputValue()
    }else if(e.keyCode == 40 && cursor < data.length-1){
      setCursor(prev => prev+1)
      inputValue()
    }else if(e.keyCode == 13){
      if(queryRef.current.value != ""){
        const id = queryRef.current.value
        redirectToPerson(id)
      }else{
        setError(true)
      }
    }
  }

  const inputValue = (ok) => {
    queryRef.current.value = data[cursor].name
    
  }

  // when user click on any search result, this function will call and it will push to person page.
  const redirectToPerson = (id) => {

    history.push( `person/${id}` )
  }
  return (
    <div>
      <div className="logo">
        <img src={logo} alt="Star Wars Logo" />
      </div>
      <input className="search-input" placeholder="Search by name" ref = {queryRef} onChange = {optimizeVersion} onKeyDown = {handelKeyDown} />
      <div className="loader-div"> {isLoading && <div className="loader-main"> <Loader type="ThreeDots" color = "#ffeb0f" height="50" width="50" /> </div>} </div>
      {data.length > 0 && <ul className = "search-list">
        {data && !isError && data.map((item, i) => <li keys = {item.name} className = {cursor == i ? "active" : null} onClick = {() => redirectToPerson(item.name)}>
          <div>
            <p>{item.name}</p>
            <p> {item.gender.charAt(0).toUpperCase() + item.gender.slice(1)}</p>
          </div>
          <div>
          <p>{item.birth_year}</p>
          </div>
          {i < data.length-1 && <hr className = "hr-tag"></hr>}
        </li>)}
      </ul>}
      {isError && <p className = "show-error"> Invalid Input! </p>}
      {/* {data.length > 0 && <MoveCursor data = {data} length = {data.length} cursor = {cursor} />} */}
    </div>
  );
}

export default HomePage;
