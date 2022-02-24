import React, { useState, useEffect } from "react";
import axios from "axios";
import MapView from "react-native-maps";
import { View, Text, StyleSheet } from "react-native";
import * as Location from "expo-location";

//components
import Loading from "../components/Loading";

//style
import styles from "../StyleSheet";

const MapScreen = () => {
	const [error, setError] = useState();
	const [coords, setCoords] = useState();
	const [isLoading, setisLoading] = useState(true);
	const [markers, setMarkers] = useState([]);

	useEffect(() => {
		const askPermission = async () => {
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
		};
		const fetchData = async () => {
			setMarkers([]);

			const response = await axios.get(
				`https://express-airbnb-api.herokuapp.com/rooms/around?longitude=2.3215788&latitude=48.8480923`
			);
			for (let i = 0; i < response.data.length; i++) {
				const obj = {
					id: response.data[i]._id,
					longitude: response.data[i].location[0],
					latitude: response.data[i].location[1],
					title: response.data[i].title,
					price: response.data[i].price,
				};
				// console.log(obj);
				const markersCopy = [...markers];
				markersCopy.push(obj);
				setMarkers(markersCopy);
			}
			setisLoading(false);
		};

		askPermission();
	}, []);

	// const markers = [
	// 	{
	// 		id: 1,
	// 		latitude: 48.8564449,
	// 		longitude: 2.4002913,
	// 		title: "Le Reacteur",
	// 		description: "La formation des champion·ne·s !",
	// 	},
	// ];

	if (isLoading) return <Loading />;
	if (error) return <Text>Permission refusée</Text>;

	return (
		<MapView
			// La MapView doit obligatoirement avoir des dimensions
			style={{ flex: 1 }}
			initialRegion={{
				latitude: 48.856614,
				longitude: 2.3522219,
				latitudeDelta: 0.2,
				longitudeDelta: 0.2,
			}}
			showsUserLocation={true}
		>
			{console.log("MARKERS ===>", markers)}
			{markers.map((marker, index) => {
				return (
					<MapView.Marker
						key={index}
						coordinate={{
							latitude: marker.latitude,
							longitude: marker.longitude,
						}}
						title={marker.title}
						price={`${marker.price} €`}
					/>
				);
			})}
		</MapView>
	);
};

export default MapScreen;
