import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	signinScreen: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "white",
	},

	signinScreen: {
		justifyContent: "center",
		alignItems: "center",
		marginTop: 80,
	},

	h1: {
		color: "#777",
		fontSize: 24,
		fontWeight: "bold",
		textAlign: "center",
	},
	logo: {
		width: 150,
		height: 150,
	},
	signInFormContainer: {
		marginTop: 100,
	},
	formInput: {
		width: 300,
		height: 40,
	},

	passwordInput: {
		flexDirection: "row",
		width: 300,
	},

	formInputTextArea: {
		borderColor: "#ffbac0",
		borderWidth: 1,
		height: 100,
		width: 300,
		textAlignVertical: "top",
		justifyContent: "flex-start",
		textAlign: "left",
	},

	formDivider: {
		height: 1,
		width: 300,
		backgroundColor: "#ffbac0",
		marginBottom: 30,
	},

	buttonContainer: {
		alignItems: "center",
		marginTop: 50,
	},
	orangeText: {
		color: "#EB5B63",
		paddingBottom: 10,
	},
	button: {
		borderColor: "#EB5B63",
		justifyContent: "center",
		borderWidth: 3,
		width: 200,
		height: 50,
		borderRadius: 40,
	},

	buttonText: {
		textAlign: "center",
		color: "#777",
		fontSize: 18,
	},

	greyText: {
		marginTop: 10,
		color: "#777",
		textAlign: "center",
	},
});

export default styles;
