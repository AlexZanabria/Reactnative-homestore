import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  FlatList,
  StyleSheet,
  Button,
  Modal,
  Alert,
  PanResponder,
  Share, //Week4 - Share button (Social Media)
} from "react-native";
import { Card, Icon } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { postFavorite, postComment } from "../redux/ActionCreators"; //W2-TASK3 importing postComment
//WEEK2TASK2 Importar Componente Rating y Input from RNE
import { Rating, Input } from "react-native-elements";

import * as Animatable from "react-native-animatable"; //Week3 Animations

const mapStateToProps = (state) => {
  return {
    campsites: state.campsites,
    comments: state.comments,
    favorites: state.favorites,
  };
};

const mapDispatchToProps = {
  postFavorite: (campsiteId) => postFavorite(campsiteId),
  //W2-TASK3 adding postComment
  postComment: (campsiteId, rating, author, text) =>
    postComment(campsiteId, rating, author, text),
};

function RenderCampsite(props) {
  const { campsite } = props;

  const view = React.createRef();

  const recognizeDrag = ({ dx }) => (dx < -200 ? true : false); //Week3Gestures

  const recognizeComment = ({ dx }) => (dx > 200 ? true : false); //Week3-TASK3 Reconocimiento de Gesture from left to right

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      view.current
        .rubberBand(1000)
        .then((endState) =>
          console.log(endState.finished ? "finished" : "canceled")
        );
    },
    onPanResponderEnd: (e, gestureState) => {
      console.log("pan responder end", gestureState);
      if (recognizeDrag(gestureState)) {
        Alert.alert(
          "Add Favorite",
          "Are you sure you wish to add " + campsite.name + " to favorites?",
          [
            {
              text: "Cancel",
              style: "cancel",
              onPress: () => console.log("Cancel Pressed"),
            },
            {
              text: "OK",
              onPress: () =>
                props.favorite
                  ? console.log("Already set as a favorite")
                  : props.markFavorite(),
            },
          ],
          { cancelable: false }
        );
      } else if (recognizeComment(gestureState)) {
        //WEEK3-TASK3
        props.onShowModal();
      }

      return true;
    },
  });

  //=========Week4 - Share, crear una funcion que use el metodo share

  const shareCampsite = (title, message, url) => {
    Share.share(
      {
        title: title,
        message: `${title}: ${message} ${url}`,
        url: url,
      },
      {
        dialogTitle: "Share " + title, //Android Only, muestra un titulo antes de compartir
      }
    );
  };

  //==========================================

  if (campsite) {
    return (
      <Animatable.View
        animation="fadeInDown"
        duration={2000}
        delay={1000}
        ref={view}
        {...panResponder.panHandlers}
      >
        <Card
          featuredTitle={campsite.name}
          image={{ uri: baseUrl + campsite.image }}
        >
          <Text style={{ margin: 10 }}>{campsite.description}</Text>
          <View style={styles.cardRow}>
            <Icon
              name={props.favorite ? "heart" : "heart-o"}
              type="font-awesome"
              color="#f50"
              raised
              reverse
              onPress={() =>
                props.favorite
                  ? console.log("Already set as a favorite")
                  : props.markFavorite()
              }
            />
            <Icon
              name={"pencil"}
              type="font-awesome"
              color="#5637DD"
              raised
              reverse
              onPress={() => props.onShowModal()}
            />
            {/* ====== Week4 - Agregar el icono Share y usar el metodo shareCampsite para compartir */}
            <Icon
              name={"share"}
              type="font-awesome"
              color="#5637DD"
              raised
              reverse
              onPress={() =>
                shareCampsite(
                  campsite.name,
                  campsite.description,
                  baseUrl + campsite.image
                )
              }
            />
            {/* =========== Fin del boton Share */}
            
          </View>
        </Card>
      </Animatable.View>
    );
  }
  return <View />;
}

function RenderComments({ comments }) {
  const renderCommentItem = ({ item }) => {
    return (
      <View style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{item.text}</Text>

        {/* ========== WEEK2-TASK2 CONVERTIR EL RATING DE NUMEROS A ESTRELLAS */}

        {/* ANTIGUO: RATING COMO TEXTO: <Text style={{ fontSize: 12 }}>{item.rating} Stars</Text> */}

        <Rating
          startingValue={item.rating}
          imageSize={10}
          style={{ alignItems: "flex-start", paddingVertical: 10 }}
          readonly={true}
        />
        {/* FIN DE W2-TASK2 CONVERTIR EL RATING A ESTRELLAS ============== */}
        <Text
          style={{ fontSize: 12 }}
        >{`-- ${item.author}, ${item.date}`}</Text>
      </View>
    );
  };
  return (
    <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
      <Card title="Comments">
        <FlatList
          data={comments}
          renderItem={renderCommentItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </Card>
    </Animatable.View>
  );
}

class CampsiteInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      //===========W2-TASK2 STATE
      rating: 5,
      author: "",
      text: "",
    };
  }

  static navigationOptions = {
    title: "Campsite Information",
  };

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  handleComment(campsiteId) {
    //   console.log(JSON.stringify(this.state));
    //W2-TASK3
    this.props.postComment(
      campsiteId,
      this.state.rating,
      this.state.author,
      this.state.text
    );
    this.toggleModal();
  }

  resetForm() {
    this.setState({
      rating: 5,
      author: "",
      text: "",
      showModal: false,
    });
  }

  markFavorite(campsiteId) {
    this.props.postFavorite(campsiteId);
  }

  render() {
    const campsiteId = this.props.navigation.getParam("campsiteId");
    const campsite = this.props.campsites.campsites.filter(
      (campsite) => campsite.id === campsiteId
    )[0];
    const comments = this.props.comments.comments.filter(
      (comment) => comment.campsiteId === campsiteId
    );
    return (
      <ScrollView>
        <RenderCampsite
          campsite={campsite}
          favorite={this.props.favorites.includes(campsiteId)}
          markFavorite={() => this.markFavorite(campsiteId)}
          onShowModal={() => this.toggleModal()}
        />
        <RenderComments comments={comments} />

        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.showModal}
          onRequestClose={() => this.toggleModal()}
        >
          <View style={styles.modal}>
            {/* ==================W2-TASK2 ADDING A RATING FORM, INSIDE THE MODAL*/}
            <Rating
              showRating
              startingValue={this.state.rating}
              imageSize={40}
              onFinishRating={(rating) => this.setState({ rating: rating })}
              style={{ paddingVertical: 10 }}
            />

            <Input
              placeholder="Author"
              leftIcon={{ type: "font-awesome", name: "user-o" }}
              leftIconContainerStyle={{ paddingRight: 10 }}
              onChangeText={(author) => this.setState({ author: author })}
              // value={"text"}
            />

            <Input
              placeholder="Comment"
              leftIcon={{ type: "font-awesome", name: "comment-o" }}
              leftIconContainerStyle={{ paddingRight: 10 }}
              onChangeText={(text) => this.setState({ text: text })}
              //value={"text"}
            />

            <View style={{ margin: 10 }}>
              <Button
                title="Submit"
                color="#5637DD"
                onPress={() => {
                  this.handleComment(campsiteId);
                  this.resetForm();
                }}
              />
            </View>
            {/* Fin de W2-TASK2 ====================================================*/}

            <View style={{ margin: 10 }}>
              <Button
                onPress={() => {
                  this.toggleModal();
                  this.resetForm();
                }}
                color="#808080"
                title="Cancel"
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  cardRow: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    margin: 20,
  },
  modal: {
    justifyContent: "center",
    margin: 20,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CampsiteInfo);
