import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../assets";

const s = StyleSheet.create({
  container: {
    backgroundColor: COLORS.gray,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 10,
  },
  menu: {
    width: 50,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
  text: {
    fontFamily: FONTS.primary,
    fontSize: 20,
    color: "white",
  },
  modalText: {
    textAlign: "center",
    marginBottom: 20,
    fontFamily: FONTS.primary,
    color: COLORS.black,
  },
  modalButtons: {
    flexDirection: "row",
  },
});

export default s;
