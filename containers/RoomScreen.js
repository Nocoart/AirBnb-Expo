import React, { useState, useEffect } from "react";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import axios from "axios";

import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	Image,
	ImageBackground,
	ActivityIndicator,
	Dimensions,
} from "react-native";

import { Foundation } from "@expo/vector-icons";
import styles from "../StyleSheet";

const RoomScreen = ({ route }) => {
	const [item, setItem] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [descriptionlineNb, setDescriptionlineNb] = useState(3);
	const rateRange = [1, 2, 3, 4, 5];
	const { width } = Dimensions.get("window");

	useEffect(() => {
		const bootstrapAsync = async () => {
			const response = await axios.get(
				`https://express-airbnb-api.herokuapp.com/rooms/${route.params.id}`
			);
			setItem(response.data);
			setIsLoading(false);
		};
		bootstrapAsync();
	}, []);

	if (isLoading)
		return (
			<View style={styles.activityIndicator}>
				<ActivityIndicator size="large" color="#eb5b63" />
			</View>
		);

	return (
		<ScrollView>
			<View style={styles.roomScreenPictureContainer}>
				<SwiperFlatList
					autoplay
					autoplayDelay={5}
					autoplayLoop
					index={0}
					showPagination
					data={item.photos}
					renderItem={({ item }) => (
						<Image
							source={{ uri: item.url }}
							style={{ height: "100%", flex: 1, width: width }}
						/>
					)}
				/>
				<Text style={styles.carouselPrice}>{item.price} €</Text>
			</View>
			<View style={styles.roomScreenDetails}>
				<View style={styles.carouselDetailsText}>
					<Text style={styles.carouselTitle} numberOfLines={1}>
						{item.title}
					</Text>
					<View style={styles.carouselRateContainer}>
						<View style={styles.carouselRate}>
							{rateRange.map((elem, index) =>
								elem <= item.ratingValue ? (
									<Foundation name="star" size={20} color="gold" key={index} />
								) : (
									<Foundation name="star" size={20} color="#CCC" key={index} />
								)
							)}
						</View>
						<Text style={styles.reviewNumber}>{item.reviews} reviews</Text>
					</View>
				</View>
				<Image
					resizeMode="contain"
					source={{ uri: item.user.account.photo.url }}
					style={styles.carouselAccountPicture}
				/>
			</View>
			<TouchableOpacity
				style={styles.roomScreenDescription}
				onPress={() => setDescriptionlineNb(0)}
			>
				<Text style={styles.justifyText} numberOfLines={descriptionlineNb}>
					{item.description}
				</Text>
			</TouchableOpacity>
		</ScrollView>
	);
};

export default RoomScreen;
