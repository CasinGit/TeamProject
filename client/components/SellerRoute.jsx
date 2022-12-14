import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, Alert, Button, Text, View, Image } from "react-native";
import { TextInput, IconButton, MD3Colors } from 'react-native-paper';
import { AppContext } from "../context/app-context";
import { RegisterContext } from "../context/register-context";
import { sendSellerRegisterRequest } from "../util/account";
import StoreButton from "./StoreButton";

function SellerRoute() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [store, setStore] = useState();

    const [secureView, setSecureView] = useState(true);
    const [_secureView, _setSecureView] = useState(true);

    const ctx = useContext(AppContext);
    const ctxR = useContext(RegisterContext);
    const navigation = useNavigation();

    useEffect(() => {
        if (!ctxR.store) return;
        console.log("useEffect!!", ctxR.store)
        setStore(ctxR.store.storeName);
    }, [ctxR])

    let sName = "";

    const pressHandle = () => {
        const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        const regex = /^[A-Za-z0-9]{6,12}$/;
        if (regExp.test(email)) {
            if (regex.test(password)) {
                if (password == confirmPassword) {
                    !async function () {
                        try {
                            console.log(email, password, confirmPassword, ctxR.store.id);
                            const recv = await sendSellerRegisterRequest(email, password, ctxR.store.id);
                            console.log(recv);
                            ctx.dispatch({ type: "login", payload: recv.datas });
                            AsyncStorage.setItem("authentication", JSON.stringify(recv.datas));
                            navigation.navigate("homeStack");
                            Alert.alert("???????????? ??????\n")
                        } catch (e) {
                            Alert.alert("???????????? ??????\n")
                            console.log(e.message);
                        }
                    }()
                } else {
                    Alert.alert("???????????? ?????? ?????????\n")
                }
            } else {
                Alert.alert("???????????? ??????, ?????? ?????? 6?????? ??????  ??????????????????\n")
            }
        } else {
            Alert.alert("????????? ????????? ??????")
        }
    };

    return (
        <View style={styles.container}>
            <View style={{ marginBottom: 10 }}>
                <Image source={require('../assets/title_logo_black.png')} />
                {/* <Image source={require('../assets/title_logo_gray.png')} /> */}
            </View>
            <View style={{ width: "60%" }}>
                <View style={styles.inputContainer}>
                    <TextInput style={{ fontSize: email ? 16 : 12 }}
                        mode="outlined"
                        label="?????????"
                        placeholder="???????????? ??????????????????"
                        onChangeText={setEmail}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput style={{ fontSize: password ? 16 : 12 }}
                        mode="outlined"
                        label="????????????"
                        placeholder="??????????????? ??????????????????"
                        right={<TextInput.Icon icon="eye"
                            onPressIn={() => setSecureView(false)}
                            onPressOut={() => setSecureView(true)} />}
                        secureTextEntry={secureView}
                        onChangeText={setPassword}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput style={{ fontSize: confirmPassword ? 16 : 12 }}
                        mode="outlined"
                        label="???????????? ??????"
                        placeholder="??????????????? ?????? ??????????????????"
                        right={<TextInput.Icon icon="eye"
                            onPressIn={() => _setSecureView(false)}
                            onPressOut={() => _setSecureView(true)} />}
                        secureTextEntry={_secureView}
                        onChangeText={setConfirmPassword}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text>????????? : {store && store}</Text>
                    {/* <StoreButton /> */}
                    <IconButton
                        icon="store-search"
                        iconColor={MD3Colors.error50}
                        containerColor={MD3Colors.neutralVariant99}
                        mode="outlined"
                        size={20}
                        onPress={() => navigation.navigate("storeSearch")}
                    />
                </View>
                <View style={{ marginTop: 10 }}>
                    <Button title="????????????" onPress={pressHandle} />
                </View>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: 'center',
    },
    inputContainer: {
        marginBottom: 5,
    },
});

export default SellerRoute;