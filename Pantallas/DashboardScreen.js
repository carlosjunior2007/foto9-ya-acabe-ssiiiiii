import React,{Component}from'react';
import{Text,View}from'react-native';

export default class LoadingScreen extends Component{
 render(){
   return(
     <View
       style={{
         flex:1,
         justifyContent:"center",
          alignltems:"center"
       }}>
       <Text>inicio</Text>
     </View>
   )
  }
}