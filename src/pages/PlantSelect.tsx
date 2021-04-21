import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
} from "react-native";

import { Header } from "../components/Header";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import { EnvironmentButton } from "../components/EnvironmentButton";
import { api } from "../services/api";
import { PlantCardPrimary } from "../components/PlantCardPrimary";
import { Load } from "../components/Load";

interface IEnvironmentprops {
  key: string;
  title: string;
}

interface IPlantprops {
  id: number;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: string[];
  frequency: {
    times: number;
    repeat_every: string;
  };
}

export const PlantSelect = () => {
  const [environments, setEnvironments] = useState<IEnvironmentprops[]>([]);
  const [plants, setPlants] = useState<IPlantprops[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<IPlantprops[]>([]);
  const [environmentSelected, setEnvironmentSelected] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  const [loadedAll, setLoadedAll] = useState(false);

  const handleEnvironmentSelected = (environment: string) => {
    setEnvironmentSelected(environment);

    if (environment === "all") {
      return setFilteredPlants(plants);
    }

    const filtered = plants.filter((plant) =>
      plant.environments.includes(environment)
    );

    setFilteredPlants(filtered);
  };

  const fetchPlants = async () => {
    const { data } = await api.get<IPlantprops[]>(
      `plants?_sort=name&_order=asc&_page=${page}&_limit=8`
    );
    if (!data) {
      setIsLoading(false);
    }

    if (page > 1) {
      setPlants((prevState) => [...prevState, ...data]);
      setFilteredPlants((prevState) => [...prevState, ...data]);
    } else {
      setPlants(data);
      setFilteredPlants(data);
    }

    setIsLoading(false);
    setLoadMore(false);
  };

  const handleFetchMore = (distance: number) => {
    if (distance < 1) {
      return;
    }

    setLoadMore(true);
    setPage((prevState) => prevState + 1);
    fetchPlants();
  };

  useEffect(() => {
    const fetchEnvironment = async () => {
      const { data } = await api.get<IEnvironmentprops[]>(
        "plants_environments?_sort=title&_order=asc"
      );
      setEnvironments([
        {
          key: "all",
          title: "Todos",
        },
        ...data,
      ]);
    };

    fetchEnvironment();
  }, []);

  useEffect(() => {
    fetchPlants();
  }, []);

  if (isLoading) {
    return <Load />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />

        <Text style={styles.title}>Em qual ambiente</Text>
        <Text style={styles.subtitle}>você quer colocar sua planta?</Text>
      </View>

      <View>
        <FlatList
          data={environments}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <EnvironmentButton
              title={item.title}
              active={item.key === environmentSelected}
              onPress={() => handleEnvironmentSelected(item.key)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.enviromentList}
        />
      </View>

      <View style={styles.plants}>
        <FlatList
          data={filteredPlants}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <PlantCardPrimary data={item} />}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          onEndReachedThreshold={0.1}
          onEndReached={({ distanceFromEnd }) =>
            handleFetchMore(distanceFromEnd)
          }
          ListFooterComponent={
            loadMore ? <ActivityIndicator color={colors.green} /> : null
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 17,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 20,
    marginTop: 15,
  },
  subtitle: {
    fontFamily: fonts.text,
    fontSize: 17,
    lineHeight: 20,
    color: colors.heading,
  },
  enviromentList: {
    height: 40,
    justifyContent: "center",
    paddingBottom: 5,
    marginLeft: 32,
    marginVertical: 32,
  },
  plants: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: "center",
  },
});
