import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Animated, Alert, Image } from 'react-native';
import styles from '../styles/lotteryStyles';
import { firebase } from '../firebase/firebaseConfig';

const Lottery = () => {
  const scrollAnim = useRef(new Animated.Value(0)).current;
  const [isScrolling, setIsScrolling] = useState(false);
  const images = [require('../img/joker.png'), require('../img/trash.png')];
  const giftImage = require('../img/gift.gif'); // Image de cadeau par défaut
  const [displayedImage, setDisplayedImage] = useState(giftImage); // Image affichée par défaut
  const [tickets, setTickets] = useState(0); // Stockage des tickets
  const scrollInterval = useRef(null); // Pour stocker l'intervalle de défilement

  useEffect(() => {
    const fetchTickets = async () => {
      const currentUserId = firebase.auth().currentUser.uid;
      const ticketRef = firebase.database().ref(`users/${currentUserId}/tickets`);
      
      ticketRef.on('value', (snapshot) => {
        const ticketCount = snapshot.val() || 0;
        setTickets(ticketCount);
      });
    };

    fetchTickets();
  }, []);

  const startScroll = () => {
    if (isScrolling) return;

    // Vérifier si l'utilisateur a des tickets
    if (tickets <= 0) {
      Alert.alert("Information", "Vous ne possédez pas de ticket.");
      return;
    }

    // Décrémenter le nombre de tickets dans Firebase
    const currentUserId = firebase.auth().currentUser.uid;
    firebase.database().ref(`users/${currentUserId}/tickets`).transaction((currentTickets) => {
      if ((currentTickets || 0) > 0) {
        return currentTickets - 1;
      } else {
        Alert.alert("Information", "Vous ne possédez pas de ticket.");
        setIsScrolling(false);
        return currentTickets; // Pas de modification si 0 ticket
      }
    });

    // Commencer le défilement
    setIsScrolling(true);
    let currentIndex = 0;
    scrollInterval.current = setInterval(() => {
      currentIndex = (currentIndex + 1) % images.length;
      setDisplayedImage(images[currentIndex]);
    }, 100);

    // Arrêter l'animation après X secondes
    setTimeout(() => {
      clearInterval(scrollInterval.current);
      setIsScrolling(false);

      // Choisir aléatoirement `joker` ou `trash` comme gain final
      const resultIndex = Math.floor(Math.random() * images.length);
      const resultImage = images[resultIndex];
      setDisplayedImage(resultImage);

      // Mettre à jour la base de données pour le gain
      const gainType = resultIndex === 0 ? 'joker' : 'trash';
      firebase.database().ref(`users/${currentUserId}/${gainType}`).transaction((currentCount) => {
        return (currentCount || 0) + 1;
      });

      Alert.alert(
        "Bravo !",
        resultIndex === 0 ? "Vous avez gagné un Joker ! \n\nUtilisez le pour avoir un temps illimité sur une question!" 
        : "Vous avez gagné un Trash !\n\nEnvoyez le à un utilisateur afin de réduire son timer à sa prochaine question !"
      );
    }, 3000); // Durée totale du défilement en millisecondes
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Roulette</Text>
        <Text style={styles.tickets}>Tickets restants : {tickets}</Text>
      </View>

      <View style={styles.imageContainer}>
        <Image source={displayedImage} style={styles.image} />
      </View>

      <TouchableOpacity style={styles.spinButton} onPress={startScroll}>
        <Text style={styles.spinButtonText}>Tourner la roulette</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Lottery;
