import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { COLORS } from "../assets";
import { ShowsBand, ShowsHistoryBand, Track } from "../pages";

const Tab = createMaterialTopTabNavigator();

const BandTabs = () => {
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
      <Tab.Screen name="Track" component={Track} />
      <Tab.Screen name="Shows" component={ShowsBand} />
      <Tab.Screen name="Histórico" component={ShowsHistoryBand} />
    </Tab.Navigator>
  );
};

export default BandTabs;
