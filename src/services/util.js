import { AsyncStorage } from "react-native";

const AUTH_TOKEN_KEY = "AUTH_TOKEN_NEW_9";

let token;

export const getToken = async () => {
  if (token) {
    return Promise.resolve(token);
  }

  token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
  return token;
};

export const signIn = (newToken) => {
  token = newToken;
  return AsyncStorage.setItem(AUTH_TOKEN_KEY, newToken);
};

export const signOut = () => {
  token = undefined;
  return AsyncStorage.removeItem(AUTH_TOKEN_KEY);
};
