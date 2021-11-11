import React, {useState, useEffect} from 'react';
// import { useSelector, useDispatch } from 'react-redux'
import NavBar from './Component/NavBar/NavBar';
import PrivateRoute from './../../../../Route/PrivateRoute';
import Product from './Component/Product/Product';
import { Route } from 'react-router-dom';
import AddProduct from './Component/AddProduct/AddProduct';
import { Alert } from 'react-bootstrap';


function DashBoard(props) {
    // const currentUser = useSelector((state) => state.currentUser)
    const [message, setMessage] = useState({type: "", content: "",})
    useEffect(()=>{
        const time = setTimeout(()=>{
            setMessage({type: "", content: ""})
        },2000)

        return () => {
            clearTimeout(time);
          };
    },[message])
    return (
        <div>
            <NavBar/>
            {message.type && <Alert variant={message.type} dismissible onClose={() => setMessage(false)}>{message.content}</Alert>}
            {/* <PrivateRoute exact path="/DashBoard/Product" component={Product} />
            <PrivateRoute path="/DashBoard/Product/AddProduct" component={AddProduct} setMessage={setMessage} /> */}
            <Route exact path="/DashBoard/Product" component={Product} />
            <Route path="/DashBoard/Product/AddProduct" render={props => <AddProduct {...props} setMessage={setMessage} />} />

        </div>
    );
}

export default DashBoard;