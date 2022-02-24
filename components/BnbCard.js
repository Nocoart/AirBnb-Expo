import { useNavigation } from "@react-navigation/native";
import {
	View,
	Text,
	Image,
	ImageBackground,
	TouchableOpacity,
} from "react-native";
import { Foundation } from "@expo/vector-icons";

import styles from "../StyleSheet";

const BnbCard = ({ item }) => {
	const navigation = useNavigation();
	const rateRange = [1, 2, 3, 4, 5];

	return (
		<TouchableOpacity
			style={styles.carouselCard}
			onPress={() => navigation.navigate("Room", { id: `${item._id}` })}
		>
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
			<View style={styles.carouselDivider}></View>
		</TouchableOpacity>
	);
};

export default BnbCard;
