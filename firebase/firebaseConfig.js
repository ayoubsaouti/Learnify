import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';       // Pour l'authentification
import 'firebase/compat/database';   // Pour la base de données en temps réel

const firebaseConfig = {
  apiKey: "AIzaSyDsglO_-zZZ6kG2pFqLPRmeQOs84Yx6tbQ",
  authDomain: "learnify-44177.firebaseapp.com",
  projectId: "learnify-44177",
  databaseURL: "https://learnify-44177-default-rtdb.europe-west1.firebasedatabase.app",
  storageBucket: "learnify-44177.appspot.com",
  messagingSenderId: "208924064608",
  appId: "1:208924064608:android:3645705bf76b57d2d30c05"
};

// Initialiser Firebase seulement si aucune instance n'est déjà active
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Optionnel : Tu peux créer des références pour les services Firebase fréquemment utilisés ici
const auth = firebase.auth();         // Authentification Firebase
const database = firebase.database(); // Base de données en temps réel Firebase

// Exporter les services Firebase nécessaires
export { firebase, auth, database };
