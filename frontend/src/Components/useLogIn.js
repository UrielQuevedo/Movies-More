import React from "react";
import "../Css/logIn.css";
import logo from "../ICONO.png";
import firebase from "../Initializers/firebase";

const singInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then(result => console.log(result));
}

const useLogIn = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col s12 m4 offset-m4">
          <div className="card z-depth-2" style={{ marginTop: "25%" }}>
            <div className="card-action center-align">
              <img src={logo} alt="" className="logotipe" />
              <h3 className="title-login">Sing In</h3>
              <button onClick={() => singInWithGoogle()} className="waves-effect button-google">
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
                <div className="input-field">
                  <input type="text" />
                  <label for="last_name">Email</label>
                </div>
                <div className="input-field">
                  <input type="text" />
                  <label for="last_name">Password</label>
                </div>
                <button
                  class="waves-effect btn black waves-dark"
                  style={{ width: "100%" }}
                >
                  SIGN IN
                </button>
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

export default useLogIn;
