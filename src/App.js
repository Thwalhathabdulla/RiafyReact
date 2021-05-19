import React, { useState } from 'react';
import './App.css';
import {Container} from 'react-bootstrap';
import Header from './layout';
import { BrowserRouter as Router, 
  Route,Switch
} from 'react-router-dom';
//view components
import Home from './view/home';
import Login from './view/Login';
import Register from './view/Register';
import ViewList from './view/View'
import {LoginContext} from './context/LoginContext';
const App = () => {
  const [logged,setLogged] = useState(false)
  return ( 
    <div>
      <LoginContext.Provider value={{logged,setLogged}}>
        <Router>
          <Header/>
            <Container fluid>
              <Switch>
                <Route path="/" exact={true} component={Home} />
                <Route path="/login" exact={true} component={Login} />
                <Route path="/register" exact={true} component={Register} />
                <Route path="/view/:id" exact={true} component={ViewList} />
              </Switch>
            </Container>
        </Router>
      </LoginContext.Provider>
    </div>
   );
}

export default App;
