

//FIN DE IMPORTS


import React from "react";
import Main from "./components/MainComponent";
// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { ConfigureStore } from "./redux/configureStore";

import { PersistGate } from 'redux-persist/es/integration/react'; //Week3 Redux-Persist
import Loading from './components/LoadingComponent'; //Week3 Redux-Persist


console.disableYellowBox = true; //Deshabilitar las advertencias amarillas


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
