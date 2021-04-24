import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";

import colors from "../../styles/colors";
import { PlantSelect } from "../pages/PlantSelect";
import { MyPlants } from "../pages/MyPlants";

const AppTabs = createBottomTabNavigator();

export const AuthRoutes = () => {
  return (
    <AppTabs.Navigator
      tabBarOptions={{
        activeTintColor: colors.green,
        inactiveTintColor: colors.heading,
        labelPosition: "beside-icon",
        style: {
          paddingVertical: 20,
          height: 88,
        },
      }}
    >
      <AppTabs.Screen
        name="NewPlant"
        component={PlantSelect}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons
              name="add-circle-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <AppTabs.Screen
        name="MyPlants"
        component={MyPlants}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons
              name="format-list-bulleted"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </AppTabs.Navigator>
  );
};
