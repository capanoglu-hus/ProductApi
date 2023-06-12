
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Text,
  SafeAreaView,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput
} from "react-native";

const Product = () => {

  const [modalProduct, setmodalProduct] = useState(false);


  const [productId, setProductId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState([]);
  const [status, setStatus] = useState([]);
  const [isApproved, setIsApproved] = useState(true);
  const [category_Id, setCategory_Id] = useState([]);
  const [products, setProducts] = useState([]);
  const [createUserId, setCreateUserId] = useState([]);
  const [updateUserId, setUpdateUserId] = useState([]);




  useEffect(() => {
    getProduct();
  }, [])

  const getProduct = () => {
    fetch("https://9907-212-125-3-118.ngrok-free.app/api/Product/GetProduct", {
      method: "GET",
      headers: {
        //     Accept: 'application/json',
        //    'Content-Type': 'application/json',
      }
    }).then(res => {
      return res.json();
      console.log(res)
    }).then(products => {

      setProducts(products)
    }).catch(err => {
      console.log(err)
    })
  }


  const handleRemove = (productId) => {
    axios.delete("https://9907-212-125-3-118.ngrok-free.app/api/Product/DeleteProduct/" + productId , {


    });
    alert("Product deleted Successfully");
    console.log("denmee");
    setProductId("");
    setName("");
    setDescription("");
    setPrice("");
    setStatus("");
    setIsApproved("");
    setCategory_Id("");
    setUpdateUserId("");
    setCreateUserId("");
    getProduct();
  }

  const handleCreate = () => {
    setmodalProduct(true)
  }
  const dataPost = {

    name: name,
    description: description,
    price: price,
    status: status,
    isApproved: isApproved,
    category_Id: category_Id,
    createUserId: createUserId,
    updateUserId: updateUserId,

  }
  const dataUpdated = {
    productId: productId,
    name: name,
    description: description,
    price: price,
    status: status,
    isApproved: isApproved,
    category_Id: category_Id,
    createUserId: createUserId,
    updateUserId: updateUserId,

  }

  const handleCloseModal = () => {
    setmodalProduct(false)
  }

  const handleSave = () => {
    axios.post("https://9907-212-125-3-118.ngrok-free.app/api/Product/AddProduct", dataPost, {

    });
    alert("product Registation Successfully");
    setName("");
    setDescription("");
    setPrice("");
    setStatus("");
    setIsApproved("");
    setCategory_Id("");
    setUpdateUserId("");
    setCreateUserId("");
    clearFrom();

    getProduct();

  }


  const handleUpdate = () => {
    fetch("https://9907-212-125-3-118.ngrok-free.app/api/Product/UpdateProduct/" + products.find((u) => u.productId === productId).productId || productId, dataUpdated, {

    });
    alert("Product Update Successfully");
    setProductId();
    setName();
    setDescription();
    setPrice();
    setStatus();

    setIsApproved();
    setCategory_Id();
    setUpdateUserId();
    setCreateUserId();

    getProduct();

  }

  const clearFrom = () => {
    setProductId(null);
    setName("");
    setDescription("");
    setPrice("");
    setStatus("");
    setIsApproved("");
    setCategory_Id("");
    setUpdateUserId("");
    setCreateUserId("");
  }

  const handleEdit = (products) => {

    setProductId(products.productId);
    setName(products.name);
    setDescription(products.description);
    setPrice(products.price);
    setStatus(products.status);
    setIsApproved(products.isApproved);
    setCategory_Id(products.category_Id);
    setUpdateUserId(products.updateUserId);
    setCreateUserId(products.createUserId);
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
            <Text> Product ID</Text>
            <TextInput
              style={styles.textInput}
              placeholder={"ID"}
              value={productId}
              onChangeText={(text) => {
                setProductId(text)
              }}
            />
            <Text> Product Name </Text>
            <TextInput
              style={styles.textInput}
              placeholder={"Name"}
              value={name}
              onChangeText={(text) => {
                setName(text)
              }}
            />
            <Text> Product Description</Text>
            <TextInput
              style={styles.textInput}
              placeholder={"Description"}
              value={description}
              onChangeText={(text) => {
                setDescription(text)
              }}
            />
            <Text> Product Price</Text>
            <TextInput
              style={styles.textInput}
              placeholder={"Price"}
              value={price}
              onChangeText={(text) => {
                setPrice(text)
              }}
            />

            <Text> Product Status</Text>
            <TextInput
              style={styles.textInput}
              placeholder={"Status"}
              value={status}
              onChangeText={(text) => {
                setStatus(text)
              }}
            />

            <Text> Product CategoryId</Text>
            <TextInput
              style={styles.textInput}
              placeholder={"CategoryId"}
              value={category_Id}
              onChangeText={(text) => {
                setCategory_Id(text)
              }}
            />

            <Text> Product UpdateUserId</Text>
            <TextInput
              style={styles.textInput}
              placeholder={"UpdateUserId"}
              value={updateUserId}
              onChangeText={(text) => {
                setUpdateUserId(text)
              }}
            />
            <Text> Product CreateUserId</Text>
            <TextInput
              style={styles.textInput}
              placeholder={"CreateUserId"}
              value={createUserId}
              onChangeText={(text) => {
                setCreateUserId(text)
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
          <Text style={{ color: "blue" }} >NEW</Text>
        </TouchableOpacity>

      </View>

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 10
        }}
      >
         <Text style={styles.txtMain}>List product </Text>
        {products.map((pro, productId) => {
          return (
            <View style={styles.row} key={productId}>
          

              
                <Text style={styles.txtName}> ProductId : {pro.productId}</Text>
                <Text style={styles.txtName}  > Name : {pro.name}</Text>
                <Text style={styles.txtNormal}> Description : {pro.description}</Text>
                <Text style={styles.txtNormal} > Price : {pro.price}</Text>
                <Text style={styles.txtNormal} > Status : {pro.status}</Text>
                <Text style={styles.txtNormal} > Category Id : {pro.category_Id}</Text>
                <Text style={styles.txtNormal} > Category Name : {pro.categoryName}</Text>
                <Text style={styles.txtNormal} > IsApproved : {pro.isApproved}</Text>
                <Text style={styles.txtNormal} > Updated Date : {pro.updatedDate}</Text>
                <Text style={styles.txtNormal} > Created Date : {pro.createdDate}</Text>
                <Text style={styles.txtNormal} > Create UserId : {pro.createUserId}</Text>
                <Text style={styles.txtNormal} > Update UserId : {pro.updateUserId}</Text>

             
              
              <View style={styles.rowBetween}>
                <TouchableOpacity onPress={() => handleRemove}>
                  <Text style={styles.txtdelete}> DELETE </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleEdit}>
                  <Text style={styles.txtedit}>EDİT</Text>
                </TouchableOpacity>
              </View>


            </View>
          )
        })}

      </ScrollView>
    </SafeAreaView>
  )
}

export default Product;

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