import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';



export default function Login() {
    const [userName, usernameupdate] = useState('');
    const [password, passwordupdate] = useState('');
    const [tokenjwt] = useState('');
    const [usr] = useState('');




    const handleLogin = () => {
        console.log("11");
        let inputobj = {
            "usr": usr,
            "username": userName,
            "password": password,
            "tokenjwt": tokenjwt
        }
        fetch("https://65b1-212-125-3-118.ngrok-free.app/api/User/login", {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(inputobj)


        }).then(resp => {

            console.log(resp)
          /*  AsyncStorage.setItem('UserId', resp.usr)
            AsyncStorage.setItem('tokenjwt', resp.tokenjwt);
            AsyncStorage.setItem('username', userName)*/
            console.log(userName)
            alert("successs");

        }).catch((err) => {
            alert('Login Failed due to :' + err.message);
        });

    }


    return (
        <View style={styles.container}>
            <View style={styles.wrapperInput}>
                <TextInput
                    style={styles.input}
                    placeholder="userName"
                    value={userName}
                    onChangeText={text => usernameupdate(text)}
                />
            </View>

            <View style={styles.wrapperInput}>
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}

                    onChangeText={text => passwordupdate(text)}
                />

            </View>

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.text}>Login</Text>
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
    },
    textFailed: {
        alignSelf: 'flex-end',
        color: 'red',
    },
});