import React, {useState} from "react";
import {View} from "react-native";
import {Layout, Text, TextInput, themeColor, TopNav, useTheme,} from "react-native-rapi-ui";
import {Ionicons} from "@expo/vector-icons";

export default function ({navigation}) {
    const {isDarkmode, setTheme} = useTheme();
    const [text, setText] = useState("");

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
                    paddingHorizontal: 20,
                    paddingBottom: 20,
                    backgroundColor: isDarkmode ? themeColor.dark : themeColor.white,
                }}
            >
                <Text fontWeight="bold">This is the second screen</Text>
                <Text style={{marginBottom: 10}}>TextInput</Text>
                <TextInput
                    placeholder="Enter your text"
                    value={text}
                    onChangeText={(val) => setText(val)}
                />
            </View>
        </Layout>
    );
}
