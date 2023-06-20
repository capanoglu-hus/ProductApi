
import React, { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'

import {
  Text,
  SafeAreaView,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";

const Stock = () =>   {

 

  const [stockId, setStockId] = useState();
  const [product_id, setProduct_id] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [status, setStatus] = useState(true);
  const [createUserId, setCreateUserId] = useState([]);
  const [updateUserId, setUpdateUserId] = useState([]);

  const [stocks, setStocks] = useState([]);
  const [visible,setViisble] = useState(false);

  const dataPost = {

    product_id: product_id,
  
    quantity: quantity,
    createUserId: createUserId,
    updateUserId: updateUserId,
  }
  const dataUpdated = {
    stockId: stockId,
    product_id: product_id,
    status: status,
    quantity: quantity,
    createUserId: createUserId,
    updateUserId: updateUserId,

  }


  const getStock = async() => {
     const jsonValue = await AsyncStorage.getItem('tokenjwt')
    const tokenjwt = JSON.parse(JSON.stringify(jsonValue))
    console.log(tokenjwt);
    fetch("https://31e0-188-119-43-231.ngrok-free.app/api/Stock/GetStock", {
    method: "GET",
      headers: {
      "Authorization": "bearer " + tokenjwt
    }
  }).then(res => {
    return res.json();
    console.log(res)
  }).then(stocks => {

    setStocks(stocks)
  }).catch(err => {
    console.log(err)
    alert(err)
  })
}

  useEffect(() => {
    getStock();
  }, [])

  const handleRemove = async(stockId) => {
      const jsonValue = await AsyncStorage.getItem('tokenjwt')
    const tokenjwt = JSON.parse(JSON.stringify(jsonValue))
    axios.delete("https://31e0-188-119-43-231.ngrok-free.app/api/Stock/DeleteStock/" + stockId, {
       headers: {
        "Authorization": "bearer " + tokenjwt
      }
  })
  .catch(err => {
    console.log(err)
    alert(err)
  });
  alert("Stock deleted Successfully");
   
  setStockId("");
  setProduct_id("");
  setQuantity("");

  setStatus("");

  setUpdateUserId("");
  setCreateUserId("");

  getStock();

  }
 

   const handleSave = async () => {
      const jsonValue = await AsyncStorage.getItem('tokenjwt')
    const tokenjwt = JSON.parse(JSON.stringify(jsonValue))
    axios.post("https://31e0-188-119-43-231.ngrok-free.app/api/Stock/AddStock", dataPost, {
    headers: {
        "Authorization": "bearer " + tokenjwt
      }
    }).catch(err => {
      console.log(err)
      alert(err)
    });
    alert("Stock Registation Successfully");

    setProduct_id("");
    setQuantity("");

    setStatus("");

    setUpdateUserId("");
    setCreateUserId("");

    clearFrom();

    getStock();
  }



  const handleUpdate = async() => {
    const jsonValue = await AsyncStorage.getItem('tokenjwt')
    const tokenjwt = JSON.parse(JSON.stringify(jsonValue))
    axios.patch("https://31e0-188-119-43-231.ngrok-free.app/api/Stock/UpdateStock/" +  stockId, dataUpdated, {
       headers: {
        "Authorization": "bearer " + tokenjwt
      }
  }).catch(err => {
    console.log(err)
    alert(err)
  });
  alert("stock Updated");
  setStockId();
  setProduct_id();
  setQuantity();

  setStatus();

  setUpdateUserId();
  setCreateUserId(); 
  }

  const clearFrom = () => {
    setStockId("");
    setProduct_id("");
    setQuantity("");
    setStatus("");
    setUpdateUserId("");
    setCreateUserId("");
  }
 

  const handleEdit = (item) => {
    setViisble(true)
    setStockId(item.stockId+"");
    setProduct_id(item.product_id+"");
    setQuantity(item.quantity+"");
    setStatus(item.status);
    setUpdateUserId(item.updateUserId+"");
    setCreateUserId(item.createUserId+"");
   
  }
  const handleVisibleModal = () => {
    setViisble(!visible)

}


  return (
    <SafeAreaView>
    <View style={[styles.rowBetween, { paddingHorizontal: 10 }]}>
      <TouchableOpacity

      >
        <Text style={styles.textButton}></Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleVisibleModal}
        style={styles.btnContainer}
      >
        <Text style={styles.txtClose}>New STOCK</Text>
      </TouchableOpacity>
    </View>
    <Modal
      animationType="slide"
      visible={visible}
    >
      <SafeAreaView>

        <TouchableOpacity
          onPress={handleVisibleModal}
        >
          <Text style={styles.txtClose}>
            Close
          </Text>
        </TouchableOpacity>
        <View style={{ paddingHorizontal: 10 }}>
        <Text> STOCK ID </Text>
          <TextInput
            style={styles.textInput}
            placeholder={"stockId"}
            value={stockId}
            onChangeText={(text) => {
              setStockId(text)
            }}
          />
          <Text> STOCK product_id </Text>
          <TextInput
            style={styles.textInput}
            placeholder={"product_id"}
            value={product_id}
            onChangeText={(text) => {
              setProduct_id(text)
            }}
          />
          <Text> STOCK quantity</Text>
          <TextInput
            style={styles.textInput}
            placeholder={"quantity"}
            value={quantity}
            onChangeText={(text) => {
              setQuantity(text)
            }}
          />
         

          <Text> category createUserId</Text>
          <TextInput
            style={styles.textInput}
            placeholder={"createUserId"}
            value={createUserId}
            onChangeText={(text) => {
              setCreateUserId(text)
            }}
          />

          <Text> category updateUserId</Text>
          <TextInput
            style={styles.textInput}
            placeholder={"updateUserId"}
            value={updateUserId}
            onChangeText={(text) => {
              setUpdateUserId(text)
            }}
          />


          <TouchableOpacity onPress={handleSave} style={styles.btnContainer}>
            <Text style={styles.txtClose}>SAVE</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleUpdate} style={styles.btnContainer}>
            <Text style={styles.txtClose}>EDİT</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>

    

    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 10
      }}>
      <Text style={styles.txtMain}> List STOCK </Text>
      {stocks.map((item, index) => {
        return (
          <View style={styles.row} key={index}>

            <Text style={styles.txtName}> STOCK ID : {item.stockId}</Text>
            <Text style={styles.txtName}> Product ID : {item.product_id}</Text>
            <Text style={styles.txtNormal} > Quantity : {item.quantity}</Text>
            <Text style={styles.txtNormal} > Status : {item.status}</Text>
            <Text style={styles.txtNormal} > CreatedDate : {item.createdDate}</Text>
            <Text style={styles.txtNormal} > UpdatedDate : {item.updatedDate}</Text>
            <Text style={styles.txtNormal} > CreateUserId : {item.createUserId}</Text>
            <Text style={styles.txtNormal} > UpdateUserId : {item.updateUserId}</Text>
            <View style={styles.rowBetween}>

              <TouchableOpacity onPress={() => handleEdit(item)} >
                <Text style={styles.txtedit}
                >EDİT</Text>
                
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleRemove(item.stockId)}>
                <Text style={styles.txtdelete}>DELETE</Text>
              
              </TouchableOpacity>
            </View>


          </View>

        )
      })}
    </ScrollView>
  </SafeAreaView >
)
}

export default Stock;

const styles = StyleSheet.create({
rowBetween: {
  flexDirection: "row",
  justifyContent: "space-between",
  paddingVertical: 10,
  borderBottomWidth: 1,
  borderBottomColor: "#888"
},
txtMain: {
  fontSize: 16,
  fontWeight: "bold",
  padding: 10
},
txtName: {
  fontSize: 16,
  fontWeight: "bold"
},
txtNormal: {
  fontSize: 14,
  fontWeight: "#444"
},
txtdelete: {
  color: "red"
},
txtedit: {
  color: "green"
},
txtClose: {
  color: "gray",
  fontSize: 16,
  fontWeight: "bold"
},
textInput: {
  padding: 10,
  border: 1,
  borderColor: "#888",
  marginBottom: 10
},
btnContainer: {
  borderWidth: 1,
  borderColor: "gray",
  padding: 10,
  backgroundColor: "black",
  textAlign: 'center',
  justifyContent: 'center',
  alignItems: 'center'
},
})
