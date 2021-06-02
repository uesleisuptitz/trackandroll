import React from "react";
import { View, StyleSheet, Modal } from "react-native";
import { SHADOW } from "../../assets";

const ModalComponent = ({
  children,
  open,
  onClose = () => {},
  contentStyle,
}) => {
  return (
    <Modal
      animationType="fade"
      statusBarTranslucent={true}
      transparent={true}
      visible={open}
      onRequestClose={() => onClose()}
    >
      <View style={s.container}>
        <View style={[s.content, contentStyle]}>{children}</View>
      </View>
    </Modal>
  );
};

export default ModalComponent;

const s = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
    flex: 1,
  },
  content: {
    width: 280,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 20,
    ...SHADOW,
  },
});
