import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { EcommerceScreen } from "../scenes/ecommerce/ecommerce.component";
import { EcommerceGridScreen } from "../scenes/ecommerce/ecommerce-grid.component";
import { EcommerceListScreen } from "../scenes/ecommerce/ecommerce-list.component";
import { AddNewCardScreen } from "../scenes/ecommerce/add-new-card.component";

import { ProductDetails4Screen } from "../scenes/ecommerce/product-details-4.component";

const TopTab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const EcommerceMenuNavigator = (): React.ReactElement => (
  <TopTab.Navigator tabBar={(props) => <EcommerceScreen {...props} />}>
    <TopTab.Screen name="EcommerceGrid" component={EcommerceGridScreen} />
    <TopTab.Screen name="EcommerceList" component={EcommerceListScreen} />
  </TopTab.Navigator>
);

export const EcommerceNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="Ecommerce" component={EcommerceMenuNavigator} />
    <Stack.Screen name="AddNewCard" component={AddNewCardScreen} />

    <Stack.Screen name="ProductDetails4" component={ProductDetails4Screen} />
  </Stack.Navigator>
);
