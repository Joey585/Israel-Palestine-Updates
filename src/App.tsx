import React, {useEffect} from 'react';
import './App.css';
import {getToken} from "./utils/auth";

export const Home = () => {
    useEffect(() => {
        if(getToken() && localStorage.getItem("id")){
            window.location.replace("/user/" + localStorage.getItem("id"))
        } else {
            window.location.replace("/login")
        }
    }, []);

    return(
        <p></p>
    )

}

function App() {

  return (
      <div className="App">
        <Home></Home>
      </div>
  );
}

export default App;
