import { axiosApp } from ".";

const getMyShows = () => {
  return new Promise((resolve, reject) => {
    axiosApp
      .get(`/show`)
      .then((resp) => resolve(resp.data))
      .catch(() => reject("Erro ao tentar listar shows!"));
  });
};
const findShows = (user, generos) => {
  return new Promise((resolve, reject) => {
    axiosApp
      .get(`/show/buscar`, { params: { user, generos } })
      .then((resp) => resolve(resp.data))
      .catch(() => reject("Erro ao tentar buscar shows!"));
  });
};
const createShow = (body) => {
  return new Promise((resolve, reject) => {
    axiosApp
      .post(`/show`, body)
      .then((resp) => resolve(resp.data))
      .catch(() => reject("Erro ao tentar criar show!"));
  });
};
const updateShow = (body) => {
  return new Promise((resolve, reject) => {
    axiosApp
      .put(`/show`, body)
      .then((resp) => resolve(resp.data))
      .catch(() => reject("Erro ao tentar editar o show!"));
  });
};
const enlistBand = (idShow) => {
  return new Promise((resolve, reject) => {
    axiosApp
      .put(`/show/alistar-banda`, { idShow })
      .then((resp) => resolve(resp.data))
      .catch(() => reject("Erro ao tentar criar show!"));
  });
};
const giveUpTheShow = (idShow) => {
  return new Promise((resolve, reject) => {
    axiosApp
      .put(`/show/desistir`, { idShow })
      .then((resp) => resolve(resp.data))
      .catch(() => reject("Erro ao tentar criar show!"));
  });
};
const bandsDetails = (bandas) => {
  return new Promise((resolve, reject) => {
    axiosApp
      .post(`/show/detalhes-bandas`, { bandas })
      .then((resp) => resolve(resp.data))
      .catch(() => reject("Erro ao tentar buscar bandas!"));
  });
};
const selectBands = (body) => {
  return new Promise((resolve, reject) => {
    axiosApp
      .put(`/show/escolher-bandas`, body)
      .then((resp) => resolve(resp.data))
      .catch(() => reject("Erro ao tentar escolher banda(s)!"));
  });
};
const selectBand = (body) => {
  return new Promise((resolve, reject) => {
    axiosApp
      .put(`/show/escolher-banda`, body)
      .then((resp) => resolve(resp.data))
      .catch(() => reject("Erro ao tentar definir banda!"));
  });
};
const finishShow = (idShow, avaliacao) => {
  return new Promise((resolve, reject) => {
    axiosApp
      .put(`/show/avaliar`, { idShow, avaliacao })
      .then((resp) => resolve(resp.data))
      .catch(() => reject("Erro ao tentar avaliar e encerrar evento!"));
  });
};
export const showService = {
  getMyShows,
  findShows,
  createShow,
  enlistBand,
  giveUpTheShow,
  bandsDetails,
  selectBands,
  selectBand,
  updateShow,
  finishShow,
};
