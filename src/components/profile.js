import {React,useState} from 'react'
// import app from './firebase'
// import {getDatabase,update, ref,get, push, set,remove ,child} from "firebase/database";
import {connect} from 'react-redux'
import {useEffect} from 'react'
import img from './img.jpg'
import app from './firebase'
import {getDatabase,update, ref,get, push, set,remove ,child} from "firebase/database";
 function Profile(props) {
   
  const [userdata, setuserdata] = useState([])
    

        
        const db = getDatabase(app);
        useEffect (() => {  
            get(child(ref(db),( 'users/'+props.useruid +'/userdata/userdata' ))).then((snapshot)=>{
                console.log(snapshot.val())
                
                    setuserdata(snapshot.val())
                    
                }).catch((err) => {console.log(err)});
                

              
            },[])
            
           
              
              
         
            
            
            
            
            console.log(userdata.name)
            return (
        <>
  {userdata && <div className="profilemain">
       <div className="profilechild">
            <div className="imgparent">
                <img className="profileimg"  src={img} alt="" />
            </div>
            <div className="profiledata">
              <ul className="proul">
               <h1 style={{color:"black"}} className="proheading">YOUR PROFILE</h1> 
               <li> <h2 className="proheading2"> USERNAME:</h2></li>
                <h4><u className="proheading3"> {userdata.name}</u></h4>
             
                <li> <h2 className="proheading2" >EMAIL:</h2></li>
                <h4  ><u className="proheading3"> {userdata.email}</u></h4>
                <li>  <h2 className="proheading2">ADDRESS:</h2></li>
                <h4><u className="proheading3"> {userdata.Address}</u></h4>
                <li>  <h2 className="proheading2">CITY:</h2></li>
                <h4><u className="proheading3"> {userdata.City}</u></h4>
                </ul>
            </div>
            </div>
        </div>}
        </>
    )
}
const mapStateToProps = (state)=>({
    user :state.users,
    
  })
//   const mapDispatchToProps = (dispatch)=>({
//     foo :(user)=>dispatch(foo(user))
  
//   })
  export default connect(mapStateToProps,null)( Profile);
  
  