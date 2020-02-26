import React from "react";
import { Route, Redirect } from "react-router";

const usePrivateRoute = ({component: Component, ...rest}) => {

  return <Route 
		{... rest}
		render = { (props) => (
			props.location.login !== undefined && props.location.login
				?
					< Component {...props} />
				:
				< Redirect to="/" />
		)}
	/>
};

export default usePrivateRoute;
