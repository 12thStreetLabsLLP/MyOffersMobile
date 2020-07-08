import React from "react";
import {
  ImageBackground,
  ListRenderItemInfo,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import { Card, List, Text } from "@ui-kitten/components";
import { Training } from "./extra/data";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import Spinner from "react-native-loading-spinner-overlay";

const trainings: Training[] = [];

export default ({ navigation }): React.ReactElement => {
  let [Loading, setLoading] = React.useState<boolean>(true);

  const renderItemHeader = (
    info: ListRenderItemInfo<Training>
  ): React.ReactElement => (
    <ImageBackground
      style={styles.itemHeader}
      source={{ uri: info.item.image }}
    />
  );

  const onTabSelect = (info: any): void => {
    navigation &&
      navigation.navigate("ProductDetails4", {
        details: info,
      });
  };

  const FETCH_OFFERS = gql`
    query {
      Offers {
        Address {
          addresss
          gps
          addressType
        }
        vendorId
        title
        image
        id
        expiryDate
        addressId
      }
    }
  `;

  const { data, error, loading } = useQuery(FETCH_OFFERS, {
    variables: {},
  });

  const renderItem = (
    info: ListRenderItemInfo<Training>
  ): React.ReactElement => (
    <TouchableOpacity>
      <Card
        style={styles.item}
        onPress={() => onTabSelect(info)}
        header={() => renderItemHeader(info)}
      >
        <Text style={{ color: "#FFF" }} category="h4">
          {info.item.title}
        </Text>
        <View style={styles.itemFooter}>
          <Text style={{ color: "#FFF" }}>{info.item.location}</Text>
        </View>
        <View style={styles.itemFooter}>
          <Text style={{ color: "#FFF" }}>Coupon code - {info.item.code}</Text>
        </View>
      </Card>
    </TouchableOpacity>
  );

  if (!data) {
    //alert("nothing");
  } else {
    const offers = data.Offers;

    offers.forEach((res) => {
      trainings.push(
        new Training(
          res.title,
          30,
          150,
          res.image,
          "Great offers going on...",
          res.Address.addresss,
          "FUNCODE"
        )
      );
    });
  }

  return <List style={styles.list} data={trainings} renderItem={renderItem} />;
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  item: {
    borderRadius: 10,
    marginVertical: 8,
    backgroundColor: "#633d66",
  },
  itemHeader: {
    height: 150,
  },
  itemFooter: {
    flexDirection: "row",
    marginTop: 4,
    marginHorizontal: -4,
  },
  activityButton: {
    marginHorizontal: 4,
    paddingHorizontal: 0,
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
