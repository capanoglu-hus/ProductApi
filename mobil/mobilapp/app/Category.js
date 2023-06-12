import React, { useEffect, useState } from 'react';

import {DeleteOutlined } from '@ant-design/icons';
import axios from 'axios'

import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,

} from "react-native";
const Category = () => {

  const [modalProduct, setmodalProduct] = useState(false);
  const [categorys, setCategorys] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState([]);

  const [createUserId, setCreateUserId] = useState([]);
  const [updateUserId, setUpdateUserId] = useState([]);


  useEffect(() => {
    getCategory();
  }, [])

  const getCategory = () => {
    fetch("https://9907-212-125-3-118.ngrok-free.app/api/Category/GetCategory", {
      method: "GET",
      headers: {
        //     Accept: 'application/json',
        //    'Content-Type': 'application/json',
      }
    }).then(res => {
      return res.json();
      console.log(res)
    }).then(categorys => {

      setCategorys(categorys)
    }).catch(err => {
      console.log(err)
    })
  }

  const handleRemove = (categoryId) => {
    axios.delete("https://9907-212-125-3-118.ngrok-free.app/api/Category/DeleteCategory/" + categoryId, {
    });
    alert("Category deleted Successfully");
    console.log("denmee");
    setCategoryId("");
    setName("");
    setDescription("");
    setStatus("");
    setUpdateUserId("");
    setCreateUserId("");
    getCategory();
  }

  const handleCreate = () => {
    setmodalProduct(true)
  }

  const handleCloseModal = () => {
    setmodalProduct(false)
  }

  const dataPost = {
    name: name,
    description: description,
    status: status,
    createUserId: createUserId,
    updateUserId: updateUserId,

  }

  const handleSave = () => {
    axios.post("https://9907-212-125-3-118.ngrok-free.app/api/Category/AddCategory", dataPost, {

    });

    alert("save success");
    setName("");
    setDescription("");
    setStatus("");
    setUpdateUserId("");
    getCategory();
    setmodalProduct(false);
    clearFrom();


  }

  const dataUpdated = {
    categoryId: categoryId,
    name: name,
    description: description,
    status: status,
    createUserId: createUserId,
    updateUserId: updateUserId,

  }

  const handleUpdate = () => {
    axios.patch("https://9907-212-125-3-118.ngrok-free.app/api/Category/UpdateCategory/" + categorys.find((u) => u.categoryId === categoryId).categoryId || categoryId, dataUpdated, {

    });
    alert("Category Updated");
    setCategoryId();
    setName();
    setDescription();
    setStatus();
    setUpdateUserId();
    setCreateUserId();


    getCategory();
  }

  const clearFrom = () => {
    setCategoryId("");
    setName("");
    setDescription("");
    setStatus("");
    setUpdateUserId("");
    setCreateUserId("");
  }

  const handleEdit = (categorys) => {

    setCategoryId(categorys.categoryId);
    setName(categorys.name);
    setDescription(categorys.description);
    setStatus(categorys.status);
    setUpdateUserId(categorys.updateUserId);
    setCreateUserId(categorys.createUserId);
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
            <Text> category ID</Text>
            <TextInput
              style={styles.textInput}
              placeholder={"categoryId"}
              value={categoryId}
              onChangeText={(text) => {
                setCategoryId(text)
              }}
            />
            <Text> category Name </Text>
            <TextInput
              style={styles.textInput}
              placeholder={"Name"}
              value={name}
              onChangeText={(text) => {
                setName(text)
              }}
            />
            <Text> category Description</Text>
            <TextInput
              style={styles.textInput}
              placeholder={"Description"}
              value={description}
              onChangeText={(text) => {
                setDescription(text)
              }}
            />
            <Text> category status</Text>
            <TextInput
              style={styles.textInput}
              placeholder={"status"}
              value={status}
              onChangeText={(text) => {
                setStatus(text)
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

        <TouchableOpacity style={{ padding: 15, color: "green" }} onPress={handleCreate}>
          <Text style={{ color: "green" }  } > NEW </Text>
        </TouchableOpacity>

      </View>

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 12
        }}>
        <Text style={styles.txtMain}> List category </Text>
        {categorys.map((item, index) => {
          return (
            <View style={styles.row} key={index}>

              <Text style={styles.txtName}> CATEGORY ID : {item.categoryId}</Text>
              <Text style={styles.txtName}> Name : {item.name}</Text>
              <Text style={styles.txtNormal}> Description : {item.description}</Text>
              <Text style={styles.txtNormal} > Status : {item.status}</Text>
              <Text style={styles.txtNormal} > Created Date : {item.createdDate}</Text>
              <Text style={styles.txtNormal} > Updated Date : {item.updatedDate}</Text>
              <Text style={styles.txtNormal} > Create UserId :{item.createUserId}</Text>
              <Text style={styles.txtNormal} > Update UserId : {item.updateUserId}</Text>
              <View style={styles.rowBetween}>

                <TouchableOpacity onPress={() => handleEdit(item.categoryId)} >
                  <Text style={styles.txtedit}
                  >EDİT</Text>
                  
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleRemove(item.categoryId)}>
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

export default Category;

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