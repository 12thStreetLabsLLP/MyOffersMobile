import React from "react";
import { View } from "react-native";
import {
  Button,
  CheckBox,
  Input,
  StyleService,
  Text,
  useStyleSheet,
  TopNavigation,
  TopNavigationAction,
  Datepicker,
} from "@ui-kitten/components";
import { ImageOverlay } from "./extra/image-overlay.component";
import { ProfileAvatar } from "./extra/profile-avatar.component";
import {
  EmailIcon,
  EyeIcon,
  EyeOffIcon,
  FacebookIcon,
  GoogleIcon,
  PersonIcon,
  PlusIcon,
  TwitterIcon,
} from "./extra/icons";
import { KeyboardAvoidingView } from "./extra/3rd-party";
import { PhoneIcon } from "../sign-in-4/extra/icons";

import {
  ArrowIosBackIcon,
  AssetDatepickerIcon,
} from "../../../components/icons";

export default ({ navigation }): React.ReactElement => {
  const [FirstName, setFirstName] = React.useState<string>();
  const [email, setEmail] = React.useState<string>();
  const [password, setPassword] = React.useState<string>();
  const [termsAccepted, setTermsAccepted] = React.useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);

  const styles = useStyleSheet(themedStyles);

  const onSignUpButtonPress = (): void => {
    navigation && navigation.goBack();
  };

  const onSignInButtonPress = (): void => {
    navigation && navigation.navigate("SignIn4");
  };

  const onPasswordIconPress = (): void => {
    setPasswordVisible(!passwordVisible);
  };

  const renderPhotoButton = (): React.ReactElement => (
    <Button style={styles.editAvatarButton} size="small" icon={PlusIcon} />
  );
  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction icon={ArrowIosBackIcon} onPress={navigation.goBack} />
  );
  const [date, setDate] = React.useState(new Date());

  return (
    <KeyboardAvoidingView>
      <ImageOverlay
        style={styles.container}
        source={require("./assets/image-background.jpg")}
      >
        <TopNavigation title="Add Users" leftControl={renderBackAction()} />

        <View style={styles.formContainer}>
          <Input
            status="control"
            autoCapitalize="none"
            placeholder="First Name"
            icon={PersonIcon}
            value={FirstName}
            onChangeText={setFirstName}
          />
          <Input
            style={styles.formInput}
            status="control"
            autoCapitalize="none"
            placeholder="Last Name"
            icon={PersonIcon}
            value={email}
            onChangeText={setEmail}
          />
          <Input
            style={styles.formInput}
            status="control"
            autoCapitalize="none"
            placeholder="Phone"
            icon={PhoneIcon}
            value={email}
            onChangeText={setEmail}
          />
          <Input
            style={styles.formInput}
            status="control"
            autoCapitalize="none"
            placeholder="Email"
            icon={EmailIcon}
            value={email}
            onChangeText={setEmail}
          />
          <Datepicker
            style={styles.formInput}
            status="control"
            date={date}
            placeholder="Date of birth"
            icon={AssetDatepickerIcon}
            onSelect={(nextDate) => setDate(nextDate)}
          />
        </View>
        <Button
          style={styles.signUpButton}
          size="giant"
          onPress={onSignUpButtonPress}
        >
          ADD USER
        </Button>
      </ImageOverlay>
    </KeyboardAvoidingView>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    minHeight: 176,
  },
  profileAvatar: {
    width: 92,
    height: 92,
    borderRadius: 46,
    alignSelf: "center",
    backgroundColor: "background-basic-color-1",
    tintColor: "text-hint-color",
  },
  editAvatarButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  formContainer: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  formInput: {
    marginTop: 16,
  },
  termsCheckBox: {
    marginTop: 24,
  },
  termsCheckBoxText: {
    color: "text-control-color",
  },
  signUpButton: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  signInButton: {
    marginVertical: 12,
    marginHorizontal: 16,
  },
  socialAuthContainer: {
    marginTop: 24,
  },
  socialAuthButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  socialAuthHintText: {
    alignSelf: "center",
    marginBottom: 16,
  },
});
