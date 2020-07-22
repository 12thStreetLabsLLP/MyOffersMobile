import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { TopNavigation, TopNavigationAction } from "@ui-kitten/components";
import { SafeAreaLayout } from "../../components/safe-area-layout.component";
import { ArrowIosBackIcon, MenuIcon } from "../../components/icons";
import ContentView from "../../layouts/dashboards/listing/index";
import { getLocation } from "../../services/util";
import Spinner from "react-native-loading-spinner-overlay";

export const ProductListingScreen = ({ navigation }): React.ReactElement => {
  const [L, setL] = React.useState(null);
  const [Loading, setLoading] = React.useState<boolean>(true);

  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction icon={MenuIcon} onPress={navigation.toggleDrawer} />
  );

  const getLocationData = async () => {
    const location = await getLocation();
    if (location) {
      setL(location);
    }
  };

  React.useEffect(() => {
    getLocationData();
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    spinnerTextStyle: {
      color: "#FFF",
    },
    welcome: {
      fontSize: 20,
      textAlign: "center",
      margin: 10,
    },
    instructions: {
      textAlign: "center",
      color: "#333333",
      marginBottom: 5,
    },
  });

  return (
    <SafeAreaLayout style={styles.container} insets="top">
      <TopNavigation title="My Offers" leftControl={renderBackAction()} />
      {L && <ContentView navigation={navigation} gps={L} />}
      {!L && (
        <Spinner
          visible={Loading}
          textContent={""}
          textStyle={styles.spinnerTextStyle}
        />
      )}
    </SafeAreaLayout>
  );
};
