import React, { useState } from 'react'
import { Text , TextInput,View,StyleSheet, Image, TouchableOpacity} from 'react-native'
import axios from 'axios';
const EditCart = ({navigation,route}) => {
    const { item } = route.params;
    const [textName,setTextName]=useState('');
    const [textPrice,setTextPrice]=useState(0);

    const updateAPIData = (id) => {
        axios.put(`https://6347859cdb76843976acdaff.mockapi.io/api/buoi07/cartItem/${id}`, {
          "name":`${textName}`,
          "price":`${textPrice}`,
          "avatar":`${item.avatar}`,
        })
    
    }
  return (
    
    <View style={styles.container}>
        <Text>This is Edit Cart Screen</Text>
        <Text>{item.id}</Text>
        <TextInput placeholder={item.name} onChangeText={(textName) => setTextName(textName)}></TextInput>
        <TextInput placeholder={item.price} onChangeText={(textPrice) => setTextPrice(textPrice)} ></TextInput>
        <Image style={styles.bigLogo}
        source={{uri:item.avatar }}></Image>
        <TouchableOpacity style={styles.buttonStyle} onPress={()=>updateAPIData(item.id)}>
            <Text>UPDATE</Text>
        </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
    },
    functions:{
      flex:1,
      marginTop:30,
      marginBottom:100,
    },
    tinyLogo:{
      width:15,
      height:15,
    },
    bigLogo:{
      width:64,
      height:64,
    },
    listView:{
      marginTop:30,
      flex:1,
    },
    buttonStyle:{
      flexDirection:'row',
      backgroundColor:'orange',
      width:'60%',
      height:100,
      alignItems:'center',
      fontSize:30,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#fff',
      marginTop:20,
    },
      itemStyle:{
        backgroundColor:'lightgray',
        width:110,
        height:'auto',
        justifyContent:'center',
        alignItems:'center',
        fontSize:30,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff'},
        textStyle:{
          fontSize:25,
        flex:1,
        },
    lines:{
      marginTop:15,
      marginBottom:15,
      flex:1,
    },
    bottom:{
      flex:1,
      flexDirection:'row',
    }
  });
export default EditCart;
