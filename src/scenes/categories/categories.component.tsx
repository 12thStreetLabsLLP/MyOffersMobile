import React, { useEffect } from "react";
import { ListRenderItemInfo, StyleSheet } from "react-native";
import {
  Divider,
  List,
  ListItem,
  Text,
  TopNavigation,
  TopNavigationAction,
  useTheme,
} from "@ui-kitten/components";
import { ArrowIosBackIcon, ArrowIosForwardIcon } from "../../components/icons";
import { SafeAreaLayout } from "../../components/safe-area-layout.component";
import { WebBrowserService } from "../../services/web-browser.service";
import { data } from "./data";
import { Library } from "./type";
import { getCategories } from "../../services/util";

export const CategoriesScreen = ({ navigation }): React.ReactElement => {
  const theme = useTheme();
  const [category, setCategory] = React.useState<any>(true);

  const onItemPress = (index: number): void => {
    navigation && navigation.navigate("ProductListing");
  };

  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction icon={ArrowIosBackIcon} onPress={navigation.goBack} />
  );

  const renderForwardIcon = (style): React.ReactElement => (
    <ArrowIosForwardIcon
      {...style}
      width="24"
      height="24"
      fill={theme["text-hint-color"]}
    />
  );

  const renderItem = (
    info: ListRenderItemInfo<Library>
  ): React.ReactElement => (
    <ListItem
      style={styles.item}
      title={info.item.title}
      description={info.item.description}
      accessory={renderForwardIcon}
      onPress={onItemPress}
    />
  );

  const renderHeader = (): React.ReactElement => (
    <React.Fragment>
      <Divider style={styles.headerDivider} />
    </React.Fragment>
  );

  let categoryData = [];
  getCategories().then((res) => {
    const { data } = res;

    console.log(data);
    data.Category.forEach((res) => {
      categoryData.push({ title: res.categoryName, id: res.categoryId });
    });
    /*set state*/
    setCategory(categoryData);
  });

  //categoryData.push({ title: "title", id: 1 });

  // const getCategoriesData = (): void => {
  //   navigation && navigation.navigate("ProductListing");
  // };

  // useEffect(() => {
  //   getCategories().then((res) => {});
  // }, []);

  return (
    <SafeAreaLayout style={styles.safeArea} insets="top">
      <TopNavigation title="Categories" leftControl={renderBackAction()} />
      <List
        contentContainerStyle={styles.listContent}
        data={category}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
      />
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  headerTitle: {
    paddingHorizontal: 8,
  },
  headerDivider: {
    marginVertical: 8,
  },
  listContent: {
    padding: 8,
  },
  item: {
    marginVertical: 4,
  },
});