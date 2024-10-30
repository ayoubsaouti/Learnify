import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import styles from '../styles/registerStyles'; // Importer les styles depuis votre fichier CSS
import { firebase } from '../firebase/firebaseConfig'; 

const Register = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        if (email === '' || password === '' || confirmPassword === '') {
            Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Erreur', 'Les mots de passe ne correspondent pas.');
            return;
        }

        setLoading(true);

        try {
            // Crée un nouvel utilisateur avec Firebase Authentication
            const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
            const userId = userCredential.user.uid; // Obtenir l'ID de l'utilisateur

            // Ajouter l'utilisateur à la base de données
            await firebase.database().ref(`users/${userId}`).set({
                email: email,
                score: 0,
                AnsweredQuestions: {} // Initialiser un objet vide pour les questions répondues

            });

            Alert.alert('Succès', 'Compte créé avec succès!');
            navigation.navigate('Home');
        } catch (error) {
            setLoading(false);
            let errorMessage = 'Une erreur est survenue lors de l\'inscription.';

            if (error.code === 'auth/email-already-in-use') {
                errorMessage = 'Cet email est déjà utilisé.';
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = 'L\'adresse email n\'est pas valide.';
            } else if (error.code === 'auth/weak-password') {
                errorMessage = 'Le mot de passe est trop faible.';
            } else {
                // Gérer les erreurs d'ajout à la base de données
                console.error('Erreur lors de l\'ajout de l\'utilisateur à la base de données :', error);
            }

            Alert.alert('Erreur', errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.flex}  // Utilise styles pour flex
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.container}>
                    {/* Carré bleu au-dessus du titre */}
                    <View style={styles.headerContainer}>
                        <Text style={styles.titleWelcome}>Bienvenue sur Learnify</Text>
                        <Text style={styles.titleRegister}>Créer un compte pour continuer</Text>
                    </View>

                    <View style={styles.bodyContainer}>
                        {/* Champ pour Email */}
                        <View style={styles.inputWrapper}>
                            <Text style={styles.placeHolder}>Email :</Text> 
                            <Text style={styles.required}> *</Text>
                        </View>

                        <TextInput
                            style={styles.input}
                            placeholder="Votre email"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={email}
                            onChangeText={setEmail}
                        />

                        {/* Champ pour Mot de passe */}
                        <View style={styles.inputWrapper}>
                            <Text style={styles.placeHolder}>Mot de passe :</Text>
                            <Text style={styles.required}> *</Text>
                        </View>

                        <TextInput
                            style={styles.input}
                            placeholder="Votre mot de passe"
                            secureTextEntry={true}
                            value={password}
                            onChangeText={setPassword}
                        />

                        {/* Champ pour confirmer Mot de passe */}
                        <View style={styles.inputWrapper}>
                            <Text style={styles.placeHolder}>Confirmer votre mot de passe :</Text>
                            <Text style={styles.required}> *</Text>
                        </View>

                        <TextInput
                            style={styles.input}
                            placeholder="Confirmer votre mot de passe"
                            secureTextEntry={true}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />

                        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                            <Text style={styles.registerButtonText}>
                                {loading ? 'Inscription...' : 'S\'inscrire'}
                            </Text>
                        </TouchableOpacity>

                        <View style={styles.footer}>
                            <Text>Déjà inscrit ?</Text>
                            <Text style={styles.registerNow} onPress={() => navigation.navigate('Login')}>
                                Je me connecte!
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default Register;
