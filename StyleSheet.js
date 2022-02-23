import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	activityIndicator: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	headerLogo: {
		height: 50,
		width: 50,
		marginTop: 32,
		alignSelf: "center",
	},
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

	//CAROUSSEL

	carouselCard: {
		width: "90%",
		flex: 1,
		alignSelf: "center",
	},
	carouselPictureContainer: {
		height: 200,
	},
	carouselPicture: {
		height: "100%",
		flex: 1,
		width: "100%",
	},
	carouselPrice: {
		color: "white",
		fontSize: 20,
		width: 100,
		textAlign: "center",
		backgroundColor: "black",
		position: "absolute",
		bottom: 10,
		paddingVertical: 10,
	},
	carouselDetails: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginVertical: 10,
	},
	carouselDetailsText: {
		paddingRight: 60,
	},
	carouselTitle: {
		fontSize: 18,
		marginTop: 10,
	},
	carouselRateContainer: {
		flexDirection: "row",
		marginVertical: 10,
		alignItems: "center",
	},

	carouselRate: {
		flexDirection: "row",
	},

	reviewNumber: {
		color: "#AAA",
		paddingLeft: 10,
	},

	carouselAccountPicture: {
		width: 60,
		height: 60,
		borderRadius: 30,
		marginLeft: -60,
	},

	carouselDivider: {
		height: 1,
		backgroundColor: "#DDD",
		marginBottom: 30,
	},

	//ROOMSCREEN

	roomScreenPictureContainer: {
		height: 300,
	},

	roomScreenPicture: {
		height: "100%",
		flex: 1,
		width: "100%",
	},

	roomScreenDetails: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginVertical: 10,
		marginHorizontal: 20,
	},
	roomScreenDescription: {
		marginVertical: 10,
		marginHorizontal: 20,
	},
	justifyText: { textAlign: "justify" },
});

export default styles;
