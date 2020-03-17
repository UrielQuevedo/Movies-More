import { useTranslation } from 'react-i18next';

const UseLenguage = () => {
  const {_, i18n} = useTranslation();

  const lenguage = () => {
    const leng =  window.localStorage.getItem('i18nextLng');
    if (leng === undefined) {
      return 'en'
    }
    return leng;
  }

  const changeLenguage = (leng) => {
    window.localStorage.setItem('i18nextLng', leng);
    i18n.changeLanguage(leng);
  }

  return [lenguage, changeLenguage];
}
 
export default UseLenguage;