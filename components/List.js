import React, { Component } from 'react';
import { View, Text, FlatList, Alert, Switch } from 'react-native';
import MyButton from './MyButton';
import ListItem from './ListItem';
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import { AsyncStorage } from 'react-native';
import { ActivityIndicator } from 'react-native';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locations: [],
            isEnabled: false,
            locationsToPin: [],
            switchesStatus: [],
            refresher: Math.random(),
            loadedPos: true,
        };
        this.getPosition = this.getPosition.bind(this)
        this.switchChange = this.switchChange.bind(this)
        this.goToMap = this.goToMap.bind(this)
        this.smallSwitchChange = this.smallSwitchChange.bind(this)
    }

    componentDidMount() {
        this.setPermissions()
        this.getAllData()
    }

    setPermissions = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            alert('odmawiam przydzielenia uprawnień do czytania lokalizacji')
        }
    }

    getPosition = async () => {
        this.setState({
            loaded: false,
        })
        let pos = await Location.getCurrentPositionAsync({});
        this.setState({
            loaded: true,
        })
        Alert.alert(
            "Pozycja",
            "Pozycja została pobrana - czy zapisać?",
            [
                {
                    text: "NIE",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "TAK", onPress: () => { this.setData(pos) } }
            ],
            { cancelable: false }
        );
    }

    setData = async (pos) => {
        //await AsyncStorage.setItem('key1', 'value1');
        await AsyncStorage.setItem('key' + Math.round(Math.random() * 100), JSON.stringify(pos, null, 4));
        await this.getAllData();
    }

    getAllData = async () => {
        let locationsState = []
        let switchesState = []
        let keys = await AsyncStorage.getAllKeys();
        let stores = await AsyncStorage.multiGet(keys);
        let maps = stores.map((result, i, store) => {
            let key = store[i][0];
            let value = store[i][1];
            locationsState.push({ key: key, value: JSON.parse(value), index: i })
            switchesState.push(false)
        });

        this.setState({
            locations: locationsState,
            switchesStatus: switchesState
        })
    }

    deleteAll = async () => {
        await AsyncStorage.clear()
        this.getAllData()
    }

    switchChange() {
        this.setState({
            isEnabled: !this.state.isEnabled,
        }, () => {
            if (this.state.isEnabled == true) {
                let switchesState = this.state.switchesStatus
                for (let i = 0; i < switchesState.length; i++) {
                    switchesState[i] = true
                }
                this.setState({
                    locationsToPin: this.state.locations,
                    switchesStatus: switchesState
                })
            }
            else {
                let switchesState = this.state.switchesStatus
                for (let i = 0; i < switchesState.length; i++) {
                    switchesState[i] = false
                }
                this.setState({
                    locationsToPin: [],
                    switchesStatus: switchesState
                })
            }
        })

    }

    smallSwitchChange(index) {
        let switchesState = this.state.switchesStatus
        switchesState[index] = !switchesState[index]
        let templocations;
        if (switchesState[index]) {
            templocations = this.state.locationsToPin
            templocations.push(this.state.locations[index])
        }
        else {
            templocations = []
            this.state.locationsToPin.forEach((location) => {
                if (location.index != index) {
                    templocations.push(location)
                }
            })
        }
        this.setState({
            locationsToPin: templocations,
            switchesStatus: switchesState,
        })
    }

    goToMap() {
        if (this.state.locationsToPin.length > 0) {
            this.props.navigation.navigate("map", { locations: this.state.locationsToPin })
        }
        else {
            alert("Nie zaznaczyłeś żadnej z lokalizacji")
        }
    }

    render() {
        return (

            <View style={{ flex: 1 }}>
                {this.state.loaded == false ?
                    <ActivityIndicator style={{ flex: 1 }} size="large" color="rgb(90,200,250)" />
                    : <View style={{ flex: 1 }}><View style={{ flex: 1, flexDirection: "row" }}>
                        <MyButton text="POBIERZ I ZAPISZ POZYCJĘ" onPress={this.getPosition} size={12} />
                        <MyButton text="USUŃ WSZYSTKIE DANE" onPress={this.deleteAll} size={12} />
                    </View>
                        <View style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}>
                            <MyButton text="PRZEJDŹ DO MAPY" onPress={this.goToMap} size={12} />

                            <Switch
                                trackColor={{ false: "#767577", true: "rgb(90,200,250)" }}
                                thumbColor={this.state.isEnabled ? "rgb(52,199,89)" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={this.switchChange}
                                value={this.state.isEnabled}
                            />
                        </View>
                        <View style={{ flex: 8 }}>
                            <FlatList
                                data={this.state.locations}
                                renderItem={({ item }) => <ListItem index={item.index} change={this.smallSwitchChange} key={item.key} itemKey={item.key} isEnabled={this.state.switchesStatus[item.index]} latitude={item.value.coords.latitude} timestamp={item.value.timestamp} longitude={item.value.coords.longitude} />}
                            />
                        </View></View>
                }
            </View>

        );
    }
}

export default List;
