import React, { useState } from "react";
import {
	View,
	Text,
	Image,
	TextInput,
	TouchableOpacity,
	ActivityIndicator,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "../StyleSheet";
import axios from "axios";

const SigninScreen = ({ navigation }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [description, setDescription] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const handleSubmit = async () => {
		try {
			if (!email || !username || !description || !password || !confirmPassword)
				window.alert("all fields must be filled");
			else if (password !== confirmPassword)
				window.alert("Passwords aren't matching");
			else {
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
				console.log(response.data);
				setIsLoading(false);
			}
		} catch (error) {
			console.log(error.message);
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

					<TextInput
						style={styles.formInput}
						secureTextEntry={true}
						placeholder="password"
						onChangeText={(text) => setPassword(text)}
					/>
					<View style={styles.formDivider}></View>
					<TextInput
						style={styles.formInput}
						secureTextEntry={true}
						placeholder="confirm password"
						onChangeText={(text) => setConfirmPassword(text)}
					/>
					<View style={styles.formDivider}></View>

					<View style={styles.buttonContainer}>
						<Text
							style={
								password === confirmPassword
									? { color: "transparent" }
									: styles.orangeText
							}
						>
							Passwords must be the same
						</Text>
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
