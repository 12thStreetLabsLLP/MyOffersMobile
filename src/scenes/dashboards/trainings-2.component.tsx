import React from "react";
import { StyleSheet } from "react-native";
import { TopNavigation, TopNavigationAction } from "@ui-kitten/components";
import { SafeAreaLayout } from "../../components/safe-area-layout.component";
import { ArrowIosBackIcon, MenuIcon } from "../../components/icons";
import ContentView from "../../layouts/dashboards/trainings-2";

export const Trainings2Screen = ({ navigation }): React.ReactElement => {
  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction icon={MenuIcon} onPress={navigation.toggleDrawer} />
  );

  return (
    <SafeAreaLayout style={styles.container} insets="top">
      <TopNavigation title="My Offers" leftControl={renderBackAction()} />
      <ContentView navigation={navigation} />
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
