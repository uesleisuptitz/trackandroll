import React, { useState } from "react";
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/actions";
import { userService, errorsCode } from "../../service";
import { COLORS, ICONS, FONTS, SHADOW } from "../../assets";
import { Input, Button, ButtonBack, Modal } from "../../components";
import { musicalTypes } from "../../utils";

const Register = ({ navigation }) => {
  const dispatch = useDispatch();
  //user
  const [tempUser, setTempUser] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tipo, setTipo] = useState();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  //banda
  const [repertory, setRepertory] = useState([]);
  const [newMusic, setNewMusic] = useState("");
  const [types, setTypes] = useState([]);
  //bar
  const [address, setAddress] = useState("");
  const [infrastructure, setInfrastructure] = useState("");
  //control
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [modal, setModal] = useState(false);
  const [status, setStatus] = useState(false);

  const changeType = (type) => {
    if (types.includes(type)) {
      let newTypes = [];
      types.forEach((t) => t !== type && newTypes.push(t));
      setTypes(newTypes);
    } else setTypes([...types, type]);
  };

  const removeMusic = (value) => {
    let newRepertory = [];
    repertory.forEach((m) => m !== value && newRepertory.push(m));
    setRepertory(newRepertory);
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

  const handleRegister = () => {
    setModal(true);
    setStatus("criando");
    userService
      .register(email, password)
      .then(() => {
        let body = {
          nome: name,
          email,
          contato: phone,
          tipo,
        };
        if (tipo === 1) {
          body.endereco = address;
          body.infraestrutura = infrastructure;
        } else {
          body.generos = types;
          body.repertorio = repertory;
        }
        userService
          .createUser(body)
          .then(({ usuario }) => {
            setStatus("criado");
            setTempUser(usuario);
          })
          .catch(() => setStatus("erro"));
      })
      .catch(() => setStatus("erro"));
  };

  const closeModal = () => {
    if (status === "criado") dispatch(userActions.login(tempUser));
    setModal(false);
    setStatus(false);
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <>
            <Text style={[s.color, s.title]}>
              {`Precisamos de um email e uma \n senha secreta!`}
            </Text>
            <Input
              value={email}
              onChangeText={(v) => setEmail(v)}
              placeholder={"Seu email"}
              keyboardType="email-address"
            />
            <Input
              secure
              value={password}
              onChangeText={(v) => setPassword(v)}
              placeholder={"Senha super secreta"}
            />
            <View style={s.margin1} />
            <Button
              label={"Próximo"}
              disabled={
                !email || !password || (password && password.length < 6)
              }
              onPress={() => {
                setLoading(true);
                userService
                  .verifyEmail(email)
                  .then(() => {
                    setLoading(false);
                    setStep(1);
                  })
                  .catch((error) => {
                    setLoading(false);
                    Alert.alert(
                      "Opps!",
                      errorsCode[error.code] || "Erro ao tentar autenticar!"
                    );
                  });
              }}
            />
            <ButtonBack label={"Voltar"} onPress={() => navigation.goBack()} />
          </>
        );
      case 1:
        return (
          <>
            <Text style={[s.color, s.title]}>
              {`Como você quer ser visto no
Track'n Roll?`}
            </Text>
            <View style={s.options}>
              <TouchableOpacity
                style={[s.option, s.color]}
                onPress={() => {
                  setTipo(2);
                  setStep(2);
                }}
              >
                <Image source={ICONS.guitar} style={s.optionIcon} />
                <Text style={s.optionText}>Banda</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[s.option, s.color]}
                onPress={() => {
                  setTipo(1);
                  setStep(2);
                }}
              >
                <Image source={ICONS.pub} style={s.optionIcon} />
                <Text style={s.optionText}>Bar</Text>
              </TouchableOpacity>
            </View>
            <ButtonBack label={"Voltar"} onPress={() => setStep(0)} />
          </>
        );
      case 2:
        return (
          <>
            <Text style={[s.color, s.title]}>
              {`Precisamos de só mais algumas\ninformações :)`}
            </Text>
            <Text style={[s.inputTitle, s.color]}>
              Qual nome legal quer usar?
            </Text>
            <Input
              placeholder="Nome exibido para outros usuários"
              value={name}
              onChangeText={(v) => setName(v)}
              maxLength={25}
            />
            <Text style={[s.inputTitle, s.color]}>
              Qual telefone ou contato?
            </Text>
            <Input
              placeholder="Seu contato"
              keyboardType={"numeric"}
              value={phone + ""}
              onChangeText={(v) => setPhone(v)}
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
                />
                <Text style={[s.inputTitle, s.color]}>
                  Quer descrever um pouco sua infraestrutura?
                </Text>
                <Input
                  placeholder="Palco com 7m², bateria, caixas de som, etc."
                  value={infrastructure + ""}
                  onChangeText={(v) => setInfrastructure(v)}
                />
              </>
            ) : (
              <>
                <Text style={[s.inputTitle, s.color]}>
                  Qual ou quais seus estilos musicais?
                </Text>
                <View style={[s.radios, s.row]}>
                  <View style={s.radioList}>
                    {musicalTypes.map((m, i) => i % 2 === 0 && renderRadio(m))}
                  </View>
                  <View style={s.radioList}>
                    {musicalTypes.map((m, i) => i % 2 !== 0 && renderRadio(m))}
                  </View>
                </View>
                <Text style={[s.inputTitle, s.color]}>
                  Quer mostrar seu repertório? Liste suas faixas abaixo!
                </Text>
                <View style={s.musics}>
                  {repertory &&
                    repertory.map((r) => (
                      <TouchableOpacity
                        key={r}
                        onPress={() => removeMusic(r)}
                        style={s.music}
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
                  />
                </View>
              </>
            )}
            <Button
              label={"Finalizar"}
              onPress={() => handleRegister()}
              disabled={
                !name || !phone || tipo === 1
                  ? !address
                  : !types || (types && types.length === 0)
              }
            />
            <ButtonBack label={"Voltar"} onPress={() => setStep(1)} />
          </>
        );

      default:
        break;
    }
  };

  return (
    <ScrollView>
      <Modal open={modal}>
        {status === "criando" ? (
          <>
            <ActivityIndicator
              style={{ flex: 1, alignSelf: "center", marginVertical: 25 }}
              color={COLORS.yellow}
              size="large"
            />
            <Text style={s.modalText}>
              Já estamos criando o seu usuário. {"\n"}
              Só um instante...
            </Text>
          </>
        ) : status === "criado" ? (
          <>
            <Text style={s.modalText}>
              <Text style={s.bold}>Bem vindo(a)!</Text>
              {"\n"}
              Seu usuário foi criado com sucesso! Aproveite o app porque é hora
              do show!
            </Text>
            <Button label="Entendido" size="small" onPress={closeModal} />
          </>
        ) : (
          status === "erro" && (
            <>
              <Text style={s.modalText}>
                <Text style={s.bold}>Ops!</Text>
                {"\n"}
                Ocorreu um erro ao tentar criar seu usuário. Por favor, tente
                novamente ou feche e abra o app novamente.
              </Text>
              <Button label="Ok" size="small" onPress={closeModal} />
            </>
          )
        )}
      </Modal>
      <View style={s.container}>
        <View style={s.banner}>
          <Text style={s.bannerText}>{`Track'n\nRoll`}</Text>
        </View>
        {renderStep()}
      </View>
    </ScrollView>
  );
};
export default Register;
export const s = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginBottom: 60,
  },
  color: { color: COLORS.gray, fontFamily: FONTS.primary },
  banner: {
    marginBottom: 30,
    width: "100%",
    backgroundColor: COLORS.gray,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
  },
  bannerText: {
    fontFamily: FONTS.secondary,
    color: "white",
    textAlign: "center",
    fontSize: 50,
  },
  legend: { flexDirection: "row", marginBottom: 15 },
  text: {
    fontSize: 14,
  },
  button: {
    color: "#828282",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  title: {
    fontSize: 22,
    textAlign: "center",
    marginBottom: 25,
    fontFamily: FONTS.secondary,
  },
  options: {
    width: 320,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginBottom: 35,
  },
  option: {
    borderRadius: 5,
    width: 120,
    height: 120,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.yellow,
  },
  optionText: {
    fontSize: 21,
    color: COLORS.white,
    marginTop: 8,
    fontFamily: FONTS.secondary,
  },
  optionIcon: {
    width: 55,
    height: 55,
  },
  inputTitle: {
    fontSize: 14,
    width: 320,
    marginBottom: 5,
  },
  row: {
    flexDirection: "row",
  },
  radios: {
    width: 320,
    marginBottom: 15,
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
  },
  musics: {
    width: 320,
    alignItems: "flex-start",
    marginBottom: 10,
  },
  music: {
    flexDirection: "row",
    backgroundColor: COLORS.gray,
    borderRadius: 5,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10,
    marginVertical: 5,
    marginLeft: 0,
  },
  musicText: {
    color: "white",
    fontFamily: FONTS.primary,
  },
  removeTag: {
    tintColor: "white",
    width: 16,
    height: 16,
    marginHorizontal: 10,
  },
  margin1: {
    marginTop: 30,
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
  },
});
