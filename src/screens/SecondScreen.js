import React from "react";
import {View} from "react-native";
import {Layout, Text, themeColor, TopNav, useTheme,} from "react-native-rapi-ui";
import {Ionicons} from "@expo/vector-icons";
import firestore from '@react-native-firebase/firestore';

export default function ({navigation}) {
    const {isDarkmode, setTheme} = useTheme();
    return (
        <Layout>
            <TopNav
                middleContent="Second Screen"
                leftContent={
                    <Ionicons
                        name="chevron-back"
                        size={20}
                        color={isDarkmode ? themeColor.white100 : themeColor.dark}
                    />
                }
                leftAction={() => navigation.goBack()}
                rightContent={
                    <Ionicons
                        name={isDarkmode ? "sunny" : "moon"}
                        size={20}
                        color={isDarkmode ? themeColor.white100 : themeColor.dark}
                    />
                }
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
                }}
            >
                {/* This text using ubuntu font */}
                {
                    firestore().collection('users')
                    .get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            console.log(doc.data())
                            // <Text fontWeight="bold">doc.data()</Text>
                        })
                    })
                }
                <Text fontWeight="bold">This is the second screen</Text>
            </View>
        </Layout>
    );
}
