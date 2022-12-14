import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import test_check_image from "../assets/test_Check_green_circle.png";
import { AppContext } from "../context/app-context";

function ReservationConfirmScreen({ route }) {
    const date = route.params.date;
    const time = route.params.time;
    const person = route.params.person;
    const text = route.params.text;
    const store = route.params.store;
    const storeType = route.params.storeType;

    // console.log(date, time, person, text, "이걸봐라");

    const ctx = useContext(AppContext);
    const userNumber = ctx.auth.ph.slice(-4);
    // console.log(number)

    const navigation = useNavigation();

    const homeButton = () => {
        navigation.navigate("home");
    };

    // const historyButton = () => {
    //     navigation.navigate("history");
    // };

    return (
        <View style={styles.outerContainer}>
            <View style={styles.innerContainer}>
                <Image style={styles.container_check} source={test_check_image} />
            </View>
            <View style={styles.mainContainer}>
                <Text style={{ fontSize: 26 }}>{`예약번호(${userNumber}) 예약성공!`}</Text>
                <View style={{ marginBottom: 10 }}>
                    <Text style={{ fontSize: 20 }}>{store} {"[ " + storeType + " ]"}</Text>
                </View>
                <Text style={{ fontWeight: "700", fontSize: 20 }}>● 예약일시</Text>
                <Text style={{ fontSize: 16 }}>{date}{"(" + time + ")"}</Text>
                <Text style={{ fontWeight: "700", fontSize: 20, marginTop: 10 }}>
                    ● 인원 : {person}명
                </Text>
                <Text style={{ fontWeight: "700", fontSize: 20, marginTop: 10 }}>● 요청사항 </Text>
                {text ?
                    <Text style={{ fontSize: 16 }}>{text}</Text>
                    :
                    <Text style={{ fontSize: 16 }}>-</Text>
                }
            </View>
            <View style={styles.buttonContainer}>
                <Button title="홈으로" onPress={homeButton} />
                {/* <Button title="예약내역" onPress={historyButton} /> */}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container_check: {
        width: 250,
        height: 250,
        marginTop: 10,
    },
    textContainer: {
        marginTop: 10,
        fontSize: 18
    },
    layer: {
        flex: 1,
    },
    image: {
        margin: 4.5,
        height: 140,
        width: 140
    },
    mainContainer: {
        margin: 10
    },
    aa: {
        marginTop: 50,
        // justifyContent: "flex-start",
        flex: 1
    },
    outerContainer: {
        borderRadius: 5,
        margin: 8,
        elevation: 1,
        flex: 1,
        overflow: "hidden",
        height: 150,
        backgroundColor: "white"
    },
    innerContainer: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        margin: 10
    },
    buttonContainer: {
        // flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
    }
});

export default ReservationConfirmScreen;