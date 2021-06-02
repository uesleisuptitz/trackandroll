import firebase from "firebase/app";
import "firebase/auth";
import axios from "axios";
import { userService } from "./user.service";
//Criar esse arquivo e preencher com as configs do firebase
import firebaseConfig from "../../firebase-config";

// Initialize Firebase
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
const auth = firebase.auth();

const axiosApp = axios.create({
  //Colocar url do backend criado em node
  baseURL: "http://localhost:5000",
  timeout: 530000,
});

const requestHandler = async (request) => {
  request.headers["Content-Type"] = "application/json;charset=UTF-8";
  request.headers["Access-Control-Allow-Methods"] = "*";
  request.headers["Access-Control-Expose-Headers"] = "Authorization,Location";
  let token = await userService.verifyLogin();
  if (token) request.headers["Authorization"] = `Bearer ${token}`;
  return request;
};
const errorHandler = (error) => error;

[axiosApp].forEach((item) => {
  item.interceptors.request.use(requestHandler, errorHandler);
});

const errorsCode = {
  "auth/invalid-email": "Achamos que esse endereço de email é inválido.",
  "auth/user-disabled": "Este email pertence a um usuário desativado!",
  "auth/user-not-found": "Usuário não encontrado!",
  "auth/wrong-password": "Senha incorreta!",
  "auth/email-already-in-use": "Endereço de email já cadastrado!",
  "auth/operation-not-allowed": "Operação não permitida!",
  "auth/weak-password": "Senha muito fraca! Tente uma mais forte",
};

export { firebase, auth, errorsCode, axiosApp };
export * from "./user.service";
export * from "./show.service";
