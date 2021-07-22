import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Dashboard from './components/Dashboard/Dashboard';
import BeginTask from './components/BeginTask/BeginTask';
import NavBar from './components/NavBar/NavBar';

function App() {
  return (
    <BrowserRouter>
    <div className="navbar">
        <NavBar/>
    </div>
    <div className="App">
      <Switch>
          <Route exact path='/dashboard' component={Dashboard}/>
          <Route exact path='/begin-task' component={BeginTask}/>
      </Switch>
    </div>
    </BrowserRouter> 
  ); 
}

export default App;