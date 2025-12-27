import React from 'react'
import {useNavigate} from 'react-router-dom';
import {handleSuccess,handleError} from '../utils.js';
import {ToastContainer} from 'react-toastify';

function Home() {
  const [loggedInUser,setLoggedInUser]= React.useState("");
  const navigate= useNavigate();

  React.useEffect(() => {
    setLoggedInUser(localStorage.getItem("LoggedInUser"))
  },[])
  const handleLogout=()=>{
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("LoggedInUser");
    handleSuccess("Logout successful");
    setTimeout(() => {
      navigate("/login");

    },500)
  }
  return (
    <div>
      <h1> {loggedInUser}</h1>
      <button onClick={handleLogout}> Logout</button>

      <ToastContainer/>
    </div>
  )
}

export default Home
