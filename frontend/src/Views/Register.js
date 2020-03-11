import React from 'react';
import { useForm } from 'react-hook-form';
import "../Css/logIn.css";
import logo from "../ICONO.png";
import useFormLog from '../Hooks/UseFormLog';
import useCheckPassword from '../Hooks/UseCheckPassword';
import CustomInput from '../Components/CustomInput';
import VisibilityPassword from "../Components/VisibilityPassword";
import ErrorMessageComponent from '../Components/ErrorMessageComponent';
import { useTranslation } from 'react-i18next';
import SelectLenguage from '../Components/SelectLenguage';
import Preloader from '../Components/Preloader';

const Register = () => {
  const {register, errors, handleSubmit} = useForm();
  const [isLoading, formError, handlerChange, postForm] = useFormLog('/user/register');
  const [passwordError, checkPassword] = useCheckPassword(postForm);
  const {t} = useTranslation();

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
              <SelectLenguage />
              <h3 className="title-login color-title">
                {t('Register')}
              </h3>
            </div>
            <div className="card-content card-padding">
              <div className="form-field">
                <form onSubmit={handleSubmit(checkPassword)} autocomplete="off">
                  <CustomInput functions={_functions} type='text' name='nickname' title={t('Nickname')} configRegister={basicConfig} />
                  <CustomInput functions={_functions} type='email' name='email' title={t('Email')} configRegister={basicConfig} />
                  <VisibilityPassword seeTwoPassword={true} style='visibilityPasswordRegister'/>
                  <CustomInput functions={_functions} type='password' name='password' title={t('Password')} configRegister={passwordConfig} />
                  <CustomInput functions={_functions} type='password' name='confirmPassword' title={t('Confirm Password')} configRegister={passwordConfig} />
                  {formError && <ErrorMessageComponent message={formError} styleClass='paddingError' />}
                  {passwordError && <ErrorMessageComponent message={passwordError} styleClass='paddingError' />}
                  <button
                    className="waves-effect btn waves-teal button-google btn-login"
                    style={{ width: "100%" }}
                  >
                    {t('Sing Up')}
                  </button>
                </form>
                { isLoading && <Preloader style="preloader-register" color="spinner-blue-only" /> }
                <div className="center-align">
                  <p style={{ marginTop: "16px" }}>
                    <strong className="white-text">
                      {t('Do you have an account?')}
                    </strong>
                    <a href="/singin" style={{ marginLeft: "10px", color: '#21FFE2' }}>
                      {t('Sing In')}
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