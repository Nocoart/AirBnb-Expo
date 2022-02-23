import React, { Component } from "react";
import { useRoute } from "@react-navigation/core";
import { View, Text, StyleSheet } from "react-native";

const ProfileScreen = () => {
	const { params } = useRoute();
	return (
		<View>
			<Text>user id : {params.userId}</Text>
		</View>
	);
};

export default ProfileScreen;
