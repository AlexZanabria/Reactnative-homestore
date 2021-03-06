import React, { Component } from "react";
import Feedback from "./FeedbackComponent";
//import About from "./AboutComponent";
import Directory from "./DirectoryComponent";
import ShoppingList from "./ShoppingListComponent";
import AddProduct from "./NewProductComponent";
//import CampsiteInfo from "./CampsiteInfoComponent";
import Constants from "expo-constants";
import {
  View,
  Platform,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  Alert,
  ToastAndroid, //Week4 - NETWORK INFO
} from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";
import { Icon } from "react-native-elements"; //list of icons are in: https://fontawesome.com/v4/icons/
import SafeAreaView from "react-native-safe-area-view";
import { connect } from "react-redux";
import {
  fetchProductos,
  //fetchComments,
  //fetchPromotions,
  //fetchPartners,
} from "../redux/ActionCreators";
//import Reservation from "./ReservationComponent";
//import Inventario from "./InventarioComponent"; 
//import Login from "./LoginComponent"; //Week4

import NetInfo from "@react-native-community/netinfo"; //Week4 - NETWORK INFO

const mapDispatchToProps = {
  fetchProductos,
};


//INICIO DE STACK NAVIGATORS ======================================

const DirectoryNavigator = createStackNavigator(
  {
    Directory: {
      screen: Directory,
      navigationOptions: ({ navigation }) => ({
        headerLeft: (
          <Icon
            name="shopping-basket"
            type="font-awesome"
            iconStyle={styles.stackIcon}
            onPress={() => navigation.toggleDrawer()}
          />
        ),
      }),
    },
  },
  {
    initialRouteName: "Directory",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#011F26",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#A5A692",
      },
    },
  }
);

const ShoppingListNavigator = createStackNavigator(
  {
    ShoppingList: { screen: ShoppingList },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: "#011F26",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#A5A692",
      },
      headerLeft: (
        <Icon
          name="shopping-cart"
          type="font-awesome"
          iconStyle={styles.stackIcon}
          onPress={() => navigation.toggleDrawer()}
        />
      ),
    }),
  }
);

const FeedbackNavigator = createStackNavigator(
  {
    Feedback: { screen: Feedback },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: "#011F26",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#A5A692",
      },
      headerLeft: (
        <Icon
          name="comments"
          type="font-awesome"
          iconStyle={styles.stackIcon}
          onPress={() => navigation.toggleDrawer()}
        />
      ),
    }),
  }
);

const NewProductNavigator = createStackNavigator(
  {
    AddProduct: { screen: AddProduct },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: "#011F26",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#A5A692",
      },
      headerLeft: (
        <Icon
          name="file-text-o"
          type="font-awesome"
          iconStyle={styles.stackIcon}
          onPress={() => navigation.toggleDrawer()}
        />
      ),
    }),
  }
);

//FIN DE STACK NAVIGATORS ======================================

// const HomeNavigator = createStackNavigator(
//   {
//     Home: { screen: Home },
//   },
//   {
//     defaultNavigationOptions: ({ navigation }) => ({
//       headerStyle: {
//         backgroundColor: "#5637DD",
//       },
//       headerTintColor: "#fff",
//       headerTitleStyle: {
//         color: "#fff",
//       },
//       headerLeft: (
//         <Icon
//           name="home"
//           type="font-awesome"
//           iconStyle={styles.stackIcon}
//           onPress={() => navigation.toggleDrawer()}
//         />
//       ),
//     }),
//   }
// );

//Week3 =============
// const InventarioNavigator = createStackNavigator(
//   {
//     Inventario: { screen: Inventario },
//   },
//   {
//     defaultNavigationOptions: ({ navigation }) => ({
//       headerStyle: {
//         backgroundColor: "#5637DD",
//       },
//       headerTintColor: "#fff",
//       headerTitleStyle: {
//         color: "#fff",
//       },
//       headerLeft: (
//         <Icon
//           name="basket-shopping"
//           type="font-awesome"
//           iconStyle={styles.stackIcon}
//           onPress={() => navigation.toggleDrawer()}
//         />
//       ),
//     }),
//   }
// );
//============

//Week4 - Login Screen ===============
// const LoginNavigator = createStackNavigator(
//   {
//     Login: { screen: Login },
//   },
//   {
//     defaultNavigationOptions: ({ navigation }) => ({
//       headerStyle: {
//         backgroundColor: "#5ad1f1",
//       },
//       headerTintColor: "#fff",
//       headerTitleStyle: {
//         color: "#fff",
//       },
//       headerLeft: (
//         <Icon
//           name="sign-in"
//           type="font-awesome"
//           iconStyle={styles.stackIcon}
//           onPress={() => navigation.toggleDrawer()}
//         />
//       ),
//     }),
//   }
// );

//Fin de Login Screen============

// const AboutNavigator = createStackNavigator(
//   {
//     About: { screen: About },
//   },
//   {
//     defaultNavigationOptions: ({ navigation }) => ({
//       headerStyle: {
//         backgroundColor: "#5ad1f1",
//       },
//       headerTintColor: "#fff",
//       headerTitleStyle: {
//         color: "#fff",
//       },
//       headerLeft: (
//         <Icon
//           name="info-circle"
//           type="font-awesome"
//           iconStyle={styles.stackIcon}
//           onPress={() => navigation.toggleDrawer()}
//         />
//       ),
//     }),
//   }
// );

