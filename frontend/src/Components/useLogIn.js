import React, { useState } from "react";
import "../Css/logIn.css";
import logo from "../ICONO.png";
import firebase from "../Initializers/firebase";
import UserFormLogin from '../Components/Form/UseFormLogIn';

const singInWithGoogle = props => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(result =>
      props.history.push({ pathname: "/home", login: true, data: result })
    );
};

const UseLogIn = props => {

  return (
    <div className="container">
      <div className="row">
        <div className="col s12 m4 offset-m4">
          <div className="card z-depth-2" style={{ marginTop: "25%" }}>
            <div className="card-action center-align">
              <img src={logo} alt="" className="logotipe" />
              <h3 className="title-login">Sing In</h3>
              <button
                onClick={() => singInWithGoogle(props)}
                className="waves-effect button-google"
              >
                <img
                  src="https://img.icons8.com/color/20/000000/google-logo.png"
                  className="left"
                />
                <p>Sing in with Google</p>
              </button>
            </div>
            <div className="card-content">
              <div className="form-field">
                <p className="center-align">OR</p>
                <UserFormLogin />
                <div className="">
                  <p style={{ marginTop: "16px", textAlign: "center" }}>
                    <strong>Don't have an account?</strong>
                    <a href="" style={{ marginLeft: "10px" }}>
                      Sing Up
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UseLogIn;
