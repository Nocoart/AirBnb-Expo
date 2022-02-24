//libraries
import { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import axios from "axios";
import styles from "../StyleSheet";

//components
import BnbCard from "../components/BnbCard";
import Loading from "../components/Loading";

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

	if (isLoading) return <Loading />;
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
