import React, { useState, useEffect }  from 'react';
import { AsyncStorage, KeyboardAvoidingView, Platform, View, Image, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

import api from '../services/api';

import logo from '../assets/logo.png';

export default function Login({ navigation }) {

    const [email, setEmail] = useState('');
    const [techs, setTechs] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            if(user){
                navigation.navigate('List');
            }
        });
    }, []);

    async function handleSubmit(){
        let _id = null;
        await api.post('/sessions', { email })
                .then(r => {
                        _id = r.data._id;
                });

        await AsyncStorage.setItem('user', _id);
        await AsyncStorage.setItem('techs', techs);

        navigation.navigate('List');
    }

    return (
        <KeyboardAvoidingView enabled = {Platform.OS === "ios"} behavior = "padding" style={styles.container}>
            <Image source={logo} />
            <View style={styles.form}>
                <Text style={styles.label}>SEU E-MAIL *</Text>
                <TextInput
                    style={styles.input}
                    placeholder= 'Seu e-mail'
                    placeholderTextColor= '#999'
                    keyboardType= 'email-address'
                    autoCapitalize = 'none'
                    autoCorrect = {true}
                    onChangeText = { setEmail } />
                <Text style={styles.label}>TECNOLOGIAS *</Text>
                <TextInput
                    style={styles.input}
                    placeholder= 'Tecnologias de interesse'
                    placeholderTextColor= '#999'
                    autoCapitalize = 'words'
                    value = { techs }
                    onChangeText = { setTechs }/>

                <TouchableOpacity style = {styles.button} onPress = {handleSubmit} >
                    <Text style = {styles.buttonText} >Encontrar Spots</Text>
                </TouchableOpacity>
                
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 180,
        // justifyContent: 'center',
        alignItems: 'center'
    },
    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        fontSize: 16,
        color: "#444",
        height: 44,
        marginBottom: 20,
        borderRadius: 2
    },
    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8
    },
    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    }
});