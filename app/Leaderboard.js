import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { firebase } from '../firebase/firebaseConfig';
import styles from '../styles/leaderboardStyles';

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [currentLeaderboard, setCurrentLeaderboard] = useState('points');

  useEffect(() => {
    fetchLeaderboardData();
  }, [currentLeaderboard]);

  const fetchLeaderboardData = async () => {
    try {
      const snapshot = await firebase.database().ref('users').once('value');
      const data = snapshot.val();
      
      if (data) {
        const formattedData = Object.keys(data).map(key => ({
          id: key,
          name: data[key].email,
          points: data[key].score || 0,
          questionsAdded: data[key].QuestionsAdded || 0,
        }));

        if (currentLeaderboard === 'points') {
          formattedData.sort((a, b) => b.points - a.points);
        } else {
          formattedData.sort((a, b) => b.questionsAdded - a.questionsAdded);
        }

        setLeaderboardData(formattedData);
      } else {
        console.error('Aucune donnée trouvée dans la base de données.');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des données du classement :', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Leaderboard</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, currentLeaderboard === 'points' && styles.activeButton]}
          onPress={() => setCurrentLeaderboard('points')}
        >
          <Text style={[styles.buttonText, currentLeaderboard === 'points' && styles.activeButtonText]}>
            Points
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, currentLeaderboard === 'questionsAdded' && styles.activeButton]}
          onPress={() => setCurrentLeaderboard('questionsAdded')}
        >
          <Text style={[styles.buttonText, currentLeaderboard === 'questionsAdded' && styles.activeButtonText]}>
            Questions Proposées
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={leaderboardData}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.rank}>{index + 1}</Text>
            <Text style={styles.name}>{item.name}</Text>
            {currentLeaderboard === 'points' ? (
              <Text style={styles.score}>{item.points} point</Text>
            ) : (
              <Text style={styles.score}>{item.questionsAdded} Questions</Text>
            )}
          </View>
        )}
      />
    </View>
  );
};

export default Leaderboard;
