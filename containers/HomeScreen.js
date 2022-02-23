import React, { Component, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
	View,
	Text,
	StyleSheet,
	Button,
	FlatList,
	ImageBackground,
	Image,
} from "react-native";
import axios from "axios";
import styles from "../StyleSheet";
import { FontAwesome } from "@expo/vector-icons";

const HomeScreen = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState([]);

	const rateRange = [1, 2, 3, 4, 5];

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
	if (isLoading) return <Text>LOADING</Text>;
	return (
		<View style={styles.carouselContainer}>
			<FlatList
				data={data}
				keyExtractor={(item) => item._id}
				renderItem={({ item }) => (
					<View style={styles.carouselCard}>
						<View style={styles.carouselPictureContainer}>
							<ImageBackground
								source={{ uri: item.photos[0].url }}
								style={styles.carouselPicture}
								resizeMode="cover"
							>
								<Text style={styles.carouselPrice}>{item.price} €</Text>
							</ImageBackground>
						</View>
						<View style={styles.carouselDetails}>
							<Text style={styles.carouselTitle} numberOfLines={1}>
								{item.title}
							</Text>
							<View style={styles.carouselRateContainer}>
								{rateRange.map((elem) =>
									elem <= item.ratingValue ? (
										<FontAwesome name="star" size={20} color="gold" />
									) : (
										<FontAwesome name="star" size={20} color="#CCC" />
									)
								)}
							</View>
						</View>
						<View style={styles.carouselDivider}></View>
					</View>
				)}
			/>
		</View>
	);
};

export default HomeScreen;
