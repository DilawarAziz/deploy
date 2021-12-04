import {React,useState} from "react";
import {connect} from 'react-redux'
import {foo} from '../container/action/action'
import app from './firebase'
import {getDatabase,update,onValue, ref,get, push, set,remove ,child} from "firebase/database";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {  useHistory } from "react-router-dom";



function Signup(props) {
    const [bool, setbool] = useState(false)
    const [localuid, setlocal] = useState(false)
    const [userfulldata ,setuserfulldata]=useState(false)
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
    

      const auth = getAuth();
       createUserWithEmailAndPassword(auth, user.email, user.password,user.Address,user.City,user.name)
        .then((userCredential) => {
          let b= userCredential.user.uid
// console.log(props.useruid,"sdfg")
  // setlocal(b)
    history.push('/Todo')
    set(ref(db, "users/" + b+ "/userdata"), {
      userdata: user,
    });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorCode,errorMessage)
          // ..
        });



      
      // props.foo(user,bool)
 

}
// console.log(localuid)

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
    <button   onClick={setdata} className=" loginbtn btn-primary" >Register</button>
  </div>

    



</form>
  <div className="ptloginimg">

 <img className="loginimg" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2dPHfYDNa5Tk85qo9NgRMWLP7VXQ3TC4iyLn6Uxc_uRusu6OhOojXSY_a6jqXEgJFjEM&usqp=CAU" />
 </div>
    </div>
    </div>
  );
}



// export default foo;
const mapStateToProps = (state)=>({
  users :state.users,
  name:state.name
})
const mapDispatchToProps = (dispatch)=>({
  foo :(user,bool)=>dispatch(foo(user,bool))

})
export default connect(mapStateToProps,mapDispatchToProps)( Signup);


