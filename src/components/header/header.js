import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import s from "./styles";
import { ICONS } from "../../assets";
import { userService } from "../../service";
import { useDispatch, useSelector } from "react-redux";
import { showActions, userActions } from "../../store/actions";
import ShowEdit from "../../pages/show/show-edit";
import EditUserModal from "../edit-user-modal.js/edit-user-modal";
import { Button, ButtonBack, Modal } from "..";

const Header = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const show = useSelector((state) => state.show);
  const [editShow, setEditShow] = useState(false);
  const [editUser, setEditUser] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);

  const backFromShow = () => {
    navigation.goBack();
    dispatch(showActions.setShow({}));
  };

  return (
    <View style={s.container}>
      <ShowEdit open={editShow} onClose={() => setEditShow(false)} />
      <EditUserModal open={editUser} onClose={() => setEditUser(false)} />
      <Modal open={logoutModal} onClose={() => setLogoutModal(false)}>
        <Text style={s.modalText}>Tem certeza que deseja sair?</Text>
        <View style={s.modalButtons}>
          <ButtonBack
            label="Voltar"
            size="small"
            onPress={() => setLogoutModal(false)}
          />
          <Button
            label="Sair"
            size="small"
            onPress={() => {
              setLogoutModal(false);
              userService.signOut();
              dispatch(userActions.logout());
            }}
          />
        </View>
      </Modal>
      {show.nome ? (
        <TouchableOpacity style={s.menu} onPress={backFromShow}>
          <Image source={ICONS.back} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={s.menu} onPress={() => setLogoutModal(true)}>
          <Image source={ICONS.logout} />
        </TouchableOpacity>
      )}
      <Text style={s.text}>{show.nome ? show.nome : user.nome}</Text>
      {show.nome ? (
        <TouchableOpacity style={s.menu} onPress={() => setEditShow(true)}>
          {show.idBar === user._id && !show.finalizado && (
            <Image source={ICONS.edit} />
          )}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={s.menu} onPress={() => setEditUser(true)}>
          <Image source={ICONS.user} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;
