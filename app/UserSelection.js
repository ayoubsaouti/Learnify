import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { database, firebase } from '../firebase/firebaseConfig';
import styles from '../styles/userSelectionStyles';

const UserSelection = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [availableTrash, setAvailableTrash] = useState(0);
  const currentUser = firebase.auth().currentUser;

  useEffect(() => {
    const fetchUsersAndTrash = async () => {
      // Récupérer tous les utilisateurs
      const snapshot = await database.ref('users').once('value');
      const usersData = snapshot.val();
      const userList = Object.keys(usersData).map((key) => ({
        id: key,
        email: usersData[key].email,
      }));

      // Exclure l'utilisateur connecté
      setUsers(userList.filter(user => user.email !== currentUser.email));

      // Récupérer le nombre de "trash" de l'utilisateur actuel
      const currentUserSnapshot = await database.ref(`users/${currentUser.uid}`).once('value');
      const currentUserData = currentUserSnapshot.val();
      setAvailableTrash(currentUserData.trash || 0);
    };

    fetchUsersAndTrash();
  }, [currentUser]);

  const sendTrash = async (userId) => {
    // Vérifier si l'utilisateur a des "trash" disponibles
    if (availableTrash > 0) {
      try {
        // Envoyer un "trash" à l'utilisateur sélectionné
        await database.ref(`users/${userId}`).update({ receivedTrash: true });

        // Décrémenter le nombre de "trash" de l'utilisateur actuel
        const newTrashCount = availableTrash - 1;
        setAvailableTrash(newTrashCount);
        await database.ref(`users/${currentUser.uid}`).update({ trash: newTrashCount });

        Alert.alert('Succès', 'Trash envoyé avec succès !');
        navigation.goBack();
      } catch (error) {
        Alert.alert('Erreur', 'Échec de l\'envoi du trash.');
        console.error(error);
      }
    } else {
      Alert.alert('Aucun trash disponible', 'Vous n\'avez plus de trash disponible pour envoyer.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sélectionnez un utilisateur pour lui envoyer un trash</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.userItem} onPress={() => sendTrash(item.id)}>
            <Text style={styles.userEmail}>{item.email}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default UserSelection;
