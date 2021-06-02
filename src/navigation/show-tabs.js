import React, { useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { COLORS, FONTS } from "../assets";
import { ShowDetails, ShowAcepptedBands, ShowOtherBands } from "../pages";
import { useSelector, useDispatch } from "react-redux";
import { showActions } from "../store/actions";

const Tab = createMaterialTopTabNavigator();

const ShowTabs = () => {
  const dispatch = useDispatch();
  const { bandas } = useSelector((state) => state.show);

  useEffect(() => {
    return () => dispatch(showActions.setShow({}));
  }, []);

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
      <Tab.Screen name="Detalhes" component={ShowDetails} />
      <Tab.Screen name="Aceitas" component={ShowAcepptedBands} />
      <Tab.Screen
        name={`Outras${
          bandas && bandas.length > 0 ? ` (${bandas.length})` : ``
        }`}
        component={ShowOtherBands}
      />
    </Tab.Navigator>
  );
};

export default ShowTabs;
