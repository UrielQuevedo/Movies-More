import React from 'react';
import { Route, Redirect } from "react-router";

const CheckLogRoute = ({component: Component, ...rest}) => {
  
  const keyToken = window.localStorage.getItem('idToken');

  //TODO es muy similar al usePrivateRouter
  return <Route 
    {... rest}
		render = { (props) => (
			keyToken
				?
          < Redirect to="/" />
        :
          <Component {...props}/>
		)}
	/>
}
 
export default CheckLogRoute;