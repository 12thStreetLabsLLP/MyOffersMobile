import React, { useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { TopNavigation, TopNavigationAction } from "@ui-kitten/components";
import { SafeAreaLayout } from "../../components/safe-area-layout.component";
import { MenuIcon, RadiusIcon, DownwardArrow } from "../../components/icons";
import ContentView from "../../layouts/dashboards/listing/index";
import { getLocation } from "../../services/util";
import Spinner from "react-native-loading-spinner-overlay";
import { Card, Input, Modal, Button } from "@ui-kitten/components";

export const ProductListingScreen = ({ navigation }): React.ReactElement => {
  const [L, setL] = React.useState(null);
  const [Loading, setLoading] = React.useState<boolean>(true);
  const [radius, setRadius] = React.useState<any>(10);
  const [radiusText, setRadiusText] = React.useState<any>(10);
  const [visible, setVisible] = React.useState(false);

  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction icon={MenuIcon} onPress={navigation.toggleDrawer} />
  );

  const renderRadiusAction = (): React.ReactElement => (
    <TopNavigationAction icon={RadiusIcon} onPress={openRadiusModel} />
  );

  const renderDownwardAction = (): React.ReactElement => (
    <TopNavigationAction icon={DownwardArrow} onPress={navigateToCategories} />
  );

  const openRadiusModel = () => {
    setVisible(true);
  };

  const navigateToCategories = () => {
    navigation && navigation.navigate("Categories");
  };

  const getLocationData = async () => {
    const location = await getLocation();
    if (location) {
      setL(location);
    }
  };
  const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };
  let radiusShare = radius;
  const setRadiusData = () => {
    //in kms
    setRadius(radiusText);
    setVisible(false);
  };

  React.useEffect(() => {
    alert("listing parent component");
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
    topNavigation: {
      backgroundColor: "#633d66",
      color: "#FFFFFF",
    },
    topNavigationColor: {
      color: "#FFFFFF",
    },
    backdrop: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    formContainer: {
      flex: 1,
      justifyContent: "space-between",
      marginTop: 24,
      marginBottom: 24,
    },
  });

  return (
    <SafeAreaLayout style={styles.container} insets="top">
      {/* <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}
      >
        <Card disabled={true}>
          <View style={styles.formContainer}>
            <Input
              textStyle={{ color: "#999", borderColor: "#999" }}
              placeholder="Set radius in km"
              value={radiusText}
              onChangeText={setRadiusText}
              caption="Specify in KM"
            />
          </View>
          <Button onPress={() => setRadiusData()}>Set</Button>
        </Card>
      </Modal> */}
      <TopNavigation
        titleStyle={styles.topNavigationColor}
        style={styles.topNavigation}
        title="My Offers"
        leftControl={renderBackAction()}
        rightControls={[renderRadiusAction(), renderDownwardAction()]}
      />

      {L && <ContentView navigation={navigation} gps={L} r={radius * 1000} />}

      {/* {L && <ContentView navigation={navigation} gps={L} r={radius * 1000} />} */}
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
