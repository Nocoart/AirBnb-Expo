import React, { useState, useEffect } from "react";
import axios from "axios";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { View, Text, TouchableOpacity } from "react-native";
import * as Location from "expo-location";

//components
import Loading from "../components/Loading";

//style
import styles from "../StyleSheet";

const MapScreen = ({ navigation }) => {
	const [error, setError] = useState();
	const [coords, setCoords] = useState({});
	const [isLoading, setisLoading] = useState(true);
	const [data, setData] = useState([]);

	const fetchData = async () => {
		try {
			const response = await axios.get(
				`https://express-airbnb-api.herokuapp.com/rooms/around?longitude=${coords.longitude}&latitude=${coords.latitude}`
			);

			setData(response.data);
			setisLoading(false);
		} catch (error) {
			console.log("maps screen fetch data error =>", error.response.data.error);
			setisLoading(false);
		}
	};

	useEffect(() => {
		const askPermission = async () => {
			try {
				let { status } = await Location.requestForegroundPermissionsAsync();
				if (status === "granted") {
					let location = await Location.getCurrentPositionAsync({});
					const obj = {
						latitude: location.coords.latitude,
						longitude: location.coords.longitude,
					};
					setCoords(obj);
					fetchData();
				} else {
					setError(true);
				}
			} catch (error) {
				console.log("maps screen permission error", error.response.data.error);
			}
		};

		askPermission();
	}, []);

	if (isLoading) return <Loading />;
	if (error) return <Text>Permission refusée</Text>;

	return (
		<MapView
			style={{ flex: 1 }}
			provider={PROVIDER_GOOGLE}
			initialRegion={{
				latitude: coords.latitude,
				longitude: coords.longitude,
				latitudeDelta: 0.2,
				longitudeDelta: 0.2,
			}}
			showsUserLocation={true}
		>
			{data.map((item) => {
				return (
					<Marker
						onPress={() => navigation.navigate("Room", { id: `${item._id}` })}
						key={item._id}
						coordinate={{
							latitude: item.location[1],
							longitude: item.location[0],
						}}
						title={item.title}
						description={`${item.price} €`}
					>
						<View style={styles.pinContainer}>
							<View style={styles.pinView}>
								<Text style={styles.pinText}>{item.price}€</Text>
							</View>
							<View style={styles.pinTriangle}></View>
						</View>
					</Marker>
				);
			})}
		</MapView>
	);
};

export default MapScreen;
