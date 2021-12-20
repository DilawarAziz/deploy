import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { getAuth } from "firebase/auth";
import icon2 from "./icon2.png";
import { signOut } from "firebase/auth";

function Navbar(props) {
  let history = useHistory();
  const [bool, setbool] = useState(true);
  const [togleicon, settogleicon] = useState(false);

  let logout = () => {
    const auth = getAuth();

    signOut(auth)
      .then(() => {
        setbool(false);
        history.push("/Login");
      })
      .catch((error) => {
        alert(error);
      });
  };
  const [path, setpath] = useState({
    path1: "/Todo"
  });

  let alertuser = () => {
    if (!props.token) {
      alert("sign in First");
      setpath({ path1: "/Login" });
    } else {
      setpath({ path1: "/Todo" });
    }
  };

  return (
    <div className={`${togleicon ? "navbar2" : "navbar1"} bg-primary`}>
      <div className='logo'>
        <h4
          className='logo'
          style={{ color: "white", margin: "0px", fontSize: "23px" }}
        >
          {" "}
          App
        </h4>
      </div>
      <div className={`${togleicon ? "span2" : "span"}`}>
        {props.token ? (
          <>
          <Link onClick={alertuser} to={path.path1}>
            <p className='logo'>TODO</p>
          </Link>
          <Link to='/Profile'>
            <p> PROFIL</p>
          </Link>
          <Link to='/Contact'>
            <p className='logo'>ContactUs</p>
          </Link>
          <Link onClick={logout} to='/Signup'>
            <p className={`${!togleicon ? "sign" : "sign2"}`}>LogOut</p>
          </Link>
          </>
        ) : <>
          <Link to='/Login'>
            <p className='logo'>LOGIN</p>
          </Link>
          <Link to='/Signup'>
            <p className={`${!togleicon ? "sign" : "sign2"}`}>SignUp</p>
          </Link>

        </>}
      </div>
      <div className='humburgeiconprt'>
        <img
          onClick={() => settogleicon(togleicon ? false : true)}
          className='humburgericon'
          src={icon2}
          alt="img"
        />
      </div>
    </div>
  );
}

export default Navbar;
