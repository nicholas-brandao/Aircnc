import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Spot from './pages/Spot';


export default function Routes(){

    function isAuthenticated(){

        if(localStorage.getItem("user"))
            return true;
        else
            return false;
    }


    const PrivateRoute = ({ component: Component }) => {
        
        return <Route
          render={props =>
            
            isAuthenticated() ? (
              <Component {...props} />
            ) : (
              <Redirect to={{ pathname: "/" }} />
            )
          }
        />
    };

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <PrivateRoute path="/dashboard" component={Dashboard} />
                <PrivateRoute path="/spot" component={Spot} />
                <Route path="*" component={() => <h2>404 - Not Found</h2>} />
            </Switch>
        </BrowserRouter>
    );
}
