import './App.css';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/Dashboard';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import PageNotFound from './pages/PageNotFound';
import Paid from './pages/Paid';
import { AuthProvider } from './context/AuthProvider';
import Home from './pages/Home';
import PlateNumber from './pages/PlateNumber';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/sign-in" exact component={Signin} />
          <Route path="/sign-up" exact component={Signup} />

          <PrivateRoute activeClass path="/unsettled" component={Dashboard} />
          <PrivateRoute
            activeClass
            path="/license-num"
            component={PlateNumber}
          />
          <PrivateRoute path="/paid" component={Paid} />

          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
