import React from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import Header from "./Header";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Signup from "./signup";

import Profile from "./profile";
import Todo from "./Todo";
import Login from "./Login";
import Contact from "./contact";
import Loader from "react-loader-spinner";

function Roots() {
  const [useruid, setuseruid] = useState(false);
  const [spiner, setspiner] = useState(true);

  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            // props.foo(user.accessToken)
            console.log(uid, "user");
            setuseruid(uid);
            setspiner(false);
        } else {
            // setspiner(true)
            setuseruid(false);
            setspiner(false);
        console.log("null");
      }
    });
  }, []);
  if (spiner) {
    return (
      <div className='spinerpt'>
        {" "}
        <Loader
          // className="spiner1"
          type='Bars'
          color='#00BFFF'
          height={300}
          width={200}
          // timeout={3000} //3 secs
        />
      </div>
    );
  }
  return (
    <>
      <div>
        <Router>
          <div>
            <Header token={useruid} />

            <Switch>
              <Route path='/Signup'    render={() => {
                  return useruid ? (
                    <Redirect to='/Todo' />
                  ) : (
                    <Signup useruid={useruid} />
                  );
                }}>
                
              </Route>
              <Route
                exact
                path='/Profile'
                render={() => {
                  return !useruid ? (
                    <Redirect to='/Login' />
                  ) : (
                    <Profile useruid={useruid} />
                  );
                }}
              />

              <Route
                exact
                path='/Todo'
                render={() => {
                  return !useruid ? (
                    <Redirect to='/Login' />
                  ) : (
                    <Todo useruid={useruid} />
                  );
                }}
              ></Route>
              <Route
                exact
                path='/Login'
                render={() => {
                  return useruid ? <Redirect to='/Todo' /> : <Login />;
                }}
              ></Route>
              <Route
                exact
                path='/'
                render={() => {
                  return useruid ? <Redirect to='/Todo' /> : <Redirect to='/Login' />;
                }}
              >
                <Login />
              </Route>
              <Route
                exact
                path='/Contact'
                render={() => {
                  return !useruid ? <Redirect to='/Login' /> : <Contact />;
                }}
              ></Route>
            </Switch>
          </div>
        </Router>
      </div>
    </>
  );
}
export default Roots;
