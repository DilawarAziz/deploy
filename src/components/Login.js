import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {useState} from 'react'
import '../App.css'
import {  useHistory } from "react-router-dom";
import Loader from "react-loader-spinner";

function Login(props) {

  const [spiner, setspiner] = useState(false)
  const [user, setuser] = useState({

    password:"",
    email:""
    })

console.log(props.userdata)
    
    let name,value;
    let handleinput=(e)=>{
 
      name=e.target.name;
      value=e.target.value
      
      setuser({...user ,[name]:value})
    }
    console.log(user.email, user.password)
    let history = useHistory();
    
let loginuser =(e)=>{
 e.preventDefault()
 if(user.email && user.password){
   setspiner(true)
const auth = getAuth();
signInWithEmailAndPassword(auth, user.email, user.password).then((userCredential) => {
  let idxemail = user.email.indexOf("@")
  
  if(idxemail){
  history.push('/todo')
  }
  

  }
  
  ).catch((error) => {
    const errorMessage = error.message;
    alert(errorMessage)
  })
}
else {
  alert("please fill the feilds correctly")
}
}
    return (
        <div>
   <div className="login" >
        <div className="loginchild" >

    <div className="loginchild2">
      <h1 className="contactheading">LOGIN HERE</h1>
    <div style={{width:"100%"}}>
    <h6>Email:</h6>
    <input  onChange={handleinput}  placeholder="Enter your Email" name="email"   type="email" className="form-login" />
    </div>
      <div style={{width:"100%"}}>
    <h6>password:</h6>
    <input onChange={handleinput} placeholder="Enter your password" name="password"   type="text" className="form-login" />
    </div>
    <button type="submit" onClick={loginuser}  className="bg-primary loginbtn" >
   { spiner? <Loader
    // className="spiner1"
    type="Bars"
    color="white"
    height={30}
    width={50}
    // timeout={3000} //3 secs
  />:   
     " LOGIN"}
      </button>
    </div>

    
    <div  className="ptloginimg">
 <img className="loginimg" src="https://img.freepik.com/free-vector/access-control-system-abstract-concept_335657-3180.jpg?size=338&ext=jpg" alt="img" />
 <h4 className="loginimgheading">or Login With</h4>
 <img className="loginimg2"   src="https://image.shutterstock.com/image-photo/valencia-spain-november-06-2018-260nw-1696714216.jpg" alt="img" />
 </div>
  </div>

        </div>
        </div>
    )
}

export default Login
