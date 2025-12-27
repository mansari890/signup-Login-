import React from 'react'
import {Link} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import {handleError} from '../utils.js';
import {useNavigate} from 'react-router-dom';

function Login() {

    const [loginInfo,setLoginInfo]= React.useState({
        
        email:"",
        password:""
    });

  
    const handleSubmit = (e) => {
        
        const {name,value}= e.target;
        console.log(name,value);
        const copyLoginInfo={...loginInfo};
        copyLoginInfo[name]=value;
        setLoginInfo(copyLoginInfo);
        
        }

     const  navigate = useNavigate();

      const   handleLogin = async (e) => {
        e.preventDefault();
        const {email,password}= loginInfo;

   if( !email || !password){
    return  handleError("Please fill all the fields");}
    try {
      const url="http://localhost:8080/auth/login";
      const response = await fetch(url,{
        method:"POST",
        headers:{
          "Content-Type":"application/json" 
        },
        body:JSON.stringify(loginInfo) 

    });
    const result= await response.json();
    const {success,message ,jwtToken,name,error}= result;
    if(success){
      handleError(message);
      localStorage.setItem("jwtToken",jwtToken);
      localStorage.setItem("LoggedInUser",name);
  setTimeout(() => {
    navigate("/home");
  },1000)
    } else if(error){
      const details= error.details ? error.details[0].message : error;
      handleError(details);

    }else if(!success){
      handleError(message);

    }

    console.log(result);
    
   } catch (error) {
      handleError("Signup failed. Please try again later.",error);
      
    }

   
    }

  return (
    <div className='container'>
      <h1>Login </h1>
      <form onSubmit={handleLogin} className='form' >
      
         <div>
            <label htmlFor='email'>Email</label>
            <input  onChange={handleSubmit}  type="email" name="email" placeholder='Enter your  Email..' 
                        value={loginInfo.email}

            />
        </div>
         <div>
            <label htmlFor='password'>Password</label>
            <input  onChange={handleSubmit} type="password" name="password" placeholder='Enter your  password..' 
                        value={loginInfo.password}

            />
        </div>
        <button type="submit">login</button>
        <span>Does't have an account? <Link to="/signup">Signup</Link> </span>

      </form>
      <ToastContainer/>
    </div>
  )
}

export default Login;
