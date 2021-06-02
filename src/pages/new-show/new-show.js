import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { COLORS, FONTS, ICONS } from "../../assets";
import { Button, Input, Modal } from "../../components";
import { handleChangeDate, handleChangeTime, musicalTypes } from "../../utils";
import { showService } from "../../service";
import { useSelector, useDispatch } from "react-redux";
import { showsActions } from "../../store/actions";
import moment from "moment";
import "moment/locale/pt-br";

const NewShow = ({ navigation }) => {
  const dispatch = useDispatch();
  const { shows } = useSelector((state) => state.shows);
  //show data
  const [types, setTypes] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  //control
  const [modal, setModal] = useState(false);
  const [status, setStatus] = useState(false);

  const onSubmit = () => {
    setModal(true);
    setStatus("criando");
    let formatedDate = date.split("/");
    formatedDate = `${formatedDate[2]}-${formatedDate[1]}-${formatedDate[0]}`;
    let data = {
      nome: name,
      descricao: description,
      generos: types,
      data: moment(`${formatedDate}T${time}:00`).toDate().getTime(),
    };
    showService
      .createShow(data)
      .then(({ show }) => {
        setStatus("criado");
        dispatch(showsActions.setShows([...shows, show]));
      })
      .catch(() => setStatus("erro"));
  };
  useEffect(() => {
    if (status === "criado") {
      setName("");
      setTypes([]);
      setDate("");
      setTime("");
      setDescription("");
    }
  }, [status]);

  const renderRadio = (m) => (
    <TouchableOpacity
      key={m}
      style={[s.row, s.radio]}
      onPress={() => setTypes([m])}
    >
      <Image
        source={
          types.includes(m) ? ICONS.radioButtonChecked : ICONS.radioButton
        }
        style={s.radioButton}
      />
      <Text style={[s.radioText]}>{m}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView>
      <Modal
        open={modal}
        onClose={
          ["criado", "erro"].includes(status) ? () => setModal(false) : () => {}
        }
      >
        {status === "criando" ? (
          <>
            <ActivityIndicator
              style={{ flex: 1, alignSelf: "center", marginVertical: 25 }}
              color={COLORS.yellow}
              size="large"
            />
            <Text style={s.modalText}>
              Já estamos criando o seu show. {"\n"}
              Só um instante...
            </Text>
          </>
        ) : status === "criado" ? (
          <>
            <Text style={s.modalText}>
              <Text style={s.bold}>Pronto!</Text>
              {"\n"}
              Seu show foi criado com sucesso! Agora é só esperar que vamos
              encontrar bandas para você!
            </Text>
            <Button
              label="Entendi"
              size="small"
              onPress={() => {
                setModal(false);
                setStatus(false);
                navigation.navigate("Shows");
              }}
            />
          </>
        ) : (
          status === "erro" && (
            <>
              <Text style={s.modalText}>
                <Text style={s.bold}>Ops!</Text>
                {"\n"}
                Ocorreu um erro ao tentar criar seu show. Por favor, tente
                novamente ou feche e abra o app novamente.
              </Text>
              <Button
                label="Ok"
                size="small"
                onPress={() => {
                  setModal(false);
                  setStatus(false);
                }}
              />
            </>
          )
        )}
      </Modal>
      <View style={s.container}>
        <Text style={s.h1}>É hora do show!</Text>
        <Text style={s.title}>Nome do show</Text>
        <Input onChangeText={(v) => setName(v)} value={name} maxLength={25} />
        <Text
          style={s.title}
        >{`Que dia vai ser?                   Que horas?`}</Text>
        <View style={s.dateContainer}>
          <Input
            onChangeText={(v) => handleChangeDate(v, date, (v2) => setDate(v2))}
            value={date}
            maxLength={10}
            placeholder="dd/mm/aaaa"
            style={s.dateInput}
          />
          <Input
            onChangeText={(v) => handleChangeTime(v, time, (v2) => setTime(v2))}
            value={time}
            maxLength={5}
            placeholder="hh:mm"
            style={s.dateInput}
          />
        </View>
        <Text style={s.title}>
          Fale um pouco mais sobre o que você tem em mente
        </Text>
        <Input onChangeText={(v) => setDescription(v)} value={description} />
        <Text style={s.title}>Qual estilo musical você quer ouvir?</Text>
        <View style={[s.radios, s.row]}>
          <View style={s.radioList}>
            {musicalTypes.map((m, i) => i % 2 === 0 && renderRadio(m))}
          </View>
          <View style={s.radioList}>
            {musicalTypes.map((m, i) => i % 2 !== 0 && renderRadio(m))}
          </View>
        </View>
        <Button
          label="Criar show!"
          onPress={onSubmit}
          disabled={
            !name ||
            !description ||
            !types ||
            !date ||
            (date && date.length < 10) ||
            !time ||
            (time && time.length < 5)
          }
        />
      </View>
    </ScrollView>
  );
};

export default NewShow;

const s = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  h1: {
    fontFamily: FONTS.secondary,
    color: COLORS.black,
    fontSize: 24,
  },
  title: {
    width: 320,
    fontFamily: FONTS.primary,
    color: COLORS.black,
    marginBottom: 5,
  },
  row: {
    flexDirection: "row",
  },
  radios: {
    width: 320,
    marginBottom: 30,
  },
  radio: {
    height: 30,
    alignItems: "center",
  },
  radioButton: {
    width: 20,
    height: 20,
  },
  radioList: {
    width: 160,
  },
  radioText: {
    fontSize: 16,
    marginLeft: 8,
    color: COLORS.black,
    fontFamily: FONTS.primary,
  },
  dateContainer: {
    flexDirection: "row",
    width: 320,
    justifyContent: "space-between",
    display: "flex",
  },
  dateInput: {
    minWidth: 150,
    maxWidth: 150,
  },
  timeInput: {
    minWidth: 150,
    maxWidth: 150,
  },
  modalText: {
    textAlign: "center",
    marginBottom: 20,
    fontFamily: FONTS.primary,
    color: COLORS.black,
  },
  bold: {
    fontWeight: "700",
    fontFamily: FONTS.primary,
    color: COLORS.black,
  },
});
