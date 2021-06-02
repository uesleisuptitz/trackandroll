import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { showService } from "../../service";
import { useSelector, useDispatch } from "react-redux";
import { COLORS, FONTS, ICONS } from "../../assets";
import { Button, ButtonBack, Input, Modal } from "../../components";
import { showActions, showsActions } from "../../store/actions";
import { handleChangeDate, handleChangeTime, musicalTypes } from "../../utils";
import moment from "moment";
import "moment/locale/pt-br";

const ShowEdit = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.show);
  //show data
  const [types, setTypes] = useState(show.generos || []);
  const [date, setDate] = useState(
    show.data ? moment(show.data).format(`DD/MM/YYYY`) : ""
  );
  const [time, setTime] = useState(
    show.data ? moment(show.data).format(`HH:mm`) : ""
  );
  const [name, setName] = useState(show.nome || "");
  const [description, setDescription] = useState(show.descricao || "");
  //control
  const [status, setStatus] = useState(false);

  const onSubmit = () => {
    setStatus("saving");
    let formatedDate = date.split("/");
    formatedDate = `${formatedDate[2]}-${formatedDate[1]}-${formatedDate[0]}`;
    let data = {
      idShow: show._id,
      nome: name,
      descricao: description,
      generos: types,
      data: moment(`${formatedDate}T${time}:00`).toDate().getTime(),
    };
    showService
      .updateShow(data)
      .then(({ show: showDB }) => {
        onClose();
        dispatch(showsActions.replaceShow(showDB));
        dispatch(showActions.setShow(showDB));
      })
      .catch(() => setStatus("error"));
  };

  useEffect(() => {
    if (status === "saved") {
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
      onPress={() => status !== `saving` && setTypes([m])}
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
    <Modal open={open} contentStyle={s.containerModal} onClose={onClose}>
      <Modal open={[`error`, `saved`].includes(status)}>
        <Text style={s.modalText}>
          {status === `error`
            ? `Ocorreu um erro ao tentar alterar seu show. Por favor, tente novamente ou feche e abra o app novamente.`
            : `Show alterado! A data dessa alteração foi salva também.`}
        </Text>
        <Button
          label={"Ok"}
          size="small"
          onPress={
            status === `error` ? () => setStatus(false) : () => onClose()
          }
        />
      </Modal>
      <ScrollView>
        <View style={s.container}>
          <Text style={s.title}>Nome do show</Text>
          <Input
            onChangeText={(v) => status !== `saving` && setName(v)}
            value={name}
            maxLength={25}
          />
          <Text
            style={s.title}
          >{`Que dia vai ser?                   Que horas?`}</Text>
          <View style={s.dateContainer}>
            <Input
              onChangeText={(v) =>
                status !== `saving` &&
                handleChangeDate(v, date, (v2) => setDate(v2))
              }
              value={date}
              maxLength={10}
              placeholder="dd/mm/aaaa"
              style={s.dateInput}
            />
            <Input
              onChangeText={(v) =>
                status !== `saving` &&
                handleChangeTime(v, time, (v2) => setTime(v2))
              }
              value={time}
              maxLength={5}
              placeholder="hh:mm"
              style={s.dateInput}
            />
          </View>
          <Text style={s.title}>
            Fale um pouco mais sobre o que você tem em mente
          </Text>
          <Input
            onChangeText={(v) => status !== `saving` && setDescription(v)}
            value={description}
          />
          <Text style={s.title}>Qual estilo musical você quer ouvir?</Text>
          <View style={[s.radios, s.row]}>
            <View style={s.radioList}>
              {musicalTypes.map((m, i) => i % 2 === 0 && renderRadio(m))}
            </View>
            <View style={s.radioList}>
              {musicalTypes.map((m, i) => i % 2 !== 0 && renderRadio(m))}
            </View>
          </View>
          <View style={s.buttonsContainer}>
            <ButtonBack
              label="Voltar"
              size="small"
              onPress={onClose}
              disabled={status === `saving`}
            />
            <Button
              label={status === `saving` ? "Salvando..." : "Salvar"}
              size="small"
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
        </View>
      </ScrollView>
    </Modal>
  );
};

export default ShowEdit;

const s = StyleSheet.create({
  buttonsContainer: {
    flexDirection: "row",
  },
  containerModal: {
    width: "100%",
    marginTop: "auto",
    height: "80%",
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
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
