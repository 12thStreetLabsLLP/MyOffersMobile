import React from "react";
import { StyleSheet } from "react-native";
import { TopNavigation, TopNavigationAction } from "@ui-kitten/components";
import { SafeAreaLayout } from "../../components/safe-area-layout.component";
import {
  ArrowIosBackIcon,
  BookmarkIcon,
  BookmarkOutlineIcon,
} from "../../components/icons";
import ContentView from "../../layouts/ecommerce/product-details-4";

export const ProductDetails4Screen = ({
  navigation,
  route,
}): React.ReactElement => {
  const [bookmarked, setBookmarked] = React.useState<boolean>(false);

  const onBookmarkActionPress = (): void => {
    setBookmarked(!bookmarked);
  };

  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction icon={ArrowIosBackIcon} onPress={navigation.goBack} />
  );

  const renderBookmarkAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={bookmarked ? BookmarkIcon : BookmarkOutlineIcon}
      onPress={onBookmarkActionPress}
    />
  );

  return (
    <SafeAreaLayout style={styles.container} insets="top">
      <TopNavigation
        titleStyle={styles.topNavigationColor}
        style={styles.topNavigation}
        title="Offer Details"
        leftControl={renderBackAction()}
      />
      <ContentView navigation={navigation} route={route} />
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topNavigation: {
    backgroundColor: "#633d66",
    color: "#FFFFFF",
  },
  topNavigationColor: {
    color: "#FFFFFF",
  },
});
