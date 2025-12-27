import React from 'react'
import {Link} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import {handleError} from '../utils.js';
import {useNavigate} from 'react-router-dom';

function Signup() {

    const [signupInfo,setSignupInfo]= React.useState({
        name:"",
        email:"",
        password:""
    });

  
    const handleSubmit = (e) => {
        
        const {name,value}= e.target;
        console.log(name,value);
        const copySignupInfo={...signupInfo};
        copySignupInfo[name]=value;
        setSignupInfo(copySignupInfo);
        
        }

     const  navigate = useNavigate();

      const   handleSignup = async (e) => {
        e.preventDefault();
        const {name,email,password}= signupInfo;

   if(!name || !email || !password){
    return  handleError("Please fill all the fields");}
    try {
      const url="http://localhost:8080/auth/signup";
      const response = await fetch(url,{
        method:"POST",
        headers:{
          "Content-Type":"application/json" 
        },
        body:JSON.stringify(signupInfo) 

    });
    const result= await response.json();
    const {success,message ,error}= result;
    if(success){
      handleError(message);
  setTimeout(() => {
    navigate("/login");
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
      <h1>Signup </h1>
      <form onSubmit={handleSignup} className='form' >
        <div>
            <label htmlFor='name'>Name</label>
            <input onChange={handleSubmit} type="text" name="name" placeholder='Enter your  name..' autoFocus
            value={signupInfo.name}
            />
        </div>
         <div>
            <label htmlFor='email'>Email</label>
            <input  onChange={handleSubmit}  type="email" name="email" placeholder='Enter your  Email..' 
                        value={signupInfo.email}

            />
        </div>
         <div>
            <label htmlFor='password'>Password</label>
            <input  onChange={handleSubmit} type="password" name="password" placeholder='Enter your  password..' 
                        value={signupInfo.password}

            />
        </div>
        <button type="submit">Signup</button>
        <span>Already have an account? <Link to="/login">Login</Link> </span>

      </form>
      <ToastContainer/>
    </div>
  )
}

export default Signup;
