// leaderboardStyles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#293133',
    padding: 30,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeButton: {
    backgroundColor: '#e9e1bf',
  },
  buttonText: {
    color: '#293133',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  activeButtonText: {
    color: '#293133', // Couleur pour le texte du bouton actif
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    alignItems: 'center',
  },
  rank: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#293133',
    width: 40,
    textAlign: 'center',
  },
  name: {
    flex: 1,
    fontSize: 16,
    color: '#293133',
    textAlign: 'center',
  },
  score: {
    fontSize: 18,
    color: '#293133',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default styles;
