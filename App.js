import { useState, useEffect } from "react";
import { Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

//screens
import SigninScreen from "./containers/SigninScreen";
import SignupScreen from "./containers/SignupScreen";
import HomeScreen from "./containers/HomeScreen";
import RoomScreen from "./containers/RoomScreen";
import SettingScreen from "./containers/SettingScreen";
import MapScreen from "./containers/MapScreen";

//style
import styles from "./StyleSheet";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
	const [isLoading, setIsLoading] = useState(true);
	const [userToken, setUserToken] = useState(null);

	const setToken = async (token) => {
		if (token) await AsyncStorage.setItem("userToken", token);
		else await AsyncStorage.removeItem("userToken");
		setUserToken(token);
	};

	useEffect(() => {
		const bootStrapAsync = async () => {
			const foundToken = await AsyncStorage.getItem("userToken");
			setUserToken(foundToken);
			setIsLoading(false);
		};
		bootStrapAsync();
	}, []);

	if (isLoading === true) return null;

	const color = "#eb5b63";

	return (
		<NavigationContainer>
			<Stack.Navigator>
				{userToken === null ? (
					<>
						<Stack.Screen name="Signin" options={{ headerShown: false }}>
							{() => <SigninScreen setToken={setToken} />}
						</Stack.Screen>

						<Stack.Screen name="Signup" options={{ headerShown: false }}>
							{() => <SignupScreen setToken={setToken} />}
						</Stack.Screen>
					</>
				) : (
					<Stack.Screen name="tab" options={{ headerShown: false }}>
						{() => (
							<Tab.Navigator
								screenOptions={{
									headerShown: false,
								}}
							>
								<Tab.Screen
									name="TabHome"
									options={{
										tabBarActiveTintColor: "#eb5b63",
										tabBarLabel: "Home",
										tabBarIcon: ({ color, size }) => (
											<Ionicons name={"ios-home"} size={24} color="#eb5b63" />
										),
									}}
								>
									{() => (
										<Stack.Navigator>
											<Stack.Screen
												name="Home"
												options={{
													headerBackground: () => (
														<Image
															style={styles.headerLogo}
															source={require("./assets/img/logo.png")}
														/>
													),
													headerTitle: "",
												}}
											>
												{() => <HomeScreen />}
											</Stack.Screen>

											<Stack.Screen
												name="Room"
												options={{
													headerBackground: () => (
														<Image
															style={styles.headerLogo}
															source={require("./assets/img/logo.png")}
														/>
													),
													headerTitle: "",
												}}
											>
												{(props) => <RoomScreen {...props} />}
											</Stack.Screen>
										</Stack.Navigator>
									)}
								</Tab.Screen>

								<Tab.Screen
									name="TabAroundMe"
									options={{
										tabBarActiveTintColor: "#eb5b63",
										tabBarLabel: "Around me",
										tabBarIcon: ({ color, size }) => (
											<MaterialCommunityIcons
												name="google-maps"
												size={24}
												color="#eb5b63"
											/>
										),
									}}
								>
									{() => (
										<Stack.Navigator>
											<Stack.Screen
												name="Around me"
												options={{
													headerBackground: () => (
														<Image
															style={styles.headerLogo}
															source={require("./assets/img/logo.png")}
														/>
													),
													headerTitle: "",
												}}
											>
												{(props) => (
													<MapScreen setToken={setToken} {...props} />
												)}
											</Stack.Screen>
										</Stack.Navigator>
									)}
								</Tab.Screen>

								<Tab.Screen
									name="TabSettings"
									options={{
										tabBarActiveTintColor: "#eb5b63",
										tabBarLabel: "Settings",
										tabBarIcon: ({ color, size }) => (
											<Ionicons
												name={"ios-options"}
												size={size}
												color="#eb5b63"
											/>
										),
									}}
								>
									{() => (
										<Stack.Navigator>
											<Stack.Screen
												name="Settings"
												options={{
													title: "Settings",
												}}
											>
												{() => <SettingScreen setToken={setToken} />}
											</Stack.Screen>
										</Stack.Navigator>
									)}
								</Tab.Screen>
							</Tab.Navigator>
						)}
					</Stack.Screen>
				)}
			</Stack.Navigator>
		</NavigationContainer>
	);
}
