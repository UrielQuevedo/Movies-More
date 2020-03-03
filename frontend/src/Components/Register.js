import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import "../Css/logIn.css";
import logo from "../ICONO.png";
import useFormLog from '../Hooks/UseFormLog';
import useCheckPassword from '../Hooks/UseCheckPassword';
import CustomInput from './CustomInput';
import VisibilityPassword from "./VisibilityPassword";
import ErrorMessageComponent from './ErrorMessageComponent';

const Register = (props) => {
  const {register, errors, handleSubmit} = useForm();
  const [formError, handlerChange, postForm] = useFormLog('/user/create', props);
  const [passwordError, checkPassword] = useCheckPassword(postForm);

  const basicConfig = {
    required: true
  }

  const passwordConfig = {
    required: true,
    minLength: 6
  }

  const _functions = {
    _errors: errors,
    _handlerChange: handlerChange,
    _register: register
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col m8 offset-m2 l6 offset-l3 xl4 offset-xl4">
          <div className="card z-depth-2 card-log" style={{ borderRadius: '15px'}}>
            <div className="card-action center-align" style={{ borderRadius: '15px'}}>
              <a href="/" style={{marginLeft: '25px'}}><img src={logo} alt="page logotype" className="logotipe" /></a>
              <h3 className="title-login color-title">Register</h3>
            </div>
            <div className="card-content card-padding">
              <div className="form-field">
                <form onSubmit={handleSubmit(checkPassword)}>
                  <CustomInput functions={_functions} type='text' name='nickname' title='Nickname' configRegister={basicConfig} errorMessage='Nickname required'  />
                  <CustomInput functions={_functions} type='email' name='email' title='Email' configRegister={basicConfig} errorMessage='Email required'  />
                  <VisibilityPassword seeTwoPassword={true} style='visibilityPasswordRegister'/>
                  <CustomInput functions={_functions} type='password' name='password' title='Password' configRegister={passwordConfig} errorMessage='Password required'  />
                  <CustomInput functions={_functions} type='password' name='confirmPassword' title='Confirm Password' configRegister={passwordConfig} errorMessage='Confirm Password required'  />
                  {formError && <ErrorMessageComponent message={formError} styleClass='paddingError' />}
                  {passwordError && <ErrorMessageComponent message={passwordError} styleClass='paddingError' />}
                  <button
                    className="waves-effect btn waves-teal button-google btn-login"
                    style={{ width: "100%" }}
                  >
                    SING UP
                  </button>
                </form>
                <div className="center-align">
                  <p style={{ marginTop: "16px" }}>
                    <strong className="white-text">Do you have an account?</strong>
                    <a href="/singin" style={{ marginLeft: "10px", color: '#21FFE2' }}>
                      Sing In
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
}
 
export default Register;