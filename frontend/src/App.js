import React, { Suspense } from "react";
import LogIn from "./Components/LogIn";
import Home from "./Components/Home";
import Register from "./Components/Register";
import UsePrivateRoute from "./Route/UsePrivateRoute";
import { Switch, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Footer from "./Components/Footer";

function App() {
  return (
    <Suspense fallback={<div>CARGANDO .... </div>}>
      <BrowserRouter>
        <Switch> 
          <Route exact path="/singup" component={Register} />
          <Route exact path="/" component={LogIn} />
          <div>
            <UsePrivateRoute exact path="/home" component={Home} />
            <Footer />
          </div>
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
