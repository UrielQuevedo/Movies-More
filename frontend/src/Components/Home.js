import React, { useContext } from "react";
import { UserContext } from "../Hooks/UserContext";

const Home = () => {
  const {user, setUser} = useContext(UserContext);
  console.log(user);

  return (
    <div>
      LOGEASTE
    </div>
  );
};

export default Home;
