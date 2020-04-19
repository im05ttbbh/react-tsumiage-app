import * as firebase from "firebase/app";
import "firebase/auth";

export const app = firebase.initializeApp({
  apiKey: "AIzaSyBDQhzrAc2MkQytIIupPmlWgQN8V_R2948",
  authDomain: "react-tsumiage-app.firebaseapp.com",
  databaseURL: "https://react-tsumiage-app.firebaseio.com",
  projectId: "react-tsumiage-app",
  storageBucket: "react-tsumiage-app.appspot.com",
  messagingSenderId: "524594779564",
  appId: "1:524594779564:web:767f69e8a875cb3d4bd609"
});

export default app;