import React, {useState, useEffect} from "react";
import {Linking, View} from "react-native";
import {getAuth, signOut} from "firebase/auth";
import {collection, getDocs, getFirestore, query, where, onSnapshot} from 'firebase/firestore';
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
    // const [msgs, setMsgs] = useState({})
    const [msgs, setMsgs] = useState([])

    // const getUpdates = () => {
    //     // const users = collection(firestore, 'users')
    //     // const usersQuerySnapshot = await getDocs(users);
    //     // usersQuerySnapshot.docs.forEach((doc) => {
    //     //     console.log(doc.id, doc.data());
    //     // });
    //     const q = query(collection(firestore, "users"));
    //     const unsubscribe = onSnapshot(q, (querySnapshot) => {
    //     // const msgs = [];
    //     querySnapshot.forEach((doc) => {
    //         msgs.push(doc.data());
    //     });
    //     });
    //     console.log(msgs)
    // }

    const getUpdates = async () => {
        const q = query(collection(firestore, 'users'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const stuff = []
            querySnapshot.forEach((doc) => {
                // console.log(doc.data());
                // msgs[doc.data()['userName']] = doc.data()
                // msgs.push(doc.data())
                // setMsgs(msgs)
                stuff.push([doc.data().userName, doc.data().text])
            });
            setMsgs(stuff)
        });
    }

    getUpdates()
        
    //     useEffect(() => {
    //         users
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
    

    // getUpdates().then(() => console.log(msgs));

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
    function ListMsgs() {
        const items = msgs
        // console.log(items)
        // for (const [key, value] of Object.entries(items)) {
        //     console.log(key, value);
        // }
        // Object.keys(items).forEach(msg => console.log(msg))
        const listItems = items.map(([userName, text, time]) => {
            // console.log(item)
            // console.log("***")
            return <div>
                <div>
                    {/* <input readonly type="text" value={`${userName}`}/> */}
                    <h3>{userName}</h3>
                </div>
                <div>
                {/* <input readonly type="text" value={`${text}`}/> */}
                {/* <p>{time}</p> */}
                <p>{text}</p>
                </div>
                </div>
            })
        return <div>{listItems}</div>
        // return <div>{items}</div>
    }

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
                        {/* <Text>This would be someone's post</Text> */}
                        <ListMsgs></ListMsgs>
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
                            text="Update Status"
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
