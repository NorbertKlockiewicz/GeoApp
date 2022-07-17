import React, { Component } from 'react';
import { View, Text } from 'react-native';
import MyButton from './MyButton'

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.handlePress = this.handlePress.bind(this)
    }

    handlePress() {
        console.log("JALOFGD")
        this.props.navigation.navigate("list")
    }

    render() {
        return (
            <View style={{ flex: 2 }}>
                <MyButton text="Start" size={40} onPress={this.handlePress} />
            </View>
        );
    }
}

export default Main;
