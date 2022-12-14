import React from "react";
import {ActivityIndicator, View} from "react-native";
import {Layout, themeColor} from "react-native-rapi-ui";

export default function ({navigation}) {
    return (
        <Layout>
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <ActivityIndicator size="large" color={themeColor.primary}/>
            </View>
        </Layout>
    );
}
