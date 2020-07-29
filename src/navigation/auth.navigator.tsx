import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { AuthScreen } from "../scenes/auth/auth.component";
import { AuthGridScreen } from "../scenes/auth/auth-grid.component";
import { AuthListScreen } from "../scenes/auth/auth-list.component";

import { SignIn4Screen } from "../scenes/auth/sign-in-4.component";

import { AddUserScreen } from "../scenes/auth/add-user.component";
import { UpdateUserScreen } from "../scenes/auth/update-profile.component";
import { ForgotPasswordScreen } from "../scenes/auth/forgot-password.component";
import { OTPVerificationScreen } from "../scenes/auth/otp-verification.component";

const TopTab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const AuthMenuNavigator = (): React.ReactElement => (
  <TopTab.Navigator tabBar={(props) => <AuthScreen {...props} />}>
    <TopTab.Screen name="AuthGrid" component={AuthGridScreen} />
    <TopTab.Screen name="AuthList" component={AuthListScreen} />
  </TopTab.Navigator>
);

export const AuthNavigator = ({ client }): React.ReactElement => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="Auth" component={AuthMenuNavigator} />

    <Stack.Screen name="SignIn4" component={SignIn4Screen} />

    <Stack.Screen name="SignUp4" component={AddUserScreen} />
    <Stack.Screen name="UpdateUser" component={UpdateUserScreen} />
    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} />
  </Stack.Navigator>
);
