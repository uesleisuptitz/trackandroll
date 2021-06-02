import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { userService } from "../../service";
import { useSelector, useDispatch } from "react-redux";
import { ICONS } from "../../assets";
import { Button, ButtonBack, Input, Modal } from "../../components";
import { userActions } from "../../store/actions";
import { musicalTypes } from "../../utils";
import { s } from "../../pages/register/register";
import s2 from "./styles";

const EditUserModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const tipo = user.tipo;
  //user data
  const [tempUser, setTempUser] = useState();
  const [name, setName] = useState(user.nome || "");
  const [phone, setPhone] = useState(user.contato || "");
  //banda
  const [types, setTypes] = useState(user.generos || []);
  const [repertory, setRepertory] = useState(user.repertorio || []);
  const [newMusic, setNewMusic] = useState("");
  //bar
  const [address, setAddress] = useState(user.endereco || "");
  const [infrastructure, setInfrastructure] = useState(
    user.infraestrutura || ""
  );
  //control
  const [status, setStatus] = useState(false);

  const onSubmit = () => {
    setStatus("saving");
    let body = {
      nome: name,
      contato: phone,
    };
    if (tipo === 1) {
      body.endereco = address;
      body.infraestrutura = infrastructure;
    } else {
      body.generos = types;
      body.repertorio = repertory;
    }
    userService
      .updateUser(body)
      .then(({ usuario }) => {
        setStatus("saved");
        setTempUser(usuario);
      })
      .catch(() => setStatus("error"));
  };

  const changeType = (type) => {
    if (types.includes(type)) {
      let newTypes = [];
      types.forEach((t) => t !== type && newTypes.push(t));
      setTypes(newTypes);
    } else setTypes([...types, type]);
  };

  const renderRadio = (m) => (
    <TouchableOpacity
      key={m}
      style={[s.row, s.radio]}
      onPress={() => changeType(m)}
    >
      <Image
        source={
          types.includes(m) ? ICONS.radioButtonChecked : ICONS.radioButton
        }
        style={s.radioButton}
      />
      <Text style={[s.radioText, s.color]}>{m}</Text>
    </TouchableOpacity>
  );

  const closeModal = () => {
    onClose();
    dispatch(userActions.login(tempUser));
    setStatus(false);
  };

  return (
    <Modal
      open={open}
      contentStyle={s2.containerModal}
      onClose={status === `saving` ? () => {} : onClose}
    >
      <Modal open={[`error`, `saved`].includes(status)}>
        <Text style={s2.modalText}>
          {status === `error`
            ? `Ocorreu um erro ao tentar alterar seu show. Por favor, tente novamente ou feche e abra o app novamente.`
            : `Usuário alterado! Seus dados foram atualizados, bons shows!`}
        </Text>
        <Button
          label={"Ok"}
          size="small"
          onPress={
            status === `error` ? () => setStatus(false) : () => closeModal()
          }
        />
      </Modal>
      <ScrollView>
        <View style={s2.container}>
          <Text style={[s.inputTitle, s.color]}>Nome de usuário</Text>
          <Input
            placeholder="Nome exibido para outros usuários"
            value={name}
            onChangeText={(v) => setName(v)}
            maxLength={25}
          />
          <Text style={[s.inputTitle, s.color]}>Telefone ou contato</Text>
          <Input
            placeholder="Seu contato"
            keyboardType={"numeric"}
            value={phone + ""}
            onChangeText={(v) => setPhone(v)}
            disabled={status === `saving`}
          />
          {tipo === 1 ? (
            <>
              <Text style={[s.inputTitle, s.color]}>
                Qual endereço do estabelecimento?
              </Text>
              <Input
                placeholder="Rua, número, bairro, cidade e estado"
                value={address + ""}
                onChangeText={(v) => setAddress(v)}
                disabled={status === `saving`}
              />
              <Text style={[s.inputTitle, s.color]}>
                Quer descrever um pouco sua infraestrutura?
              </Text>
              <Input
                placeholder="Palco com 7m², bateria, caixas de som, etc."
                value={infrastructure + ""}
                onChangeText={(v) => setInfrastructure(v)}
                disabled={status === `saving`}
              />
            </>
          ) : (
            <>
              <Text style={[s.inputTitle, s.color]}>Estilos musicais</Text>
              <View style={[s.radios, s.row]}>
                <View style={s.radioList}>
                  {musicalTypes.map((m, i) => i % 2 === 0 && renderRadio(m))}
                </View>
                <View style={s.radioList}>
                  {musicalTypes.map((m, i) => i % 2 !== 0 && renderRadio(m))}
                </View>
              </View>
              <Text style={[s.inputTitle, s.color]}>
                Repertório. Liste suas faixas abaixo:
              </Text>
              <View style={s.musics}>
                {repertory &&
                  repertory.map((r) => (
                    <TouchableOpacity
                      key={r}
                      onPress={() => removeMusic(r)}
                      style={s.music}
                      disabled={status === `saving`}
                    >
                      <Text style={s.musicText}>{r}</Text>
                      <TouchableOpacity>
                        <Image source={ICONS.removeTag} style={s.removeTag} />
                      </TouchableOpacity>
                    </TouchableOpacity>
                  ))}
              </View>
              <View style={[s.radios, s.row]}>
                <Input
                  value={newMusic + ""}
                  placeholder="Nova música"
                  onChangeText={(value) => setNewMusic(value)}
                  add={() => {
                    if (newMusic) {
                      setRepertory([...repertory, newMusic]);
                      setNewMusic("");
                    }
                  }}
                  disabled={status === `saving`}
                />
              </View>
            </>
          )}
          <View style={s2.buttonsContainer}>
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
                status === `saving` || !name || !phone || tipo === 1
                  ? !address
                  : !types || (types && types.length === 0)
              }
            />
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default EditUserModal;
