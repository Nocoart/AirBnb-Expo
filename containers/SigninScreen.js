import React, { useState } from "react";
import {
	View,
	Text,
	Image,
	TextInput,
	TouchableOpacity,
	ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";

import { useTogglePasswordVisibility } from "../hooks/useTogglePasswordVisibility";
import { Ionicons } from "@expo/vector-icons";

import styles from "../StyleSheet";

const SigninScreen = ({ setToken }) => {
	const navigation = useNavigation();

	const [errorMessage, setErrorMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { passwordVisibility, rightIcon, handlePasswordVisibility } =
		useTogglePasswordVisibility();

	const handleSubmit = async () => {
		try {
			if (!email || !password) setErrorMessage("Please fill all fields");
			else {
				setErrorMessage("");
				const data = { email: email, password: password };
				setIsLoading(true);
				const response = await axios.post(
					"https://express-airbnb-api.herokuapp.com/user/log_in",
					data
				);
				console.log(response.data);
				setToken(response.data.token);
				setIsLoading(false);
			}
		} catch (error) {
			setIsLoading(false);
			setErrorMessage(error.response.data.error);
		}
	};

	return (
		<KeyboardAwareScrollView>
			<View style={styles.signinScreen}>
				<View style={styles.logoContainer}>
					<Image
						source={require("../assets/img/logo.png")}
						style={styles.logo}
					/>
					<Text style={styles.h1}>Sign in</Text>
				</View>
				<View style={styles.signInFormContainer}>
					<TextInput
						style={styles.formInput}
						placeholder="email"
						onChangeText={(text) => setEmail(text)}
					/>
					<View style={styles.formDivider}></View>
					<View style={styles.passwordInput}>
						<TextInput
							style={styles.formInput}
							secureTextEntry={passwordVisibility}
							placeholder="password"
							onChangeText={(text) => setPassword(text)}
						/>
						<TouchableOpacity onPress={handlePasswordVisibility}>
							<Ionicons name={rightIcon} size={24} color="#777" />
						</TouchableOpacity>
					</View>

					<View style={styles.formDivider}></View>
					<View style={styles.buttonContainer}>
						<Text style={styles.orangeText}>{errorMessage}</Text>
						<TouchableOpacity style={styles.button} onPress={handleSubmit}>
							<Text style={styles.buttonText}>Sign in</Text>
						</TouchableOpacity>
					</View>
					<TouchableOpacity
						style={styles.greyText}
						onPress={() => navigation.navigate("Signup")}
					>
						<Text style={styles.greyText}>No account ? Register</Text>
					</TouchableOpacity>
				</View>
			</View>
		</KeyboardAwareScrollView>
	);
};

export default SigninScreen;
