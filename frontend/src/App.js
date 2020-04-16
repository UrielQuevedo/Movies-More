import React, { Suspense, useState, useMemo, useEffect } from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import UseDarkMode from "./Hooks/UseDarkMode";
import { ThemeContext } from './Hooks/ThemeContext';

/*
  Views
*/
import LogIn from "./Views/LogIn";
import Home from "./Views/Home";
import Contents from './Views/Contents'
import Register from "./Views/Register";
import Profile from "./Views/Profile";
import Mylist from "./Views/Mylist";

/*
  Components
*/
import MobileNavbarBottom from "./Components/NavBar/MobileNavbarBottom";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/NavBar/Navbar";

/*
  Styles
*/
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './Styled/global';

/*
  Route
*/
import UsePrivateRoute from "./Service/UsePrivateRoute";
import CheckLogRoute from "./Service/CheckLogRoute";
import { BasicUserInfoContext } from "./Hooks/BasicUserInfoContext";
import UseCustomAPI from "./Hooks/UseCustomAPI";
import API, { getMovies, getPrograms } from "./Service/Api";
import MobileNavbarTop from "./Components/NavBar/MobileNavbarTop";
import Movie from "./Views/Movie";

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
                <div className="web-body">
                  <Switch>
                    <UsePrivateRoute path='/' exact component={Home} />
                    <UsePrivateRoute path='/movies' exact component={Contents} content_ref="movies" />
                    <UsePrivateRoute path='/programs' exact component={Contents} content_ref="programs" />
                    <UsePrivateRoute path='/trailers' exact component={Contents} content_ref="trailer" />
                    <UsePrivateRoute path='/movies/:id' exact component={Movie} />
                    <UsePrivateRoute path='/programs/:id/season/:season_number/episode/:episode_number' exact component={Movie} />
                    <UsePrivateRoute path='/programs/:id' exact component={Movie} />
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
