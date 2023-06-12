import axios from 'axios';
import { useState } from 'react';
import React from 'react';
import { Text, View, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';


export default function Register() {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const validate = () => {
        let result = true;
        if (email === '' || email === null) {
            result = false;
            alert('Please Enter Username');
        }
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
            result = false;
            alert('Invalid email address');
        }
        return result;
    }


    const dataPost = {
        name: name,
        surname: surname,
        userName: userName,
        email: email,
        password: password

    }

    const handleSave = () => {
        console.log("11");


        axios.post("https://9907-212-125-3-118.ngrok-free.app/api/User/Register", dataPost , {

        });
        alert("deneme")

    }

    return (
        <View style={styles.container}>
            <View style={styles.wrapperInput}>
                <TextInput
                    style={styles.input}
                    placeholder="name"
                    value={name}
                    onChangeText={text => setName(text)}
                />
            </View>

            <View style={styles.wrapperInput}>
                <TextInput
                    style={styles.input}
                    placeholder="surname"
                    value={surname}

                    onChangeText={text => setSurname(text)}
                />

            </View>

            <View style={styles.wrapperInput}>
                <TextInput
                    style={styles.input}
                    placeholder="userName"
                    value={userName}
                    onChangeText={text => setUserName(text)}
                />
            </View>

            <View style={styles.wrapperInput}>
                <TextInput
                    style={styles.input}
                    placeholder="email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
            </View>

            <View style={styles.wrapperInput}>
                <TextInput
                    style={styles.input}
                    placeholder="password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.text}>Register</Text>
            </TouchableOpacity>

        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 20,
    },
    wrapperInput: {
        borderWidth: 0.5,
        borderRadius: 5,
        borderColor: 'grey',
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        padding: 10,
        width: '100%',
    },
    wrapperIcon: {
        position: 'absolute',
        right: 0,
        padding: 10,
    },
    icon: {
        width: 30,
        height: 24,
    },
    button: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'orange',
        borderRadius: 5,
        marginTop: 25,
    },
    buttonDisable: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'grey',
        borderRadius: 5,
        marginTop: 25,
    },
    text: {
        color: 'white',
        fontWeight: '700',
    }
});