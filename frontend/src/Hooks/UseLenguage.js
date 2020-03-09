import { useTranslation } from 'react-i18next';

const UseLenguage = () => {
  const {_, i18n} = useTranslation();

  const lenguage = () => {
    const leng =  window.localStorage.getItem('lenguage');
    if (leng === null) {
      return 'en'
    }
    return leng;
  }

  const changeLenguage = (leng) => {
    window.localStorage.setItem('lenguage', leng);
    i18n.changeLanguage(leng);
    window.location.reload();
  }

  return [lenguage, changeLenguage];
}
 
export default UseLenguage;