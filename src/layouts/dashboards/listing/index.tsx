import React from "react";
import {
  ImageBackground,
  ListRenderItemInfo,
  StyleSheet,
  View,
  TouchableOpacity,
  Share,
} from "react-native";
import { Card, List, Text, Modal, Button } from "@ui-kitten/components";
import { Training } from "./extra/data";
import { useState, useEffect } from "react";
import {
  getOffers,
  getLocation,
  storeGPS,
  getGPS,
} from "../../../services/util";
import { Icon } from "@ui-kitten/components";

let trainings: Training[] = [];

export default ({ navigation, gps, r }): React.ReactElement => {
  const [offerslist, setOfferslist] = useState<any>();

  //this is the only case the api is returning data. Please remove it once api is fixed.
  let radius = 100000000;

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
    console.log("gps");
    console.log(gps.coords.latitude);

    const { data } = await getOffers(
      gps.coords.latitude,
      gps.coords.longitude,
      radius
    );

    if (data) {
      trainings = [];

      const offers = data.getNearestOffers;

      offers.forEach((res) => {
        trainings.push(
          new Training(
            res.title,
            30,
            150,
            res.image,
            res.text,
            res.Address.addresss,
            "FUNCODE"
          )
        );
      });
      console.log("trainings count");
      console.log(trainings.length);
    } else {
      console.log("trainings count");
      console.log(trainings.length);
      //alert("no data");
    }
  };

  getOffersData(gps);

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

  const stylesIcon = StyleSheet.create({
    icon: {
      width: 32,
      height: 32,
      alignSelf: "flex-end",
    },
    backdrop: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
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
          <Text style={{ color: "#FFF" }}>{info.item.description}</Text>
        </View>

        <Icon
          onPress={() => onShare(info.item.title)}
          style={stylesIcon.icon}
          fill="#FFFFFF"
          name="share"
        />
      </Card>
    </TouchableOpacity>
  );

  if (trainings && trainings.length > 0) {
    return (
      <List style={styles.list} data={trainings} renderItem={renderItem} />
    );
  } else {
    return <Text>Not found</Text>;
  }
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
