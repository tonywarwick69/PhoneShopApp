import  React from 'react'
import {View, Button,Text,StyleSheet,TouchableOpacity,Image} from 'react-native'
import axios from 'axios';

 const Details = ({navigation,route}) => {
  const { item } = route.params;
  const handleSubmitData = (item) =>{
    console.log('check value:',item);
    axios.post('https://6347859cdb76843976acdaff.mockapi.io/api/buoi07/cartItem',{
      "name":`${item.name}`,
      "price":`${item.price}`,
      "avatar":`${item.avatar}`,
      
    }).then((response)=>{
      console.log("Here's what you upload: ",response.data)
    })
    .catch((err)=>{
      console.log(err);
    })
  }
  return (
    <View style={styles.container}>
      <View style={styles.itemStyle}>
        <View style={styles.resultList} key={item.id}  onPress={()=> navigation.navigate('Details',item)}>
        <View style={styles.leftList}>
        <Text style={{fontSize:25}}>{item.id}.</Text>
        <Text style={{fontSize:25}}> {item.name}</Text>
        <Image
        style={styles.bigLogo}
        source={{uri:item.avatar }}></Image>
        </View>
        </View>
       
      </View>
    <View style={styles.lines}>
        <Text style={styles.textStyle}>WHAT WERE MADE OF</Text>
          <Text style={styles.textStyle}>SHIPPING</Text>
    </View>
        
      <View style={styles.bottom}>
        <Text style={{fontSize:25}}> ${item.price}</Text>
        <TouchableOpacity style={styles.buttonStyle} onPress={()=>handleSubmitData(item)}>
        <Image
            style={styles.tinyLogo}
            source={require('../assets/v.png')}
          />
          <Text style={styles.textStyle}>Add to cart</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={()=> navigation.navigate('CartView')}>
        <Text>CHECK CART</Text>
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
export default Details;
