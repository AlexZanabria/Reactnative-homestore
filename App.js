import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

console.disableYellowBox = true; //Deshabilitar las advertencias amarillas

//FIN DE IMPORTS

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import React from "react";
import Main from "./components/MainComponent";
// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { ConfigureStore } from "./redux/configureStore";

import { PersistGate } from 'redux-persist/es/integration/react'; //Week3 Redux-Persist
import Loading from './components/LoadingComponent'; //Week3 Redux-Persist

const { persistor, store } = ConfigureStore();

export default function App() {
  return (
      <Provider store={store}>
          <PersistGate
              loading={<Loading />}
              persistor={persistor}>
              <Main />
          </PersistGate>
      </Provider>
  );
}
