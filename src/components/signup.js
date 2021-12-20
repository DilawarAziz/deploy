import {React,useState} from "react";
import {connect} from 'react-redux'
import {foo} from '../container/action/action'
import app from './firebase'
import {getDatabase, ref, set} from "firebase/database";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {  useHistory } from "react-router-dom";
import Loader from "react-loader-spinner";



function Signup() {
  const [spiner, setspiner] = useState(false)
  
    const [user, setuser] = useState({
      name:"",
      password:"",
      email:"",
      Address:"",
      City:"",
      
    })
    let name,value;
    
    let handleinput=(e)=>{
     
      name=e.target.name;
      value=e.target.value
      
      setuser({...user ,[name]:value})
   
    }
    let history = useHistory()
  const db = getDatabase(app);
let setdata =  (e)=>{
  e.preventDefault()
    

  if(user.email&& user.password&& user.Address&& user.City&& user.name){
      const auth = getAuth();
   setspiner(true)

       createUserWithEmailAndPassword(auth, user.email, user.password)
        .then((userCredential) => {
          let b= userCredential.user.uid
    history.push('/Todo')
    // alert("Registerd Successfully")
    set(ref(db, "users/" + b+ "/userdata"), {
      userdata: user,
    });
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage)

  });
  }
  else{
    history.push('/Signup')
    alert("please fill the inputs correctly")
  }


}

  return (
    <div className="login">
    <div className="loginchild" >
        <form className="loginchild2">
          <h1 className="contactheading">Register Here</h1>
  <div className="ptcontinput">
    <label htmlFor="inputEmail4" className="form-label">User Name</label> 
    <input placeholder=" Your Name"  name="name" onChange={handleinput} value={user.name} type="email" className="form-login" id="inputEmail4"/>
  </div>
  <div className="ptcontinput">
    <label htmlFor="inputEmail4"  className="form-label">Email</label> 
    <input placeholder="Enter your Email" name="email" onChange={handleinput} value={user.email} type="email" className="form-login" id="inputEmail4"/>
  </div>
  <div className="ptcontinput">
    <label htmlFor="inputPassword4"  className="form-label">Password</label>
    <input placeholder="Enter Your Password" name="password" onChange={handleinput} value={user.password} type="password" className="form-login" id="inputPassword4"/>
  </div>
  <div className="ptcontinput">
    <label htmlFor="inputAddress" className="form-label">Address</label>
    <input  name="Address" onChange={handleinput} value={user.Address} type="text" className="form-login" id="inputAddress" placeholder="1234 Main St"/>
  </div>
  
  <div className="ptcontinput">
    <label htmlFor="inputCity" className="form-label">City</label>
    <input placeholder="City"  name="City" onChange={handleinput} value={user.City} type="text" className="form-login" id="inputCity"/>
  </div>

  <div className="ptcontinput" style={{width:"100%",display:"flex",marginTop:"12px",justifContent:"center"}}>
    <button   onClick={setdata} className=" loginbtn btn-primary" >
    { spiner? <Loader
    // className="spiner1"
    type="Bars"
    color="white"
    height={30}
    width={50}
    // timeout={3000} //3 secs
  />:   
  "Register"}
      </button>
  </div>

    



</form>
  <div className="ptloginimg">

 <img className="loginimg" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2dPHfYDNa5Tk85qo9NgRMWLP7VXQ3TC4iyLn6Uxc_uRusu6OhOojXSY_a6jqXEgJFjEM&usqp=CAU" alt="img" />
 </div>
    </div>
    </div>
  );
}



const mapStateToProps = (state)=>({
  users :state.users,
  name:state.name
})
const mapDispatchToProps = (dispatch)=>({
  foo :(user,bool)=>dispatch(foo(user,bool))

})
export default connect(mapStateToProps,mapDispatchToProps)( Signup);


