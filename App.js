import React from "react";
import { Provider } from "react-redux";
import { store } from "./src/store";
import AppStack from "./src/navigation/app-stack";
import {
  StatusBar,
  SafeAreaView,
  StyleSheet,
  View,
  Platform,
} from "react-native";
import { COLORS } from "./src/assets";

const App = () => {
  const MyStatusBar = ({ backgroundColor, ...props }) => (
    <View style={[s.statusBar, { backgroundColor }]}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );

  return (
    <Provider store={store}>
      <MyStatusBar barStyle="light-content" backgroundColor={COLORS.gray} />
      <SafeAreaView style={s.container}>
        <AppStack />
      </SafeAreaView>
    </Provider>
  );
};

export default App;
const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === "ios" ? 44 : 56;
const s = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  appBar: {
    backgroundColor: "#79B45D",
    height: APPBAR_HEIGHT,
  },
});
