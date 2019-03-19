import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { Platform } from 'react-native';
import { Icon } from 'expo';
import Colors from '../constants/Colors';
import CommonHelpers from './CommonHelpers';

export default class CustomButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = { activeSegment: this.props.activeSegment }
    }

    componentWillReceiveProps({ activeSegment }) {
        this.setState({ ...this.state, activeSegment })
    }

    render() {
        return (
            <TouchableOpacity
                style={{ alignContent: "center", alignSelf: "center" }}
                onPress={() => { this.props.onPress() }}>
                <View
                    style={{ flexDirection: 'row', fontSize: 14, fontWeight: "bold", alignSelf: "center", color: "#444" }}>

                    <Icon.Ionicons
                        name={CommonHelpers.getIonIconName(this.props.icon)}
                        size={16}
                        style={{ marginRight: 5 }}
                        color={this.state.activeSegment == this.props.index ? Colors.primaryColor : '#aaa'}
                    />

                    <Text
                        style={[this.state.activeSegment == this.props.index ?
                            { color: Colors.primaryColor, fontWeight: "bold" } :
                            { fontWeight: "bold", color: '#aaa' }]}>
                        {this.props.title}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
}