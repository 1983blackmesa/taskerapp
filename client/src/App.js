//import './App.css';
import {BrowserRouter, Switch, Route, Link} from "react-router-dom";
import React, {useState,useEffect} from 'react';
import Register from "./Register";
import UserContext from "./UserContext";
import axios from "axios";
import Login from "./Login";
import Home from "./Home";
import Footer from "./components/layout/Footer";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import Location from "./Location";


const App = () =>  {
  const [email,setEmail] = useState('');

  useEffect(() => {
     
    axios.get('http://localhost:5000/user', {withCredentials:true})
      .then(response => {
        setEmail(response.data.email);
      });
  }, []);

  function logout() {
    axios.post('http://localhost:5000/logout', {}, {withCredentials:true})
      .then(() => setEmail(''));
  }

  return (
    <UserContext.Provider value={{email,setEmail}}>
      <BrowserRouter>
        <nav>
        
          <Link to={'/'}>Home
          </Link>
        
          {!email && (
            <>
              <Link to={'/login'}>Login</Link>
              <Link to={'/register'}>Register</Link>
            </>
          )}
          {!!email && (
            <>
            
            <Switch>
           
            <Route exact path={'/location'} component={Location}/>
            
            <Link to={'/location'}>Location</Link>
            
            </Switch>

           
            <Link to onClick={e => {e.preventDefault();logout();}}>Logout</Link>
          
            </>
          )}
          <div><strong>{email}</strong></div>
        </nav>
        <main>
          <Switch>
            <Route exact path={'/'} component={Home} />
            <Route exact path={'/register'} component={Register} />
            <Route exact path={'/login'} component={Login} />
          </Switch>
          <Footer />
        </main>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
