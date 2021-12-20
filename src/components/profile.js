import { React, useState } from "react";
import { connect } from "react-redux";
import { useEffect } from "react";
import img from "./img.jpg";
import app from "./firebase";
import { getDatabase, onValue, ref } from "firebase/database";
import Loader from "react-loader-spinner";

function Profile(props) {
  const [userdata, setuserdata] = useState([]);
  const [spiner, setspiner] = useState(true)
  

  const db = getDatabase(app);
  useEffect(() => {
    onValue(
      ref(db, "users/" + props.useruid + "/userdata/userdata"),
      (snapshot) => {
        console.log(snapshot.val());
        if (snapshot) {
          setspiner(false)
          setuserdata(snapshot.val());
        }
      }
    );
  }, []);

  return (
    <>
      {userdata && (
        <div className='profilemain'>
          <div className='profilechild'>
            <div className='imgparent'>
              <img className='profileimg' src={img} alt='' />
            </div>
          {!spiner?  <div className='profiledata'>
              <ul className='proul'>
                <h1 style={{ color: "black" }} className='proheading'>
                  YOUR PROFILE
                </h1>
                <li>
                  {" "}
                  <h2 className='proheading2'> USERNAME:</h2>
                </li>
                <h4>
                  <u className='proheading3'> {userdata.name}</u>
                </h4>

                <li>
                  {" "}
                  <h2 className='proheading2'>EMAIL:</h2>
                </li>
                <h4>
                  <u className='proheading3'> {userdata.email}</u>
                </h4>
                <li>
                  {" "}
                  <h2 className='proheading2'>ADDRESS:</h2>
                </li>
                <h4>
                  <u className='proheading3'> {userdata.Address}</u>
                </h4>
                <li>
                  {" "}
                  <h2 className='proheading2'>CITY:</h2>
                </li>
                <h4>
                  <u className='proheading3'> {userdata.City}</u>
                </h4>
              </ul>
            </div>
        :
        <div className="spinerpt">
            <Loader
        
        type="Bars"
        color="#00BFFF"
        height={100}
        width={100}
        // timeout={3000} //3 secs
        /> 
          </div>}
        </div>
        </div>
    
      )}
    </>
  );
}
const mapStateToProps = (state) => ({
  user: state.users
});

export default connect(mapStateToProps, null)(Profile);
