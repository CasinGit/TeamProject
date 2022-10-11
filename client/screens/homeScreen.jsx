import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View } from "react-native";
import MapView from "react-native-map-clustering"
import { Marker } from "react-native-maps";
import { getStoreInfoRequest } from "../util/store";

function HomeScreen() {
    const [mapData, setMapData] = useState();
    const navigation = useNavigation();
    const init = {
        latitude: 35.1415081,
        longitude: 126.9321138,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    }

    useEffect(() => {
        !async function () {
            const data = await getStoreInfoRequest();
            setMapData(data.datas);
        }()
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <MapView style={{ flex: 1 }} initialRegion={init}>
                {mapData && mapData.map((one) => {
                    return <Marker key={one.RSTR_ID} coordinate={{ latitude: Number(one.RSTR_LA), longitude: Number(one.RSTR_LO) }}
                        title={one.RSTR_NM}
                        description={one.RSTR_RDNMADR}
                        onPress={() => {
                            console.log(one)
                            navigation.navigate("storeInfo", { datas: one, place: one.RSTR_RDNMADR, places: one.RSTR_LNNO_ADRES, ph: one.RSTR_TELNO});
                        }} />
                }
                )}
            </MapView>
        </View>
    );
}

export default HomeScreen;