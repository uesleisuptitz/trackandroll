import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../assets";

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
export default s;
