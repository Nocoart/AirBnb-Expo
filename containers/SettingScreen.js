import React, { Component } from "react";
import { Button, Text, View } from "react-native";

const SettingScreen = ({ setToken }) => {
	return (
		<View>
			<Text>Hello Settings</Text>

			<Button
				title="Log Out"
				onPress={() => {
					setToken(null);
				}}
			/>
		</View>
	);
};

export default SettingScreen;
