import React , {useRef, useState} from 'react';
// import { useSelector, useDispatch } from 'react-redux'
import {Card, Form, Button, Alert} from 'react-bootstrap';
// import { adminLogin} from '../../../../features/AuthAdmin/AuthAdminSlice'
import { Link, useHistory } from 'react-router-dom';
import { login } from './../../../../features/handle/Auth/Auth';

function Login(props) {
    const emailRef = useRef()
    const passwordRef = useRef()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    // const user = useSelector((state) => state.currentUser)
    // console.log(user)
    async function handleSubmit(e){
        e.preventDefault()

        try{
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push('/')
        } catch {
            setError('Failed to Sign In')
            setLoading(false)

        }
    }
    return (
        <>
            <Card>
                <Card.Body>
                    
                    <h2 className="text-center mb-4">Log In</h2>
                    {/* {currentUser.email} */}
                    {error && <Alert variant='danger'>{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="email mt-1" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter Email" ref={emailRef} required></Form.Control>
                        </Form.Group>

                        <Form.Group className="password mt-1" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter Password" ref={passwordRef} required></Form.Control>
                        </Form.Group>

                        <Button disabled={loading} className="w-100 mt-3"type="submit">Sign In</Button>
                    </Form>
                    <div className="w-100 text-center mt-2">
                        <Link to="/forgot-password">Forgot Password?</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Need an Account ? <Link to="/signup">Sign Up</Link>
            </div>
            
        </>
    );
}

export default Login;