import React from "react";
import { RouteProp } from "@react-navigation/core";
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { LayoutsNavigator } from "./layouts.navigator";
import { ComponentsNavigator } from "./components.navigator";
import { ThemesNavigator } from "./themes.navigator";
import { HomeBottomNavigation } from "../scenes/home/home-bottom-navigation.component";
import { HomeDrawer } from "../scenes/home/home-drawer.component";
import { LibrariesScreen } from "../scenes/libraries/libraries.component";
import { CategoriesScreen } from "../scenes/categories/categories.component";
import { SignIn4Screen } from "../scenes/auth/sign-in-4.component";
import { ProductListingScreen } from "../scenes/dashboards/product-listing.component";
import { AddUserScreen } from "../scenes/auth/add-user.component";
import { UpdateProfileScreen } from "../scenes/auth/update-profile.component";
import { ProductDetails4Screen } from "../scenes/ecommerce/product-details-4.component";
import { ForgotPasswordScreen } from "../scenes/auth/forgot-password.component";
import { OTPVerificationScreen } from "../scenes/auth/otp-verification.component";
import {
  signIn,
  getToken,
  getPermission,
  getUserId,
  setUserId,
  getUserRole,
} from "../services/util";

const BottomTab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

/*
 * When dev is true in .expo/settings.json (started via `start:dev`),
 * open Components tab as default.
 */
const initialTabRoute: string = "Components";

let initialLoginPage: string = "SignIn4";
let role_id: string = "customer";

/*
 * Can we access it from `HomeNavigator`?
 */
const ROOT_ROUTES: string[] = ["Home", "Layouts", "Components", "Themes"];

const isOneOfRootRoutes = (currentRoute: RouteProp<any, any>): boolean => {
  return ROOT_ROUTES.find((route) => currentRoute.name === route) !== undefined;
};

const TabBarVisibleOnRootScreenOptions = ({
  route,
}): BottomTabNavigationOptions => {
  const currentRoute = route.state && route.state.routes[route.state.index];
  return { tabBarVisible: currentRoute && isOneOfRootRoutes(currentRoute) };
};

const tokenId = getToken();

tokenId.then((res) => {
  if (res == null) {
    initialLoginPage = "SignIn4";
  } else {
    initialLoginPage = "ProductListing";
  }
  console.log("home navigator - login screen");
  console.log(initialLoginPage);
});

getPermission().then((res) => {
  role_id = res;
});

const HomeTabsNavigator = (): React.ReactElement => (
  <BottomTab.Navigator
    screenOptions={TabBarVisibleOnRootScreenOptions}
    initialRouteName={initialTabRoute}
    tabBar={(props) => <HomeBottomNavigation {...props} />}
  >
    <BottomTab.Screen name="Layouts" component={LayoutsNavigator} />
    <BottomTab.Screen name="Components" component={ComponentsNavigator} />
    <BottomTab.Screen name="Themes" component={ThemesNavigator} />
  </BottomTab.Navigator>
);

export const HomeNavigator = (): React.ReactElement => (
  <Drawer.Navigator
    screenOptions={{ gestureEnabled: false }}
    drawerContent={(props) => <HomeDrawer role={role_id} {...props} />}
    initialRouteName={initialLoginPage}
  >
    <Drawer.Screen name="Home" component={HomeTabsNavigator} />
    <Drawer.Screen name="Libraries" component={LibrariesScreen} />
    <Drawer.Screen name="Categories" component={CategoriesScreen} />
    <Drawer.Screen name="SignIn4" component={SignIn4Screen} />
    <Drawer.Screen name="SignInUp4" component={AddUserScreen} />
    <Drawer.Screen name="ProductListing" component={ProductListingScreen} />
    <Drawer.Screen name="UpdateProfile" component={UpdateProfileScreen} />
    <Drawer.Screen
      name="ProductDetails4"
      initialParams={{ details: "" }}
      component={ProductDetails4Screen}
    />
    <Drawer.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    <Drawer.Screen
      name="OTPVerification"
      initialParams={{ name: "" }}
      component={OTPVerificationScreen}
    />
  </Drawer.Navigator>
);
