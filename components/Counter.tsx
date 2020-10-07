import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import CalendarComponent from './Calendar';

export interface StoredData {
  day: number;
  month: number;
  year: number;
  count: number;
}

const Counter: React.FC<{ navigation: any }> = ({ navigation }) => {
  const date = new Date(Date.now());
  const dateDetails = {
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  };
  const [datesAndCounts, setDatesAndCounts] = useState<StoredData[]>([]);
  const [count, setCount] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);

  const storeData = async (count: number) => {
    try {
      const dataToStore = {
        ...dateDetails,
        count,
      };

      const index = datesAndCounts.findIndex(
        (item) =>
          item.day === dataToStore.day &&
          item.month === dataToStore.month &&
          item.year === dataToStore.year
      );
      if (index !== -1) {
        datesAndCounts[index] = dataToStore;
        await AsyncStorage.setItem(
          'calendar-timer-dates-store',
          JSON.stringify(datesAndCounts)
        );
      } else {
        await AsyncStorage.setItem(
          'calendar-timer-dates-store',
          JSON.stringify([...datesAndCounts, dataToStore])
        );
      }
      setOpen(true);
    } catch (e) {
      console.log(e);
    }
  };

  const getData = async (value: string) => {
    try {
      setOpen(false);
      const data: string | null = await AsyncStorage.getItem(value);

      if (data) {
        const parsedDatesData: StoredData[] = JSON.parse(data);
        setDatesAndCounts(parsedDatesData);
        const todaysObjectIndex = parsedDatesData.findIndex(
          (item) =>
            item.day === dateDetails.day &&
            item.month === dateDetails.month &&
            item.year === dateDetails.year
        );

        if (todaysObjectIndex === -1) {
          return;
        }

        const todaysCount = parsedDatesData[todaysObjectIndex].count;
        await setCount(todaysCount);
        setOpen(true);
      }
    } catch (er) {
      console.log(er);
    }
  };

  const deleteData = async (value: any) => {
    try {
      await AsyncStorage.removeItem('calendar-timer-dates-store');
    } catch (err) {
      console.log(err);
    }
  };

  const increaseCount = () => {
    setOpen(false);
    const oldCount = count;
    setCount((count) => count + 1);
    storeData(oldCount + 1);
  };

  useEffect(() => {
    getData('calendar-timer-dates-store');
  }, []);

  // useEffect(() => {
  //   setOpen(true);
  // }, [datesAndCounts]);

  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(date).split('T')[0]}</Text>
      <Text>Count: {count}</Text>
      <View style={styles.button}>
        <Button title='Increase Count' onPress={increaseCount} />
        <Button title='Delete' onPress={() => deleteData('')} />
      </View>
      <View style={styles.button}>
        <Button
          disabled={count < 1}
          title='Decrease Count'
          onPress={() => setCount((count) => count - 1)}
        />
      </View>
      {open ? (
        <CalendarComponent datesAndCounts={datesAndCounts} />
      ) : (
        <Text></Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    margin: 10,
    width: '50%',
  },
});

export default Counter;
