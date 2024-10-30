import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { firebase } from '../firebase/firebaseConfig';
import { useFocusEffect } from '@react-navigation/native'; // Importer useFocusEffect
import styles from '../styles/homeStyles';

const SquareButton = ({ imageSource, buttonText, onPress }) => {
  return (
    <TouchableOpacity style={styles.buttonHome} onPress={onPress}>
      <Image source={imageSource} style={styles.imageHome} />
      <Text style={styles.buttonTextHome}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

const Home = ({ navigation }) => {
  const user = firebase.auth().currentUser;
  const [score, setScore] = useState(0);
  const [tickets, setTickets] = useState(0);
  const [jokers, setJokers] = useState(0);
  const [trash, setTrash] = useState(0);

  const fetchUserData = async () => {
    if (user) {
      const userId = user.uid;

      // Récupérer le score
      const scoreSnapshot = await firebase.database().ref(`users/${userId}/score`).once('value');
      const userScore = scoreSnapshot.val() || 0;
      setScore(userScore);

      // Récupérer le nombre de tickets
      const ticketsSnapshot = await firebase.database().ref(`users/${userId}/tickets`).once('value');
      const userTickets = ticketsSnapshot.val() || 0;
      setTickets(userTickets);

      // Récupérer le nombre de jokers
      const jokersSnapshot = await firebase.database().ref(`users/${userId}/joker`).once('value');
      const userJokers = jokersSnapshot.val() || 0;
      setJokers(userJokers);

      // Récupérer le nombre de "trash"
      const trashSnapshot = await firebase.database().ref(`users/${userId}/trash`).once('value');
      const userTrash = trashSnapshot.val() || 0;
      setTrash(userTrash);
    }
  };

  // Utiliser useFocusEffect pour récupérer les données à chaque focus de la page
  useFocusEffect(
    React.useCallback(() => {
      fetchUserData();
    }, [user])
  );

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      console.log('Utilisateur déconnecté avec succès');
      navigation.navigate('Login');
    } catch (error) {
      console.error("Erreur lors de la déconnexion : ", error);
      Alert.alert('Erreur', 'Une erreur est survenue lors de la déconnexion.');
    }
  };

  return (
    <View style={styles.containerHome}>
      <View style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.titleWelcome}>Bienvenue</Text>
            <Text style={styles.titleLogin}>{user.email}</Text>

            <View style={styles.resourceContainer}>
              {/* Ticket */}
              <View style={styles.resourceItem}>
                <Image source={require('../img/ticket.png')} style={styles.resourceIcon} />
                <Text style={styles.resourceText}>x {tickets}</Text>
              </View>
              
              {/* Joker */}
              <View style={styles.resourceItem}>
                <Image source={require('../img/joker.png')} style={styles.resourceIcon} />
                <Text style={styles.resourceText}>x {jokers}</Text>
              </View>
              
              {/* Trash */}
              <View style={styles.resourceItem}>
                <TouchableOpacity style={styles.resourceItem} onPress={() => navigation.navigate('UserSelection')}>
                  <Image source={require('../img/trash.png')} style={styles.resourceIcon} />
                  <Text style={styles.resourceText}>x {trash}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          
          <Image 
            source={require('../img/quiz.png')}
            style={styles.headerImage}
          />
        </View>
      </View>

      <View style={styles.bodyContainerHome}>
        <View style={styles.buttonRow}>
          <SquareButton 
            imageSource={require('../img/play.gif')} 
            buttonText="Jouer" 
            onPress={() => navigation.navigate('Quizz')} 
          />
          <SquareButton 
            imageSource={require('../img/addQuestion.gif')} 
            buttonText="Ajouter une question" 
            onPress={() => navigation.navigate('AddQuestion')} 
          />
        </View>

        <View style={styles.buttonRow}>
          <SquareButton 
            imageSource={require('../img/podium.gif')} 
            buttonText="Classement" 
            onPress={() => navigation.navigate('Leaderboard')}  
          />
          <SquareButton 
            imageSource={require('../img/lotterie.gif')} 
            buttonText="Lotterie" 
            onPress={() => navigation.navigate('Lottery')} 
          />
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Se déconnecter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;
