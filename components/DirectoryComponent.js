import React, { Component } from "react";
import { ListItem } from "react-native-elements";
import { Tile } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { View, FlatList, Text } from "react-native";
import Loading from "./LoadingComponent";

import * as Animatable from "react-native-animatable"; //Week3 Animations

const mapStateToProps = (state) => {
  return {
    productos: state.productos,
  };
};

class Directory extends Component {
  static navigationOptions = {
    title: "Mis Productos",
  };

  render() {
    const { navigate } = this.props.navigation;
    const renderDirectoryItem = ({ item }) => {
      return (
        <Animatable.View animation="fadeInRightBig" duration={2000}>
          <ListItem bottomDivider></ListItem>
          <ListItem
            title={item.name}
            subtitle={item.stock+" "+item.unidad}
            leftAvatar={{ source: { uri: baseUrl + item.image } }}
            //featured
            //onPress={() => navigate("CampsiteInfo", { campsiteId: item.id })}
            //imageSrc={{ uri: baseUrl + item.image }}
          />
        </Animatable.View>
      );
    };

    if (this.props.productos.isLoading) {
      return <Loading />;
    }
    if (this.props.productos.errMess) {
      return (
        <View>
          <Text>{this.props.productos.errMess}</Text>
        </View>
      );
    }

    return (
      <FlatList
        data={this.props.productos.productos}
        renderItem={renderDirectoryItem}
        keyExtractor={(item) => item.id.toString()}
      />
    );
  }
}

export default connect(mapStateToProps)(Directory);
