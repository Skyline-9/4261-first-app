import React, {useState} from "react";
import {View} from "react-native";
import {getAuth, signOut} from "firebase/auth";
import {collection, getFirestore, onSnapshot, query} from 'firebase/firestore';
import {Button, Layout, Section, SectionContent, Text, themeColor, TopNav, useTheme,} from "react-native-rapi-ui";
import {Ionicons} from "@expo/vector-icons";

export default function ({navigation}) {
    const {isDarkmode, setTheme} = useTheme();
    const auth = getAuth();
    const firestore = getFirestore();
    const [users, setUsers] = useState("");
    const [msgs, setMsgs] = useState([])

    const getUpdates = async () => {
        const q = query(collection(firestore, 'users'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const stuff = [];
            querySnapshot.forEach((doc) => {
                stuff.push([doc.data().userName, doc.data().text])
            });
            setMsgs(stuff);
        });
    }

    getUpdates();

    const ListMsgs = () => {
        const listItems = msgs.map(([userName, text, time]) => {
            return <Section style={{marginTop: 20}}>
                <SectionContent>
                    <Text fontWeight="bold">{userName}</Text>
                    <Text>{text}</Text>
                </SectionContent>
            </Section>
        })
        return (
            <View>
                {listItems}
            </View>
        );
    }

    return (
        <Layout>
            <TopNav
                middleContent="Home"
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
                    flex: 1, alignItems: "center", justifyContent: "center",
                }}
            >
                <ListMsgs/>
                <Section style={{marginTop: 20, width: '80%'}}>
                    <SectionContent>
                        <Text fontWeight="bold" style={{textAlign: "center"}}>
                            Navigate Screens
                        </Text>
                        <Button
                            text="Update Status"
                            onPress={() => {
                                navigation.navigate("SecondScreen");
                            }}
                            style={{
                                marginTop: 10,
                            }}
                        />
                        <Button
                            text="Info Screen"
                            status="info"
                            onPress={() => {
                                navigation.navigate("InfoScreen");
                            }}
                            style={{
                                marginTop: 10,
                            }}
                        />
                        <Button
                            status="danger"
                            text="Logout"
                            onPress={() => {
                                signOut(auth);
                            }}
                            style={{
                                marginTop: 10,
                            }}
                        />
                    </SectionContent>
                </Section>
            </View>
        </Layout>
    );
}
