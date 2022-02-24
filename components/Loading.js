import React, { Component } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import styles from "../StyleSheet";
const MyComponent = () => {
	return (
		<View style={styles.activityIndicator}>
			<ActivityIndicator size="large" color="#eb5b63" />
		</View>
	);
};

export default MyComponent;
