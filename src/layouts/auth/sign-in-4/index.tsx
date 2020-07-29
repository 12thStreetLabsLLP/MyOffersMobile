import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { Button, Input, Text, Icon } from "@ui-kitten/components";
import { ImageOverlay } from "./extra/image-overlay.component";
import { PhoneIcon } from "./extra/icons";
import { KeyboardAvoidingView } from "./extra/3rd-party";
import { withApollo, useApolloClient } from "react-apollo";
import { Platform } from "react-native";

import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { getToken } from "../../../services/util";
import Spinner from "react-native-loading-spinner-overlay";

export default ({ navigation }): React.ReactElement => {
  const [email, setEmail] = React.useState<string>("");
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);

  let [Loading, setLoading] = React.useState<boolean>(false);

  const SEND_VERIFICATION = gql`
    mutation($name: String!) {
      sendVerification(name: $name) {
        data
        message
        status
      }
    }
  `;
  const fetchToken = async () => {
    // fetch token
    const tokenId = getToken();
    console.log(tokenId);
    return tokenId;
  };

  const tokenId = fetchToken();
  console.log("fetching Token");

  tokenId.then(
    (res) => {
      console.log(res);
      if (res) {
        navigation.navigate("ProductListing");
      }
    },
    (err) => {
      console.log(err);
    }
  );
  const [sendSMS] = useMutation(SEND_VERIFICATION);

  const validatePhone = (): string => {
    return email && email.length != 10 ? "warn" : "";
  };

  const onSignInButtonPress = (): void => {
    console.log("sending sms to " + "+91" + email);
    setLoading(true);
    sendSMS({ variables: { name: "+91" + email } }).then(
      (res) => {
        //console.log(token);
        setLoading(false);
        navigation.navigate("OTPVerification", {
          name: email,
        });
      },
      (err) => {
        console.log("SMS send failed");
        console.log(err);
        setLoading(false);
        alert("Something went wrong, Please try again.");
      }
    );
  };

  const AlertIcon = (props) => <Icon {...props} name="alert-circle-outline" />;

  const onSignUpButtonPress = (): void => {
    navigation && navigation.navigate("SignInUp4");
  };

  const onForgotPasswordButtonPress = (): void => {
    navigation && navigation.navigate("ForgotPassword");
  };

  const onPasswordIconPress = (): void => {
    setPasswordVisible(!passwordVisible);
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
        <View style={styles.headerContainer}>
          <Text category="h1" status="control">
            My Offers
          </Text>
          <Text style={styles.signInLabel} category="s1" status="control">
            Sign in with your mobile phone.
          </Text>
        </View>
        <View style={styles.formContainer}>
          <Input
            status={validatePhone()}
            placeholder="Enter phone number"
            icon={PhoneIcon}
            value={email}
            onChangeText={setEmail}
            caption="+91 is not required"
            captionIcon={AlertIcon}
            captionStyle={styles.caption}
          />
        </View>
        <Button
          style={styles.signInButton}
          size="giant"
          onPress={onSignInButtonPress}
          disabled={email.length == 0 || email.length != 10}
        >
          Verify my Phone
        </Button>
        <View style={styles.socialAuthContainer}>
          <Text style={styles.socialAuthHintText} status="control"></Text>
        </View>
      </ImageOverlay>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    minHeight: 216,
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  signInLabel: {
    marginTop: 16,
  },
  caption: {
    color: "#f4f4f4",
  },
  passwordInput: {
    marginTop: 16,
  },
  signInButton: {
    marginHorizontal: 16,
  },
  forgotPasswordContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  forgotPasswordButton: {
    paddingHorizontal: 0,
  },
  signUpButton: {
    marginVertical: 12,
  },
  socialAuthContainer: {
    marginTop: 32,
  },
  socialAuthButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  socialAuthHintText: {
    alignSelf: "center",
    marginBottom: 16,
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
