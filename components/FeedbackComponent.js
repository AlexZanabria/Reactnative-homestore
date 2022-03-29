import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import { Card, Button, Icon } from "react-native-elements"; //Week4 - Add a Send Email button

import * as Animatable from "react-native-animatable"; //Week3 Animations

import * as MailComposer from "expo-mail-composer"; //Week4 - Add a Send Email button

class Feedback extends Component {
  static navigationOptions = {
    title: "Give Feedback",
  };

  sendMail() {
    MailComposer.composeAsync({
      recipients: ["alexandrzanabria@gmail.com", "azanabriadeveloper@gmail.com"], //Array de emails
      subject: "Homestore app - bug or improvement", //Asunto del correo
      body: "Hello Alexandr, I would like to ask for a feature or report a bug...", //Texto predeterminado del body email
    });
  }

  render() {
    return (
      <ScrollView>
        <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
          <Card title={"Your feedback is important"} WrapperStyle={{ margin: 20 }}>
            <Text>Tell us what you think, and help us to improve and create a better app </Text>
           
            <Text> </Text>
            <Text>Phone: +51-973835555</Text>
            <Text>Email: azanabriadeveloper@gmail.com</Text>
            <Text style={{ marginBottom: 10 }}>PERU</Text>

            {/* =====Week4 - Button Component */}

            <Button
              title="Send Feedback"
              buttonStyle={{ backgroundColor: "#3d8ea4", margin: 40 }}
              icon={
                <Icon
                  name="envelope-o"
                  type="font-awesome"
                  color="#fff"
                  iconStyle={{ marginRight: 10 }} //Espacio entre el icono y el texto del boton
                />
              }
              onPress={() => this.sendMail()}
            />
          </Card>
        </Animatable.View>
      </ScrollView>
    );
  }
}

export default Feedback;
