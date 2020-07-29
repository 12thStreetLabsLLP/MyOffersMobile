import React from "react";
import { StyleSheet, View } from "react-native";
import {
  Avatar,
  Divider,
  Drawer,
  DrawerElement,
  DrawerHeaderElement,
  DrawerHeaderFooter,
  DrawerHeaderFooterElement,
  Layout,
  MenuItemType,
  Text,
} from "@ui-kitten/components";
import {
  BookIcon,
  TrendingIcon,
  UserAddIcon,
  UserUpdateIcon,
} from "../../components/icons";
import { SafeAreaLayout } from "../../components/safe-area-layout.component";
import { WebBrowserService } from "../../services/web-browser.service";
import { AppInfoService } from "../../services/app-info.service";
import {
  getPermission,
  getUserId,
  getUserRole,
  setRole,
} from "../../services/util";

const version: string = AppInfoService.getVersion();

export const HomeDrawer = ({ navigation, role }): DrawerElement => {
  let DATA: MenuItemType[] = [
    { title: "My Offers", icon: TrendingIcon },
    { title: "Update Profile", icon: UserUpdateIcon },
  ];

  if (role == "admin") {
    DATA.push({ title: "Add Users", icon: UserAddIcon });
  }

  const onItemSelect = (index: number): void => {
    switch (index) {
      case 0: {
        navigation.toggleDrawer();
        navigation.navigate("ProductListing");
        return;
      }
      case 1: {
        navigation.toggleDrawer();
        navigation.navigate("UpdateProfile");
        return;
      }
      case 2: {
        navigation.toggleDrawer();
        navigation.navigate("SignInUp4");
        return;
      }
    }
  };

  const renderHeader = (): DrawerHeaderElement => (
    <Layout style={styles.header} level="2">
      <View style={styles.profileContainer}>
        <Avatar
          size="giant"
          source={require("../../assets/images/image-app-icon.png")}
        />
        {/* <Text style={styles.profileName} category="h6">
          My Offer
        </Text> */}
      </View>
    </Layout>
  );

  const renderFooter = (): DrawerHeaderFooterElement => (
    <React.Fragment>
      <Divider />
      <DrawerHeaderFooter
        disabled={true}
        description={`Version ${AppInfoService.getVersion()}`}
      />
    </React.Fragment>
  );

  return (
    <SafeAreaLayout style={styles.safeArea} insets="top">
      <Drawer
        header={renderHeader}
        footer={renderFooter}
        data={DATA}
        onSelect={onItemSelect}
      />
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    height: 128,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileName: {
    marginHorizontal: 16,
  },
});
