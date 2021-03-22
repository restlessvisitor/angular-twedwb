import firebase from "firebase";

export interface AuthListener {
  notifyUserChanged(userCredential: firebase.auth.UserCredential) : void;
}