import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  // Conteneur général
  containerLogin: {
    flex: 1,
    backgroundColor: '#F2F2F2', // Couleur de fond
    fontSize: 14,
  },
  
  flex: {
    flex: 1,
  },
  
  scrollContent: {
    flexGrow: 1,
  },

  // Header avec le titre et fond bleu
  headerContainer: {
    backgroundColor: '#293133', // Couleur de fond
    width: '100%', // Prend toute la largeur
    paddingVertical: 40, // Rembourrage vertical
    alignItems: 'center', // Centre le contenu horizontalement
    paddingTop: 100,
    marginBottom: 30, // Espacement sous le carré
  },

  titleWelcome: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF', // Texte blanc
    alignSelf: 'center',
    marginBottom: 10, // Espacement en bas du titre
  },

  titleLogin: {
    color: '#FFFFFF', // Texte blanc
    alignSelf: 'center',
    marginBottom: 40, // Espacement en bas du sous-titre
  },

  // Conteneur principal du corps
  bodyContainer: {
    flexGrow: 1,
    marginLeft: 10,
    marginRight: 10,
  },

  // Wrapper pour les champs de saisie
  inputWrapper: {
    flexDirection: 'row', // Aligner horizontalement
    alignItems: 'center', // Centre verticalement les éléments
    marginBottom: 10,
  },

  placeHolder: {
    color: '#000000', // Couleur noire pour le texte de l'invite
    fontSize: 16, // Taille de police pour plus de visibilité
  },

  required: {
    color: '#FF0000', // Rouge pour indiquer que le champ est requis
    marginLeft: 5, // Espacement à gauche
  },

  // Style des champs de saisie
  input: {
    height: 50, // Hauteur du champ de texte
    borderColor: '#293133', // Bordure de couleur bleue
    borderWidth: 2, // Épaisseur de la bordure
    borderRadius: 20, // Bordures arrondies
    paddingHorizontal: 10, // Espacement intérieur horizontal
    marginBottom: 20, // Espacement en bas
    backgroundColor: '#FFFFFF', // Fond blanc
    color: '#000000', // Texte gris
    fontSize: 16, // Taille de police
  },

  passwordContainer: {
    flexDirection: 'row', // Aligner le texte et l'icône horizontalement
    alignItems: 'center', // Centrer verticalement
    borderColor: '#293133', // Couleur de la bordure bleue
    borderWidth: 2, // Largeur de la bordure
    borderRadius: 20, // Bordures arrondies
    paddingHorizontal: 10, // Espacement intérieur sur les côtés
    marginBottom: 20, // Espacement en bas pour séparer des autres éléments
    backgroundColor: '#FFFFFF', // Fond blanc pour le champ
  },

  // Champ de texte à l'intérieur du conteneur de mot de passe
  inputPassword: {
    flex: 1, // Prendre tout l'espace restant à l'intérieur du conteneur
    height: 50, // Hauteur du champ de texte
    fontSize: 16, // Taille du texte
    color: '#000000', // Couleur du texte
    paddingLeft: 10, // Espacement intérieur à gauche
  },

  // Icône pour afficher/masquer le mot de passe
  iconShow: {
    paddingHorizontal: 10, // Espacement autour de l'icône
  },

  // Bouton de connexion
  loginButton: {
    backgroundColor: '#293133', // Couleur bleue
    paddingVertical: 15, // Rembourrage vertical
    borderRadius: 20, // Coins arrondis
    alignItems: 'center', // Centrer le texte
    marginTop: 20, // Marge supérieure
  },

  loginButtonText: {
    color: '#FFFFFF', // Texte blanc
    fontSize: 18, // Taille de police
    fontWeight: 'bold', // Gras
  },

  // Footer avec le texte d'inscription
  footer: {
    flexDirection: 'row', // Aligner horizontalement
    justifyContent: 'center', // Centrer le contenu
    marginTop: 30, // Espacement en haut
  },

  registerNow: {
    textDecorationLine: 'underline', // Texte souligné
    color: '#3973ad',
  },
});
