import {Button, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';



const Home = ({navigation , route}) => {


  return (
    <View style={styles.container}>
     
      <View style={styles.main}>
        
        <Text style={styles.title}> WELCOME {route.params.userName} </Text>

        <Text style={styles.subtitle}>  </Text>
      
        <Button title="Category" style={styles.button} onPress={() => navigation.navigate("Category", )}/>

        <Button title="Product" style={styles.button} onPress={() => navigation.navigate("Product")}/>
        <Button title="Stock" style={styles.button} onPress={() => navigation.navigate("Stock")}/>
        
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    maxWidth: 960,
    marginHorizontal:'auto'
  },
  title:{
    fontSize:48,
    fontWeight:'bold',
  },
  subtitle:{
    fontSize: 36,
    color:'#38434D'
  },
  button: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange',
    borderRadius: 5,
    marginTop: 25,
},



});

export default Home;