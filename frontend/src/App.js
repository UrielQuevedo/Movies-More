import React, { Suspense, useState, useMemo } from "react";
import LogIn from "./Views/LogIn";
import Home from "./Views/Home";
import Movies from './Views/Movies'
import Register from "./Views/Register";
import UsePrivateRoute from "./Route/UsePrivateRoute";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import Footer from "./Components/Footer";
import { UserContext } from './Hooks/UserContext';
import CheckLogRoute from "./Route/CheckLogRoute";
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './Styled/theme';
import { GlobalStyles } from './Styled/global';
import Navbar from "./Components/Navbar";

function App() {
  const [user, setUser] = useState(null);
  const value = useMemo(() => ({user, setUser}), [user, setUser]);
  
  return (
      <Router>
        <Switch>
          <CheckLogRoute exact path="/singup" component={Register} />
          <CheckLogRoute exact path="/singin" component={LogIn} />
          <ThemeProvider theme={darkTheme}>
            <UserContext.Provider value={value}>
              <GlobalStyles />
              <div style={{flex: '1 0 auto'}}>
                <Navbar />
                <Switch>
                  <UsePrivateRoute path='/' exact component={Home} />
                  <UsePrivateRoute path='/movies' exact component={Movies} />
                  <Redirect to='/' />
                </Switch>
              </div>
              <Footer />
            </UserContext.Provider>
          </ThemeProvider>
          </Switch>
      </Router>
  );
}

export default App;
