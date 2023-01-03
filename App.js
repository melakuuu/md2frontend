import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Animated, Dimensions, Image, Platform, StyleSheet, Text, View,Button } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


// Plus...
import plus from './assets/plus.png'
import { FontAwesome5 } from "@expo/vector-icons";
// Font Awesome Icons...
//import { FontAwesome5 } from '@expo/vector-icons'
import { useRef } from 'react';
import { TextInput } from 'react-native-gesture-handler';

const Tab = createBottomTabNavigator();

// Hiding Tab Names...
export default function App() {
  
  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  return (
    <NavigationContainer>
      <Tab.Navigator tabBarOptions={{
        showLabel: false,
        // Floating Tab Bar...
        style: {
          backgroundColor: 'white', 
          position: 'absolute',
          bottom: 40,
          marginHorizontal: 20,
          // Max Height...
          height: 60,
          borderRadius: 10,
          // Shadow...
          shadowColor: '#000',
          shadowOpacity: 0.06,
          shadowOffset: {
            width: 10,
            height: 10
          },
          paddingHorizontal: 20,
        }
      }}>

        {
          // Tab Screens....

          // Tab ICons....
        }
        <Tab.Screen name={"Home"} component={HomeScreen} options={{
          tabBarIcon: ({ focused }) => (
            <View style={{
              // centring Tab Button...
              position: 'absolute',
              top: 20,
            }}>
              <FontAwesome5
                name="home"
                size={20}
                color={focused ? 'red' : 'gray'}
              ></FontAwesome5>
            </View>
          )
        }} listeners={({ navigation, route }) => ({
          // Onpress Update....
          tabPress: e => {
            Animated.spring(tabOffsetValue, {
              toValue: 0,
              useNativeDriver: true
            }).start();
          }
        })}></Tab.Screen>

        {/* <Tab.Screen name={"Search"} component={SearchScreen} options={{
          tabBarIcon: ({ focused }) => (
            <View style={{
              // centring Tab Button...
              position: 'absolute',
              top: 20
            }}>
              <FontAwesome5
                name="search"
                size={20}
                color={focused ? 'red' : 'gray'}
              ></FontAwesome5>
            </View>
          )
        }} listeners={({ navigation, route }) => ({
          // Onpress Update....
          tabPress: e => {
            Animated.spring(tabOffsetValue, {
              toValue: getWidth(),
              useNativeDriver: true
            }).start();
          }
        })}></Tab.Screen> */}


        {

          // Extra Tab Screen For Action Button..
        }

      

        <Tab.Screen name={"AboutScreen"} component={AboutScreen} options={{
          tabBarIcon: ({ focused }) => (
            <View style={{
              // centring Tab Button...
              position: 'absolute',
              top: 20,

            }}>
              <FontAwesome5
                name="bell"
                size={20}
                color={focused ? 'red' : 'gray'}
              ></FontAwesome5>
            </View>
          )
        }} listeners={({ navigation, route }) => ({
          // Onpress Update....
          tabPress: e => {
            Animated.spring(tabOffsetValue, {
              toValue: getWidth() * 3,
              useNativeDriver: true
            }).start();
          }
        })}></Tab.Screen>

        <Tab.Screen name={"ContactScreen"} component={ContactScreen} options={{
          tabBarIcon: ({ focused }) => (
            <View style={{
              // centring Tab Button...
              position: 'absolute',
              top: 20
            }}>
              <FontAwesome5
                name="user-alt"
                size={20}
                color={focused ? 'red' : 'gray'}
              ></FontAwesome5>
            </View>
          )
        }} listeners={({ navigation, route }) => ({
          // Onpress Update....
          tabPress: e => {
            Animated.spring(tabOffsetValue, {
              toValue: getWidth() * 4,
              useNativeDriver: true
            }).start();
          }
        })}></Tab.Screen>

      </Tab.Navigator>

      <Animated.View style={{
        width: getWidth() - 20,
        height: 2,
        backgroundColor: 'red',
        position: 'absolute',
        bottom: 98,
        // Horizontal Padding = 20...
        left: 50,
        borderRadius: 20,
        transform: [
          { translateX: tabOffsetValue }
        ]
      }}>

      </Animated.View>
    </NavigationContainer>
  );
}

function getWidth() {
  let width = Dimensions.get("window").width

  // Horizontal Padding = 20...
  width = width - 80

  // Total five Tabs...
  return width / 5
}



