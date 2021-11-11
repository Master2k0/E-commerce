import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import { setCurrentUser, setCurrentUserEmail, setCurrentUserToken, setCurrentUserUID } from './features/currentUser/CurrentUserSlice';
import { auth } from './firebase';
import DashBoard from './Views/Admin/component/DashBoard/DashBoard';
import Login from './Views/Admin/component/Login/Login';
import Routing from './Route/Route'
import PrivateRoute from "./Route/PrivateRoute";
function App() {
  const [loading, setLoading] = useState(true);
  const currentUser = useSelector((state) => state.currentUser)
  // console.log(currentUser);
  const dispatch = useDispatch()


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user =>{
      // console.log(user.uid)
        if(user){
          dispatch(setCurrentUserToken(user.refreshToken));
          dispatch(setCurrentUserEmail(user.email));
          dispatch(setCurrentUserUID(user.uid));
          dispatch(setCurrentUser(true));
          // console.log(user);
          setLoading(false);
        }
        else{
          dispatch(setCurrentUserToken(null));
          dispatch(setCurrentUserEmail(null));
          dispatch(setCurrentUserUID(null));
          dispatch(setCurrentUser(false));
          // console.log(user);
          setLoading(false);
        }
    })
        // Unmouting
    return ()=>{
        unsubscribe();
    }
  },[dispatch,currentUser]); // Để ý cái dispatch,
  return (
    <Routing loading={loading}/>
    // !loading && 
    // <Switch>
    //   <PrivateRoute exact path="/" component={DashBoard} />
    //   <Route path="/login">
    //       <Login/>
    //   </Route>
                        
    // </Switch>
  );
}

export default App;
