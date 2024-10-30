import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#293133', // Couleur de fond blanche
    padding: 20,
  },

  flex: {
    flex: 1,
  },
  
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center', // Centrer le contenu si nécessaire
  },
  
  titleWelcome: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff', // Texte GRIS pour le titre
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#FFFFFF', // Bordure bleue
    borderWidth: 2,
    borderRadius: 20, // Bordures arrondies
    paddingHorizontal: 10, // Espacement intérieur
    marginBottom: 20, // Espacement entre les champs
    backgroundColor: '#f2f2f2',
    color: '#293133', // Texte gris
    fontSize: 16,
    width: '100%', // Largeur complète
  },
  customButton: {
    backgroundColor: '#f2f2f2', // Couleur GRIS pour le bouton
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 50, // Coins arrondis
    alignItems: 'center',
    width: '100%', // Largeur complète du bouton
    marginTop: 20,
  },
  buttonText: {
    color: '#293133', // Texte blanc
    fontSize: 18,
    fontWeight: 'bold',
  },
  alertMessage: {
    fontSize: 16,
    color: '#e9e1bf', // Couleur rouge pour les alertes
    marginTop: 20,
    textAlign: 'center',
  },
});
