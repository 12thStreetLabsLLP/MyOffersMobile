import React from "react";
import {
  ImageBackground,
  ListRenderItemInfo,
  StyleSheet,
  View,
  TouchableOpacity,
  Share,
} from "react-native";
import { Card, List, Text, Button } from "@ui-kitten/components";
import { Training } from "./extra/data";
import { useState, useEffect } from "react";
import {
  getOffers,
  getLocation,
  storeGPS,
  getGPS,
} from "../../../services/util";

const trainings: Training[] = [];

export default ({ navigation, gps }): React.ReactElement => {
  const [location, setLocation] = React.useState<any>(null);
  const [packageSearch, setPackageSearch] = useState<string>("");
  const [result, setResult] = useState<string>("");

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

  const getOffersData = async (gps) => {
    console.log(gps);
    const { data } = await getOffers(12.717875, 77.281231, 10);
    // const { data } = await getOffers(
    //   gps.coords.latitude,
    //   gps.coords.longitude,
    //   10
    // );

    if (data) {
      //console.log(data);
      const offers = data.getNearestOffers;

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
  };

  if (gps) {
    console.log(gps);
    getOffersData(gps);
  }

  const onShare = async (text) => {
    try {
      const result = await Share.share({
        message: text,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

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
        <Button
          appearance="ghost"
          status="basic"
          onPress={() => onShare(info.item.title)}
        >
          Share
        </Button>
      </Card>
    </TouchableOpacity>
  );

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
