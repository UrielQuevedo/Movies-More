import React, { Suspense, useState, useMemo, useEffect } from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import UseDarkMode from "./Hooks/UseDarkMode";
import { ThemeContext } from './Hooks/ThemeContext';

/*
  Views
*/
import LogIn from "./Views/LogIn";
import Home from "./Views/Home";
import Movies from './Views/Movies'
import Register from "./Views/Register";
import Profile from "./Views/Profile";
import Mylist from "./Views/Mylist";

/*
  Components
*/
import MobileNavbarBottom from "./Components/NavBar/MobileNavbarBottom";
import Footer from "./Components/Footer";
import Navbar from "./Components/NavBar/Navbar";

/*
  Styles
*/
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './Styled/global';

/*
  Route
*/
import UsePrivateRoute from "./Route/UsePrivateRoute";
import CheckLogRoute from "./Route/CheckLogRoute";
import { BasicUserInfoContext } from "./Hooks/BasicUserInfoContext";
import UseCustomAPI from "./Hooks/UseCustomAPI";
import API from "./Route/Api";
import MobileNavbarTop from "./Components/NavBar/MobileNavbarTop";

function App() {
  const {actualTheme} = UseDarkMode();
  const [theme, setTheme] = useState(actualTheme());
  const [response, executeAPI] = UseCustomAPI({});

  const {data: user} = response;

  useEffect(() => {
    executeAPI({ API: API, type:'get', path:`/user/${window.localStorage.getItem('uid')}`})
  }, [])
  
  return (
      <Router>
        <Switch>
          <CheckLogRoute exact path="/singup" component={Register} />
          <CheckLogRoute exact path="/singin" component={LogIn} />
          <ThemeProvider theme={theme}>
            <ThemeContext.Provider value={setTheme}>
              <BasicUserInfoContext.Provider value={[user]}>
                <GlobalStyles />
                <Navbar />
                <MobileNavbarTop />
                <MobileNavbarBottom />
                <div style={{flex: '1 0 auto', marginTop:"5%"}}>
                  <Switch>
                    <UsePrivateRoute path='/' exact component={Home} />
                    <UsePrivateRoute path='/movies' exact component={Movies} />
                    <UsePrivateRoute path='/profile' exact component={Profile} />
                    <UsePrivateRoute path='/mylist' exact component={Mylist} />
                    <Redirect to='/' />
                  </Switch>
                </div>
                <Footer />
              </BasicUserInfoContext.Provider>
            </ThemeContext.Provider>
          </ThemeProvider>
          </Switch>
      </Router>
  );
}

export default App;
