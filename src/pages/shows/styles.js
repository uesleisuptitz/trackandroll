import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../assets";

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderColor: COLORS.yellow,
  },
  first: {
    flex: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  title: {
    color: COLORS.black,
    fontWeight: "500",
    fontFamily: FONTS.primary,
    fontSize: 16,
    lineHeight: 19,
  },
  circle: {
    width: 6,
    height: 6,
    borderRadius: 10,
    backgroundColor: COLORS.yellow,
    marginHorizontal: 10,
  },
  status: {
    color: COLORS.yellow,
    fontFamily: FONTS.primary,
    fontSize: 12,
  },
  desc: {
    color: COLORS.gray,
    fontFamily: FONTS.primary,
    fontSize: 12,
  },
  data: {
    color: COLORS.gray,
    fontFamily: FONTS.primary,
    fontSize: 10,
    marginTop: 10,
  },
  last: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  news: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.gray,
    borderRadius: 100,
  },
  newsLabel: {
    color: "white",
    fontSize: 13,
  },
  empty: {
    marginHorizontal: 40,
    marginTop: "50%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    textAlign: "center",
    color: COLORS.gray,
  },
  starContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  starLabel: {
    color: COLORS.yellow,
    marginTop: 1,
    fontSize: 17,
  },
});

export default s;
