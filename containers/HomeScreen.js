import React, { Component, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, ActivityIndicator, FlatList } from "react-native";
import axios from "axios";
import styles from "../StyleSheet";
import BnbCard from "../components/BnbCard";

const HomeScreen = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					"https://express-airbnb-api.herokuapp.com/rooms"
				);
				setData(response.data);
				setIsLoading(false);
			} catch (error) {}
		};
		fetchData();
	}, []);

	const navigation = useNavigation();
	if (isLoading)
		return (
			<View style={styles.activityIndicator}>
				<ActivityIndicator size="large" color="#eb5b63" />
			</View>
		);
	return (
		<View style={styles.carouselContainer}>
			<FlatList
				data={data}
				keyExtractor={(item) => item._id}
				renderItem={({ item }) => <BnbCard item={item} />}
			/>
		</View>
	);
};

export default HomeScreen;
