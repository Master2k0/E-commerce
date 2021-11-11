import React, {useState} from 'react';
// import PropTypes from 'prop-types';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { logout } from '../../../../../../features/handle/Auth/Auth';
import './navbar.css'
NavBar.propTypes = {
    
};

function NavBar(props) {
    const [error, setError] = useState("")
    const [show, setShow] = useState(false);
    const history = useHistory();

    
    async function handleLogOut(){
        setError('')
        try{
            await logout();
            history.push('/login-admin')
        } catch{
            setError('Fail to log out')
        }
    }


    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Container>
                <Navbar.Brand href="#home">Admin Page</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <NavDropdown title="Sản phẩm" id="navbarScrollingDropdown" show={show}
                    onMouseEnter={(e)=>{
                        setShow(true);
                    }}
                    onMouseLeave={(e) => {
                        setShow(false);
                    }}
                    onClick={()=>{
                        history.push("/DashBoard/Product")
                    }}
                    >
                        <NavDropdown.Item href="#action3">Điện Thoại</NavDropdown.Item>
                        <NavDropdown.Item href="#action4">Laptop</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action5">
                            Something else here
                        </NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="#link">Đơn mua hàng</Nav.Link>
                </Nav>
                </Navbar.Collapse>

                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        <NavDropdown title="Chức năng" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Đổi mật khẩu</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={handleLogOut}>Đăng xuất</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>                    
                </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default NavBar;