import React, { Component } from "react";
import { ListItem, Badge } from "react-native-elements";
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

class ShoppingList extends Component {
  static navigationOptions = {
    title: "Shopping List x7 days",
  };

constructor(badgestock){
    super(badgestock);

    this.badgestock={
        value:"",
        status:"",
        textStyle: { color: 'white' },
        }
     }

  render() {
    const { navigate } = this.props.navigation;
    const renderShoppingListItem = ({ item }) => {
        
        this.badgestock.value=(item.stock==0) ? "Out of Stock!!" : "Low Stock";
        this.badgestock.status=(item.stock==0) ? "error" : "warning";

        if(item.stock==0 || ((item.stock-item.consumodiario*7)<=0)){
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
           <Badge
                value={this.badgestock.value}
                status={this.badgestock.status}
                textStyle={this.badgestock.textStyle}
                containerStyle={{ marginLeft: 200 }}
            />
 
          
        </Animatable.View>
      );}
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
        renderItem={renderShoppingListItem}
        keyExtractor={(item) => item.id.toString()}
      />
    );
  }
}

export default connect(mapStateToProps)(ShoppingList);
