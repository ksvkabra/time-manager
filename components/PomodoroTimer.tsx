import React, { useState, FC, useEffect } from 'react';
import { Button, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const PomodoroTimer: FC<{ navigation: any }> = ({ navigation }) => {
  const [minutes, setMinutes] = useState<number>(1);
  const [seconds, setSeconds] = useState<number>(0);

  function getTimeRemaining(endTime: string) {
    const total = Date.parse(endTime) - Date.parse(new Date().toISOString());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));

    return {
      total,
      days,
      hours,
      minutes,
      seconds,
    };
  }

  const timer = () => {
    const OneMinute = 60 * 1000;

    // for the first second due to the general delay in setInterval startup
    const beforeStart = new Date(Date.now() + (OneMinute / 10) * minutes);
    const firstSecond = getTimeRemaining(beforeStart.toISOString());
    setMinutes(firstSecond.minutes);
    setSeconds(firstSecond.seconds);

    const newDate = new Date(Date.now());

    const endDate = new Date(newDate.getTime() + OneMinute * minutes);

    const timeInterval = setInterval(() => {
      const t = getTimeRemaining(endDate.toISOString());
      setMinutes(t.minutes);
      setSeconds(t.seconds);

      if (t.total < 1) {
        clearInterval(timeInterval);
      }
    }, 1000);
  };

  useEffect(() => {
    console.log(minutes, seconds);
  }, [minutes, seconds]);

  return (
    <View>
      <Text>
        Timer: {minutes} {seconds}
      </Text>
      <Button title='Start Timer' onPress={timer} />
    </View>
  );
};

export default PomodoroTimer;
