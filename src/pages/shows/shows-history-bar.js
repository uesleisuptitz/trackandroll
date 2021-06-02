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
import { useSelector } from "react-redux";
import { COLORS, ICONS } from "../../assets";
import moment from "moment";
import "moment/locale/pt-br";

const ShowsHistoryBar = () => {
  const { history } = useSelector((state) => state.shows);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, []);

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
      {history && history.length > 0 ? (
        history.map((show) => (
          <TouchableOpacity style={s.button} key={show._id}>
            <View style={s.first}>
              <View style={s.header}>
                <Text style={s.title}>{show.nome}</Text>
                <View style={s.circle} />
                <Text style={s.status}>{show.generos[0]}</Text>
                <View style={s.circle} />
                <Text style={s.status}>Encerrado</Text>
              </View>
              <Text style={s.desc}>{show.descricao}</Text>
              <Text style={s.data}>
                {moment(show.data).format(`DD/MM/YYYY [às] HH:mm`)}
              </Text>
            </View>
            <View style={s.starContainer}>
              <Text style={s.starLabel}>{show.avaliacaoBanda}</Text>
              <Image source={ICONS.star} />
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

export default ShowsHistoryBar;
