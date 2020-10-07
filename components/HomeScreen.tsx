import React from 'react';
import { Button, View, StyleSheet } from 'react-native';

interface HomeProps {
  navigation: any;
}

const Home: React.FC<HomeProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <Button
          title='Counter'
          onPress={() => navigation.navigate('Counter')}
        />
      </View>
      <View style={styles.button}>
        <Button title='Timer' onPress={() => navigation.navigate('Timer')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 10,
    flex: 1,
    alignItems: 'center',
  },
  button: {
    margin: 10,
    width: '50%',
  },
});

export default Home;
