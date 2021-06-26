
import './App.css';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

//import header
import Header from './Header/Header.js'

//import  all the pages from the pages folder to add them to page routing
import Register from './Pages/Register.js'
import Home from './Pages/Home.js'

function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
        <Switch>
          <Route path="/checkout">
          </Route>
          <Route path="/register">
            <Register/>
          </Route>
          <Route path="/">
            <Home/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