function ContactScreen() {
  const [name, setname] = useState('');
  const [code, setcode] = useState('');

  const [names, setnames] = useState('');
  const [codes, setcodes] = useState('');

  const[getid,setid]=useState(0)
  const [posts, setpost] = useState([])


  //
  const update = () => {
    const configurationObject = {
      url: `http://127.0.0.1:8000/api/teacher/${getid}/`,
      method: "PUT",
      data: { name, code },
    };

    axios(configurationObject)
      .then((response) =>{fetchData()})
  }
  function selectUser(id ,name,code)
  {
  setcode(code)
  setname(name)
  setid(id)
   
  }
  //
  const senddata = () => {
  axios({
    url: 'http://127.0.0.1:8000/api/teacher/',
    method: 'post',
    data: {
      name: names,
      code: codes,
    },
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  })
  .then(function (response) {
    fetchData();
  })
  .catch(function (error) {
    console.log(error);
  });
}
  //
  const fetchData = () => {
    axios.get('http://127.0.0.1:8000/api/teacher/', {
      "method": "GET",
      mode: "no-cors",
    })

      .then((response) => setpost(response.data))
      .catch((err) => console.log(err))


  }

 
  async function deletdata(id){
    await axios.delete(`http://127.0.0.1:8000/api/teacher/${id}/`,{
      "method": "DELETE",
      mode: "no-cors",

    }).then((respons)=>{fetchData()})
     .catch((err) => {console.log(err)})
  }

 
  useEffect(() => {

    fetchData()


  }, [])
 
  
  return (
    
   
             
              <View style={{   backgroundColor: 'rgba(52, 52, 52, 0.8)' ,  flex: 1, justifyContent: 'center', alignItems: 'center'  }}>
                <Text>
                 
                  <TextInput style={styles.input} placeholder='write studname' onChangeText={val=>setnames(val)}/>
                <TextInput style={styles.input} placeholder='write empcode' onChangeText={val=>setcodes(val)}/>
                <Button  style={styles.button} title='sendData' onPress={senddata}/>
                </Text>
      <Text style={{fontSize:'40px' ,textAlignVertical:'center'}}>{posts.map((post)=>{
        return <View><Text> teacher NAME{post.name} teacher code {post.code} <Button title='delete' style={styles.button} onPress={()=>deletdata(post.id)}/><Button onPress={()=>selectUser(post.id,post.name,post.code)}  title='Edit'  style={styles.button}/></Text></View>
      })} 
      </Text>
     

      < TextInput value={name} onChangeText={(val)=>setname(val)}  style={styles.input}/>
    < TextInput value={code} onChangeText={(val)=>setcode(val)} style={styles.input}/>
    <Button onPress={update}  title='Update' />
    </View>
  );
}

