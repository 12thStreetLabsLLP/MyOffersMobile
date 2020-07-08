import React from "react";
import { AppearanceProvider } from "react-native-appearance";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { AppLoading, LoadFontsTask, Task } from "./app-loading.component";
import { appMappings, appThemes } from "./app-theming";
import { AppIconsPack } from "./app-icons-pack";
import { StatusBar } from "../components/status-bar.component";
import { SplashImage } from "../components/splash-image.component";
import { AppNavigator } from "../navigation/app.navigator";
import { AppStorage } from "../services/app-storage.service";
import { Mapping, Theme, Theming } from "../services/theme.service";
import { ApolloProvider } from "react-apollo";
import makeApolloClient from "../services/apollo";
import { AsyncStorage, Text, SafeAreaView } from "react-native";
import { signIn, getToken } from "../services/util";
import { setWorldOriginAsync } from "expo/build/AR";

const loadingTasks: Task[] = [
  // Should be used it when running Expo.
  // In Bare RN Project this is configured by react-native.config.js
  () =>
    LoadFontsTask({
      "opensans-regular": require("../assets/fonts/opensans-regular.ttf"),
      "roboto-regular": require("../assets/fonts/roboto-regular.ttf"),
    }),
  () =>
    AppStorage.getMapping(defaultConfig.mapping).then((result) => [
      "mapping",
      result,
    ]),
  () =>
    AppStorage.getTheme(defaultConfig.theme).then((result) => [
      "theme",
      result,
    ]),
];

const defaultConfig: { mapping: Mapping; theme: Theme } = {
  mapping: "eva",
  theme: "light",
};

const App = ({ mapping, theme }): React.ReactElement => {
  const [mappingContext, currentMapping] = Theming.useMapping(
    appMappings,
    mapping
  );
  const [themeContext, currentTheme] = Theming.useTheming(
    appThemes,
    mapping,
    theme
  );

  const [client, setClient] = React.useState(null);

  const fetchSession = async () => {
    // fetch session
    const tokenId = getToken();
    console.log("fetch session and call apollo client");
    let client = "";

    tokenId.then((res) => {
      if (res == null) {
        //Pass app id
        client = makeApolloClient(
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJhZG1pbiIsImh0dHBzOi8vaGFzdXJhLmlvL2p3dC9jbGFpbXMiOnsieC1oYXN1cmEtYWxsb3dlZC1yb2xlcyI6WyJhZG1pbiJdLCJ4LWhhc3VyYS1kZWZhdWx0LXJvbGUiOiJhZG1pbiIsIngtaGFzdXJhLXVzZXItaWQiOiIxIiwieC1oYXN1cmEtb3JnLWlkIjoiMTIzIiwieC1oYXN1cmEtY3VzdG9tIjoiY3VzdG9tLXZhbHVlIn0sImlhdCI6MTU5Mzk2ODA4N30.Wyl0khmTXhhEJM-Qvlq6FLFSLBbYLAS1Telp_bzS1ZA"
        );
      } else {
        //Pass user token
        client = makeApolloClient(res);
      }
      setClient(client);
    });
  };

  React.useEffect(() => {
    fetchSession();
  }, []);

  if (!client) {
    //alert("test 1");
    return <Text>test</Text>;
  } else {
    //alert("test 2");
    return (
      <React.Fragment>
        <IconRegistry icons={[EvaIconsPack, AppIconsPack]} />
        <ApolloProvider client={client}>
          <AppearanceProvider>
            <ApplicationProvider {...currentMapping} theme={currentTheme}>
              <Theming.MappingContext.Provider value={mappingContext}>
                <Theming.ThemeContext.Provider value={themeContext}>
                  <SafeAreaProvider>
                    <StatusBar
                      backgroundColor="#633d66"
                      barStyle="light-content"
                    />
                    <AppNavigator />
                  </SafeAreaProvider>
                </Theming.ThemeContext.Provider>
              </Theming.MappingContext.Provider>
            </ApplicationProvider>
          </AppearanceProvider>
        </ApolloProvider>
      </React.Fragment>
    );
  }
};

const Splash = ({ loading }): React.ReactElement => (
  <SplashImage
    loading={loading}
    source={require("../assets/images/image-splash.png")}
  />
);

export default (): React.ReactElement => (
  <AppLoading
    tasks={loadingTasks}
    initialConfig={defaultConfig}
    placeholder={Splash}
  >
    {(props) => <App {...props} />}
  </AppLoading>
);
