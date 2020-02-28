import { useState } from 'react';

const UseCheckPassword = (postForm) => {
  const [errorPassword, changeError] = useState('');

  const checkPassword = (data, e) => {
    if (data.password === data.confirmPassword) {
      postForm(data, e);
      changeError('');
    } else {
      changeError('');
    }
  }

  return [errorPassword, checkPassword];
}

export default UseCheckPassword;