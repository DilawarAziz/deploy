import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Signup from "./components/signup";
import { connect } from "react-redux";
import { foo } from "./container/action/action";
import Profile from "./components/profile";
import Todo from "./components/Todo";
import Login from "./components/Login";
import Contact from "./components/contact";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App(props) {
  const [token, settoken] = useState(false);
  const [useruid, setuseruid] = useState(false);

  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        const uid = user.uid;
        // props.foo(user.accessToken)
        console.log(uid, "user");
        settoken(user.accessToken);
        setuseruid(uid);
        props.foo(uid);
      } else {
        setuseruid(false);
        console.log("null");
      }
    });
  }, []);

  return (
    <Router>
      <div>
        <Header token={useruid} />
        <Switch>
          {!useruid &&
            <Route path="/Signup">
              <Signup useruid={useruid} />
            </Route>}
          <Route path="/Profile">
            <Profile useruid={useruid} />
          </Route>
          {useruid &&
            <Route path="/Todo">
              <Todo useruid={useruid} />
            </Route>}
          <Route exact path="/Login">
            <Login />
          </Route>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/Contact">
            <Contact />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

const mapStateToProps = state => ({
  // users :state.users.name,
  // name:state.name
});
const mapDispatchToProps = dispatch => ({
  foo: uid => dispatch(foo(uid))
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
