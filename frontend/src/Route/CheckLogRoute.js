import React from 'react';
import { Route, Redirect } from "react-router";

const CheckLogRoute = ({component: Component, ...rest}) => {
  
  const keyToken = window.localStorage.getItem('token');
  const isLog = window.localStorage.getItem('isLog');

  return <Route 
    {... rest}
		render = { (props) => (
			keyToken !== undefined && isLog
				?
          < Redirect to="/" />
        :
          <Component {...props}/>
		)}
	/>
}
 
export default CheckLogRoute;