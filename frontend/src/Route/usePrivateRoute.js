import React from "react";
import { Route, Redirect } from "react-router";

const UsePrivateRoute = ({component: Component, ...rest}) => {

  const keyToken = window.localStorage.getItem('token');
  const isLog = window.localStorage.getItem('isLog');

  return <Route 
    {... rest}
		render = { (props) => (
			keyToken !== undefined && isLog
				?
          <Component {...props}/>
				:
				< Redirect to="/singin" />
		)}
	/>
};

export default UsePrivateRoute;
