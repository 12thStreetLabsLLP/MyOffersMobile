import { AsyncStorage } from "react-native";
import gql from "graphql-tag";

const AUTH_TOKEN_KEY = "AUTH_TOKEN_NEW_21";
import { useQuery } from "@apollo/react-hooks";
import * as Location from "expo-location";

let token;

export const getToken = async () => {
  if (token) {
    return Promise.resolve(token);
  }

  token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
  return token;
};

export const getPermission = async () => {
  roleId = await AsyncStorage.getItem("ROLE_ID");
  return roleId;
};

export const getUserId = async () => {
  userId = await AsyncStorage.getItem("USER_ID_TOKEN");
  return userId;
};

export const getGPS = async () => {
  token = await AsyncStorage.getItem("location");
  return token;
};

export const signIn = (newToken) => {
  token = newToken;

  return AsyncStorage.setItem(AUTH_TOKEN_KEY, newToken);
};

export const setUserId = (userId) => {
  alert(userId);
  return AsyncStorage.setItem("USER_ID_TOKEN", userId);
};

export const setRole = (role) => {
  return AsyncStorage.setItem("ROLE_ID", role);
};

export const saveExpoToken = (newToken) => {
  return AsyncStorage.setItem("EXPO_PUSH_NOTIFICATION_TOKEN", newToken);
};

export const getExpoPushToken = async () => {
  token = await AsyncStorage.getItem("EXPO_PUSH_NOTIFICATION_TOKEN");
  return token;
};

export const signOut = () => {
  token = undefined;
  return AsyncStorage.removeItem(AUTH_TOKEN_KEY);
};

export const getLocation = async () => {
  let { status } = await Location.requestPermissionsAsync();
  if (status !== "granted") {
    console.log("Permission to access location was denied");
  }

  return Location.getCurrentPositionAsync({});
};

export const storeGPS = (location) => {
  return AsyncStorage.setItem("location", "1");
};

// export const getUserRole = async () => {
//   let userId = await getUserId();

//   if (userId) {
//     const USER_ROLE = `
//     {
//       Users_by_pk(id: 22) {
//         Role {
//           role
//         }
//       }
//     }
//   `;
//     return useQuery(USER_ROLE);
//   }
// };

export const addUser = async (email, name, date, FirstName, LastName) => {
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

  useQuery(ADD_USER, {
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
};

export const getOffers = async (lat, long, radius) => {
  const FETCH_OFFERS = gql`
    query getNearestOffers($lon: float8, $radius: Int, $lat: float8) {
      getNearestOffers(args: { lat: $lat, lon: $lon, radius: $radius }) {
        vendorId
        title
        text
        image
        id
        Address {
          addresss
        }
        active
      }
    }
  `;

  console.log({ lat: lat, lon: long, radius: radius });

  return useQuery(FETCH_OFFERS, {
    variables: { lat: lat, lon: long, radius: radius },
  });
};

export const getCategories = async () => {
  const FETCH_OFFERS = gql`
    query {
      Category {
        categoryName
        categoryId
      }
    }
  `;

  return useQuery(FETCH_OFFERS);
};
