import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";
import s from "./styles";
import { useSelector, useDispatch } from "react-redux";
import { showService, userService } from "../../service";
import { Button, ButtonBack, Modal } from "../../components";
import { showActions, showsActions } from "../../store/actions";
import { COLORS, ICONS } from "../../assets";
import moment from "moment";
import "moment/locale/pt-br";

const ShowDetails = ({ navigation }) => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.show);
  const {
    idBar,
    bandas = [],
    _id,
    data,
    descricao,
    createdAt,
    updatedAt,
    fechado,
    generos = [],
    finalizado = false,
    idBanda,
  } = show;
  const user = useSelector((state) => state.user);
  const isOwner = idBar === user._id;
  const alreadyParticipate =
    (bandas && bandas.includes(user._id)) || idBanda === user._id;
  const { shows, track } = useSelector((state) => state.shows);
  const [bar, setBar] = useState(isOwner ? user : {});
  //controll
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [status, setStatus] = useState(false);
  const [finishStatus, setStatusFinish] = useState(false);
  const [finishAvaliation, setFinishAvaliation] = useState(0);
  const [showTemp, setShowTemp] = useState({});

  useEffect(() => {
    userService.getInfoOtherUser(idBar).then(({ usuario }) => setBar(usuario));
  }, []);

  const enlistBand = () => {
    setModalIsOpen(true);
    setStatus("enlisting");
    showService
      .enlistBand(_id)
      .then(({ show }) => {
        let newShows = [...shows];
        newShows.push(show);
        dispatch(showsActions.setShows(newShows));
        dispatch(showsActions.setTrack(track.filter((s) => s._id !== _id)));
        setStatus("enlisted");
      })
      .catch(() => setStatus("errorEnlist"));
  };

  const giveUpTheShow = () => {
    setStatus("removing");
    showService
      .giveUpTheShow(_id)
      .then(({ show }) => {
        let newShows = [];
        if (shows.length > 0) newShows = shows.filter((s) => s._id !== _id);
        dispatch(showsActions.setShows(newShows));
        if (generos.some((g) => user.generos.includes(g)))
          dispatch(showsActions.setTrack([...track, show]));
        setStatus("removed");
      })
      .catch(() => setStatus("errorGiveUp"));
  };

  const backToShows = () => {
    setStatus(false);
    setModalIsOpen(false);
    navigation.goBack();
    dispatch(showActions.setShow({}));
  };

  const finishShow = () => {
    setStatusFinish("finishing");
    showService
      .finishShow(_id, finishAvaliation)
      .then(({ show: showDB }) => {
        setShowTemp(showDB);
        setStatusFinish("finished");
      })
      .catch(() => setStatusFinish(`error`));
  };

  return (
    <>
      {!isOwner && <View style={s.line} />}
      <Modal open={modalIsOpen}>
        {[`removing`, `enlisting`].includes(status) && (
          <ActivityIndicator
            style={{ flex: 1, alignSelf: "center", marginVertical: 25 }}
            color={COLORS.yellow}
            size="large"
          />
        )}
        <Text style={[s.label, s.giveUpLabel]}>
          {status === "removing"
            ? `Estamos removendo você deste show. Só um instante...`
            : status === `enlisting`
            ? `Estamos adicionando você a este show. Só um instante...`
            : status === "removed"
            ? `Você foi removido desse show!`
            : status === `enlisted`
            ? `Você foi adicionado ao show! Agora é só aguardar o responsável escolher : )`
            : status === "errorGiveUp"
            ? `Ocorreu um erro ao tentar remover você desse show. Por favor, tente novamente ou feche e abra o app novamente!`
            : status === "errorEnlist"
            ? `Ocorreu um erro ao tentar adicionar você a esse show. Por favor, tente novamente ou feche e abra o app novamente!`
            : `Você tem certeza de que deseja desistir desse show? Esta ação não pode ser desfeita, mas você pode se alistar para esse show em outro momento.`}
        </Text>
        {!status ? (
          <View>
            <Button
              size="small"
              label="Desistir"
              style={s.giveUpButton}
              onPress={giveUpTheShow}
            />
            <ButtonBack
              label="Voltar"
              onPress={() => setModalIsOpen(false)}
              size="small"
            />
          </View>
        ) : (
          status &&
          [`removed`, `erro`, `enlisted`].includes(status) && (
            <Button
              size="small"
              label="Ok"
              style={s.giveUpButton}
              onPress={
                [`errorEnlist`, `errorGiveUp`].includes(status)
                  ? () => {
                      setModalIsOpen(false);
                      setStatus(false);
                    }
                  : backToShows
              }
            />
          )
        )}
      </Modal>
      <Modal open={finishStatus ? true : false}>
        {finishStatus === `finishing` && (
          <ActivityIndicator
            style={{ flex: 1, alignSelf: "center", marginVertical: 25 }}
            color={COLORS.yellow}
            size="large"
          />
        )}

        <Text style={[s.label, s.giveUpLabel]}>
          {finishStatus === `finishing`
            ? `Estamos encerrando seu evento e publicando sua avaliação. Só um instante...`
            : finishStatus === `error`
            ? `Ocorreu um erro ao tentar encerrar seu evento. Por favor, tente novamente ou feche e abra o app novamente.`
            : finishStatus === `finished`
            ? `Pronto! Seu evento foi encerrado e agora está na aba "Histórico". Ficamos gratos por ter ajudado você a realizar esse evento. Até mais!`
            : `Que bom que o evento aconteceu! Ao encerrar esse evento você poderá
          avaliar a banda, mas essa ação não pode ser desfeita.`}
        </Text>
        {finishStatus === `finish` && (
          <View style={s.starsContainer}>
            {[1, 2, 3, 4, 5].map((n) => (
              <TouchableOpacity key={n} onPress={() => setFinishAvaliation(n)}>
                <Image
                  source={
                    finishAvaliation >= n ? ICONS.star : ICONS.starOutlined
                  }
                  style={s.star}
                />
              </TouchableOpacity>
            ))}
          </View>
        )}
        {finishStatus !== `finishing` && (
          <>
            <Button
              label={
                finishStatus === `error`
                  ? `Ok`
                  : finishStatus === `finished`
                  ? `Até!`
                  : "Avaliar e encerrar"
              }
              size="small"
              onPress={() => {
                if (finishStatus === `finished`) {
                  dispatch(
                    showsActions.setShows(shows.filter((s) => s._id !== _id))
                  );
                  dispatch(showsActions.setHistory([...history, showTemp]));
                  dispatch(showActions.setShow(showTemp));
                  setStatusFinish(false);
                } else if (finishStatus === `error`) setStatusFinish(false);
                else finishShow();
              }}
              style={s.finishButton}
            />
            {![`finished`, `error`].includes(finishStatus) && (
              <ButtonBack
                label="Voltar"
                size="small"
                onPress={() => setStatusFinish(false)}
              />
            )}
          </>
        )}
      </Modal>
      <ScrollView style={s.container}>
        <Text style={s.title}>Descrição</Text>
        <Text style={s.label}>{descricao}</Text>
        <Text style={s.label}>
          Status:{" "}
          {fechado
            ? alreadyParticipate
              ? `Você foi escolhido! Espere o contato do responsável e bom show!`
              : isOwner
              ? finalizado
                ? `Encerrado`
                : `Fechado`
              : "Outro usuário foi escolhido, mas você ainda tem chance."
            : alreadyParticipate
            ? "Pendente - Aguardando aprovação do responsável"
            : "Aberto"}
        </Text>
        <Text style={s.title}>Data e hora</Text>
        <Text style={s.label}>
          {moment(data).format(`DD/MM/YYYY [às] HH:mm`)}
        </Text>
        {bar.endereco && bar.endereco.length > 0 && (
          <>
            <Text style={s.title}>Endereço</Text>
            <Text style={s.label}>{bar.endereco}</Text>
          </>
        )}
        {bar.infraestrutura && bar.infraestrutura.length > 0 ? (
          <>
            <Text style={s.title}>Infraestrutura</Text>
            <Text style={s.label}>{bar.infraestrutura}</Text>
          </>
        ) : (
          <></>
        )}
        <Text style={s.title}>Gênero</Text>
        <Text style={s.label}>{generos[0]}</Text>
        {bar.nome && bar.nome.length > 0 && (
          <>
            <Text style={s.title}>Criado por:</Text>
            <Text style={s.label}>{bar.nome}</Text>
            <Text style={s.label}>
              {bar.avaliacao ? `${bar.avaliacao} estrelas` : `Sem avaliações`}
            </Text>
            <Text style={s.label}>Email: {bar.email}</Text>
            <Text style={s.label}>Contato: {bar.contato}</Text>
          </>
        )}
        <Text style={s.title}>Criado em:</Text>
        <Text style={s.label}>
          {moment(createdAt).format(`DD/MM/YYYY [às] HH:mm`)}
        </Text>
        <Text style={s.title}>Última alteração:</Text>
        <Text style={s.label}>
          {moment(updatedAt).format(`DD/MM/YYYY [às] HH:mm`)}
        </Text>

        {isOwner ? (
          <></>
        ) : alreadyParticipate ? (
          <ButtonBack
            label={"Desistir desse show"}
            onPress={() => setModalIsOpen(true)}
          />
        ) : (
          <Button
            label={"Quero fazer esse show!"}
            style={s.bandJoinButton}
            onPress={enlistBand}
          />
        )}
      </ScrollView>
      {idBanda && isOwner && !finalizado && (
        <Button
          label={`Encerrar`}
          size="small"
          style={s.buttonFinish}
          onPress={() => setStatusFinish("finish")}
        />
      )}
    </>
  );
};

export default ShowDetails;
