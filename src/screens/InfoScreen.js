import React, {useEffect, useState} from "react";
import {View} from "react-native";
import {Layout, Text, themeColor, TopNav, useTheme} from "react-native-rapi-ui";
import {Ionicons} from "@expo/vector-icons";

//Location
import * as Location from 'expo-location';

export default function ({navigation}) {
    const {isDarkmode, setTheme} = useTheme();
    const [entityText, setEntityText] = useState("");
    const [ipText, setIpText] = useState("");
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    //Start Location Tracking
    useEffect(() => {
        (async () => {
            let {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = `Latitude: ${location.coords.latitude}
        Longitude: ${location.coords.longitude}`;
    }

    //Start IP Tracking
    fetch("https://www.trackip.net/ip", {
        method: 'GET', redirect: 'follow'
    })
        .then(response => response.text())
        .then(result => setIpText(result))
        .catch(error => console.log('error', error));

    return (<Layout>
        <TopNav
            middleContent="Info Screen"
            leftContent={<Ionicons
                name="chevron-back"
                size={20}
                color={isDarkmode ? themeColor.white100 : themeColor.dark}
            />}
            leftAction={() => navigation.navigate("Home")}
            rightContent={<Ionicons
                name={isDarkmode ? "sunny" : "moon"}
                size={20}
                color={isDarkmode ? themeColor.white100 : themeColor.dark}
            />}
            rightAction={() => {
                if (isDarkmode) {
                    setTheme("light");
                } else {
                    setTheme("dark");
                }
            }}
        />
        <View
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 20,
                paddingBottom: 20,
                backgroundColor: isDarkmode ? themeColor.dark : themeColor.white,
            }}
        >
            <Text fontWeight="bold">User Info</Text>
            <Text>{ipText}</Text>
            <Text>{text}</Text>
        </View>
    </Layout>);
}
