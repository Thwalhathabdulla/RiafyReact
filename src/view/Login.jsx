import React, { useState,useContext } from "react";
import {Container} from 'react-bootstrap'
import '../style/Auth.css';
import {API_URL} from '../configuration';
import {useHistory,Link} from 'react-router-dom';
import {LoginContext} from '../context/LoginContext';

 const Login = ()=> {
     const [state,setState] = useState({
         email : '',
         Password : ''
     })
     const changeHandler = e =>{
         let {name,value} = e.target;
         setState(prev=>({
             ...prev,
             [name] : value
         }))
     }
     const history = useHistory();
     const {setLogged} = useContext(LoginContext)
     const onsubmit = async e =>{
         e.preventDefault();
         let isvalid = true;
         if(!state.email){
            isvalid = false
         }
         if(!state.Password){
            isvalid = false
         }
         const formData = {
             email : state.email,
             password : state.Password
         }
         if(isvalid){
            const response = await fetch(API_URL+'/login', {     //url
                method: 'POST',                 //method
                headers : {                     //passing header 
                    'Accept'        : 'application/json',
                    'Content-Type'  : 'application/json',
                },
                body : JSON.stringify(formData)
            })
            const result = await response.json();
            if(result.status){
                setLogged(true)
                history.push('/')
            }
         }
     }
        return (
            <Container>
            <form onSubmit={onsubmit}>
                <h3>Log in</h3>

                <div className="form-group">
                    <label>Email</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        placeholder="Enter email" 
                        name="email"
                        onChange={changeHandler}
                        value={state.email}
                        />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        placeholder="Enter password" 
                        name="Password"
                        value={state.Password}
                        onChange={changeHandler}
                        />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-dark btn-lg btn-block">Sign in</button>
                <p className="forgot-password text-center " style={{fontSize: 20}}>
                    <Link to="/register">register</Link>
                </p>
            </form>
            </Container>
        );
}
export default Login