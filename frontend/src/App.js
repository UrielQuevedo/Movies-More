import React, { Suspense, useState, useMemo } from "react";
import LogIn from "./Views/LogIn";
import Home from "./Views/Home";
import Movies from './Views/Movies'
import Register from "./Views/Register";
import UsePrivateRoute from "./Route/UsePrivateRoute";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import Footer from "./Components/Footer";
import { ThemeContext } from './Hooks/ThemeContext';
import CheckLogRoute from "./Route/CheckLogRoute";
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './Styled/global';
import Navbar from "./Components/Navbar";
import UseDarkMode from "./Hooks/UseDarkMode";
import MobileNavbarBottom from "./Components/MobileNavbarBottom";
import MobileNavbarTop from "./Components/MobileNavbarTop";

function App() {
  const [actualTheme] = UseDarkMode();
  const [theme, setTheme] = useState(actualTheme());
  
  return (
      <Router>
        <Switch>
          <CheckLogRoute exact path="/singup" component={Register} />
          <CheckLogRoute exact path="/singin" component={LogIn} />
          <ThemeProvider theme={theme}>
            <ThemeContext.Provider value={[theme, setTheme]}>
              <GlobalStyles />
              <div style={{flex: '1 0 auto'}}>
                <Navbar />
                <MobileNavbarTop />
                <MobileNavbarBottom />
                <Switch>
                  <UsePrivateRoute path='/' exact component={Home} />
                  <UsePrivateRoute path='/movies' exact component={Movies} />
                  <Redirect to='/' />
                </Switch>
              </div>
              <Footer />
            </ThemeContext.Provider>
          </ThemeProvider>
          </Switch>
      </Router>
  );
}

export default App;
