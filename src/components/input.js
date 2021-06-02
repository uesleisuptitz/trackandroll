import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  Image,
  View,
  TouchableOpacity,
} from "react-native";
import { COLORS, ICONS, FONTS } from "../assets";

const Input = (props) => {
  const [showPassword, setShowPassword] = useState(true);
  const [focus, setFocus] = useState(false);

  return (
    <View>
      <TextInput
        {...props}
        secureTextEntry={props.secure ? showPassword : false}
        style={[
          s.input,
          (props.add || props.secure) && s.paddingRight,
          focus ? s.focus : s.blur,
          props.style,
        ]}
        placeholderTextColor={COLORS.gray}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        autoCapitalize="none"
      />
      {props.add && (
        <TouchableOpacity style={s.button} onPress={() => props.add()}>
          <Image source={ICONS.add} style={s.add} />
        </TouchableOpacity>
      )}
      {props.secure && (
        <TouchableOpacity
          style={s.button}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Image source={showPassword ? ICONS.secure : ICONS.notSecure} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Input;

const s = StyleSheet.create({
  input: {
    width: 320,
    height: 55,
    display: "flex",
    alignItems: "center",
    fontSize: 16,
    fontWeight: "500",
    fontFamily: FONTS.primary,
    color: COLORS.black,
    backgroundColor: "transparent",
    borderRadius: 5,
    marginBottom: 15,
    paddingRight: 16,
    paddingLeft: 16,
  },
  paddingRight: {
    paddingRight: 42,
  },
  focus: {
    borderColor: COLORS.yellow,
    borderWidth: 2,
    color: COLORS.yellow,
  },
  blur: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    color: COLORS.black,
  },
  add: {
    tintColor: COLORS.black,
    width: 20,
    height: 20,
  },
  button: {
    position: "absolute",
    width: 40,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    right: 0,
  },
});
