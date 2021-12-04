import React, { useState,useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { connect } from "react-redux";

// import {  useHistory } from "react-router-dom";
import { signOut } from "firebase/auth";



function Navbar(props) {
  let history = useHistory();
const [usertoken1, setusertoken1] = useState(false)
  const [bool, setbool] = useState(true);

  let logout =()=>{
  const auth = getAuth();
 
  signOut(auth).then(() => {
    
    setbool(false)
  ;
  history.push('/Login')
}).catch((error) => {
  alert(error)
});}
  const [path, setpath] = useState({
    path1: "/Todo",
  
  });



  
  
  
  
  let alertuser = () => {
    if (!props.token) {
      alert("sign in First");
      setpath({ path1: "/Login" })
    } else {
      setpath({ path1: "/Todo"  });
    }
  };
  
  // console.log(props.token)



  return (
    <div className='navbar1 bg-primary'>
      <div className='logo'>
      {/* <Link className='logo'  style={{ color:"white", margin: "0px", fontSize: "23px" }}  > */}
       <h4 className='logo' style={{ color:"white", margin: "0px", fontSize: "23px" }}  > App</h4>
      </div>
      <div className='span'>
       
   {props.token &&<Link  onClick={alertuser} to={path.path1}>
          <p className='logo'>TODO</p>
        </Link>}
      {props.token &&   <Link  to="/Profile">
          <p> PROFIL</p>
        </Link> }
      {props.token &&    <Link  to='/Contact'>
            <p  className='logo'>Contact Us</p>
          </Link>}
       {!props.token &&  <Link  to = "/Login">
        <p className='logo' >LOGIN</p>
        </Link>}
        {
        (!props.token) ? 
          <Link to='/Signup'>
            <p   className='sign'>SignUp</p>
          </Link>
         : 
          <Link onClick={logout} to='/Signup'>
            <p  className='sign'>LogOut</p>
          </Link>
        }
      
        
      </div>
    </div>
  );
}


export default Navbar;
