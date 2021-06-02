import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/actions";
import { userService } from "../../service";
import { COLORS, FONTS } from "../../assets";
import { Input, Button, Modal } from "../../components";
const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = () => {
    setLoading(true);
    userService
      .login(email, senha)
      .then(({ uid }) => {
        userService
          .getInfoUser(uid)
          .then((data) => dispatch(userActions.login(data)))
          .catch((e) => {
            setLoading(false);
            setStatus(e);
          });
      })
      .catch((e) => {
        setLoading(false);
        setStatus(e);
      });
  };

  const recoverPass = () => {
    setStatus(`recovering`);
    userService
      .resetPassword(email)
      .then(() => setStatus(`recovered`))
      .catch((e) => setStatus(e));
  };
  const closeModal = () => {
    setEmail(``);
    setStatus(false);
  };

  return (
    <ScrollView>
      <Modal
        open={status !== false}
        contentStyle={s.modalContent}
        onClose={closeModal}
      >
        {status === `recover` ? (
          <>
            <Text style={[s.color, s.modalText]}>
              Qual seu email? Vamos enviar um email para você com o link para
              recuperar sua senha.
            </Text>
            <Input
              value={email}
              onChangeText={(v) => setEmail(v)}
              placeholder={"Seu email"}
              keyboardType="email-address"
              style={s.inputModal}
            />
            <Button
              label={"Enviar"}
              size="small"
              onPress={recoverPass}
              disabled={!email}
            />
          </>
        ) : status === `recovered` ? (
          <>
            <Text style={[s.color, s.modalText]}>
              Pronto! Um email foi enviado para você com o link para recuperar
              sua senha.
            </Text>
            <Button label={"Ok"} size="small" onPress={closeModal} />
          </>
        ) : status === `recovering` ? (
          <>
            <ActivityIndicator
              style={{ flex: 1, alignSelf: "center", marginVertical: 20 }}
              color={COLORS.yellow}
              size="large"
            />
            <Text style={[s.color, s.modalText]}>
              Estamos enviando um email para você. Só um instante...
            </Text>
          </>
        ) : (
          status && (
            <>
              <Text style={[s.color, s.modalText]}>{status}</Text>
              <Button label={"Ok"} size="small" onPress={closeModal} />
            </>
          )
        )}
      </Modal>
      <View style={s.container}>
        <View style={s.banner}>
          <Text style={s.bannerText}>{`Track'n\nRoll`}</Text>
        </View>
        <Input
          value={email}
          onChangeText={(v) => setEmail(v)}
          placeholder={"Seu email"}
          keyboardType="email-address"
        />
        <Input
          secure
          value={senha}
          onChangeText={(v) => setSenha(v)}
          placeholder={"Senha super secreta"}
        />
        <View style={s.legend}>
          <Text style={[s.text, s.color]}>Novo no Track’n Roll? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={[s.text, s.color, s.button]}>Registre-se</Text>
          </TouchableOpacity>
        </View>
        <Button
          loading={loading}
          label={"Entrar"}
          disabled={!email || !senha || email.length < 8 || senha.length < 6}
          onPress={() => handleLogin()}
        />
        <View style={s.recoverPass}>
          <TouchableOpacity onPress={() => setStatus(`recover`)}>
            <Text style={[s.text, s.color, s.button]}>Esqueci minha senha</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;

const s = StyleSheet.create({
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
    fontFamily: FONTS.primary,
  },
  button: {
    fontWeight: "700",
    textDecorationLine: "underline",
  },
  recoverPass: {
    marginTop: 30,
  },
  modalText: {
    textAlign: "center",
    marginBottom: 20,
  },
  modalContent: {
    width: "90%",
  },
  inputModal: {
    width: 280,
  },
});
