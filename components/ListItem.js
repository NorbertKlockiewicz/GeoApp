import React, { Component } from 'react';
import { View, Text, Image, Switch } from 'react-native';

class ListItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{ flex: 1, flexDirection: "row", margin: "2%" }}>
                <View style={{ flex: 1, justifyContent: "center" }}>
                    <Image style={{ width: 90, height: 70, resizeMode: "stretch" }} source={{ uri: "https://images-ext-1.discordapp.net/external/rb9I1OCFhnJSh7OUk9FBpEM0eVnFhpne2Ijoz4y34tM/https/i.pinimg.com/originals/dd/d5/0c/ddd50c7fd01a3a3927b932d8a5d4857c.png" }}></Image>
                </View>
                <View style={{ flex: 2, justifyContent: "center" }}>
                    <Text style={{ fontWeight: "bold" }}>timestamp: {this.props.timestamp}</Text>
                    <Text>latitude: {this.props.latitude}</Text>
                    <Text>longitude: {this.props.longitude}</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', }}>
                    <Switch
                        trackColor={{ false: "#767577", true: "rgb(90,200,250)" }}
                        thumbColor={this.props.isEnabled ? "rgb(52,199,89)" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => this.props.change(this.props.index)}
                        value={this.props.isEnabled}
                    />
                </View>
            </View>
        );
    }
}

export default ListItem;
