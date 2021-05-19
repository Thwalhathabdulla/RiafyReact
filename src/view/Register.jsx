import React, { useState } from 'react';
import {Container} from 'react-bootstrap';
import { API_URL } from '../configuration';
import {useHistory} from 'react-router-dom';
const Register = () => {
  const [state,setState] = useState({
    name : '',
    email : "",
    password : ""
  });
  const history = useHistory()
  const changeHandler =(e) =>{
    const {value,name} = e.target;
    setState(prev=>({
      ...prev,
      [name] : value
    }))
  }
  //onsubmit form
  const onSubmit =async e =>{
    e.preventDefault();
    let isValid = true
    if(!state.name){
      isValid = false
    }
    if(!state.email){
      isValid = false;
    }
    if(!state.password){
      isValid = false
    }
    if(isValid){
      const formData = {
        name : state.name,
        email : state.email,
        password : state.password
      }
        const response = await fetch(API_URL+'/register', {     //url
          method: 'POST',                 //method
          headers : {                     //passing header 
              'Accept'        : 'application/json',
              'Content-Type'  : 'application/json',
          },
          body : JSON.stringify(formData)
        })
        const result = await response.json();
        console.log(result)
        if(result.status){
            history.push('/login')
        }
    }else{
      alert("Please check the fileds")
    }
  }
    return (
      <Container>
      <form onSubmit={onSubmit}>
        <h3>Register</h3>

        <div className="form-group">
            <label>First name</label>
            <input type="text" className="form-control" placeholder="First name"
              name="name"
              value={state.name}
              onChange={changeHandler}
            />
        </div>

        <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              className="form-control" 
              placeholder="Enter email" 
              onChange={changeHandler}
              name="email"
              value={state.email}
              />
        </div>

        <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              className="form-control" 
              placeholder="Enter password" 
              onChange={changeHandler}
              name="password"
              value={state.password}
              />
        </div>

        <button type="submit" className="btn btn-dark btn-lg btn-block">Register</button>
        <p className="forgot-password text-right">
            {/* Already registered <a href="#">log in?</a> */}
        </p>
    </form>
      </Container>

      );
}
 
export default Register;