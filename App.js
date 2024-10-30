import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './app/Login';  // Page de login
import HomeScreen from './app/Home';  // Page d'accueil
import QuizzScreen from './app/Quizz';  // Page du quizz
import RegisterScreen from './app/Register'; // Page d'inscription
import FormScreen from './app/AddQuestion'; // Page pour le formulaire
import LeaderboardScreen from './app/Leaderboard'; // Page pour le classement
import LotteryScreen from './app/Lottery'; // Page pour la lotterie
import UserSelectionScreen from './app/UserSelection'; // Page pour l'envoie de trash




const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Quizz" component={QuizzScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AddQuestion" component={FormScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Leaderboard" component={LeaderboardScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Lottery" component={LotteryScreen} options={{ headerShown: false }} />
        <Stack.Screen name="UserSelection" component={UserSelectionScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};