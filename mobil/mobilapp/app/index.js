import { StyleSheet, Text, View } from "react-native";
import { Link } from 'expo-router';

export default function Page() {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        
        <Text style={styles.title}> WELCOME WORLD</Text>
        <Text style={styles.subtitle}> first page </Text>
        <Link href="/Login" style={styles.link} > Login </Link>
        <Link href="/Register" style={styles.link} > Register </Link>
        <Link href="/Category" style={styles.link} > Category </Link>
        <Link href="/Product" style={styles.link} > Product </Link>
        <Link href="/Stock" style={styles.link} > Stock </Link>
        
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
  link:{
    fontSize:20,
    marginVertical:10,
    fontWeight:'bold',
    textDecorationStyle:'underline',
  },



});