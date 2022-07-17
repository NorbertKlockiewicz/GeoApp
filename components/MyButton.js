import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';


class MyButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <TouchableOpacity style={{ flex: 2, justifyContent: "center" }} onPress={this.props.onPress}>
                <View>
                    <Text style={{ fontSize: this.props.size, textAlign: "center" }}> {this.props.text} </Text>
                </View>
            </TouchableOpacity>
        );
    }
}
MyButton.propTypes = {
    onPress: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
};


export default MyButton;
