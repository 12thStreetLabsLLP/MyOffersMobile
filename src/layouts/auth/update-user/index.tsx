import React from "react";
import { View, Alert } from "react-native";
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
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import Spinner from "react-native-loading-spinner-overlay";
import { addUser } from "../../../services/util";

import {
  ArrowIosBackIcon,
  AssetDatepickerIcon,
} from "../../../components/icons";

export default ({ navigation }): React.ReactElement => {
  const [FirstName, setFirstName] = React.useState<string>();
  const [LastName, setLastName] = React.useState<string>();
  const [email, setEmail] = React.useState<string>();
  const [name, setName] = React.useState<string>();
  const [date, setDate] = React.useState(new Date());
  const [termsAccepted, setTermsAccepted] = React.useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);
  let [Loading, setLoading] = React.useState<boolean>(false);

  const styles = useStyleSheet(themedStyles);

  const ADD_USER = gql`
    mutation insert_Users(
      $usersArray: [Users_insert_input!]!
      $vendorCustomerArray: [VendorCustomertList_insert_input!]!
    ) {
      insert_Users(
        objects: $usersArray
        on_conflict: { constraint: Users_name_key, update_columns: [name] }
      ) {
        affected_rows
      }
      insert_VendorCustomertList(
        objects: $vendorCustomerArray
        on_conflict: {
          constraint: VendorCustomertList_pkey
          update_columns: [vendorId, customerUserName]
        }
      ) {
        affected_rows
      }
    }
  `;
  const [addUser] = useMutation(ADD_USER);

  const onAddUser = () => {
    setLoading(true);

    const data = addUser({
      variables: {
        usersArray: [
          {
            emailId: email,
            name: name,
            type: "customer",
            Customers: {
              data: {
                dateOfBirth: date,
                firstName: FirstName,
                lastName: LastName,
              },
              on_conflict: {
                constraint: "Customers_pkey",
                update_columns: ["id"],
              },
            },
          },
        ],
        vendorCustomerArray: [
          {
            customerUserName: name,
            vendorId: "1",
          },
        ],
      },
    });

    if (data) {
      setLoading(false);
      Alert.alert("Update User", "Sucessfully Added User!");
      setFirstName("");
      setLastName("");
      setDate(date);
      setEmail("");
      setName("");
    }
  };

  React.useEffect(() => {}, []);

  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction icon={ArrowIosBackIcon} onPress={navigation.goBack} />
  );

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
        <TopNavigation
          title="Update Profile"
          leftControl={renderBackAction()}
        />

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
            value={LastName}
            onChangeText={setLastName}
          />
          <Input
            style={styles.formInput}
            status="control"
            autoCapitalize="none"
            placeholder="Phone"
            icon={PhoneIcon}
            value={name}
            onChangeText={setName}
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
        <Button style={styles.signUpButton} size="giant" onPress={onAddUser}>
          UPDATE
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
