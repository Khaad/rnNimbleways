// WeatherComponent.js

import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchWeather} from '../actions/weatherActions';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Button,
} from 'react-native';

const WeatherComponent = () => {
  const dispatch = useDispatch();
  const {loading, data, error} = useSelector(state => state.weather);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(fetchWeather());
  }, [dispatch]);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(fetchWeather()).finally(() => setRefreshing(false));
  };

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Text style={styles.text}>Vitesse du vent: {item.windSpeed} km/h</Text>
      <Text style={styles.text}>Température: {item.temperature} °C</Text>
      <Text style={styles.text}>
        Température apparent: {item.temperatureApparent} °C
      </Text>
    </View>
  );

  const extractData = () => {
    if (!data || !data.data || !data.data.timelines) return [];
    // const intervals = data.data.timelines.flatMap(
    //   timeline => timeline.intervals,
    // );
    const intervals = data.data.timelines.find(
      a => a.timestep === '1h',
    )?.intervals;
    return intervals?.map(interval => ({
      windSpeed: interval.values.windSpeed,
      temperature: interval.values.temperature,
      temperatureApparent: interval.values.temperatureApparent,
    }));
  };

  const renderLoading = () => (
    <View style={styles.loadingContainer}>
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );

  const renderError = () => (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>Error: {error}</Text>
      <Button title="Retry" onPress={onRefresh} color="#FF7043" />
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Weather Information</Text>
      </View>
      <View style={styles.container}>
        {loading && renderLoading()}
        {error && renderError()}
        {!loading && !error && (
          <FlatList
            data={extractData()}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.listContent}
            style={styles.list}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAFAFA', // Light grey background for better contrast
  },
  headerContainer: {
    padding: 16,
    backgroundColor: '#FF7043', // Deep orange
    marginHorizontal: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 16,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF', // White text color
    textAlign: 'center',
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 20,
  },
  itemContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#FFFFFF', // White background for items
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FF7043', // Deep orange border
  },
  text: {
    fontSize: 16,
    marginBottom: 4,
    color: '#FF7043', // Deep orange text color
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#FF7043', // Deep orange text color
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#FF7043', // Deep orange text color
    marginBottom: 10,
  },
});

export default WeatherComponent;
