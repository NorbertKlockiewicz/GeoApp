import React, { Component } from 'react';
import { View, Text } from 'react-native';
import MapView from 'react-native-maps';
import { ActivityIndicator } from 'react-native';


class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locations: [],
            loaded: false,
        };
        this.generateMarkers = this.generateMarkers.bind(this)
    }

    componentDidMount() {
        this.setState({
            locations: this.props.route.params.locations,
        }, () => {
            this.setState({
                loaded: true,
            })
        })
    }

    generateMarkers() {
        let children = [];
        this.state.locations.forEach((location, index) => {
            children.push(<MapView.Marker
                coordinate={{
                    latitude: location.value.coords.latitude,
                    longitude: location.value.coords.longitude,
                }}
                title={"pos"}
                description={"opis"}
                key={index}
            />)
        })

        return children;
    }

    render() {

        return (
            < View style={{ flex: 1 }
            }>
                {
                    this.state.loaded == false ?
                        <ActivityIndicator size="large" color="#0000ff" />
                        :
                        <MapView
                            style={{ flex: 1 }}
                            initialRegion={{
                                latitude: this.state.locations[0].value.coords.latitude,
                                longitude: this.state.locations[0].value.coords.longitude,
                                latitudeDelta: 0.001,
                                longitudeDelta: 0.001,
                            }}
                        >
                            {this.generateMarkers()}
                        </MapView>
                }
            </View >
        );
    }
}

export default Map;
