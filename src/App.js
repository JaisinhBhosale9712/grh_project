import logo from './logo.svg';
import './App.css';
import Main_Page from './components/main_page';
import View_Listing from './components/view_listing';
import View_Package from './components/view_package';
import Form_Main from './components/form_main';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import header from './components/images/header.png';

function App() {
  return (
    <Router>
    <div className="App">
    <img src={header} alt="header" className="header"/>
    <Switch>
    <Route path="/" exact>
    <Main_Page/>
    </Route>
    <Route path="/listings" exact>
    <View_Listing/>
    </Route>
    <Route path="/packages" exact>
    <View_Package/>
    </Route>
    <Route path="/form" exact>
    <Form_Main/>
    </Route>
    </Switch>
    </div>
    </Router>
  );
}

export default App;
