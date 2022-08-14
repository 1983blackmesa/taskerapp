import React, {useState, useContext} from 'react';
import axios from 'axios';
import UserContext from "./UserContext";
import {Redirect} from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css'

function Register() {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [redirect,setRedirect] = useState(false);

  const user = useContext(UserContext);

  function registerUser(e) {
    e.preventDefault();

    const data = {email,password};
    axios.post('http://localhost:5000/register', data, {withCredentials:true})
      .then(response => {
        user.setEmail(response.data.email);
        setEmail('');
        setPassword('');
        setRedirect(true);
      });
  }

  if (redirect) {
    return <Redirect to={'/'} />
  }

  return (
    <form action="" onSubmit={e => registerUser(e)}>
    <body class="img js-fullheight">
   
    <section class="ftco-section">
		<div class="container">
			<div class="row justify-content-center">
				<div class="col-md-6 text-center mb-5">
					<h2 class="heading-section">React app that does note keeping, user map location, to do list, login/register with JWT authentication!</h2>
				</div>
			</div>
			<div class="row justify-content-center">
				<div class="col-md-6 col-lg-4">
					<div class="login-wrap p-0">
		      	<h3 class="mb-4 text-center">Register!</h3>
		      		<div class="form-group">
		      			<input type="text" class="form-control" placeholder="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)}
                required/>
		      		</div>
	            <div class="form-group">
	              <input id="password-field" type="password" class="form-control" 
                placeholder="Password" 
                value={password} onChange={e => setPassword(e.target.value)}
                required/>
	              
	            </div>
	            <div class="form-group">
	            	<button type="submit" class="form-control btn btn-primary submit px-3">Register</button>
	            </div>
	            <div class="form-group d-md-flex">
	            	
								<div class="w-50 text-md-right">
									
								</div>
	            </div>
	          
	       
		      </div>
				</div>
			</div>
		</div>
	</section>
  </body>
  </form>
  );
}

export default Register;