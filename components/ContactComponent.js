import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import { Card, Button, Icon } from "react-native-elements"; //Week4 - Add a Send Email button

import * as Animatable from "react-native-animatable"; //Week3 Animations

import * as MailComposer from "expo-mail-composer"; //Week4 - Add a Send Email button

class Contact extends Component {
  static navigationOptions = {
    title: "Contact Us",
  };

  sendMail() {
    MailComposer.composeAsync({
      recipients: ["campsites@nucamp.co", "roy.zanabria@gmail.com"], //Array de emails
      subject: "Reclamo", //Asunto del correo
      body: "To whom it may concern: / A quien corresponda:", //Texto predeterminado del body email
    });
  }

  render() {
    return (
      <ScrollView>
        <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
          <Card title={"Contact Information"} WrapperStyle={{ margin: 20 }}>
            <Text>1 Nucamp Way</Text>
            <Text>Seattle, WA 98001</Text>
            <Text style={{ marginBottom: 10 }}>U.S.A.</Text>
            <Text>Phone: 1-206-555-1234</Text>
            <Text>Email: campsites@nucamp.co</Text>

            {/* =====Week4 - Button Component */}

            <Button
              title="Enviar Email"
              buttonStyle={{ backgroundColor: "#5637DD", margin: 40 }}
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

export default Contact;
