import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {useState} from 'react'
// import * as React from 'react';
import '../App.css'
import {  useHistory } from "react-router-dom";

function Login(props) {

  const [user, setuser] = useState({

    password:"",
    email:""
    })

console.log(props.userdata)
    
    let name,value;
    let handleinput=(e)=>{
 
      // console.log(e)
      name=e.target.name;
      value=e.target.value
      
      setuser({...user ,[name]:value})
      // console.log(user.email)
    }
    console.log(user.email, user.password)
    let history = useHistory();
    
let loginuser =(e)=>{
 e.preventDefault()
const auth = getAuth();
signInWithEmailAndPassword(auth, user.email, user.password).then((userCredential) => {
  const usertoken = userCredential.user.accessToken;
  const b = userCredential.user.uid;
  console.log(usertoken)
  
  history.push('/todo')
  
  // props.userdata(usertoken,b)
   console.log(user)
console.log('sign in successfully')
    // ...
  }).catch((error) => {
    const errorCode = error.code;
    // console.log(errorCode)
    const errorMessage = error.message;
    console.log(errorMessage)
  })
};
    return (
        <div>
   <div className="login" >
        <div className="loginchild" >

    <div className="loginchild2">
      <h1 className="contactheading">LOGIN HERE</h1>
    <div style={{width:"100%"}}>
    <h6>Email:</h6>
    <input  onChange={handleinput}  placeholder="Enter your Email" name="email"   type="email" className="form-login" id="inputEmail4"/>
    </div>
      <div style={{width:"100%"}}>
    <h6>password:</h6>
    <input onChange={handleinput} placeholder="Enter your password" name="password"   type="text" className="form-login" id="inputEmail4"/>
    </div>
    <button type="submit" onClick={loginuser}  className="bg-primary loginbtn" >LOGIN</button>
    </div>

    
    <div  className="ptloginimg">
 <img className="loginimg" src="https://img.freepik.com/free-vector/access-control-system-abstract-concept_335657-3180.jpg?size=338&ext=jpg" />
 <h4 className="loginimgheading">or Login With</h4>
 <img className="loginimg2"   src="https://image.shutterstock.com/image-photo/valencia-spain-november-06-2018-260nw-1696714216.jpg" />
 </div>
  </div>

        </div>
        </div>
    )
}

export default Login
