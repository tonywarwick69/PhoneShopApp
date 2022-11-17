import { StatusBar } from 'expo-status-bar';
import { useState,useEffect } from 'react';
import { StyleSheet, Text, View,Image, TextInput, TouchableOpacity ,ActivityIndicator,FlatList} from 'react-native';
import filter from 'lodash.filter';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from 'axios';
import { MaterialIcons } from '@expo/vector-icons';

 const CartView = ({navigation,route}) => {
  //if loaded show data else show loading circle
  const [isLoading,setLoading]=useState(true);
  //declare data as array[]
  const [data,setData]=useState([])
  const [filterData,setFilterData]= useState([]);
  //delcare text as empty string
  const [text,setText]= useState('');
  //show or hide View when TextInput onClick
  const [shouldShow, setShouldShow] = useState(true);
  const [avatar,setAvatar]=useState('')
  const [search, setSearch] = useState('');
  /*
  const getData = async () =>{
   try{
     const response= await fetch(`https://6347859cdb76843976acdaff.mockapi.io/api/buoi07/bag`);
     //convert data you get to json data
     const json= await response.json();
     setData(json);
     
     //const selected = data => data.reduce((keys, json) => keys.concat(Object.keys(json).filter(key => keys.avatar.indexOf(key) === -1)), [])
    
     //console.log(`Data:`,json);
   } catch(error){
     console.log(error);
 }  finally{
   setLoading(false);
 }
 }
 */
  /*The useEffect Hook allows you to perform side effects in your components. 
 Some examples of side effects are: fetching data, directly updating the DOM, and timers. 
 useEffect accepts two arguments. 
 The second argument is optional*/
 /*
 useEffect(()=>{
    getData();
  }, []);
*/
 

  //
  const fetchData = ()=>{
   try {
    const apiURL = 'https://6347859cdb76843976acdaff.mockapi.io/api/buoi07/cartItem';
    fetch(apiURL)
    .then((response) => response.json())
    .then((responseJson)=>{
      setFilterData(responseJson)
      setData(responseJson)
    }).catch((error)=>{
      console.log(error);
    })
   } catch (error) {
    console.log(error);
   } finally{
    setLoading(false);
  }
}
   //search
   useEffect(()=>{
    fetchData();
    return () =>{

    }
  }, [])

const searchFilter = (text) =>{
  if(text){
    const newData = data.filter((item) =>{
      const itemData= item.name ? item.name.toUpperCase()
          : ''.toUpperCase();
      const textData= text.toUpperCase();
      return itemData.indexOf(textData)>-1;
    });
    setFilterData(newData);
    setSearch(text);

  } else {
    setFilterData(data);
    setSearch(text);
  }
}
 
 
  //delete
  const onDelete = (id) =>{
    axios.delete(`https://6347859cdb76843976acdaff.mockapi.io/api/buoi07/cartItem/${id}`)
    .then((response)=>{
      console.log(`List after delete id ${id}: `,response.data)
      
    })
    .catch((err)=>{
      console.log(err)
    })
  }

 return (
   
   <View style={styles.container}>
 
     <View style={styles.functions}>
     <Image
       style={styles.tinyLogo}
       source={require('../assets/trump.jpg')}
     />
       <Text>Get your Favorite bag!</Text>
       <TextInput 
        value={search}
        onChangeText={text => searchFilter(text)}
         placeholder='Search here'></TextInput>
         
       <TouchableOpacity>
         <Text>BACKPACKS</Text>
       </TouchableOpacity>
       <TouchableOpacity>
         <Text>VIEW CART</Text>
       </TouchableOpacity>
       <TouchableOpacity>
         <Text>LUGGAGES</Text>
       </TouchableOpacity>
     </View>
     <View style={styles.listView}>
     {isLoading ? <ActivityIndicator/> : (
         <FlatList horizontal
         data={filterData}
         keyExtractor={(index,item) => item.id}
         renderItem={({item})=>(
           <View>
            <TouchableOpacity style={styles.buttonStyle} key={item.id}  onPress={()=> navigation.navigate('EditCart',{item: item})}>
             <View style={styles.leftList}>
               <Text style={{fontSize:25}}>{item.id}.</Text>
               <Text style={{fontSize:25}}> {item.name}</Text>
               <Text style={{fontSize:25}}> {item.price}</Text>
               <Text style={{fontSize:25}}> {item.name}</Text>
               <Image
       style={styles.tinyLogo}
       source={{uri:item.avatar }}></Image>
              <MaterialIcons name="delete-forever" size={24} color="black" onPress={()=>{onDelete(item.id)}}/>
             </View>
           </TouchableOpacity>
           </View>
         )}>
         </FlatList>
       )}
     </View>
   </View>
 );
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
      width:64,
      height:64,
    },
    listView:{
      marginTop:30,
      flex:1,
    },
    buttonStyle:{
        backgroundColor:'lightgray',
        width:110,
        height:'auto',
        justifyContent:'center',
        alignItems:'center',
        fontSize:30,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff'},
  });
export default CartView;
