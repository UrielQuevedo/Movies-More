import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const UseCheckPassword = (postForm) => {
  const [passwordError, changeError] = useState('');
  const {t} = useTranslation();  

  const checkPassword = (data, e) => {
    if (data.password === data.confirmPassword) {
      postForm(data, e);
      changeError('');
    } else {
      changeError(t('Passwords do not match'));
    }
  }

  return [passwordError, checkPassword];
}

export default UseCheckPassword;