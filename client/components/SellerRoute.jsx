import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";
import { AppContext } from "../context/app-context";
import { sendSellerRegisterRequest } from "../util/account";

function SellerRoute() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPssword] = useState();
    const [storeName, setSotreName] = useState();
    const ctx = useContext(AppContext);
    const navigation = useNavigation();

    const pressHandle = () => {
        console.log(email, password, confirmPassword, storeName);
        const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        const regex = /^[A-Za-z0-9]{6,12}$/;
        if (regExp.test(email)) {
            if (regex.test(password)) {
                if (password == confirmPassword) {
                    !async function () {
                        try {
                            const recv = await sendSellerRegisterRequest(email, password, storeName);
                            console.log(recv);
                            ctx.dispatch({ type: "login", payload: recv });
                            AsyncStorage.setItem("authentication", JSON.stringify(recv));
                            navigation.navigate("homeStack");
                            Alert.alert("회원가입 성공\n")
                        } catch (e) {
                            Alert.alert("회원가입 실패\n")
                            console.log(e.message);
                        }
                    }()
                } else {
                    Alert.alert("비밀번호 확인 불일치\n")
                }
            } else {
                Alert.alert("비밀번호 문자, 숫자 포함 6자리 이상  작성해주세요\n")
            }
        } else {
            Alert.alert("이메일 형식이 아님\n")
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={{ marginBottom: 4 }}>
                <Text >오늘, 뭐먹지?</Text>
            </View>
            <View style={{ marginBottom: 4 }}>
                <Text >사용할 이메일</Text>
                <TextInput onChangeText={setEmail}
                />
            </View>
            <View style={{ marginBottom: 4 }}>
                <Text>사용할 비밀번호</Text>
                <TextInput onChangeText={setPassword}
                    secureTextEntry={true}
                />
            </View>
            <View style={{ marginBottom: 4 }}>
                <Text >비밀번호 재확인</Text>
                <TextInput onChangeText={setConfirmPssword}
                    secureTextEntry={true}
                />
            </View>
            <View style={{ marginBottom: 4 }}>
                <Text>점포명</Text>
                <TextInput onChangeText={setSotreName}
                />
            </View>
            <View style={{ marginBottom: 4, }}>
                <Button title="회원가입" onPress={pressHandle} />
            </View>
        </View >
    );
}

export default SellerRoute;