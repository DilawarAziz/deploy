import '../App.css'




import {React, useState} from 'react'




let Contact=()=>{


const [inputvalue, setinputvalue] = useState({
  one:"",
  two:"",
 three:""
})

let input1 = ()=>{
setinputvalue("")
}


    return(
  <>
    <div className="contactmain">
    <div className="contactchild">
    <div className="contactchild2">
      
        <h1 className="contactheading">SEND US A MEASSAGE</h1>
      
        <input value={inputvalue.one} className="contactinput" type="text" placeholder="Name"/>
        <input value={inputvalue.two} className="contactinput" type="text" placeholder="Email"/>
        <input value={inputvalue.three} className="contactinput" type="text" placeholder="Mobile"/>
     
        {/* <h6>Select Your Type Of Communication</h6> */}
        {/* <div className="radiobtn">
        <input className="contactinput" id="pne" name="phone" value="phone" type="radio"/>
        <label htmlFor="pne">Phone</label>  

        <input className="contactinput" id="email" name="email" value="email" type="radio"/>
        <label htmlFor="email">  Email</label>
        </div> */}
        <textarea id="w3review" placeholder="Enter your message Here" className="contactTextArea" name="w3review" rows="4" cols="50"></textarea>
        {/* <button className="btn1 pmt"> Submit</button> */}
        <div style={{width:"100%",text:"center",marginTop:"12px"}}>
    <button onClick={input1} style={{width:"100%"}}  type="submit"  className=" loginbtn btn-primary" >Submit</button>
  </div>
    </div  >
    <img className="imgcontact" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3cTiqNwF0-7hM5Mb6vAJwWxDzMX8UMHTCKItIxoHQbYadOTuu-AfpkM81lBKHQ67IezY&usqp=CAU"/>
    </div>
    </div>
    </>
    )


}
export default Contact