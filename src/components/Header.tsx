import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import AsyncStorage from "@react-native-async-storage/async-storage";

import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

export const Header = () => {
  const [userName, setUserName] = useState<string>();

  useEffect(() => {
    const getNameFromAsyncStorage = async () => {
      const name = (await AsyncStorage.getItem("@plantmanager:user")) as string;
      setUserName(name);
    };

    getNameFromAsyncStorage();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Olá,</Text>
        <Text style={styles.userName}>{userName}</Text>
      </View>

      <Image
        source={{ uri: "https://github.com/avrcoelho.png" }}
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    marginTop: getStatusBarHeight(),
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 40,
  },
  greeting: {
    fontSize: 32,
    color: colors.heading,
    fontFamily: fonts.text,
  },
  userName: {
    fontSize: 32,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 40,
  },
});
