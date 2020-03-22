const UseLenguage = () => {
  const lenguage = () => {
    const leng =  window.localStorage.getItem('i18nextLng');
    if (leng === undefined) {
      return 'en'
    }
    return leng;
  }

  const changeLenguage = (leng) => {
    window.localStorage.setItem('i18nextLng', leng);
    window.location.reload();
  }

  return [lenguage, changeLenguage];
}
 
export default UseLenguage;