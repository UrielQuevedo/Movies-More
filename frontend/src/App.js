import React, { Suspense } from "react";
import UseLogIn from "./Components/UseLogIn";
import UseHome from "./Components/UseHome";
import UseRegister from "./Components/UseRegister";
import UsePrivateRoute from "./Route/usePrivateRoute";
import { Switch, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <Suspense fallback={<div>CARGANDO .... </div>}>
      <BrowserRouter>
        <Switch> 
          <Route exact path="/" component={UseLogIn} />
          <Route exact path="/singup" component={UseRegister} />
          <UsePrivateRoute exact path="/home" component={UseHome} />
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
