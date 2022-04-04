import React, { Component } from "react";
import { ListItem, Badge, Icon, Button } from "react-native-elements";
import { Tile } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { View, FlatList, Text, StyleSheet, Modal, ScrollView, Image } from "react-native"; //Week2-MODALS
import Loading from "./LoadingComponent";

import * as Animatable from "react-native-animatable"; //Week3 Animations

const mapStateToProps = (state) => {
  return {
    productos: state.productos,
  };
};

class Directory extends Component {
  
  constructor(props) {
    super(props);
    this.state={
      changeStock: 0,
      showModal: false,
      itemname: "", //This property is used to store the item name, and then pass it to the modal title
      itemimage: "",
      itemstock:"",
      itemunidad:""
    }
  }

  static navigationOptions = {
    title: "My Products",
  };

  toggleModal(item, image, stock, unidad) {
    this.setState({showModal: !this.state.showModal, 
      itemname:item,
      itemimage: image,
      itemstock: stock,
      itemunidad: unidad})
}

changeQuantity(operator) {

if (operator=="add") {
 //console.log(this.state)
  this.setState({itemstock: Number.parseInt(this.state.itemstock)+1})
  }
  if (operator=="minus") {
    this.setState({itemstock: Number.parseInt(this.state.itemstock)-1})
  } 

}

  render() {
    const { navigate } = this.props.navigation;
    const renderDirectoryItem = ({ item }) => {
      return (
        //animation="fadeInRightBig" duration={2000}     
          <ListItem
            title={item.name}
            subtitle={item.stock+" "+item.unidad}
            leftAvatar={{ source: { uri: baseUrl + item.image } }}
            chevron
            //topDivider
            //bottomDivider
            onLongPress={() => this.toggleModal(item.name,item.image,item.stock,item.unidad)}
            // containerStyle={{
            //   marginLeft: 5,
            //   marginRight: 5, 
            //   marginTop: 10, 
            //   borderRadius: 10, // adds the rounded corners
            //   backgroundColor: '#BFB78F'
            // }}
          />
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
      <ScrollView>
        <FlatList
          data={this.props.productos.productos}
          renderItem={renderDirectoryItem}
          keyExtractor={(item) => item.id.toString()}
        />
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.showModal}
          onRequestClose={() => this.toggleModal()}
      >
          <View style={styles.modal}>
              <Text style={styles.modalTitle}>{this.state.itemname}</Text>
              <Image
              source={{uri: baseUrl + this.state.itemimage}}
              style={styles.drawerImage}
              />
              <Text style={styles.modalText}> You have {this.state.itemstock} {this.state.itemunidad} </Text>

              
              <View style={styles.imageContainer}>
             <Button //Week4 - Boton de login usando react native elements
            onPress={() => this.changeQuantity("add")}
            //title="Add"
            icon={
              <Icon
                name="plus-square"
                type="font-awesome"
                color="#fff"
                size={45}
                //iconStyle={{ marginRight: 10 }}
                
              />
            }
            buttonStyle={{ backgroundColor: '#3D8EA4' ,width: 60}}
            
          />
          <Button //Week4 - Boton de login usando react native elements
            onPress={() => this.changeQuantity("minus")}
            //title="Minus"
            icon={
              <Icon
                name="minus-square"
                type="font-awesome"
                color="#fff"
                size={45}
                //iconStyle={{ marginRight: 10 }}
              />
            }
            buttonStyle={{ backgroundColor: "#3D8EA4", width: 60}}
          />
          </View>


              <Button
                  onPress={() => {
                    this.toggleModal()
                  }}
                  color='#3D8EA4'
                  title='Close'
              />
          </View>
      </Modal>
    </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  

    modal: {
      justifyContent: "center",
      margin: 20
    },
    modalTitle: {
      fontSize: 24,
      fontWeight: "bold",
      backgroundColor: "#5AD1F1",
      textAlign: "center",
      color: "#fff",
      marginBottom: 20,
    },
    modalText: {
      fontSize: 28,
      margin: 10,
      textAlign: "center"
    },
    drawerImage: {
      margin: 10,
      marginLeft: 110,
      height: 120,
      width: 120,
      justifyContent: "center"
     },
     formButton: {
      margin: 20,
      marginRight: 40,
      marginLeft: 40
    },
    imageContainer: {
      //Week4 - Image Picker
      //flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-evenly",
      margin: 50,
    }
});

export default connect(mapStateToProps)(Directory);
