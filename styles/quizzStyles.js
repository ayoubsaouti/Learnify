// quizzStyles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#293133',
  },
  safeArea: {
    flex: 1,
  },
  timerWrapper: {
    alignItems: 'center',
    marginVertical: 20,
  },
  timerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff', // Couleur blanc pour le timer
  },
  questionWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  questionLabel: {
    backgroundColor: '#F2F2F2',
    borderRadius: 15,
    paddingVertical: 20,
    paddingHorizontal: 30,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  questionText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#293133', // Couleur du texte de la question
  },
  answersWrapper: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  answerButton: {
    backgroundColor: '#F2F2F2',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  answerText: {
    fontSize: 18,
    color: '#293133', // Couleur du texte des réponses
  },
  scoreWrapper: {
    alignItems: 'center',
    padding: 20,
    justifyContent: 'center',
    flex: 1,
  },
  scoreText: {
    fontSize: 18,
    color: 'white',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fond semi-transparent
  },
  modalContent: {
    width: '80%',
    padding: 20,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  feedbackText: {
    fontSize: 24,
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  nextButton: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  nextButtonText: {
    fontSize: 18,
    color: '#1E1E2C',
  },
  resultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  resultsText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    padding: 20,
  },
  emptyStateText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#293133',
    textAlign: 'center',
  },
  subText: {
    fontSize: 18,
    color: '#686868',
    textAlign: 'center',
    marginVertical: 10,
  },
  backButton: {
    backgroundColor: '#293133',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 50,
    marginTop: 20,
  },
  backButtonText: {
    color: '#F2F2F2',
    fontSize: 18,
    fontWeight: 'bold',
  },

  ticketWonMessage: {
    position: 'absolute',
    top: '5%', // Ajuster pour centrer verticalement par rapport au haut
    left: '10%', // Centrage horizontal
    right: '10%', // Centrage horizontal
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFD700', // Jaune pour un effet festif
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    zIndex: 10,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  
  ticketWonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#293133',
  },

  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  jokerButton: {
    backgroundColor: '#FFD700',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  jokerText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  trashNotification: {
    color: '#FF0000', // Couleur rouge pour le texte
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#FFF3F3', // Fond léger rouge
    borderRadius: 5,
    borderColor: '#FF0000', // Bordure rouge
    borderWidth: 1,
  },
});
