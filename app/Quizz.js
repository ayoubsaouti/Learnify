import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, Text, View, TouchableOpacity, Modal, Animated, ScrollView } from 'react-native';
import styles from '../styles/quizzStyles';
import { firebase, database } from '../firebase/firebaseConfig';

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const Quizz = ({ navigation }) => {
  const currentUser = firebase.auth().currentUser;
  const currentUserId = currentUser ? currentUser.uid : null;


  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalColor, setModalColor] = useState('green');
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quizEnded, setQuizEnded] = useState(false);
  const [timer, setTimer] = useState(20);
  const [isTimeExpired, setIsTimeExpired] = useState(false);
  const [ticketWon, setTicketWon] = useState(false);
  const [jokers, setJokers] = useState(0);
  const [isJokerUsed, setIsJokerUsed] = useState(false);
  const [isTrashActive, setIsTrashActive] = useState(false); 
  const [timerId, setTimerId] = useState(null);

  const questionOpacity = useRef(new Animated.Value(0)).current;
  const answerOpacity = useRef([]).current;
  const ticketAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!currentUserId) return;
  
    const fetchJokers = async () => {
      try {
        const userSnapshot = await database.ref(`users/${currentUserId}/joker`).once('value');
        const userJokers = userSnapshot.val();
        setJokers(userJokers || 0); // Met à jour avec le nombre de jokers ou 0 si non défini
      } catch (error) {
        console.error("Erreur lors de la récupération des jokers :", error);
      }
    };
  
    fetchJokers();
  }, [currentUserId]);

  
  useEffect(() => {
    if (!currentUserId || questions.length === 0 || isJokerUsed) return; // Ne pas démarrer le timer si un joker est utilisé
  
    const initializeTimer = async () => {
      const snapshot = await database.ref(`users/${currentUserId}/receivedTrash`).once('value');
      const receivedTrash = snapshot.val();
  
      // Définir le timer selon la valeur de receivedTrash
      if (receivedTrash) {
        setTimer(10); // Appliquer le trash avec un timer de 10 secondes
        setIsTrashActive(true); // Activer l'état de trash
      } else {
        setTimer(20); // Sinon, timer par défaut à 20 secondes
        setIsTrashActive(false); // Désactiver l'état de trash
      }
  
      // Démarrer le timer
      const id = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(id);
            setTimerId(null); // Réinitialiser l'ID du timer
            setFeedback('Trop tard !');
            setModalColor('red');
            setShowModal(true);
            setIsTimeExpired(true);
  
            database.ref(`users/${currentUserId}/AnsweredQuestions/${currentQuestion.questionId}`).set(true);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
  
      setTimerId(id); // Stocker l'ID du timer
      return () => clearInterval(timerId);
    };
  
    initializeTimer();
  }, [currentQuestionIndex, questions, isJokerUsed, currentUserId]);
  

  useEffect(() => {
    if (!currentUserId) return;

    const fetchQuestions = async () => {
      try {
        const currentUser = firebase.auth().currentUser;
        const currentUserId = currentUser.uid;
        const snapshot = await database.ref('questions').once('value');
        const data = snapshot.val();

        if (data) {
          const userSnapshot = await database.ref(`users/${currentUserId}/AnsweredQuestions`).once('value');
          const answeredQuestions = userSnapshot.val() || {};

          const fetchedQuestions = Object.keys(data).map((key) => {
            const questionData = data[key];
            const options = shuffleArray([questionData.correctAnswer, ...questionData.wrongAnswers]);

            return {
              questionId: key,
              question: questionData.question,
              options: options,
              correctAnswer: questionData.correctAnswer,
              createdBy: questionData.createdBy,
              isAnswered: !!answeredQuestions[key],
            };
          });

          // Exclure les questions créées par l'utilisateur
          const unansweredQuestions = fetchedQuestions.filter(
            (q) => !q.isAnswered && q.createdBy !== currentUser.email
          );

          setQuestions(unansweredQuestions);
          answerOpacity.current = unansweredQuestions.map(() => new Animated.Value(0));
        } else {
          console.error('Pas de données trouvées dans Firebase');
        }
      } catch (error) {
        console.error('Erreur lors du chargement des questions :', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const currentQuestion = questions[currentQuestionIndex];

  const animateQuestionAndAnswers = () => {
    questionOpacity.setValue(0);
    answerOpacity.forEach((anim) => anim.setValue(0));

    Animated.timing(questionOpacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    answerOpacity.forEach((anim, index) => {
      Animated.timing(anim, {
        toValue: 1,
        duration: 300,
        delay: index * 500,
        useNativeDriver: true,
      }).start();
    });
  };

  useEffect(() => {
    if (questions.length > 0) {
      animateQuestionAndAnswers();
    }
  }, [currentQuestionIndex, questions]);

  const animateTicketWon = () => {
    ticketAnimation.setValue(1);
    Animated.sequence([
      Animated.timing(ticketAnimation, {
        toValue: 1.2,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(ticketAnimation, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(() => setTicketWon(false));
  };

  const handleAnswerPress = (answer) => {
    if (isTimeExpired) return;
    const isCorrect = answer === currentQuestion.correctAnswer;

    const currentUserId = firebase.auth().currentUser.uid;
    database.ref(`users/${currentUserId}/AnsweredQuestions/${currentQuestion.questionId}`).set(true);

    if (isCorrect) {
      setFeedback('Bonne réponse !');
      setScore(score + 1);
      setModalColor('green');

      database.ref(`users/${currentUserId}/score`).transaction((currentScore) => (currentScore || 0) + 1);
      if (Math.random() < 0.2) {
        database.ref(`users/${currentUserId}/tickets`).transaction((currentTickets) => (currentTickets || 0) + 1);
        setFeedback('Bonne réponse ! Vous avez aussi gagné un ticket !');
        setTicketWon(true);
        animateTicketWon();
      }
    } else {
      setFeedback('Mauvaise réponse.');
      setModalColor('red');
    }
    setShowModal(true);
  };

  // Mise à jour de `receivedTrash` après chaque question
  const handleNextQuestion = async () => {
    setShowModal(false);
    setFeedback('');
    setIsTimeExpired(false);
    setIsJokerUsed(false);

    // Réinitialiser `receivedTrash` à `false` pour la prochaine question
    await database.ref(`users/${currentUserId}`).update({ receivedTrash: false });

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimer(20); // Réinitialiser le timer à 20s pour la question suivante
    } else {
      setQuizEnded(true);
      setFeedback(`Quiz terminé ! Votre score : ${score} / ${questions.length}`);
      setShowModal(true);
    }
  };

  const handleUseJoker = () => {
    if (jokers > 0 && !isJokerUsed) {
      setIsTimeExpired(false);
      setIsJokerUsed(true);
      setJokers(jokers - 1);

      // Arrêter le timer si un joker est utilisé
      if (timerId) {
        clearInterval(timerId);
        setTimerId(null); // Réinitialiser l'ID du timer
      }

      // Mettre le timer en mode illimité
      setTimer('Illimité');

      database.ref(`users/${currentUserId}`).update({ joker: jokers - 1 });
    }
  };

  if (loading) {
    return <Text style={styles.loadingText}>Chargement des questions...</Text>;
  }

  if (quizEnded || questions.length === 0) {
    return (
      <View style={styles.emptyStateContainer}>
        <Text style={styles.emptyStateText}>Aucune question disponible.</Text>
        <Text style={styles.subText}>Vous avez déjà répondu à toutes les questions.</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.backButton}>
          <Text style={styles.backButtonText}>Retour à l'accueil</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.timerWrapper}>
          <Text style={styles.timerText}>
            Temps restant : {isJokerUsed ? 'Illimité' : `${timer} s`}
          </Text>
          {isTrashActive && (
            <Text style={styles.trashNotification}>
              Vous avez reçu un trash ! Temps réduit pour cette question.
            </Text>
          )}
        </View>
        {ticketWon && (
          <Animated.View style={[styles.ticketWonMessage, { transform: [{ scale: ticketAnimation }] }]}>
            <Text style={styles.ticketWonText}>🎉 Vous avez gagné un ticket ! 🎉</Text>
          </Animated.View>
        )}
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.questionWrapper}>
            <Animated.View style={[styles.questionLabel, { opacity: questionOpacity }]}>
              <Text style={styles.questionText}>{currentQuestion?.question || "Question non disponible"}</Text>
            </Animated.View>
          </View>
          <View style={styles.answersWrapper}>
            {currentQuestion?.options.map((option, index) => (
              <Animated.View key={index} style={{ opacity: answerOpacity[index] }}>
                <TouchableOpacity
                  style={styles.answerButton}
                  onPress={() => handleAnswerPress(option)}
                  disabled={showModal || isTimeExpired}
                >
                  <Text style={styles.answerText}>{option}</Text>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
          <View style={styles.scoreWrapper}>
            <Text style={styles.scoreText}>Score de la série : {score}</Text>
          </View>
          <TouchableOpacity style={styles.jokerButton} onPress={handleUseJoker} disabled={isJokerUsed || jokers === 0}>
            <Text style={styles.jokerText}>Utiliser un Joker ({jokers} disponible{jokers > 1 ? 's' : ''})</Text>
          </TouchableOpacity>
        </ScrollView>
        <Modal visible={showModal} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={[styles.modalContent, { backgroundColor: modalColor }]}>
              <Text style={styles.feedbackText}>{feedback}</Text>
              <TouchableOpacity onPress={handleNextQuestion} style={styles.nextButton}>
                <Text style={styles.nextButtonText}>{quizEnded ? 'Retour à l\'accueil' : 'Question Suivante'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </View>
  );
};

export default Quizz;