const CustomDrawerContentComponent = (props) => (
  <ScrollView>
    <SafeAreaView
      style={styles.container}
      forceInset={{ top: "always", horizontal: "never" }}
    >
      <View style={styles.drawerHeader}>
        <View style={{ flex: 1 }}>
          <Image
            source={require("./images/logo.png")}
            style={styles.drawerImage}
          />
        </View>
        <View style={{ flex: 2 }}>
          <Text style={styles.drawerHeaderText}>HomeStore</Text>
        </View>
      </View>
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
);

const MainNavigator = createDrawerNavigator(
  {
    // Login: {
    //   screen: LoginNavigator,
    //   navigationOptions: {
    //     drawerIcon: ({ tintColor }) => (
    //       <Icon
    //         name="sign-in"
    //         type="font-awesome"
    //         size={24}
    //         color={tintColor}
    //       />
    //     ),
    //   },
    // },

    // Home: {
    //   screen: HomeNavigator,
    //   navigationOptions: {
    //     drawerIcon: ({ tintColor }) => (
    //       <Icon name="home" type="font-awesome" size={24} color={tintColor} />
    //     ),
    //   },
    // },
    Directory: {
      screen: DirectoryNavigator,
      navigationOptions: {
        drawerLabel: "Mi Stock",
        drawerIcon: ({ tintColor }) => (
          <Icon name="shopping-basket" type="font-awesome" size={20} color={tintColor} />
        ),
      },
    },


    ShoppingList: {
      screen: ShoppingListNavigator,
      navigationOptions: {
        drawerLabel: "Shopping List x7 days",
        drawerIcon: ({ tintColor }) => (
          <Icon name="shopping-cart" type="font-awesome" size={20} color={tintColor} />
        ),
      },
    },

    AddProduct: {
      screen: NewProductNavigator,
      navigationOptions: {
        drawerLabel: "Add New Product",
        drawerIcon: ({ tintColor }) => (
          <Icon name="file-text-o" type="font-awesome" size={24} color={tintColor} />
        ),
      },
    },

    //WEEK3
    // Favorites: {
    //   screen: FavoritesNavigator,
    //   navigationOptions: {
    //     drawerLabel: "My Favorites",
    //     drawerIcon: ({ tintColor }) => (
    //       <Icon name="heart" type="font-awesome" size={24} color={tintColor} />
    //     ),
    //   },
    // },
    //=============
    // About: {
    //   screen: AboutNavigator,
    //   navigationOptions: {
    //     drawerLabel: "About Us",
    //     drawerIcon: ({ tintColor }) => (
    //       <Icon
    //         name="info-circle"
    //         type="font-awesome"
    //         size={24}
    //         color={tintColor}
    //       />
    //     ),
    //   },
    // },
    Feedback: {
      screen: FeedbackNavigator,
      navigationOptions: {
        drawerLabel: "Give Feedback",
        drawerIcon: ({ tintColor }) => (
          <Icon
            name="comments"
            type="font-awesome"
            size={24}
            color={tintColor}
          />
        ),
      },
    },
  },
  {
    initialRouteName: "Directory", //Week4 - Especificar la primera pantalla
    drawerBackgroundColor: "#A5A692",
    contentOptions: {
      activeTintColor: '#011F26',
      activeBackgroundColor: "#F2A71B"},
    contentComponent: CustomDrawerContentComponent,
  }
);

const AppNavigator = createAppContainer(MainNavigator);

class Main extends Component {
  componentDidMount() {
    this.props.fetchProductos();
    //this.props.fetchComments();
    //this.props.fetchPromotions();
    //this.props.fetchPartners();

    NetInfo.fetch().then((connectionInfo) => {
      Platform.OS === "ios"
        ? Alert.alert("Initial Network Connectivity Type:", connectionInfo.type)
        : ToastAndroid.show(
            "Initial Network Connectivity Type: " + connectionInfo.type,
            ToastAndroid.LONG //LONG MUESTRA EL MENSAJE POR 3.5seg
          );
    });

    this.unsubscribeNetInfo = NetInfo.addEventListener((connectionInfo) => {
      this.handleConnectivityChange(connectionInfo);
    });
  }

  componentWillUnmount() {
    this.unsubscribeNetInfo();
  }

  handleConnectivityChange = (connectionInfo) => {
    let connectionMsg = "You are now connected to an active network.";
    switch (connectionInfo.type) {
      case "none":
        connectionMsg = "No network connection is active.";
        break;
      case "unknown":
        connectionMsg = "The network connection state is now unknown.";
        break;
      case "cellular":
        connectionMsg = "You are now connected to a cellular network.";
        break;
      case "wifi":
        connectionMsg = "You are now connected to a WiFi network.";
        break;
    }
    Platform.OS === "ios"
      ? Alert.alert("Connection change:", connectionMsg)
      : ToastAndroid.show(connectionMsg, ToastAndroid.LONG);
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          paddingTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
        }}
      >
        <AppNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: "#A5A692",
    height: 140,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
  },
  drawerHeaderText: {
    color: "#FFFF",
    fontSize: 24,
    fontWeight: "bold",
  },
  drawerImage: {
    margin: 10,
    height: 90,
    width: 90,
  },
  stackIcon: {
    marginLeft: 10,
    color: "#fff",
    fontSize: 24,
  },
});

export default connect(null, mapDispatchToProps)(Main);
