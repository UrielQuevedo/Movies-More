import { useState } from "react";

const UseSelectedGenre = () => {
  const [selectedGenre, setSelectedGenre] = useState({genre:'default'});

  const changeGenre = (genre) => {
    setSelectedGenre({ genre: genre });
    console.log(selectedGenre)
  }
  
  return [selectedGenre, changeGenre];
}
 
export default UseSelectedGenre;