import React from "react";
import "../Css/logIn.css";
import logo from "../Images/Circle_Logo.png";
import { useForm } from 'react-hook-form';
import CustomInput from '../Components/CustomInput';
import useFormLog from '../Hooks/UseFormLog';
import VisibilityPassword from "../Components/VisibilityPassword";
import ErrorMessageComponent from "../Components/ErrorMessageComponent";
import { useTranslation } from "react-i18next";
import SelectLenguage from "../Components/SelectLenguage";
import Preloader from "../Components/Preloader";
import useLogInWithGoogle from "../Hooks/UseLogInWithGoogle";

const LogIn = () => {
  const {register, errors, handleSubmit} = useForm();
  const [isLoading, formError, handlerChange, postForm] = useFormLog('/user/login');
  const [loadingGoogle, singInWithGoogle] = useLogInWithGoogle();
  const {t} = useTranslation();

  const basicConfig = {
    required: true
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
          <div className="card z-depth-2 hoverable card-log" style={{ borderRadius: '15px'}}>
            <div className="card-action center-align" style={{ borderRadius: '15px'}}>
              <a href="/" style={{marginLeft: '25px'}}><img src={logo} alt="page logotype" className="logotipe" /></a>
              <SelectLenguage />
              <h3 className="title-login color-title">{t('Sing In')}</h3>
              <button
                onClick={() => singInWithGoogle()}
                className="waves-effect button-google"
              >
                <img
                  src="https://img.icons8.com/color/20/000000/google-logo.png"
                  className="left"
                  href="/"
                />
                <p>{t('Sing in with Google')}</p>
              </button>
              { loadingGoogle && <Preloader style="preloader-google" color="spinner-red-only" /> }
            </div>
            <div className="card-content">
              <div className="form-field">
                <p className="center-align color-title title-or">{t("OR")}</p>
                <form onSubmit={handleSubmit(postForm)} autocomplete="off">
                  <CustomInput functions={_functions} type='email' name='email' title={t('Email')} configRegister={basicConfig} />
                  <VisibilityPassword seeTwoPassword={false} style='visibilityPasswordLogIn'/>
                  <CustomInput functions={_functions} type='password' name='password' title={t('Password')} configRegister={basicConfig} />
                  {formError && <ErrorMessageComponent message={formError} styleClass='paddingError'/>}
                  <button
                    className="btn waves-effect waves-teal black btn-login"
                    style={{ width: "100%" }}
                  >
                    {t('Log In')}
                  </button>
                </form>
                { isLoading && <Preloader style="preloader-login" color="spinner-red-only" /> }
                <div className="center-align">
                  <p style={{ marginTop: "16px" }}>
                    <strong className="white-text">{t('Don`t have an account?')}</strong>
                    <a href="/singup" style={{ marginLeft: "10px", color: '#21FFE2' }}>
                      {t('Sing Up')}
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

export default LogIn;
