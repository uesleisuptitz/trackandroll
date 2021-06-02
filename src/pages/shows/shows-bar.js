import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import s from "./styles";
import { useSelector, useDispatch } from "react-redux";
import { showService } from "../../service";
import { COLORS } from "../../assets";
import { showActions, showsActions } from "../../store/actions";
import moment from "moment";
import "moment/locale/pt-br";

const ShowsBar = ({ navigation }) => {
  const dispatch = useDispatch();
  const { shows } = useSelector((state) => state.shows);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  useEffect(() => {
    if (!shows || (shows && shows.length === 0))
      showService
        .getMyShows()
        .then((data) => {
          let finalizeds = data.shows.filter((s) => s.finalizado);
          if (finalizeds.length > 0)
            dispatch(showsActions.setHistory(finalizeds));
          dispatch(
            showsActions.setShows(
              data.shows.filter((s) => s.finalizado === false)
            )
          );
          setLoading(false);
        })
        .catch((e) => {
          setError(e);
          setLoading(false);
        });
    else setLoading(false);
  }, [dispatch]);

  const openShow = (show) => {
    dispatch(showActions.setShow(show));
    navigation.navigate("Show");
  };

  if (loading)
    return (
      <ActivityIndicator
        style={{ flex: 1, alignSelf: "center" }}
        color={COLORS.yellow}
        size="large"
      />
    );

  if (error)
    return (
      <View style={s.empty}>
        <Text style={s.emptyText}>{error}</Text>
      </View>
    );

  return (
    <ScrollView style={s.container}>
      {shows && shows.length > 0 ? (
        shows
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .map((show) => (
            <TouchableOpacity
              style={s.button}
              key={show._id}
              onPress={() => openShow(show)}
            >
              <View style={s.first}>
                <View style={s.header}>
                  <Text style={s.title}>{show.nome}</Text>
                  <View style={s.circle} />
                  <Text style={s.status}>{show.generos[0]}</Text>
                  <View style={s.circle} />
                  <Text style={s.status}>
                    {show.fechado ? "Fechado" : "Aberto"}
                  </Text>
                </View>
                <Text style={s.desc}>{show.descricao}</Text>
                <Text style={s.data}>
                  {moment(show.data).format(`DD/MM/YYYY [às] HH:mm`)}
                </Text>
              </View>
              {show.bandas.length > 0 && (
                <View style={s.last}>
                  <View style={s.news}>
                    <Text style={s.newsLabel}>{show.bandas.length}</Text>
                  </View>
                </View>
              )}
            </TouchableOpacity>
          ))
      ) : (
        <View style={s.empty}>
          <Text style={s.emptyText}>
            Você não possui shows em aberto, vá para a aba "Novo" e crie um novo
            show!
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

export default ShowsBar;
