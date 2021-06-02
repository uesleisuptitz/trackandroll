import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { COLORS, FONTS, SHADOW } from "../assets";

const Button = ({
  loading,
  label,
  onPress = () => {},
  style,
  disabled = false,
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
  const getSizeButtonText = () => {
    switch (size) {
      case "small":
        return {
          fontSize: 18,
        };
      default:
        return {
          fontSize: 24,
        };
    }
  };

  let shadow = !disabled ? SHADOW : {};
  const s = StyleSheet.create({
    button: {
      ...getSizeButton(size),
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: disabled ? COLORS.grayLight : COLORS.yellow,
      borderRadius: 5,
      ...shadow,
    },
    text: {
      ...getSizeButtonText(size),
      color: COLORS.white,
      fontFamily: FONTS.secondary,
    },
  });

  return (
    <TouchableOpacity
      style={[s.button, style]}
      {...rest}
      onPress={!disabled ? () => onPress() : () => {}}
    >
      <Text style={s.text}>{loading ? "Carregando..." : label || "Label"}</Text>
    </TouchableOpacity>
  );
};

export default Button;
