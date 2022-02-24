//libraries
import React, { useState, useEffect } from "react";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import axios from "axios";
import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	Image,
	Dimensions,
} from "react-native";

//components
import Loading from "../components/Loading";

//style
import { Foundation, AntDesign } from "@expo/vector-icons";
import styles from "../StyleSheet";

const RoomScreen = ({ route }) => {
	const [item, setItem] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [descriptionlineNb, setDescriptionlineNb] = useState(3);
	const rateRange = [1, 2, 3, 4, 5];
	const { width } = Dimensions.get("window");

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`https://express-airbnb-api.herokuapp.com/rooms/${route.params.id}`
				);
				setItem(response.data);
				setIsLoading(false);
			} catch (error) {
				console.log(error.message);
			}
		};
		fetchData();
	}, []);

	if (isLoading) return <Loading />;

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

			<Text
				style={[styles.justifyText, styles.roomScreenDescription]}
				numberOfLines={descriptionlineNb}
			>
				{item.description}
			</Text>
			{descriptionlineNb === 3 ? (
				<TouchableOpacity
					style={styles.roomScreenDescription}
					onPress={() => setDescriptionlineNb(0)}
				>
					<Text style={{ color: "#BBB" }}>
						<AntDesign name="caretdown" size={9} color="#BBB" /> show more
					</Text>
				</TouchableOpacity>
			) : (
				<TouchableOpacity
					style={styles.roomScreenDescription}
					onPress={() => setDescriptionlineNb(3)}
				>
					<Text style={{ color: "#BBB" }}>
						<AntDesign name="caretup" size={9} color="#BBB" /> show less
					</Text>
				</TouchableOpacity>
			)}

			<MapView
				style={{
					flex: 1,
					width: "100%",
					height: 200,
					marginTop: 30,
					marginBottom: 100,
				}}
				provider={PROVIDER_GOOGLE}
				initialRegion={{
					latitude: item.location[1],
					longitude: item.location[0],
					latitudeDelta: 0.01,
					longitudeDelta: 0.01,
				}}
			>
				<Marker
					coordinate={{
						latitude: item.location[1],
						longitude: item.location[0],
					}}
				>
					<View style={styles.pinContainer}>
						<View style={styles.pinView}>
							<Text style={styles.pinText}>{item.price}€</Text>
						</View>
						<View style={styles.pinTriangle}></View>
					</View>
				</Marker>
			</MapView>
		</ScrollView>
	);
};

export default RoomScreen;
