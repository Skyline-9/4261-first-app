import React, {useState} from "react";
import {Keyboard, View} from "react-native";
import {Button, Layout, Text, TextInput, themeColor, TopNav, useTheme} from "react-native-rapi-ui";
import {Ionicons} from "@expo/vector-icons";

//Firebase
import {getAuth} from "firebase/auth";
import {collection, doc, getFirestore, serverTimestamp, setDoc} from 'firebase/firestore';

export default function ({navigation}) {
    const {isDarkmode, setTheme} = useTheme();
    const [entityText, setEntityText] = useState("");

    //TODO
    const auth = getAuth();
    const user = auth.currentUser;

    const firestore = getFirestore();
    const entityRef = collection(firestore, 'users');

    //TODO
    const onAddButtonPress = async () => {
        console.log(entityRef)
        if (entityText && entityText.length > 0) {
            const timestamp = serverTimestamp();
            const data = {
                // text: entityText,
                // userName: user.email,
                // createdAt: timestamp,
                text: entityText,
                userName: user.email,
                createdAt: timestamp
            };

            await setDoc(doc(entityRef, user.email), data)
                .then(docRef => {
                    setEntityText('');
                    Keyboard.dismiss();
                    console.log('Completed successfully!'.concat(docRef));
                })
                .catch((error) => {
                    console.log('WHY BROKEN?!');
                    alert(error);
                });
        }
    }

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
                leftAction={() => navigation.navigate("Home")}
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
                    value={entityText}
                    onChangeText={(val) => setEntityText(val)}
                />
                <Button text="Submit" onPress={onAddButtonPress}/>
            </View>
        </Layout>
    );
}
