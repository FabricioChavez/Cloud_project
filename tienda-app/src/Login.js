import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import localStorage from 'localStorage';
import { banckend_URL } from './DataComponents/config';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const logInUser = () => {
    if (email.length === 0) {
      alert('No puso email');
    } 
    
    else if (password.length === 0) {
      alert('contraeña en blanco');
    } 
    
    else {
      axios.post(`${banckend_URL}/login`, {
          email: email,
          password: password
      })
        .then(function (response) {
          console.log(response);
          const data = response.data
          localStorage.setItem('userData', JSON.stringify(data));
          /*onLogin(data);*/ 
          navigate('/interfaz');
        })
        .catch(function (error) {
          console.log(error, 'error');
          if (error.response.status === 401) {
            alert('email o contraseña no validos');
          }
        });
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'lightblue' }}>
      <div className="100-w p-5 rounded bg-white">
        <form>
          <h3>Iniciar Sesión</h3>
          <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
            <p className="lead fw-normal mb-0 me-3">Log Into Your Account</p>
          </div>
          <div className="form-outline mb-4">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="form3Example3" className="form-control form-control-lg" placeholder="Enter a valid email address" />
            <label className="form-label" htmlFor="form3Example3">
              Email address
            </label>
          </div>

          <div className="form-outline mb-4">
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="form3Example4" className="form-control form-control-lg" placeholder="Enter password" />
            <label className="form-label" htmlFor="form3Example4">
              Password
            </label>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <button type="button" onClick={logInUser} className="btn btn-primary btn-lg">Log in</button>
            <a href="#!">Forgot password?</a>
          </div>

          <div className="text-center text-muted mt-5 pt-5">
            Don't have an account? <a href="/signup">Sign up</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
