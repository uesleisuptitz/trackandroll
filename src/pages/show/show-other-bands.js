import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import s from "./styles";
import { showService } from "../../service";
import { useSelector, useDispatch } from "react-redux";
import { COLORS } from "../../assets";
import { Button, ButtonBack, Modal } from "../../components";
import { showActions, showsActions } from "../../store/actions";

const ShowOtherBands = () => {
  const dispatch = useDispatch();
  const { bandas = [], bandasRejeitadas = [], _id: idShow } = useSelector(
    (state) => state.show
  );
  const [bands, setBands] = useState([]);
  //control
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showTemp, setShowTemp] = useState(false);

  useEffect(() => {
    if (bandas.length > 0 || bandasRejeitadas.length > 0)
      showService
        .bandsDetails([...bandas, ...bandasRejeitadas])
        .then((resp) => {
          setBands(resp.bandas);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
          setError(
            `Ocorreu um erro ao tentar buscar as bandas. Por favor, tente novamente ou feche e abra o app novamente.`
          );
        });
    else setLoading(false);
  }, [bandas, bandasRejeitadas]);

  const acceptBand = (idBand) => {
    setStatus("aceppting");
    showService
      .selectBands({ aceitas: [idBand], idShow })
      .then(({ show }) => {
        setShowTemp(show);
        setStatus("accepted");
      })
      .catch(() => setStatus("errorAccepted"));
  };

  const rejectBand = (idBand) => {
    setStatus("rejecting");
    showService
      .selectBands({ rejeitadas: [idBand], idShow })
      .then(({ show }) => {
        setShowTemp(show);
        setStatus("rejected");
      })
      .catch(() => setStatus("errorRejected"));
  };

  const renderBand = (
    { _id, nome, avaliacao, avaliacoes = [], generos = [], contato, email },
    rejected
  ) => (
    <View style={s.bandContainer} key={_id}>
      <View style={s.bandDetail}>
        <Text style={[s.label, s.bandTitle]}>{nome}</Text>
        {avaliacao && <Text style={s.label}>{avaliacao} estrela(s)</Text>}
        {avaliacoes.length > 0 && (
          <Text style={s.label}>{avaliacoes} shows</Text>
        )}
        {contato && <Text style={s.label}>{contato}</Text>}
        {email && <Text style={s.label}>{email}</Text>}
        {generos.length > 0 && (
          <Text style={s.label}>Estilo(s): {generos.join(", ")}</Text>
        )}
      </View>
      <View style={s.buttonsContainer}>
        <Button label="Aceitar" size="small" onPress={() => acceptBand(_id)} />
        {!rejected && (
          <ButtonBack
            label="Rejeitar"
            size="small"
            style={s.bandBottomButton}
            onPress={() => rejectBand(_id)}
          />
        )}
      </View>
    </View>
  );

  const rejecteds =
    bands.length > 0
      ? bands.filter((b) => bandasRejeitadas.includes(b._id))
      : [];
  const pending =
    bands.length > 0 ? bands.filter((b) => bandas.includes(b._id)) : [];

  return loading ? (
    <ActivityIndicator
      style={{ flex: 1, alignSelf: "center" }}
      color={COLORS.yellow}
      size="large"
    />
  ) : error ? (
    <View style={s.errorContainer}>
      <Text style={[s.label, s.giveUpLabel]}>{error}</Text>
    </View>
  ) : rejecteds.length > 0 || pending.length > 0 ? (
    <ScrollView>
      <Modal open={status !== false}>
        {[`aceppting`, `rejecting`].includes(status) && (
          <ActivityIndicator
            style={{ flex: 1, alignSelf: "center", marginVertical: 20 }}
            color={COLORS.yellow}
            size="large"
          />
        )}
        <Text style={[s.label, s.giveUpLabel]}>
          {status === `aceppting`
            ? `Estamos movendo essa banda para a fila de bandas aceitas. Só um instante...`
            : status === `rejecting`
            ? `Estamos movendo essa banda para a fila de bandas rejeitadas. Só um instante...`
            : status === `errorAccepted`
            ? `Ocorreu um erro ao tentar aceitar essa banda. Por favor, tente novamente ou feche e abra o app novamente.`
            : status === `errorRejected`
            ? `Ocorreu um erro ao tentar rejeitar essa banda. Por favor, tente novamente ou feche e abra o app novamente.`
            : status === `accepted`
            ? `Banda aceita! Agora ela está localizada na aba "Aceitas".`
            : status === `rejected` &&
              `Banda rejeitada! Caso queira, você ainda pode aceitar ela.`}
        </Text>
        {![`aceppting`, `rejecting`].includes(status) && (
          <Button
            label="Ok"
            size="small"
            onPress={() => {
              if ([`accepted`, `rejected`].includes(status)) {
                dispatch(showActions.setShow(showTemp));
                dispatch(showsActions.replaceShow(showTemp));
              }
              setStatus(false);
            }}
            style={s.modalButton}
          />
        )}
      </Modal>
      <>
        {pending.length > 0 && (
          <>
            <Text style={[s.label, s.sectionTitle]}>Pendentes</Text>
            {pending.map((band) => renderBand(band))}
          </>
        )}
        {rejecteds.length > 0 && (
          <>
            <Text style={[s.label, s.sectionTitle]}>Rejeitadas</Text>
            {rejecteds.map((band) => renderBand(band, true))}
          </>
        )}
      </>
    </ScrollView>
  ) : (
    <View style={s.errorContainer}>
      <Text style={[s.label, s.giveUpLabel]}>
        Esse evento não possui bandas pendentes de aprovação ou rejeitadas.
      </Text>
    </View>
  );
};

export default ShowOtherBands;
