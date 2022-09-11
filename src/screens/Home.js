import React, {useState} from "react";
import {Linking, View} from "react-native";
import {getAuth, signOut} from "firebase/auth";
import {collection, getDocs, getFirestore} from 'firebase/firestore';
import {
    Button,
    Layout,
    Section,
    SectionContent,
    SectionImage,
    Text,
    themeColor,
    TopNav,
    useTheme,
} from "react-native-rapi-ui";
import {Ionicons} from "@expo/vector-icons";

export default function ({navigation}) {
    const {isDarkmode, setTheme} = useTheme();
    const auth = getAuth();
    const firestore = getFirestore();
    const [users, setUsers] = useState("");

    const getUpdates = async () => {
        const users = collection(firestore, 'users')
        const usersQuerySnapshot = await getDocs(users);
        usersQuerySnapshot.docs.forEach((doc) => {
            console.log(doc.id, doc.data());
        });
    }

    getUpdates().then(() => console.log(users));

    // const entityRef = collection(firestore, 'users');
    // useEffect(() => {
    //     entityRef
    //         .onSnapshot(
    //             querySnapshot => {
    //                 const newEntities = []
    //                 querySnapshot.forEach(doc => {
    //                     const entity = doc.data()
    //                     entity.id = doc.id
    //                     newEntities.push(entity)
    //                 });
    //                 setEntities(newEntities)
    //             },
    //             error => {
    //                 console.log(error)
    //             }
    //         )
    // }, []);

    return (
        <Layout>
            <TopNav
                middleContent="Home"
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
                <Section>
                    <SectionImage source={{uri: 'https://reactjs.org/logo-og.png'}}/>
                    <SectionContent>
                        <Text>This would be someone's post</Text>
                    </SectionContent>
                </Section>
                <Section style={{marginTop: 20}}>
                    <SectionContent>
                        <Text fontWeight="bold" style={{textAlign: "center"}}>
                            These UI components provided by Rapi UI
                        </Text>
                        <Button
                            style={{marginTop: 10}}
                            text="Rapi UI Documentation"
                            status="info"
                            onPress={() => Linking.openURL("https://rapi-ui.kikiding.space/")}
                        />
                        <Button
                            text="Go to second screen"
                            onPress={() => {
                                navigation.navigate("SecondScreen");
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
