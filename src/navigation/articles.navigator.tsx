import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { ArticlesGridScreen } from "../scenes/articles/articles-grid.component";
import { ArticlesListScreen } from "../scenes/articles/articles-list.component";
import { ArticlesScreen } from "../scenes/articles/articles.component";
import { Article1Screen } from "../scenes/articles/article-1.component";
import { Article2Screen } from "../scenes/articles/article-2.component";
import { Article3Screen } from "../scenes/articles/article-3.component";

const TopTab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const ArticlesMenuNavigator = (): React.ReactElement => (
  <TopTab.Navigator tabBar={(props) => <ArticlesScreen {...props} />}>
    <TopTab.Screen name="ArticlesGrid" component={ArticlesGridScreen} />
    <TopTab.Screen name="ArticlesList" component={ArticlesListScreen} />
  </TopTab.Navigator>
);

export const ArticlesNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="Articles" component={ArticlesMenuNavigator} />
    <Stack.Screen name="Article1" component={Article1Screen} />
    <Stack.Screen name="Article2" component={Article2Screen} />
    <Stack.Screen name="Article3" component={Article3Screen} />
  </Stack.Navigator>
);
