import { auth, errorsCode, axiosApp } from "./";

const login = (email, senha) => {
  return new Promise((resolve, reject) => {
    auth
      .signInWithEmailAndPassword(email, senha)
      .then((data) => resolve(data.user))
      .catch((e) =>
        reject(errorsCode[e.code] || "Erro ao tentar entrar com esse usuário!")
      );
  });
};
const updateUser = (body) => {
  return new Promise((resolve, reject) => {
    axiosApp
      .put(`/usuario`, body)
      .then((resp) => resolve(resp.data))
      .catch((e) =>
        reject(
          errorsCode[e.code] || "Erro ao tentar entrar editar esse usuário!"
        )
      );
  });
};
const resetPassword = (email) => {
  return new Promise((resolve, reject) => {
    auth
      .sendPasswordResetEmail(email)
      .then(() => resolve())
      .catch((e) =>
        reject(
          errorsCode[e.code] ||
            "Ocorreu um erro ao tentar recuperar sua senha. Por favor, tente novamente ou feche e abra o app novamente."
        )
      );
  });
};
const verifyLogin = () =>
  new Promise((resolve) => {
    auth.onAuthStateChanged((user) => {
      if (!user) resolve(false);
      else
        user
          .getIdToken()
          .then((t) => resolve(t))
          .catch(() => resolve(false));
    });
  });
const register = (email, senha) => {
  return new Promise((resolve, reject) => {
    auth
      .createUserWithEmailAndPassword(email, senha)
      .then((data) => resolve(data.user))
      .catch((e) =>
        reject(errorsCode[e.code] || "Erro ao tentar criar esse usuário!")
      );
  });
};
const createUser = (body) => {
  return new Promise((resolve, reject) => {
    axiosApp
      .post(`/usuario`, body)
      .then((resp) => resolve(resp.data))
      .catch((e) =>
        reject(errorsCode[e.code] || "Erro ao tentar cadastrar usuário!")
      );
  });
};
const verifyEmail = (email) => {
  return new Promise((resolve, reject) => {
    auth
      .fetchSignInMethodsForEmail(email)
      .then((data) => {
        if (data.length > 0) {
          reject({ code: "auth/email-already-in-use" });
        } else resolve(data);
      })
      .catch((e) => reject(e));
  });
};
const signOut = () => {
  return new Promise((resolve, reject) => {
    auth
      .signOut()
      .then(() => resolve())
      .catch((e) => reject(e));
  });
};
const getInfoUser = () => {
  return new Promise((resolve, reject) => {
    axiosApp
      .get(`/usuario`)
      .then((resp) => resolve(resp.data))
      .catch((e) => reject(errorsCode[e.code] || "Erro ao encontrar usuário!"));
  });
};
const getInfoOtherUser = (userId) => {
  return new Promise((resolve, reject) => {
    axiosApp
      .post(`/usuario/outro`, { userId })
      .then((resp) => resolve(resp.data))
      .catch((e) => reject(errorsCode[e.code] || "Erro ao encontrar usuário!"));
  });
};
export const userService = {
  login,
  updateUser,
  register,
  verifyEmail,
  createUser,
  signOut,
  getInfoUser,
  verifyLogin,
  getInfoOtherUser,
  resetPassword,
};
