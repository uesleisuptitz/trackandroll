import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import s from "./styles";
import s2 from "../show/styles";
import { useSelector, useDispatch } from "react-redux";
import { COLORS, ICONS } from "../../assets";
import { Modal, Button, ButtonBack } from "../../components";
import { showActions, showsActions } from "../../store/actions";
import { showService } from "../../service";

const ShowsHistoryBanda = () => {
  const dispatch = useDispatch();
  const { history, shows } = useSelector((state) => state.shows);
  const [loading, setLoading] = useState(true);
  const [finishStatus, setStatusFinish] = useState(false);
  const [finishAvaliation, setFinishAvaliation] = useState(0);
  const [showTemp, setShowTemp] = useState({});

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, []);

  const avaliateShow = () => {
    setStatusFinish("finishing");
    showService
      .finishShow(showTemp._id, finishAvaliation)
      .then(({ show: showDB }) => {
        setShowTemp(showDB);
        setStatusFinish("finished");
      })
      .catch(() => setStatusFinish(`error`));
  };

  if (loading)
    return (
      <ActivityIndicator
        style={{ flex: 1, alignSelf: "center" }}
        color={COLORS.yellow}
        size="large"
      />
    );

  return (
    <ScrollView style={s.container}>
      <Modal open={finishStatus ? true : false}>
        {finishStatus === `finishing` && (
          <ActivityIndicator
            style={{ flex: 1, alignSelf: "center", marginVertical: 25 }}
            color={COLORS.yellow}
            size="large"
          />
        )}

        <Text style={[s2.label, s2.giveUpLabel]}>
          {finishStatus === `finishing`
            ? `Estamos publicando sua avaliação. Só um instante...`
            : finishStatus === `error`
            ? `Ocorreu um erro ao tentar publicar sua avaliação. Por favor, tente novamente ou feche e abra o app novamente.`
            : finishStatus === `finished`
            ? `Pronto! Sua avaliação foi publicada. Ficamos gratos por ter ajudado você a participar desse evento. Até mais!`
            : `Que bom que o evento aconteceu! Agora você pode avaliar o responsável, mas lembre-se que a avaliação não pode ser editada!`}
        </Text>
        {finishStatus === `finish` && (
          <View style={s2.starsContainer}>
            {[1, 2, 3, 4, 5].map((n) => (
              <TouchableOpacity key={n} onPress={() => setFinishAvaliation(n)}>
                <Image
                  source={
                    finishAvaliation >= n ? ICONS.star : ICONS.starOutlined
                  }
                  style={s2.star}
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
                    showsActions.setShows(
                      shows.filter((s) => s._id !== showTemp._id)
                    )
                  );
                  dispatch(showsActions.setHistory([...history, showTemp]));
                  dispatch(showActions.setShow(showTemp));
                  setStatusFinish(false);
                  setFinishAvaliation(0);
                } else if (finishStatus === `error`) setStatusFinish(false);
                else avaliateShow();
              }}
              style={s2.finishButton}
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
      {history && history.length > 0 ? (
        history.map((show) => (
          <TouchableOpacity style={s.button} key={show._id}>
            <View style={s.first}>
              <View style={s.header}>
                <Text style={s.title}>{show.nome}</Text>
                <View style={s.circle} />
                <Text style={s.status}>Encerrado</Text>
              </View>
              <Text style={s.desc}>{show.descricao}</Text>
              <Text style={s.data}>
                {new Date(show.data)
                  .toLocaleString()
                  .replace(" ", " às ")
                  .substr(0, 19)}
              </Text>
            </View>

            <View style={s.starContainer}>
              {show.avaliacaoBar ? (
                <>
                  <Text style={s.starLabel}>{show.avaliacaoBar}</Text>
                  <Image source={ICONS.star} />
                </>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    setShowTemp(show);
                    setStatusFinish("finish");
                  }}
                >
                  <Image source={ICONS.starOutlined} />
                </TouchableOpacity>
              )}
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <View style={s.empty}>
          <Text style={s.emptyText}>
            Você ainda não possui shows finalizados. Ao finalizar um show, ele
            irá aparecer aqui!
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

export default ShowsHistoryBanda;
