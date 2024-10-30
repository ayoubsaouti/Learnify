// homeStyles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  containerHome: {
    flex: 1,
    backgroundColor: '#F2F2F2', // Couleur de fond blanche
  },
  headerContainer: {
    backgroundColor: '#293133', // Couleur de fond noir
    width: '100%', // Prend toute la largeur
    paddingVertical: 30, // Rembourrage vertical
    marginBottom: 20, // Espacement sous le carré
  },
  headerContent: {
    flexDirection: 'row', // Disposer le texte et l'image en ligne
    alignItems: 'center', // Centre le contenu verticalement
    justifyContent: 'space-between', // Espace entre le texte et l'image
    width: '90%', // Limite la largeur pour le contenu
    alignSelf: 'center', // Centre le contenu dans le conteneur
  },
  headerTextContainer: {
    marginRight: 'auto', // Permet de pousser l'image à droite
  },
  titleWelcome: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF', // Texte blanc
    marginBottom: 10,
    marginTop: 43,
  },
  titleLogin: {
    fontSize: 20,
    color: '#FFFFFF', // Texte blanc
    marginBottom: 40, // Espacement en bas
  },
  resourceContainer: {
    flexDirection: 'row', // Disposer les ressources en ligne
    alignItems: 'center',
    marginTop: 2,
  },
  resourceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10, // Espacement entre chaque ressource
  },
  resourceIcon: {
    width: 33, // Largeur de l'icône de la ressource
    height: 33, // Hauteur de l'icône de la ressource
    marginRight: 1, // Espacement entre l'icône et le texte
  },
  resourceText: {
    fontSize: 16,
    color: '#ffffff', // Couleur du texte de la ressource
    fontWeight: 'bold',
  },
  bodyContainerHome: {
    flexGrow: 1,
    alignItems: 'center', // Centre le contenu horizontalement
    justifyContent: 'flex-start', // Aligne vers le haut
    padding: 20,
  },
  buttonRow: {
    flexDirection: 'row', // Disposer les boutons en ligne
    justifyContent: 'space-between', // Espace entre les boutons
    width: '100%', // Largeur du conteneur de boutons
    marginBottom: 20, // Espacement entre les lignes de boutons
  },
  buttonHome: {
    width: 100, // Largeur du bouton carré
    height: 100, // Hauteur du bouton carré
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // Couleur de fond du bouton
    borderRadius: 10, // Coins arrondis
    margin: 30, // Espacement autour du bouton
    borderColor: '#293133', // Couleur du contour (noir)
    borderWidth: 2, // Épaisseur du contour
  },
  imageHome: {
    width: 70, // Largeur de l'image
    height: 57, // Hauteur de l'image
    marginBottom: 5, // Espacement entre l'image et le texte
  },
  headerImage: {
    width: 120, // Largeur de l'image à droite
    height: 120, // Hauteur de l'image à droite
  },
  buttonTextHome: {
    color: '#000000', // Couleur du texte
    textAlign: 'center',
  },
  logoutButton: {
    marginTop: 20, // Ajoute un espace au-dessus du bouton
    padding: 12, 
    backgroundColor: '#293133', // Couleur de fond
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 250,
    alignSelf: 'center',
  },
  logoutText: {
    color: '#f2f2f2', // Couleur du texte
    fontSize: 16,
    fontWeight: 'bold',
  },
  scoreText: {
    fontSize: 18, // Ajustez la taille de la police selon vos besoins
    color: '#fff', // Couleur du texte
    marginVertical: 5, // Espacement vertical
  },
});
