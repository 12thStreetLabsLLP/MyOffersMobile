import React from "react";
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  ListRenderItemInfo,
  ScrollView,
  View,
  Share,
  StyleSheet,
} from "react-native";
import {
  Button,
  Card,
  Icon,
  List,
  StyleService,
  Text,
  useStyleSheet,
} from "@ui-kitten/components";
import { ImageOverlay } from "./extra/image-overlay.component";
import { Product, ProductOption } from "./extra/data";

const product: Product = Product.centralParkApartment();

export default ({ navigation, route }): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);

  const onBookButtonPress = (): void => {};

  const offerDetails = route.params.details.item;

  const renderImageItem = (
    info: ListRenderItemInfo<ImageSourcePropType>
  ): React.ReactElement => (
    <Image style={styles.imageItem} source={info.item} />
  );

  const renderOptionItemIcon = (
    style: ImageStyle,
    icon: string
  ): React.ReactElement => <Icon {...style} name={icon} />;

  const renderOptionItem = (
    option: ProductOption,
    index: number
  ): React.ReactElement => (
    <Button
      key={index}
      style={styles.optionItem}
      appearance="ghost"
      size="small"
      icon={(style: ImageStyle) => renderOptionItemIcon(style, option.icon)}
    >
      {option.title}
    </Button>
  );

  const renderDetailItem = (
    detail: string,
    index: number
  ): React.ReactElement => (
    <Button
      key={index}
      style={styles.detailItem}
      appearance="outline"
      size="tiny"
    >
      {detail}
    </Button>
  );

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

  const renderBookingFooter = (): React.ReactElement => (
    <View>
      <Text category="s1">Facilities</Text>
      <View style={styles.detailsList}>
        {product.details.map(renderDetailItem)}
      </View>
      <View style={styles.optionList}>
        {product.options.map(renderOptionItem)}
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <ImageOverlay style={styles.image} source={{ uri: offerDetails.image }} />
      <Card style={styles.bookingCard} appearance="filled" disabled={true}>
        <Text style={styles.title} category="h6">
          {offerDetails.title}
        </Text>

        <Text style={styles.rentLabel} appearance="hint" category="p2">
          Location
        </Text>
        <Text style={styles.priceLabel} category="h6">
          {offerDetails.location}
        </Text>
        <Icon
          onPress={() => onShare(offerDetails.title)}
          style={stylesIcon.icon}
          fill="#999999"
          name="share"
        />
      </Card>
      <Text style={styles.sectionLabel} category="s1">
        Offer details
      </Text>
      <Text style={styles.description} appearance="hint">
        {offerDetails.description}
      </Text>
    </ScrollView>
  );
};

const themedStyles = StyleService.create({
  container: {
    backgroundColor: "background-basic-color-2",
  },
  image: {
    height: 200,
  },
  bookingCard: {
    marginTop: -40,
    margin: 16,
  },
  title: {
    width: "65%",
  },
  rentLabel: {
    marginTop: 24,
  },
  priceLabel: {
    marginTop: 8,
  },
  bookButton: {
    position: "absolute",
    bottom: 24,
    right: 24,
  },
  detailsList: {
    flexDirection: "row",
    marginHorizontal: -4,
    marginVertical: 8,
  },
  detailItem: {
    marginHorizontal: 4,
    borderRadius: 16,
  },
  optionList: {
    flexDirection: "row",
    marginHorizontal: -4,
    marginVertical: 8,
  },
  optionItem: {
    marginHorizontal: 4,
    paddingHorizontal: 0,
  },
  description: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  sectionLabel: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  imagesList: {
    padding: 8,
    backgroundColor: "background-basic-color-2",
  },
  imageItem: {
    width: 180,
    height: 120,
    borderRadius: 8,
    marginHorizontal: 8,
  },
});
