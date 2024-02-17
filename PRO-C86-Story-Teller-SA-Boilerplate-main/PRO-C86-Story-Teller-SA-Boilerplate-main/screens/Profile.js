import React, { Component } from 'react';
import { StyleSheet, Text, View, Switch, SafeAreaView, Platform, StatusBar, Image,} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

SplashScreen.preventAutoHideAsync();
import firebase from "firebase";
let customFonts = {
	'Bubblegum-Sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
};

export default class Profile extends Component {
	constructor(props) {
		super(props);
		 this.state = {
			fontsLoaded: false,
			isEnabled:false,
			light_theme:true,
			name:"",
			
		};
	}
 toggleSwitch(){
	const previous_state=this.state.isEnabled
	const theme=!this.state.isEnabled?"dark":"light"
	var updates= {}
	updates["/users/"+firebase.auth().currentUser.uid+"/current_theme"]=theme
	firebase.database().ref().update(updates)
	this.setState({isEnabled:!previous_state,light_theme:previous_state})
 }
	async _loadFontsAsync() {
		await Font.loadAsync(customFonts);
		this.setState({ fontsLoaded: true });
	}

	componentDidMount() {
		this._loadFontsAsync();
		this.fetchUser();
	}
async fetchUser() {
	let theme,name,image
	await firebase
	.database()
	.ref("/users/"+ firebase.auth().currentUser.uid)
	.oan("value",function(snapshot){
		theme=snapshot.val().current_theme
		name=`${snapshot.val().first_name} ${snapshot.val().first_name}`
	})
	this.setState({
		light_theme:theme==="light"?true:false,
		isEnabled:theme==="light"?false:true,
		name:name
	})
}
	render() {
		if (this.state.fontsLoaded) {
			SplashScreen.hideAsync();
			return (
				<View style={this.state.light_theme?styles.containerLight:styles.container}>
					<SafeAreaView styles={styles.droidSafeArea}/>
					<View style={styles.appTitle}>
					<View style={styles.appIcon}>
						<Image source={require("../assets/logo.png")}styles={styles.iconImage}></Image>
						</View>
						<View style={styles.appTitleTextContainer}>
							<Text style={this.state.light_theme?styles.appTitleTextLight:styles.appTitleText}>storytelling app</Text>
						</View>
					</View>
					<View style={styles.screenContainer}>
					<View style={styles.profileImageContainer}>
						<Image source={require("../assets/profile_img.png")}styles={styles.profileImage}></Image>
						
					
							<Text style={this.state.light_theme?styles.nameTextLight:styles.nameText}>{this.state.name}</Text>
							</View>
							<View style={styles.themeContainer}>
							<Text style={this.state.light_theme?styles.themeTextLight:styles.themeText}>dark theme</Text>
							<Switch style={{transform:[{scaleX:1.3},{scaleY:1.3}]}}
							trackcolor={{false:"white",
						true:this.state.light_theme?"#eee":"white"}}
						thumbcolor={this.state.isEnabled?"blue":"purple"}
						ios_backgroundColor="red"
						onValueChange={()=>this.toggleSwitch}
						value={this.state.isEnabled}
						/>
						</View>
				<View style={{flex:0.3}}/>
				</View>
				<View style={{flex:0.08}}/>
				</View>
			);
		}
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
