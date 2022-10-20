import { StatusBar } from 'expo-status-bar';
import { useState,useEffect } from 'react';
import { StyleSheet, Text, View,Image, TextInput, TouchableOpacity ,ActivityIndicator,FlatList} from 'react-native';
import filter from 'lodash.filter';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

 const Home = ({navigation, route}) => {
  //if loaded show data else show loading circle
  const [isLoading,setLoading]=useState(true);
  //declare data as array[]
  const [data,setData]=useState([])
  //delcare text as empty string
  const [text,setText]= useState('');
  //show or hide View when TextInput onClick
  const [shouldShow, setShouldShow] = useState(true);
  const [avatar,setAvatar]=useState('')
  const [query, setQuery] = useState('');
  const getData = async () =>{
   try{
     const response= await fetch('https://6347859cdb76843976acdaff.mockapi.io/api/buoi07/bag');
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
  /*The useEffect Hook allows you to perform side effects in your components. 
 Some examples of side effects are: fetching data, directly updating the DOM, and timers. 
 useEffect accepts two arguments. 
 The second argument is optional*/
 useEffect(()=>{
    getData();
  }, []);
 async function fetchData(text) {
    try{
        const response= await fetch(`https://6347859cdb76843976acdaff.mockapi.io/api/buoi07/bag/${text}`);
        //convert data you get to json data
        const json= await response.json();
        setData(json);
        
        //const selected = data => data.reduce((keys, json) => keys.concat(Object.keys(json).filter(key => keys.avatar.indexOf(key) === -1)), [])
       
        console.log(`Data:`,json);
      } catch(error){
        console.log(error);
    }  finally{
      setLoading(false);
    }
}
 /*The useEffect Hook allows you to perform side effects in your components. 
 Some examples of side effects are: fetching data, directly updating the DOM, and timers. 
 useEffect accepts two arguments. 
 The second argument is optional*/
 useEffect(()=>{
    getData();
  }, []);

 
 //clear TextInput after press Save


 return (
   
   <View style={styles.container}>
 
     <View style={styles.functions}>
     <Image
       style={styles.tinyLogo}
       source={require('../assets/trump.jpg')}
     />
       <Text>Get your Favorite bag!</Text>
       <TextInput 
        value={text}
        onChangeText={text => setText(text)}
         placeholder='Search'></TextInput>
         <TouchableOpacity onPress={()=>fetchData(text)} >
           <Text>SEARCH</Text>
         </TouchableOpacity>
       <TouchableOpacity>
         <Text>BACKPACKS</Text>
       </TouchableOpacity>
       <TouchableOpacity>
         <Text>ALL BAGS</Text>
       </TouchableOpacity>
       <TouchableOpacity>
         <Text>LUGGAGES</Text>
       </TouchableOpacity>
     </View>
     <View style={styles.listView}>
     {isLoading ? <ActivityIndicator/> : (
         <FlatList horizontal
         data={data}
         keyExtractor={(item) => item.id}
         renderItem={({item})=>(
           <View>
                   <TouchableOpacity style={styles.buttonStyle} key={item.id}  onPress={()=> navigation.navigate('Details',{item: item})}>
             <View style={styles.leftList}>
               <Text style={{fontSize:25}}>{item.id}.</Text>
               <Text style={{fontSize:25}}> {item.name}</Text>
               <Text style={{fontSize:25}}> {item.price}</Text>
               <Text style={{fontSize:25}}> {item.name}</Text>
               <Image
       style={styles.tinyLogo}
       source={{uri:item.avatar }}></Image>
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
export default Home;
