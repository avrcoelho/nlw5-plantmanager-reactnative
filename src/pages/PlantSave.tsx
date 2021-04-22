import React from "react";
import { View, Alert, StyleSheet, Text, Image } from "react-native";
import { SvgFromUri } from "react-native-svg";
import { getBottomSpace } from "react-native-iphone-x-helper";

import { Button } from "../components/Button";
import waterdrop from "../assets/waterdrop.png";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

export const PlantSave = () => {
  return (
    <View style={styles.container}>
      <View style={styles.plantInfo}>
        <SvgFromUri uri={} height={150} width={150} />

        <Text style={styles.plantName}>Nome da planta</Text>
        <Text style={styles.plantAbout}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
          repellendus enim illo ex officiis, delectus explicabo, qui
          consequuntur totam recusandae in nesciunt impedit vitae voluptatum!
          Odio iure esse enim nisi?
        </Text>
      </View>

      <View style={styles.controller}>
        <View style={styles.tipContainer}>
          <Image source={waterdrop} style={styles.tipImage} />

          <Text style={styles.tipText}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
            enim distinctio excepturi magni itaque! Distinctio commodi placeat
            rerum quasi, animi consequatur minima ea laboriosam explicabo
            consectetur quam asperiores itaque odit.
          </Text>
        </View>

        <Text style={styles.alertLabel}>
          Escolha o melhor horário para ser lembrado
        </Text>

        <Button title="Cadastrar planta" onPress={() => {}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: colors.shape,
  },
  plantInfo: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.shape,
  },
  controller: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: getBottomSpace() || 20,
  },
  plantName: {
    fontFamily: fonts.heading,
    fontSize: 24,
    color: colors.heading,
    marginTop: 15,
  },
  plantAbount: {
    textAlign: "center",
    fontFamily: fonts.text,
    color: colors.heading,
    fontSize: 17,
    marginTop: 10,
  },
  tipCOntainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.blue_light,
    padding: 20,
  },
  tipImage: {
    width: 56,
    height: 56,
  },
  tipText: {
    flex: 1,
    marginLeft: 20,
    fontFamily: fonts.text,
    colors: colors.blue,
    fontSize: 17,
    textAlign: "justify",
  },
  alertLabel: {
    textAlign: "center",
  },
});
