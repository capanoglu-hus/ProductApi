
import React, { useEffect, useState } from "react";
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
  FlatList,
  AntDesign,
  StatusBar,Surface,
  Title
} from "react-native";

const Stock = () =>   {

  const [modalProduct, setmodalProduct] = useState(false);

  const [stockId, setStockId] = useState();
  const [product_id, setProduct_id] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [status, setStatus] = useState(true);
  const [createUserId, setCreateUserId] = useState([]);
  const [updateUserId, setUpdateUserId] = useState([]);

  const [stocks, setStocks] = useState([]);
  const [visible, setVisible] = useState(false);


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


  const getStock = () => {
    fetch("https://9907-212-125-3-118.ngrok-free.app/api/Stock/GetStock", {
    method: "GET",
    headers: {
      //     Accept: 'application/json',
      //    'Content-Type': 'application/json',
    }
  }).then(res => {
    return res.json();
    console.log(res)
  }).then(stocks => {

    setStocks(stocks)
  }).catch(err => {
    console.log(err)
  })
}

  useEffect(() => {
    getStock();
  }, [])

  const handleRemove = (stockId) => {
    axios.delete("https://65b1-212-125-3-118.ngrok-free.app/api/Stock/AddStock" + stockId, {
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
 

   const handleSave = () => {
    axios.post("https://65b1-212-125-3-118.ngrok-free.app/api/Stock/AddCategory", dataPost, {

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



  const handleUpdate = () => {
    axios.patch("https://65b1-212-125-3-118.ngrok-free.app/api/Stock/UpdateStock/" + stocks.find((u) => u.stockId === stockId).stockId || stockId, dataUpdated, {
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
  const handleCreate = () => {
    setmodalProduct(true)
  }

  const handleCloseModal = () => {
    setmodalProduct(false)
  }

  const handleEdit = (stocks) => {

    setStockId(stocks.stockId);
    setProduct_id(stocks.product_id);
    setQuantity(stocks.quantity);
    setStatus(stocks.status);
    setUpdateUserId(stocks.updateUserId);
    setCreateUserId(stocks.createUserId);
    setmodalProduct(true);
  }


  return (
    <SafeAreaView>
    <Modal
      visible={modalProduct}
    >
      <SafeAreaView>
        <View style={[styles.rowBetween, { paddingHorizontal: 10 }]}>
          <Text style={styles.txtClose} >NEW PRODUCT</Text>
          <TouchableOpacity onPress={handleCloseModal}>
            <Text style={styles.txtClose}>Close</Text>
          </TouchableOpacity>
        </View>
        <View style={{ paddingHorizontal: 10 }}>
          <Text> STOCK ID</Text>
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

    <View style={styles.rowBetween}>

      <TouchableOpacity style={{ padding: 15, color: "blue" }} onPress={handleCreate}>
        <Text style={{ color: "green" }} > NEW </Text>
      </TouchableOpacity>

    </View>

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

              <TouchableOpacity onPress={() => handleEdit(item.stockId)} >
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