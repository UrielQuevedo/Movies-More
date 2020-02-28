import { useState } from 'react';

const UseCheckPassword = (postForm) => {
  const [passwordError, changeError] = useState('');

  const checkPassword = (data, e) => {
    if (data.password === data.confirmPassword) {
      postForm(data, e);
      changeError('');
    } else {
      changeError('Passwords do not match');
    }
  }

  return [passwordError, checkPassword];
}

export default UseCheckPassword;