function HomeScreen() {
  const [name, setname] = useState('');
  const [names, setnames] = useState('');
  const [grades, setgrades] = useState('');
  const [grade, setgrade] = useState('');

  const[getid,setid]=useState(0)
  const [posts, setpost] = useState([])


  //
  const update = () => {
    const configurationObject = {
      url: `http://127.0.0.1:8000/api/student/${getid}/`,
      method: "PUT",
      data: { name, grade },
    };

    axios(configurationObject)
      .then((response) =>{fetchData()})
  }
  function selectUser(id ,name,grade)
  {
  setgrade(grade)
  setname(name)
  setid(id)
   
  }
  //
  const senddata = () => {
  axios({
    url: 'http://127.0.0.1:8000/api/student/',
    method: 'post',
    data: {
      name: names,
      grade: grades,
    },
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  })
  .then(function (response) {
    fetchData();
  })
  .catch(function (error) {
    console.log(error);
  });
}
  //
  const fetchData = () => {
    axios.get('http://127.0.0.1:8000/api/student/', {
      "method": "GET",
      mode: "no-cors",
    })

      .then((response) => setpost(response.data))
      .catch((err) => console.log(err))


  }
  // const senddata = (e) => {
  //   e.preventDefault();
   
  //   axios.post('http://127.0.0.1:8000/api/student/', {
  //    name,
  //    grade

  //   })
  //   .then((respons) => { })
  //     .then((err) => { console.log(err) })
  // }
 
  async function deletdata(id){
    await axios.delete(`http://127.0.0.1:8000/api/student/${id}/`,{
      "method": "DELETE",
      mode: "no-cors",

    }).then((respons)=>{fetchData()})
     .catch((err) => {console.log(err)})
  }

 
  useEffect(() => {

    fetchData()


  }, [])
 
  
  return (
    
   
             
              <View style={{   backgroundColor: 'rgba(52, 52, 52, 0.8)' ,  flex: 1, justifyContent: 'center', alignItems: 'center'  }}>
                <Text>
                 
                  <TextInput style={styles.input} placeholder='write studname' onChangeText={val=>setnames(val)}/>
                <TextInput style={styles.input} placeholder='write studegrade' onChangeText={val=>setgrades(val)}/>
                <Button  style={styles.button} title='sendData' onPress={senddata}/>
                </Text>
      <Text style={{fontSize:'40px' ,textAlignVertical:'center'}}>{posts.map((post)=>{
        return <View><Text> STUDENT NAME{post.name} STUDENT GRADE{post.grade} <Button title='delete' style={styles.button} onPress={()=>deletdata(post.id)}/><Button onPress={()=>selectUser(post.id,post.name,post.grade)}  title='Edit'  style={styles.button}/></Text></View>
      })} 
      </Text>
     

      < TextInput value={name} onChangeText={(val)=>setname(val)}  style={styles.input}/>
    < TextInput value={grade} onChangeText={(val)=>setgrade(val)} style={styles.input}/>
    <Button onPress={update}  title='Update' />
    </View>
  );
}

function AboutScreen() {
  const [name, setname] = useState('');
  const [code, setcode] = useState('');

  const [names, setnames] = useState('');
  const [codes, setcodes] = useState('');

  const[getid,setid]=useState(0)
  const [posts, setpost] = useState([])


  //
  const update = () => {
    const configurationObject = {
      url: `http://127.0.0.1:8000/api/employee/${getid}/`,
      method: "PUT",
      data: { name, code },
    };

    axios(configurationObject)
      .then((response) =>{fetchData()})
  }
  function selectUser(id ,name,code)
  {
  setcode(code)
  setname(name)
  setid(id)
   
  }
  //
  const senddata = () => {
  axios({
    url: 'http://127.0.0.1:8000/api/employee/',
    method: 'post',
    data: {
      name: names,
      code: codes,
    },
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  })
  .then(function (response) {
    fetchData();
  })
  .catch(function (error) {
    console.log(error);
  });
}
  //
  const fetchData = () => {
    axios.get('http://127.0.0.1:8000/api/employee/', {
      "method": "GET",
      mode: "no-cors",
    })

      .then((response) => setpost(response.data))
      .catch((err) => console.log(err))


  }

 
  async function deletdata(id){
    await axios.delete(`http://127.0.0.1:8000/api/employee/${id}/`,{
      "method": "DELETE",
      mode: "no-cors",

    }).then((respons)=>{fetchData()})
     .catch((err) => {console.log(err)})
  }

 
  useEffect(() => {

    fetchData()


  }, [])
 
  
  return (
    
   
             
              <View style={{   backgroundColor: 'rgba(52, 52, 52, 0.8)' ,  flex: 1, justifyContent: 'center', alignItems: 'center'  }}>
                <Text>
                 
                  <TextInput style={styles.input} placeholder='write studname' onChangeText={val=>setnames(val)}/>
                <TextInput style={styles.input} placeholder='write empcode' onChangeText={val=>setcodes(val)}/>
                <Button  style={styles.button} title='sendData' onPress={senddata}/>
                </Text>
      <Text style={{fontSize:'40px' ,textAlignVertical:'center'}}>{posts.map((post)=>{
        return <View><Text> employee NAME{post.name} employee code {post.code} <Button title='delete' style={styles.button} onPress={()=>deletdata(post.id)}/><Button onPress={()=>selectUser(post.id,post.name,post.code)}  title='Edit'  style={styles.button}/></Text></View>
      })} 
      </Text>
     

      < TextInput value={name} onChangeText={(val)=>setname(val)}  style={styles.input}/>
    < TextInput value={code} onChangeText={(val)=>setcode(val)} style={styles.input}/>
    <Button onPress={update}  title='Update' />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    backgroundColor: '#fff',
    padding: 20,
    margin: 10,
    width: 200,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
});