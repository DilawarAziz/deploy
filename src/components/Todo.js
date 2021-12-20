import React from "react";
import "../Todo.css";
import { foo } from "../container/action/action";
import { connect } from "react-redux";
import app from "./firebase";
import deleteimg from './delete.png';
import addimg from './add.png';
import editimg from './edit.ico';
import Loader from "react-loader-spinner";

import {
  getDatabase,
  update,
  ref,
  onValue,
  set,
  remove,

} from "firebase/database";
class Todo extends React.Component {
  constructor() {
    super();
    this.state = {
      arr: [],
      value: "",
      obj: "",
      bool: false,
      key: "",
      keyvalue: "",
      spiner:true,
      Title:" you can save all of your daily activites here click on the add button to add your daily challenges and any kind of reminder you want..!"
    };
  }
  componentDidMount() {
  //  this.state.spiner=true
    const db = getDatabase(app);
   
    onValue(ref(db, "users/" + this.props.useruid+'/Todos'), (snapshot) => {
      console.log(snapshot.val(),"snap")
      if (snapshot.val() ) {
        this.setState({
          arr: [...this.state.arr, ...Object.keys(snapshot.val())],
          spiner:false
        }
        )
     
      }
      else{
        this.setState({
          // arr: [...this.state.arr, ...Object.keys(snapshot.val())],
          spiner:false
        })
      }
    });  
   
  }

  add_todo =  () => {
    const db = getDatabase(app);
   set(ref(db, "users/" + this.props.useruid + "/Todos/" + this.state.value), {
      Todo: this.state.value,
    });
      
      this.setState({
        arr: [...this.state.arr, this.state.value],
        value: "",
      });

  };
  
  delete_todo = (index, v) => {
    const db = getDatabase(app);
    remove(ref(db, "users/" + this.props.useruid + "/Todos/" + v));
   

      
      this.state.arr.splice(index, 1);
    
      this.setState({
        arr: this.state.arr,
      });
    };

  edit_value = (v, i) => {
    this.state.bool = true;
    this.setState({
      value: v,
      arr: this.state.arr,
      key: i,
      keyvalue: v,
    });
  };

  handleChange = (a, i) => {
    this.state.arr[i] = a.target.value;
  };

  update_value =  () => {
    this.state.bool = false;
    const db = getDatabase(app);
     update(
      ref(db, "users/" + this.props.useruid + "/Todos/" + this.state.keyvalue),
      {
        Todo: this.state.value,
      }
    );
    let a = document.getElementById("todoul");
    a.childNodes[this.state.key].childNodes[0].nodeValue = this.state.value;

    this.setState({
      arr: this.state.arr,
      value: "",
    });
  };

  delete_all = () => {
    let conf = window.confirm("Are You Sure To Delete All Todos")
    if (conf) {
      
      const db = getDatabase(app);
      remove(ref(db, "users/" + this.props.useruid+"/Todos"));
  
      this.setState({
        arr: [],
      });
    }
  };

  render() {
    console.log(this.props.data1)
    return (
      <div className='Todo-main' style={{ textAlign: "center" }}>
   
        <div className='Todo-child'>
            <h2 className="contacth">Add Your Todo Here</h2>
          <div className='Todo-parent'>
            <input
              type='text'
              className='input-todo'
              value={this.state.value}
              onChange={(a) => this.setState({ value: a.target.value })}
            />
            <div className='permanent-btn'>
              {this.state.bool && (
                <button
                  className='btn1 pmt'
                  onClick={() => this.update_value()}
                >
                  Update
                </button>
              )}
              <img onClick={this.add_todo} className="delimg1" src={addimg} alt = "img" />
               
                <img onClick={this.delete_all} className="delimg1" src={deleteimg} alt = "img" />
          
            </div>
          </div>
       {!this.state.spiner?   <ul id='todoul' className='todo-ul'>
            {!this.state.arr[0]&&<h1 style={{color:"black"}}>{this.state.Title}</h1>}
            {this.state.arr.map((v, i) => (
              <li className='todo-li' key={i}>
           
                {v}
                <div className='li-todo-btnpt'>
               
        <img onClick={() => this.edit_value(v, i)}  className="delimg" src={editimg} alt = "img" />
                    
        <img onClick={() => this.delete_todo(i, v)} className="delimg" src={deleteimg} alt = "img" />
   
                </div>
              </li>
            ))}

          </ul>:  <div className="spinerpt">  <Loader
          className="spiner"
        type="Bars"
        color="#00BFFF"
    
      /></div>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
data1:state.useruid
});

const mapDispatchToProps = (dispatch) => ({
  foo: (v) => dispatch(foo(v)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Todo);
