import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform, Alert } from 'react-native';
import { firebase } from '../firebase/firebaseConfig';  // Assurez-vous d'importer correctement Firebase
import styles from '../styles/addQuestionStyles';  // Importe les styles

export default function AddQuestion({ navigation }) {
  const [question, setQuestion] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [wrongAnswer1, setWrongAnswer1] = useState('');
  const [wrongAnswer2, setWrongAnswer2] = useState('');
  const [wrongAnswer3, setWrongAnswer3] = useState('');

  const addQuestionToDatabase = async () => {
    if (question && correctAnswer && wrongAnswer1 && wrongAnswer2 && wrongAnswer3) {
      // Obtenir l'utilisateur actuellement connecté
      const currentUser = firebase.auth().currentUser;

      if (currentUser) {
        const userId = currentUser.uid; // Obtenir l'ID de l'utilisateur

        const questionData = {
          question,
          correctAnswer,
          wrongAnswers: [wrongAnswer1, wrongAnswer2, wrongAnswer3],
          createdBy: currentUser.email, // Ajouter l'email de l'utilisateur
        };

        try {
          // Ajouter à la base de données en temps réel
          await firebase.database().ref('questions/').push(questionData);

          // Incrémenter le champ QuestionsAdded pour l'utilisateur
          await firebase.database().ref(`users/${userId}`).child('QuestionsAdded').transaction(count => {
            return (count || 0) + 1; // Incrémente de 1, ou initialise à 1 si non défini
          });

          // Afficher une alerte de succès et rediriger vers la page d'accueil
          Alert.alert(
            "Succès",
            "Question ajoutée avec succès!",
            [{ text: "OK", onPress: () => navigation.navigate('Home') }]
          );

          // Réinitialiser les champs du formulaire
          setQuestion('');
          setCorrectAnswer('');
          setWrongAnswer1('');
          setWrongAnswer2('');
          setWrongAnswer3('');
        } catch (error) {
          console.error("Erreur lors de l'ajout de la question: ", error);
          Alert.alert("Erreur", "Erreur lors de l'ajout de la question.");
        }
      } else {
        Alert.alert("Non connecté", "Veuillez vous connecter pour ajouter une question.");
      }
    } else {
      Alert.alert("Champs manquants", "Veuillez remplir tous les champs.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          <Text style={styles.titleWelcome}>Ajouter une question</Text>
          
          {/* Champ Question */}
          <TextInput
            style={styles.input}
            placeholder="Entrez la question"
            value={question}
            onChangeText={setQuestion}
          />

          {/* Champ Bonne Réponse */}
          <TextInput
            style={styles.input}
            placeholder="Bonne réponse"
            value={correctAnswer}
            onChangeText={setCorrectAnswer}
          />

          {/* Champ Mauvaise Réponse 1 */}
          <TextInput
            style={styles.input}
            placeholder="Mauvaise réponse 1"
            value={wrongAnswer1}
            onChangeText={setWrongAnswer1}
          />

          {/* Champ Mauvaise Réponse 2 */}
          <TextInput
            style={styles.input}
            placeholder="Mauvaise réponse 2"
            value={wrongAnswer2}
            onChangeText={setWrongAnswer2}
          />

          {/* Champ Mauvaise Réponse 3 */}
          <TextInput
            style={styles.input}
            placeholder="Mauvaise réponse 3"
            value={wrongAnswer3}
            onChangeText={setWrongAnswer3}
          />

          {/* Bouton pour soumettre la question */}
          <TouchableOpacity style={styles.customButton} onPress={addQuestionToDatabase}>
            <Text style={styles.buttonText}>Ajouter la question</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
