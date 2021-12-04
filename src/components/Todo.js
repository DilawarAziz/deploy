import React from "react";
import "../Todo.css";
import { foo } from "../container/action/action";

import { connect, useDispatch } from "react-redux";
import { tododata } from "../container/action/action";
import app from "./firebase";
import {
  getDatabase,
  update,
  ref,
  get,
  onValue,
  push,
  set,
  remove,
  child,
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
      Title:" you can save all of your daily activites here click on the add button to add your daily challenges and any kind of reminder you want..!"
    };
  }


  componentDidMount() {
    const db = getDatabase(app);
    onValue(ref(db, "users/" + this.props.useruid+'/Todos'), (snapshot) => {
      if (snapshot.val()) {
        this.setState({
          arr: [...this.state.arr, ...Object.keys(snapshot.val())],
        });
        // Object.keys(snapshot.val()).map((v) => {
        //   console.log("mounting comp",snapshot.val())
        //   console.log(v);
        //   this.props.foo(v)
        // });
      }
    });
  }

  add_todo = () => {
    const db = getDatabase(app);
    set(ref(db, "users/" + this.props.useruid + "/Todos/" + this.state.value), {
      Todo: this.state.value,
    });

    onValue(
      ref(db, "users/" + this.props.useruid + "/Todos/" + this.state.value),
      (snapshot) => {
        if (snapshot.val().Todo) {
          
          this.setState({
            arr: [...this.state.arr, snapshot.val().Todo],
            value: "",
          });
        }
      }
    );
  };

  delete_todo = (index, ) => {
    const db = getDatabase(app);
    remove(ref(db, "users/" + this.props.useruid + "/Todos/" + this.state.keyvalue));
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
    const db = getDatabase(app);
    remove(ref(db, "users/" + this.props.useruid+"/Todos"));

    this.setState({
      arr: [],
    });
  };

  render() {
    console.log(this.props.data1)
    return (
      <div className='Todo-main' style={{ textAlign: "center" }}>
        <div className='Todo-child'>
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
              <button onClick={this.add_todo} className='btn1 pmt'>
                Add Todo
              </button>
              <button onClick={this.delete_all} className='btn1 pmt '>
                Delete All{" "}
              </button>
            </div>
          </div>
          <ul id='todoul' className='todo-ul'>
            {!this.state.arr[0]&&<h1 style={{color:"black"}}>{this.state.Title}</h1>}
            {this.state.arr.map((v, i) => (
              <li className='todo-li' key={i}>
                {v}
                <div className='li-todo-btnpt'>
                  <button
                    className='btn1 li-todo-btn'
                    onClick={() => this.edit_value(v, i)}
                  >
                    Edit
                  </button>

                  <button
                    className='btn1 li-todo-btn'
                    onClick={() => this.delete_todo(i, v)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
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
