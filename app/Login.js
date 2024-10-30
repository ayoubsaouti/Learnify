import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import styles from '../styles/loginStyles'; // Importer les styles depuis le fichier CSS
import { Ionicons } from "@expo/vector-icons";
import { firebase } from '../firebase/firebaseConfig'; 

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (email === '' || password === '') {
            Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
            return;
        }

        setLoading(true);

        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
            navigation.navigate('Home'); 
        } catch (error) {
            setLoading(false);
            let errorMessage = 'Une erreur est survenue lors de la connexion.';
            
            if (error.code === 'auth/invalid-email') {
                errorMessage = "L'adresse email n'est pas valide.";
            } else if (error.code === 'auth/user-not-found') {
                errorMessage = "Aucun utilisateur trouvé avec cet email.";
            } else if (error.code === 'auth/wrong-password') {
                errorMessage = "Le mot de passe est incorrect.";
            }
            
            Alert.alert('Erreur', errorMessage);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.flex}  // Utilise styles pour flex
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.containerLogin}>
                    {/* Carré bleu au-dessus du titre */}
                    <View style={styles.headerContainer}>
                        <Text style={styles.titleWelcome}>Bienvenue sur Learnify</Text>
                        <Text style={styles.titleLogin}>Connectez-vous pour continuer</Text>
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

                        <View style={styles.passwordContainer}>
                            <TextInput
                                style={styles.inputPassword}
                                placeholder="Votre mot de passe"
                                secureTextEntry={!isPasswordShown}
                                value={password}
                                onChangeText={setPassword}
                            />
                            <TouchableOpacity style={styles.iconShow} onPress={() => setIsPasswordShown(!isPasswordShown)}>
                                {isPasswordShown ? (
                                    <Ionicons name="eye-off" size={24} color="#293133" />
                                ) : (
                                    <Ionicons name="eye" size={24} color="#293133" />
                                )}
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                            <Text style={styles.loginButtonText}>
                                {loading ? 'Connexion...' : 'Connexion'}
                            </Text>
                        </TouchableOpacity>

                        <View style={styles.footer}>
                            <Text>Pas encore inscrit ?</Text>
                            <Text style={styles.registerNow} onPress={() => navigation.navigate('Register')}>
                                Je m'inscris !
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default Login;
