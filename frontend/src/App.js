import React, { Suspense, useState, useMemo } from "react";
import LogIn from "./Views/LogIn";
import Home from "./Views/Home";
import Register from "./Views/Register";
import UsePrivateRoute from "./Route/UsePrivateRoute";
import { Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Footer from "./Components/Footer";
import { UserContext } from './Hooks/UserContext';
import CheckLogRoute from "./Route/CheckLogRoute";
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './Styled/theme';
import { GlobalStyles } from './Styled/global';
import Navbar from "./Components/Navbar";

function App() {
  const [user, setUser] = useState(null)
  const value = useMemo(() => ({user, setUser}), [user, setUser]);
  
  return (
    <Suspense fallback={<div>CARGANDO .... </div>}>
      <BrowserRouter>
        <Switch> 
          <CheckLogRoute exact path="/singup" component={Register} />
          <CheckLogRoute exact path="/singin" component={LogIn} />
          <ThemeProvider theme={darkTheme}>
            <UserContext.Provider value={value}>
              <GlobalStyles />
              <Navbar />
              <UsePrivateRoute path="/" component={Home} />
              <Footer />
            </UserContext.Provider>
          </ThemeProvider>
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
