import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS, FONTS, SHADOW } from "../../assets";
const Home = () => {
  return (
    <View style={s.container}>
      <Text style={s.text}>{`Track'n\nRoll`}</Text>
    </View>
  );
};

export default Home;

const s = StyleSheet.create({
  container: {
    backgroundColor: COLORS.gray,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 60,
    color: COLORS.white,
    fontFamily: FONTS.secondary,
    textAlign: "center",
    ...SHADOW,
  },
});
