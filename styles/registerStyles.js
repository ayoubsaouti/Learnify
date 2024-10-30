import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    // Conteneur général
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
        fontSize: 14,
    },
    
    flex: {
        flex: 1,  // Ajouté pour l'utilisation dans KeyboardAvoidingView
    },

    scrollContent: {
        flexGrow: 1,  // Ajouté pour le ScrollView
    },

    // Header avec le titre et fond bleu
    headerContainer: {
        backgroundColor: '#293133',
        width: '100%',
        paddingVertical: 40,
        alignItems: 'center',
        paddingTop: 100,
        marginBottom: 30,
    },

    titleWelcome: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
        alignSelf: 'center',
        marginBottom: 10,
    },

    titleRegister: {
        color: '#FFFFFF',
        alignSelf: 'center',
        marginBottom: 40,
    },

    // Conteneur principal du corps
    bodyContainer: {
        flexGrow: 1,
        marginLeft: 10,
        marginRight: 10,
    },

    // Wrapper pour les champs de saisie
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },

    placeHolder: {
        color: '#000000',
        fontSize: 16,
    },

    required: {
        color: '#FF0000',
        marginLeft: 5,
    },

    // Style des champs de saisie
    input: {
        height: 50,
        borderColor: '#293133',
        borderWidth: 2,
        borderRadius: 20,
        paddingHorizontal: 10,
        marginBottom: 20,
        backgroundColor: '#FFFFFF',
        color: '#293133',
        fontSize: 16,
    },

    // Bouton de connexion
    registerButton: {
        backgroundColor: '#293133',
        paddingVertical: 15,
        borderRadius: 20,
        alignItems: 'center',
        marginTop: 20,
    },

    registerButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },

    // Footer avec le texte d'inscription
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30,
    },

    registerNow: {
        textDecorationLine: 'underline',
        color: '#3973ad',
    },
});
