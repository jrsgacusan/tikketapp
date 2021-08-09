import './App.css';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/Dashboard';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import PageNotFound from './pages/PageNotFound';
import Paid from './pages/Paid';
import { AuthProvider } from './context/AuthProvider';
import NavBar from './components/NavBar';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path="/sign-in" component={Signin} />
          <Route path="/sign-up" component={Signup} />

          <PrivateRoute activeClass path="/unsettled" component={Dashboard} />
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
