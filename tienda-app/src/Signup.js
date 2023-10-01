import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { banckend_URL } from "./DataComponents/config";

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [fechaNac, setFechaNac] = useState('');
  const [pais, setPais] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [wallet , setWallet] = useState(0);
  const registerUser = () => {
    axios.post(`${banckend_URL}/signup`, {
      username: username,
      email: email,
      firstname: firstname,
      lastname: lastname,
      fechaNac: fechaNac,
      pais: pais,
      password: password,
      wallet : wallet
    })
      .then(function (response) {
        console.log(response);
        navigate("/login");
      })
      .catch(function (error) {
        console.log(error, 'error');
        if (error.response.status === 401) {
          alert("Invalid credentials");
        }
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh", backgroundColor: "lightblue" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="card bg-white p-5 rounded">
              <h1 className="card-title text-center mb-4">Create Your Account</h1>
              <form>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control" id="username" placeholder="Enter your username" />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="email" placeholder="Enter a valid email address" />
                </div>
                <div className="form-group">
                  <label htmlFor="firstname">First Name</label>
                  <input type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} className="form-control" id="firstname" placeholder="Enter your first name" />
                </div>
                <div className="form-group">
                  <label htmlFor="lastname">Last Name</label>
                  <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} className="form-control" id="lastname" placeholder="Enter your last name" />
                </div>
                <div className="form-group">
                  <label htmlFor="fechaNac">Date of Birth</label>
                  <input type="text" value={fechaNac} onChange={(e) => setFechaNac(e.target.value)} className="form-control" id="fechaNac" placeholder="Enter your date of birth" />
                </div>
                <div className="form-group">
                  <label htmlFor="pais">Country</label>
                  <input type="text" value={pais} onChange={(e) => setPais(e.target.value)} className="form-control" id="pais" placeholder="Enter your country" />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="password" placeholder="Enter password" />
                </div>
                <div className="form-check mb-3">
                  <input className="form-check-input" type="checkbox" value="" id="rememberMe" />
                  <label className="form-check-label" htmlFor="rememberMe">
                    Remember me
                  </label>
                </div>
                <div className="text-center">
                  <button type="button" className="btn btn-primary" onClick={registerUser}>Sign Up</button>
                </div>

                

              </form>
              <p className="small text-center mt-3 mb-0">Already have an account? <a href="/login" className="text-danger">Login</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup;
