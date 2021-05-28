import React from 'react';
import logo from './star-wars-logo.png';
import './index.css';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { debounceSearchAPI } from '../Redux/Home/action';

function HomePage() {
  const {data, isLoading, isError} = useSelector(state => state.searchData, shallowEqual)
  const [searchTerm, setSearchTerm] = React.useState("")
  const queryRef = React.useRef()
  const dispatch = useDispatch()

  React.useEffect(() => {
    if(searchTerm != ""){
      dispatch( debounceSearchAPI(queryRef.current.value) )
      console.log("data is => ", data)
    }
  }, [searchTerm])

  const handelSearchQuery = (e) => {
    setSearchTerm(queryRef.current.value)
  }
  return (
    <div>
      <div className="logo">
        <img src={logo} alt="Star Wars Logo" />
      </div>
      <input className="search-input" placeholder="Search by name" value = {searchTerm} ref = {queryRef} onChange = {handelSearchQuery} />
      <div style = {{background: "red"}}> {isLoading && "Loadind..."} </div>
    </div>
  );
}

export default HomePage;
