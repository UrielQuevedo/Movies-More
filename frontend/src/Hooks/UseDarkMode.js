import { useEffect } from "react";
import { useState } from "react";
import { darkTheme, lightTheme } from "../Styled/theme";

const UseDarkMode = () => {
  const [isDarkThemeActive, setIsDarkThemeActive] = useState(JSON.parse(window.localStorage.getItem('isDarkTheme')));

  useEffect(() => {
    const isDark = JSON.parse(window.localStorage.getItem('isDarkTheme'));
    if (isDark === null) {
      window.localStorage.setItem('isDarkTheme', true);
      setIsDarkThemeActive(true);
    }
  }, []);

  const actualTheme = () => {
    return isDarkThemeActive ? darkTheme : lightTheme;
  }

  const changeTheme = (f) => {
    const isDark = JSON.parse(window.localStorage.getItem('isDarkTheme'));
    window.localStorage.setItem('isDarkTheme', !isDark);
    setIsDarkThemeActive(!isDark);
    const actualTheme = isDark ? lightTheme : darkTheme;
    f(actualTheme);
  }

  return [actualTheme, isDarkThemeActive, changeTheme];
}
 
export default UseDarkMode;