import React, { useState } from "react";
import { useForm } from 'react-hook-form';

const UseFormLogIn = () => {

  const [_, changeFields] = useState({});

  const {register, error, handleSubmit} = useForm();

  const logIn = (data, e) => {
    e.target.reset();
  }

  const inputEmail = () => {
    return (
      <div className="input-field">
        <input 
          type="email" 
          name="email"
          onChange={e => changeFields}
          ref= 
            {
              register({
                required: {value: true, message: 'Email Obligatorio'}
              })
            }
        />
        <label for="email">Email</label>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(logIn)}>
      {inputEmail()}
      <div className="input-field">
        <input 
          type="password" 
          name="password"
          onChange={e => changeFields()}
          ref=
            {
              register({
                requiered: {value:true, message: 'Contraseña Obligatoria'}
              })
            }
        />
        <label for="password">Password</label>
      </div>
      <button
        class="waves-effect btn black waves-dark"
        style={{ width: "100%" }}
      >
        SIGN IN
      </button>
    </form>
  );
};

export default UseFormLogIn;
