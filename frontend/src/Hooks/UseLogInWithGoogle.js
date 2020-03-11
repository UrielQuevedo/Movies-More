import firebase from "../Initializers/firebase";
import APIAUTH from '../Route/ApiAuth';
import { logIn } from '../localhostFunctions';
import UseCustomAPI from "./UseCustomAPI";

const UseLogInWithGoogle = () => {
  const [response, executeAPI] = UseCustomAPI();
  const { loading  } = response;

  const singInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(response => {
        const user = response.user;
        const userData = { uid: user.uid, photoURL: user.photoURL, email: user.email, nickname: user.displayName }
        user.getIdToken(true)
          .then(idToken => executeAPI({ API: APIAUTH, type:'post', path:'/user/googleLogIn', body: userData, idToken: idToken, externalFunction: logIn }))
          .catch(error => console.log(error));
      });
  };

  return [loading, singInWithGoogle];
}
 
export default UseLogInWithGoogle;