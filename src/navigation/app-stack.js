import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Login, Register, ShowDetails, Splash } from "../pages";
import { useSelector, useDispatch } from "react-redux";
import { auth, userService } from "../service";
import { appActions, userActions } from "../store/actions";
import BandTabs from "./band-tabs";
import { Header } from "../components";
import BarTabs from "./bar-tabs";
import ShowTabs from "./show-tabs";

const { Navigator, Screen } = createStackNavigator();

const Routes = () => {
  const dispatch = useDispatch();
  const app = useSelector((state) => state.app);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!user.email && !app.initialized)
      auth.onAuthStateChanged((user) => {
        if (user) {
          userService
            .getInfoUser()
            .then(({ usuario }) => {
              dispatch(userActions.login(usuario));
              dispatch(appActions.setInitialized(true));
            })
            .catch((e) => {
              dispatch(appActions.setInitialized(true));
            });
        } else dispatch(appActions.setInitialized(true));
      });
  }, []);

  if (!app.initialized) return <Splash />;
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          header: (props) => user.email && <Header {...props} />,
        }}
        initialRouteName="Home"
      >
        {user.email ? (
          <>
            {user.tipo === 2 ? (
              <Screen name="Home" component={BandTabs} />
            ) : (
              <Screen name="Home" component={BarTabs} />
            )}
            <Screen
              name="Show"
              component={user.tipo === 2 ? ShowDetails : ShowTabs}
            />
          </>
        ) : (
          <>
            <Screen name="Login" component={Login} />
            <Screen name="Register" component={Register} />
          </>
        )}
      </Navigator>
    </NavigationContainer>
  );
};

export default Routes;
