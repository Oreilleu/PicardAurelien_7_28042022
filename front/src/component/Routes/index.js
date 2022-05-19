import {
  BrowserRouter as Router,
  Route,
  Switch,
  //   Redirect,
} from 'react-router-dom';
// import Home from '../../page/Home';
import Profil from '../../page/Profil';
import Trending from '../../page/Trending';
import Navbar from '../Navbar';

export default function index() {
  return (
    <Router>
      <Navbar />
      <Switch>
        {/* <Route path="/" exact component={Home}></Route> */}
        <Route path="/" exact component={Profil}></Route>
        <Route path="/trending" exact component={Trending}></Route>
        {/* <Redirect to="/" /> */}
      </Switch>
    </Router>
  );
}
