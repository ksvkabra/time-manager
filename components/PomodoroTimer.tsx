import React, { useState, FC, useEffect } from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';

const PomodoroTimer: FC<{ navigation: any }> = ({ navigation }) => {
  const [change, setChange] = useState(true);
  const [minutes, setMinutes] = useState<number>(0);
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

  const timer1 = (minutes: number) => {
    const OneMinute = 10 * 1000;
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

  const timer2 = (minutes: number) => {
    const OneMinute = 6 * 1000;
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

  const counter = async() => {
    if(change)
    {
      timer1(1);
    }
    else{
      timer2(1);
    }
    setChange(!change);
  };


  return (
    <View style={styles.container}>
      <Text style={styles.circle}>
        <Text style = {styles.textt}>
          {minutes} {seconds}
        </Text>
      </Text>
      <Button title='Start Timer' onPress= {counter} disabled={!!(minutes>0 || seconds>0)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#aaa",
    alignItems: "center",
    justifyContent: "center"
  },
  circle: {
    borderWidth:1,
    height: 150,
    width: 150,
    borderRadius:150,
    alignItems: "center",
    justifyContent: "center",
    textAlign:"center",
  },
  textt:{
  }
});

export default PomodoroTimer;
