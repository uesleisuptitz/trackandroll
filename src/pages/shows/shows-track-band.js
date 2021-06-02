import React, { useEffect, useState } from "react";
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

const ShowsTrackBand = ({ navigation }) => {
  const dispatch = useDispatch();
  const { track } = useSelector((state) => state.shows);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    showService
      .findShows()
      .then(({ shows }) => {
        dispatch(showsActions.setTrack(shows));
        setLoading(false);
      })
      .catch((e) => {
        setError(e);
        setLoading(false);
      });
  }, []);

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
        <Text>{error}</Text>
      </View>
    );
  return (
    <ScrollView style={s.container}>
      {track && track.length > 0 ? (
        track.map((show) => (
          <TouchableOpacity
            style={s.button}
            key={show._id}
            onPress={() => openShow(show)}
          >
            <View style={s.first}>
              <View style={s.header}>
                <Text style={s.title}>{show.nome}</Text>
                <View style={s.circle} />
                <Text style={s.status}>{show.generos.join(",")}</Text>
              </View>
              <Text style={s.desc}>{show.descricao}</Text>
              <Text style={s.data}>
                {moment(show.data).format(`DD/MM/YYYY [às] HH:mm`)}
              </Text>
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <View style={s.empty}>
          <Text style={s.emptyText}>
            Não encontramos shows com seu estilo musical : (
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

export default ShowsTrackBand;
