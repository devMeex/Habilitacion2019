import React, {Fragment, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavbarGral from './components/layout/NavbarGral';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';

import Admin from './components/admin/Admin';
import AdminUser from './components/admin/AdminUser';
import AdminCreateUser from './components/admin/AdminCreateUser';

import AdminRisk from './components/admin/AdminRisk';
import AdminCreateRisk from './components/admin/AdminCreateRisk';

import AdminProjectType from './components/admin/AdminProjectType';
import AdminCreateProjectType from './components/admin/AdminCreateProjectType';

import AdminProjectSubType from './components/admin/AdminProjectSubType';
import AdminCreateProjectSubType from './components/admin/AdminCreateProjectSubType';

//project
import Project from './components/project/Project';

//Task
import CreateTask from './components/project/CreateTask';


import Dashboard from './components/dashboard/Dashboard';
import CreateProject from './components/project-form/CreateProject';
import PrivateRoute from './components/routing/PrivateRoute';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App.css';

if(localStorage.token){
  setAuthToken(localStorage.token);
}

const App = () => { 
  
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return(
    <Provider store={store}>
      <Router>
        <Fragment>
          <NavbarGral />
          <Route exact path='/' component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />

              <PrivateRoute exact path="/admin" component={Admin} />
              <PrivateRoute exact path="/admin-user" component={AdminUser} />
              <PrivateRoute exact path="/admin-user/create-user" component={AdminCreateUser} />
              
              <PrivateRoute exact path="/admin-risk" component={AdminRisk} />
              <PrivateRoute exact path="/admin-risk/create-risk" component={AdminCreateRisk} />

              <PrivateRoute exact path="/admin-project-type" component={AdminProjectType} />
              <PrivateRoute exact path="/admin-project-type/create-project-type" component={AdminCreateProjectType} />

              <PrivateRoute exact path="/admin-project-subtype" component={AdminProjectSubType} />
              <PrivateRoute exact path="/admin-project-subtype/create-project-subtype" component={AdminCreateProjectSubType} />
              
              
              <PrivateRoute exact path="/proyect" component={Project} />

              <PrivateRoute exact path="/create-task" component={CreateTask} />


              <PrivateRoute exact path="/create-proyect" component={CreateProject} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>

)};

export default App;