// Đường dẫn cho các trang web
// Bỏ file này vào App.js
import {Route, Switch} from 'react-router-dom';
import DashBoard from '../Views/Admin/component/DashBoard/DashBoard';
import Login from '../Views/Admin/component/Login/Login';
import PrivateRoute from './PrivateRoute';
import PropTypes from 'prop-types';
import Product from '../Views/Admin/component/DashBoard/Component/Product/Product';

Routing.propTypes = {
    loading: PropTypes.bool,
};
export default function Routing(props){
    const {loading} = props;
    return (
    !loading &&
    <Switch>
       <PrivateRoute path="/DashBoard" component={DashBoard} />
       {/* <PrivateRoute path="/DashBoard/Product" component={Product} /> */}
       <Route path="/login-admin" component={Login}/>
                        
    </Switch>
    )
}