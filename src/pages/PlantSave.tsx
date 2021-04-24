import React, { useState } from "react";
import { View, Alert, StyleSheet, Text, Image, Platform } from "react-native";
import { SvgFromUri } from "react-native-svg";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { useRoute } from "@react-navigation/native";
import DateTimerPicker, { Event } from "@react-native-community/datetimepicker";
import { format, isBefore } from "date-fns";

import { Button } from "../components/Button";
import waterdrop from "../assets/waterdrop.png";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import { TouchableOpacity } from "react-native-gesture-handler";
import { PlantProps, savePlant } from "../libs/storage";

interface Params {
  plant: PlantProps;
}

export const PlantSave = () => {
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [isShowDatePicker, setIsShowDatePicker] = useState(
    Platform.OS === "ios"
  );
  const route = useRoute();
  const { plant } = route.params as Params;

  const handleChangeTime = (_: Event, datetime: Date | undefined) => {
    if (Platform.OS === "android") {
      setIsShowDatePicker((prevState) => !prevState);
    }

    if (datetime && isBefore(datetime, new Date())) {
      setSelectedDateTime(new Date());
      return Alert.alert("Escolha uma hora no futuro");
    }

    if (datetime) {
      setSelectedDateTime(datetime);
    }
  };

  const handleOpenDatePickerFromAndroid = () => {
    setIsShowDatePicker(true);
  };

  const handleSave = async () => {
    try {
      await savePlant({
        ...plant,
        dateTimeNotification: selectedDateTime,
      });
    } catch {
      Alert.alert("Não foi possivel salvar :(");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.plantInfo}>
        <SvgFromUri uri={plant.photo} height={150} width={150} />

        <Text style={styles.plantName}>{plant.name}</Text>
        <Text style={styles.plantAbout}>{plant.about}</Text>
      </View>

      <View style={styles.controller}>
        <View style={styles.tipContainer}>
          <Image source={waterdrop} style={styles.tipImage} />

          <Text style={styles.tipText}>{plant.water_tips}</Text>
        </View>

        <Text style={styles.alertLabel}>
          Escolha o melhor horário para ser lembrado
        </Text>

        {isShowDatePicker && (
          <DateTimerPicker
            value={selectedDateTime}
            mode="time"
            display="spinner"
            onChange={handleChangeTime}
          />
        )}

        {Platform.OS === "android" && (
          <TouchableOpacity
            onPress={handleOpenDatePickerFromAndroid}
            style={styles.dataTimerPickerButton}
          >
            <Text style={styles.dataTimerPickerText}>{`Mudar ${format(
              selectedDateTime,
              "HH:mm"
            )}`}</Text>
          </TouchableOpacity>
        )}

        <Button title="Cadastrar planta" onPress={handleSave} />
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
  plantAbout: {
    textAlign: "center",
    fontFamily: fonts.text,
    color: colors.heading,
    fontSize: 17,
    marginTop: 10,
  },
  tipContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.blue_light,
    padding: 20,
    borderRadius: 20,
    position: "relative",
    bottom: 60,
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
    fontFamily: fonts.complement,
    color: colors.heading,
    fontSize: 12,
    marginBottom: 5,
  },
  dataTimerPickerButton: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 40,
  },
  dataTimerPickerText: {
    color: colors.heading,
    fontSize: 24,
    fontFamily: fonts.text,
  },
});
