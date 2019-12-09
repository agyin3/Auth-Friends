import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { List } from 'semantic-ui-react'
import Login from './components/Login'
import Friends from './components/Friends'
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to='/login'>Login</Link>
          </li>
          <li>
            <Link to='/friends'>Friends</Link>
          </li>
        </ul>
        <Switch>
          <Route exact path='/friends' component={Friends}/>
          <Route path='/login' component={Login}/>
          <Route component={Login}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
