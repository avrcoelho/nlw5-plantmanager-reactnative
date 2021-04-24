import React from "react";
import { Text, StyleSheet, View, Animated } from "react-native";
import {
  RectButton,
  RectButtonProps,
  Swipeable,
} from "react-native-gesture-handler";
import { SvgFromUri } from "react-native-svg";
import { Feather } from "@expo/vector-icons";

import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

interface PlantCardSecondaryProps extends RectButtonProps {
  data: {
    name: string;
    photo: string;
    hour: string;
  };
  onRemove(): void;
}

export const PlantCardSecondary = ({
  data,
  onRemove,
  ...rest
}: PlantCardSecondaryProps) => {
  return (
    <Swipeable
      overshootRight={false}
      renderRightActions={() => (
        <Animated.View>
          <RectButton style={styles.buttonRemove} onPress={onRemove}>
            <Feather name="trash" size={32} color={colors.white} />
          </RectButton>
        </Animated.View>
      )}
    >
      <RectButton style={styles.container} {...rest}>
        <SvgFromUri uri={data.photo} width={50} height={50} />
        <Text style={styles.title}>{data.name}</Text>
        <View style={styles.details}>
          <Text style={styles.timeLabel}>Regar às</Text>
          <Text style={styles.time}>{data.hour}</Text>
        </View>
      </RectButton>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 25,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.shape,
    marginVertical: 5,
  },
  title: {
    flex: 1,
    marginLeft: 16,
    fontFamily: fonts.heading,
    fontSize: 17,
    color: colors.heading,
  },
  details: {
    alignItems: "flex-end",
  },
  timeLabel: {
    fontSize: 16,
    fontFamily: fonts.text,
    color: colors.body_light,
  },
  time: {
    marginTop: 5,
    fontSize: 16,
    fontFamily: fonts.heading,
    color: colors.body_dark,
  },
  buttonRemove: {
    width: 100,
    height: 108,
    backgroundColor: colors.red,
    marginTop: 5,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",

    paddingLeft: 10,
  },
});
