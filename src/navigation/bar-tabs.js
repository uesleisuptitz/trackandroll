import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { COLORS, FONTS } from "../assets";
import { ShowsBar, NewShow, ShowsHistoryBar } from "../pages";

const Tab = createMaterialTopTabNavigator();

const BarTabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        indicatorContainerStyle: {
          zIndex: 2,
        },
        indicatorStyle: {
          backgroundColor: "white",
          borderWidth: 2,
          borderColor: "white",
        },
        contentContainerStyle: {
          backgroundColor: COLORS.gray,
        },
        activeTintColor: "white",
        labelStyle: {
          fontSize: 17,
          textTransform: "capitalize",
          margin: 0,
          padding: 0,
          fontFamily: FONTS.primary,
        },
        style: {
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,
          elevation: 3,
        },
      }}
      initialRouteName={"Shows"}
    >
      <Tab.Screen name="Novo" component={NewShow} />
      <Tab.Screen name="Shows" component={ShowsBar} />
      <Tab.Screen name="Histórico" component={ShowsHistoryBar} />
    </Tab.Navigator>
  );
};

export default BarTabs;
