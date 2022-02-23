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
	const { passwordVisibility, rightIcon, handlePasswordVisibility } =
		useTogglePasswordVisibility();

	const navigation = useNavigation();

	const [errorMessage, setErrorMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [description, setDescription] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const handleSubmit = async () => {
		try {
			if (!email || !username || !description || !password || !confirmPassword)
				setErrorMessage("Please fill all fields");
			else if (password !== confirmPassword)
				setErrorMessage("Passwords aren't matching");
			else {
				setErrorMessage("");
				const data = {
					email: email,
					username: username,
					description: description,
					password: password,
				};
				setIsLoading(true);
				const response = await axios.post(
					"https://express-airbnb-api.herokuapp.com/user/sign_up",
					data
				);
				console.log(response.data.token);
				setToken(response.data.token);
				setIsLoading(false);
			}
		} catch (error) {
			setIsLoading(false);
			setErrorMessage(error.response.data.error);
		}
	};

	return isLoading ? (
		<ActivityIndicator />
	) : (
		<KeyboardAwareScrollView>
			<View style={styles.signinScreen}>
				<View style={styles.logoContainer}>
					<Image
						source={require("../assets/img/logo.png")}
						style={styles.logo}
					/>
					<Text style={styles.h1}>Sign up</Text>
				</View>
				<View style={styles.formContainer}>
					<TextInput
						style={styles.formInput}
						placeholder="email"
						onChangeText={(text) => setEmail(text)}
					/>
					<View style={styles.formDivider}></View>
					<TextInput
						style={styles.formInput}
						placeholder="username"
						onChangeText={(text) => setUsername(text)}
					/>
					<View style={styles.formDivider}></View>
					<TextInput
						style={styles.formInputTextArea}
						multiline={true}
						numberOfLines={5}
						placeholder="Describe yourself in a few words..."
						onChangeText={(text) => setDescription(text)}
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
					<View style={styles.passwordInput}>
						<TextInput
							style={styles.formInput}
							secureTextEntry={passwordVisibility}
							placeholder="confirm password"
							onChangeText={(text) => setConfirmPassword(text)}
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
						onPress={() => navigation.navigate("Signin")}
					>
						<Text style={styles.greyText}>
							Already have an account ? Sign in
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</KeyboardAwareScrollView>
	);
};

export default SigninScreen;
