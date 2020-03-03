import React, { Suspense, useState, useMemo } from "react";
import LogIn from "./Components/LogIn";
import Home from "./Components/Home";
import Register from "./Components/Register";
import UsePrivateRoute from "./Route/UsePrivateRoute";
import { Switch, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Footer from "./Components/Footer";
import { UserContext } from './Hooks/UserContext';
import CheckLogRoute from "./Route/CheckLogRoute";

function App() {
  const [user, setUser] = useState(null)
  const value = useMemo(() => ({user, setUser}), [user, setUser]);
  
  return (
    <Suspense fallback={<div>CARGANDO .... </div>}>
      <BrowserRouter>
        <Switch> 
          <CheckLogRoute exact path="/singup" component={Register} />
          <CheckLogRoute exact path="/singin" component={LogIn} />
          <UserContext.Provider value={value}>
            <UsePrivateRoute path="/" component={Home} />
            <Footer />
          </UserContext.Provider>
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
