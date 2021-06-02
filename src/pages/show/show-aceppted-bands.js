import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import s from "./styles";
import { showService } from "../../service";
import { useSelector, useDispatch } from "react-redux";
import { COLORS } from "../../assets";
import { Button, ButtonBack, Modal } from "../../components";
import { showActions, showsActions } from "../../store/actions";

const ShowAcceptedBands = () => {
  const dispatch = useDispatch();
  const { bandasAceitas = [], _id: idShow, idBanda } = useSelector(
    (state) => state.show
  );
  const [bands, setBands] = useState([]);
  //control
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showTemp, setShowTemp] = useState(false);

  useEffect(() => {
    showService
      .bandsDetails([...bandasAceitas, idBanda])
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
  }, [bandasAceitas]);

  const selectBand = (idBand) => {
    setStatus("selecting");
    showService
      .selectBand({ idBanda: idBand, idShow })
      .then(({ show }) => {
        setShowTemp(show);
        setStatus("selected");
      })
      .catch(() => setStatus("errorSelected"));
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

  const renderBand = ({
    _id,
    nome,
    avaliacao,
    avaliacoes = [],
    generos = [],
    contato,
    email,
  }) => (
    <View
      style={[s.bandContainer, _id === idBanda && s.bandSelected]}
      key={_id}
    >
      <View style={s.bandDetail}>
        <View style={s.bandTitleContainer}>
          <Text style={[s.label, s.bandTitle]}>{nome}</Text>
          {_id === idBanda && (
            <>
              <View style={s.circle} />
              <Text style={s.status}>Escolhida</Text>
            </>
          )}
        </View>
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
        {_id !== idBanda && (
          <Button
            label="Fechar!"
            size="small"
            onPress={() => selectBand(_id)}
          />
        )}
        <ButtonBack
          label="Rejeitar"
          size="small"
          style={s.bandBottomButton}
          onPress={() => rejectBand(_id)}
        />
      </View>
    </View>
  );

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
  ) : bands.length > 0 ? (
    <ScrollView>
      <Modal open={status !== false}>
        {[`selecting`, `rejecting`].includes(status) && (
          <ActivityIndicator
            style={{ flex: 1, alignSelf: "center", marginVertical: 20 }}
            color={COLORS.yellow}
            size="large"
          />
        )}
        <Text style={[s.label, s.giveUpLabel]}>
          {status === `selecting`
            ? `Estamos definindo essa banda como a escolhida. Só um instante...`
            : status === `rejecting`
            ? `Estamos movendo essa banda para a fila de bandas rejeitadas. Só um instante...`
            : status === `errorSelected`
            ? `Ocorreu um erro ao tentar escolher essa banda. Por favor, tente novamente ou feche e abra o app novamente.`
            : status === `errorRejected`
            ? `Ocorreu um erro ao tentar rejeitar essa banda. Por favor, tente novamente ou feche e abra o app novamente.`
            : status === `selected`
            ? `Banda escolhida! Bom evento! Não esqueça de finalizar o show para poder avaliar a banda ; )`
            : status === `rejected` &&
              `Banda rejeitada! Caso queira, você ainda pode aceitar ela.`}
        </Text>
        {![`selecting`, `rejecting`].includes(status) && (
          <Button
            label="Ok"
            size="small"
            onPress={() => {
              if ([`selected`, `rejected`].includes(status)) {
                dispatch(showActions.setShow(showTemp));
                dispatch(showsActions.replaceShow(showTemp));
              }
              setStatus(false);
            }}
            style={s.modalButton}
          />
        )}
      </Modal>
      {idBanda &&
        bands.filter((b) => b._id === idBanda).map((band) => renderBand(band))}
      {bands.filter((b) => b._id !== idBanda).map((band) => renderBand(band))}
    </ScrollView>
  ) : (
    <View style={s.errorContainer}>
      <Text style={[s.label, s.giveUpLabel]}>
        Esse evento não possui bandas aceitas. Cheque a aba "Outras", pois ela
        pode estar com bandas pendentes de aprovação.
      </Text>
    </View>
  );
};

export default ShowAcceptedBands;
