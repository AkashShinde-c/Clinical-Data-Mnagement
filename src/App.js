import './App.css';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { BrowserRouter, Link, Route, Switch, HashRouter } from 'react-router-dom';
import LogoutButton from './components/LogoutButton';

function App() {
  return (
    <div className="App">
      {/* <Navbar></Navbar> */}
      {/* <Login></Login> */}
      <HashRouter>
      <div className="mainContainer">
        <Navbar></Navbar>
        <Switch>
          <Route exact path="/"><Login/> </Route>
          <Route exact path="/dashboard"><Dashboard></Dashboard> </Route>
        </Switch>
      </div>
    </HashRouter>
    </div>
  );
}

export default App;
