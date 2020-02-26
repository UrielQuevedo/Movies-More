import React, { useState } from "react";
import "../Css/logIn.css";
import logo from "../ICONO.png";
import firebase from "../Initializers/firebase";
import { useForm } from 'react-hook-form';

const singInWithGoogle = props => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(result =>
      props.history.push({ pathname: "/home", login: true, data: result })
    );
};

const UseLogIn = (props) => {

  const [fields, changeFields] = useState({});
  const {register, errors, handleSubmit} = useForm();

  const logIn = (data, e) => {
    //sendData
    e.target.reset();
  }

  const customInput = ({type, name, errorMessage}) => {
    return (
      <div className="input-field">
        <input
          className="input-log"
          type={type} 
          name={type}
          onChange={e => changeFields({...fields, [type]: e.target.value})}
          ref= 
            {
              register({
                required: {value: true}
              })
            }
        />
        <label htmlFor={type} className="label-color">{name}</label>
        {errors[type] &&
          <div className="red-text">
            <i className="material-icons" style={{fontSize:'1.2rem', transform: 'translateY(3px)'}}>cancel</i>
            <span className="center-align" style={{ fontSize:'14px', marginLeft: '4px'}}>
              {errorMessage}*
            </span>
          </div>
        }
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col m8 offset-m2 l6 offset-l3 xl4 offset-xl4">
          <div className="card z-depth-2 hoverable card-log" style={{ borderRadius: '15px'}}>
            <div className="card-action center-align" style={{ borderRadius: '15px'}}>
              <a href="/" style={{marginLeft: '25px'}}><img src={logo} alt="page logotype" className="logotipe" /></a>
              <h3 className="title-login color-title">Sing In</h3>
              <button
                onClick={() => singInWithGoogle(props)}
                className="waves-effect button-google"
              >
                <img
                  src="https://img.icons8.com/color/20/000000/google-logo.png"
                  className="left"
                  href="/"
                />
                <p>Sing in with Google</p>
              </button>
            </div>
            <div className="card-content">
              <div className="form-field">
                <p className="center-align color-title title-or">OR</p>
                <form onSubmit={handleSubmit(logIn)}>
                  {customInput({type: "email", name: "Email", errorMessage: "Email required"})}
                  {customInput({type: "password", name: "Password", errorMessage: "Password required"})}
                  <button
                    className="btn waves-effect waves-teal black btn-login"
                    style={{ width: "100%" }}
                  >
                    LOG IN
                  </button>
                </form>
                <div className="center-align">
                  <p style={{ marginTop: "16px" }}>
                    <strong className="white-text">Don't have an account?</strong>
                    <a href="/singup" style={{ marginLeft: "10px", color: '#21FFE2' }}>
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
