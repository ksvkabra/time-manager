import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { StoredData } from './Counter';

interface CalendarComponentProps {
  datesAndCounts?: StoredData[];
}

const CalendarComponent: React.FC<CalendarComponentProps> = ({
  datesAndCounts,
}) => {
  useEffect(() => {
    console.log(datesAndCounts);
  }, [datesAndCounts]);
  return (
    <Calendar
      hideExtraDays={true}
      dayComponent={({ date, state }) => {
        let datesIndex = -1;
        console.log('process', datesAndCounts);
        if (datesAndCounts) {
          datesAndCounts.findIndex((item) => {
            console.log(item, date);
          });
          datesIndex = datesAndCounts.findIndex(
            (item) =>
              item.day === date.day &&
              item.month === date.month &&
              item.year === date.year
          );
        }
        console.log('datesIndex', datesIndex);
        let value = 0;
        if (datesAndCounts) {
          value = datesIndex === -1 ? 0 : datesAndCounts[datesIndex].count;
        }
        return (
          <View style={styles.container} key={date.day}>
            <Text style={styles.dateText}>{date.day}</Text>
            <Text style={styles.countText}>{value}</Text>
          </View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#f3f3f3',
    borderWidth: 1,
    borderColor: '#ffffff',
  },
  dateText: {
    textAlign: 'left',
    fontSize: 8,
    alignSelf: 'flex-start',
  },
  countText: {
    textAlign: 'center',
    fontSize: 15,
  },
});

export default CalendarComponent;
