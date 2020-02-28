import React, { useState } from "react";
import API from "../utils/API";
import { Input, FormBtn } from "./Form";
import { Link } from "react-router-dom";

function SignUpForm() {

  //Setting up signup forms state
  const [formObject, setFormObject] = useState({});

  //Handles updating the component state while user is typing
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value })
  };

  //When the form is submitted, use the API.saveUser method to save the user to the database
  function handleFormSubmit(event) {
    event.preventDefault();
    if (formObject.email && formObject.password) {
      API.saveUser({
        email: formObject.email,
        password: formObject.password
      })
        .catch(err => console.log(err));
    }
  }

  function getStuff(event) {
    event.preventDefault();
    API.getUser();
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <h2>Sign Up Form</h2>
          <form className="signup">
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <Input onChange={handleInputChange} type="email" name="email" id="email-input" placeholder="Email" />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <Input onChange={handleInputChange} type="password" name="password" id="password-input" placeholder="Password" />
            </div>
            <div style={{ display: "none" }} id="alert" className="alert alert-danger" role="alert">
              <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
              <span className="sr-only">Error:</span> <span className="msg"></span>
            </div>
            <FormBtn type="submit" onClick={handleFormSubmit}>Sign Up</FormBtn>
            <FormBtn type="submit" onClick={getStuff}>Get users</FormBtn>
          </form>
          <br />
          <p>Or log in <Link to="/">here</Link></p>
        </div>
      </div>
    </div>
  )
}

export default SignUpForm