import React, { useEffect } from "react";
import { StyleSheet, View, Platform } from "react-native";
import { Button, Input, Text } from "@ui-kitten/components";
import { ImageOverlay } from "./extra/image-overlay.component";
import { EmailIcon } from "./extra/icons";
import { KeyboardAvoidingView } from "./extra/3rd-party";
import { withApollo, useApolloClient } from "react-apollo";
import { AsyncStorage } from "react-native";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import makeApolloClient from "../../../services/apollo";
import { getExpoPushToken, signIn } from "../../../services/util";
import Spinner from "react-native-loading-spinner-overlay";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";

export default ({ navigation, route }): React.ReactElement => {
  const [otp, setOTP] = React.useState<string>();
  const { name } = route.params;
  let [Loading, setLoading] = React.useState<boolean>(false);

  const VERIFY_OTP = gql`
    mutation($deviceToken: String!, $name: String!, $verifyCode: String!) {
      customerOTPVerification(
        deviceToken: $deviceToken
        name: $name
        verifyCode: $verifyCode
      ) {
        data
        message
        status
      }
    }
  `;

  const [verifyOTP] = useMutation(VERIFY_OTP);

  const registerForPushNotificationsAsync = async () => {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      alert(finalStatus);
      if (existingStatus !== "granted") {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      try {
        token = (token = await Notifications.getDevicePushTokenAsync()).data;
        alert("device token" + token);
      } catch (e) {
        token = "654C4DB3-3F68-4969-8ED2-80EA16B46EB0";
        alert("fake token" + token);
      }
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  };

  const getPushNotificationPermissions = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== "granted") {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== "granted") {
      return;
    }
    console.log(finalStatus);

    // Get the token that uniquely identifies this device
    console.log(
      "Notification Token: ",
      await Notifications.getExpoPushTokenAsync()
    );
  };

  useEffect(() => {
    getPushNotificationPermissions();
  });

  const onVerifyOTP = (): void => {
    setLoading(true);

    alert(getExpoPushToken());
    alert("get expo token from storage");
    console.log("get expo token from storage");
    getExpoPushToken().then((res) => {
      alert(res);
      console.log(res);
    });

    registerForPushNotificationsAsync().then((deviceToken) => {
      console.log("device Token" + deviceToken);
      console.log("name" + name);
      console.log("otp" + otp);
      verifyOTP({
        variables: {
          deviceToken: deviceToken,
          name: "+91" + name,
          verifyCode: otp,
        },
      }).then(
        (res) => {
          console.log(res);
          let updatedTokenId =
            res.data.customerOTPVerification.data.accessToken;
          let userId = res.data.customerOTPVerification.data.id;
          let roleId = res.data.customerOTPVerification.data.roleId;
          console.log("Got new token");
          console.log(updatedTokenId);
          signIn(updatedTokenId, userId, roleId);
          console.log("saved the new user token");

          makeApolloClient(updatedTokenId);
          setLoading(false);

          navigation.navigate("ProductListing");
        },
        (err) => {
          setLoading(false);

          console.log(err);
          alert("Your verification code is invalid, Please try again.");
        }
      );
    });
  };

  return (
    <KeyboardAvoidingView>
      <Spinner
        visible={Loading}
        textContent={""}
        textStyle={styles.spinnerTextStyle}
      />
      <ImageOverlay
        style={styles.container}
        source={require("./assets/image-background.jpg")}
      >
        <Text style={styles.enterEmailLabel} status="control">
          Please enter your OTP
        </Text>
        <View style={styles.formContainer}>
          <Input
            status="control"
            placeholder="OTP"
            icon={EmailIcon}
            value={otp}
            onChangeText={setOTP}
          />
        </View>
        <Button size="giant" onPress={onVerifyOTP}>
          VERIFY OTP
        </Button>
      </ImageOverlay>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  formContainer: {
    flex: 1,
    justifyContent: "space-between",
    marginTop: 24,
  },
  forgotPasswordLabel: {
    zIndex: 1,
    alignSelf: "center",
    marginTop: 24,
  },
  enterEmailLabel: {
    zIndex: 1,
    alignSelf: "center",
    marginTop: 64,
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
