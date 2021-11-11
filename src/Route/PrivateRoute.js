import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Route, Redirect} from 'react-router-dom'
import { getDatabase, ref, child, get } from "firebase/database";
import { useSelector } from 'react-redux';
import { logout } from '../features/handle/Auth/Auth';

PrivateRoute.propTypes = {
    
};

function PrivateRoute({component: Component,...rest}) {
    const [admin, setAdmin] = useState(false)
    const [user, setUser] = useState(false)
    const currentUser = useSelector((state) => state.currentUser)
    // console.log(currentUser)
    useEffect(() => {
        const dbRef = ref(getDatabase());
        if(!!currentUser.currentUserUID){
            get(child(dbRef, `admin/${currentUser.currentUserUID}`)).then((snapshot) => {
                if (snapshot.exists()) {
                    setAdmin(true)
                    setUser(true)
                } else {
                    setUser(false)
                    setAdmin(false)
                    logout()
                    console.log("Da logout");
                }
                }).catch((error) => {
                console.error(error);
                });
        }
        // else{
        //     setUser(false);
        //     setAdmin(false);
        // }
        return ()=>{
            setUser(false);
            setAdmin(false);
        }
    },[currentUser])
    
    return (
    <>
        <Route {...rest} 
            render={props =>{
            return !!currentUser.currentUserUID && !user  && <></>
        }}>   
        </Route>

        <Route {...rest} 
        render={props =>{
        return !!currentUser.currentUserUID && user && admin && <Component {...props}/>
        }}>   
        </Route>

        <Route {...rest} 
        render={props =>{
        return !!currentUser.currentUserUID && user && !admin &&  <Redirect to="/login-admin"/>
        }}>   
        </Route>

        <Route {...rest} 
        render={props =>{
        return !!!currentUser.currentUserUID &&  <Redirect to="/login-admin"/>
        }}>   
        </Route>

        <Route {...rest} 
        render={props =>{
        return !!!currentUser.currentUserUID && !user && <Redirect to="/login-admin"/>
        }}>   
        </Route>
    
    </>
    )
    // return (
    //     <Route {...rest} 
    //         render={props =>{
    //         return !user && <Component {...props}/>
    //     }}>   
    //     </Route>
    // )
}

export default PrivateRoute;