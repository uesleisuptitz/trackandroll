import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { COLORS, FONTS } from "../assets";

const ButtonBack = ({
  label,
  loading,
  onPress,
  disabled,
  style,
  size,
  ...rest
}) => {
  const getSizeButton = () => {
    switch (size) {
      case "small":
        return {
          maxWidth: 320,
          paddingHorizontal: 35,
          height: 35,
        };
      default:
        return {
          width: 320,
          height: 55,
        };
    }
  };

  const s = StyleSheet.create({
    button: {
      ...getSizeButton(),
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "transparent",
      borderRadius: 5,
      opacity: disabled ? 0.8 : 1,
    },
    text: {
      fontSize: 18,
      color: COLORS.gray,
      fontFamily: FONTS.secondary,
    },
  });
  return (
    <TouchableOpacity
      {...rest}
      style={[s.button, style]}
      onPress={() => (!disabled && onPress ? onPress() : {})}
    >
      <Text style={s.text}>{loading ? "Carregando..." : label || "Label"}</Text>
    </TouchableOpacity>
  );
};

export default ButtonBack;
