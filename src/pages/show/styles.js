import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../assets";

const s = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontFamily: FONTS.primary,
    color: COLORS.yellow,
    marginTop: 20,
  },
  label: {
    fontSize: 14,
    fontFamily: FONTS.primary,
    color: COLORS.gray,
  },
  line: {
    borderTopWidth: 10,
    borderColor: COLORS.gray,
  },
  bandJoinButton: {
    marginVertical: 30,
  },
  giveUpLabel: {
    textAlign: "center",
  },
  giveUpButton: {
    marginTop: 15,
    width: 120,
    margin: 0,
    alignSelf: "center",
  },
  bandsListButton: {
    marginTop: 20,
  },
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionTitle: {
    textAlign: "center",
    color: "gray",
    padding: 8,
    fontSize: 16,
  },
  bandContainer: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderColor: COLORS.yellow,
    justifyContent: "space-between",
  },
  buttonsContainer: {
    justifyContent: "flex-end",
  },
  bandDetail: {
    maxWidth: 220,
  },
  bandBottomButton: {
    marginTop: 5,
  },
  bandTitle: {
    color: COLORS.black,
    fontWeight: "500",
    fontFamily: FONTS.primary,
    fontSize: 16,
    lineHeight: 19,
  },
  modalButton: { marginTop: 20 },
  bandSelected: {
    backgroundColor: COLORS.white,
    marginHorizontal: 0,
    paddingHorizontal: 15,
    borderBottomWidth: 0,
  },
  status: {
    color: COLORS.yellow,
    fontSize: 12,
  },
  circle: {
    width: 6,
    height: 6,
    borderRadius: 10,
    backgroundColor: COLORS.yellow,
    marginHorizontal: 10,
  },
  bandTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonFinish: {
    position: "absolute",
    right: 20,
    bottom: 20,
  },
  starsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
  },
  star: {
    width: 30,
    height: 30,
  },
  finishButton: {
    marginTop: 20,
  },
});

export default s;
