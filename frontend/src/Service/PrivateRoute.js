import React from "react";
import { Route, Redirect } from "react-router";
import { getIdToken } from '../Utils/localhostFunctions';

const PrivateRoute = ({ component: Component, isLog, ...rest }) => {

  const keyToken = getIdToken();
  const redirectPath = isLog ? '/' : '/singin';
  const conditional = isLog ? !keyToken : keyToken;

  return <Route
    {... rest}
		render = { (props) => (
			conditional
				?
          <Component {...props} {...rest} />
        :
          < Redirect to={redirectPath} />
		)}
	/>
};

export default PrivateRoute;
