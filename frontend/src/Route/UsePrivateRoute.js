import React from "react";
import { Route, Redirect } from "react-router";

const UsePrivateRoute = ({component: Component, ...rest}) => {

  const keyToken = window.localStorage.getItem('idToken');
  return <Route 
    {... rest}
		render = { (props) => (
			keyToken
				?
          <Component {...props} {...rest} />
				:
				< Redirect to="/singin" />
		)}
	/>
};

export default UsePrivateRoute;
