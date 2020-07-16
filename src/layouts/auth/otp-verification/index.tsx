import React from "react";
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
import { getToken, signIn } from "../../../services/util";
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
        token = (await Notifications.getExpoPushTokenAsync()).data;
      } catch (e) {
        token = "654C4DB3-3F68-4969-8ED2-80EA16B46EB0";
      }
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      // Notifications.setNotificationChannelAsync("default", {
      //   name: "default",
      //   importance: Notifications.AndroidImportance.MAX,
      //   vibrationPattern: [0, 250, 250, 250],
      //   lightColor: "#FF231F7C",
      // });
    }

    return token;
  };

  const onVerifyOTP = (): void => {
    setLoading(true);

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
          console.log("Got new token");
          console.log(updatedTokenId);
          signIn(updatedTokenId);
          console.log("saved the new user token");

          makeApolloClient(updatedTokenId);
          setLoading(false);

          navigation.navigate("Trainings2");
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
