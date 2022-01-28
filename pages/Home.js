import { Component, useRef } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    ScrollView,
    Alert,
    
}
from 'react-native';
import { TextInput } from "react-native-gesture-handler";
import * as React from 'react';
import {AntDesign} from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons';

import { connect } from 'react-redux';


class Home extends Component {
    constructor(props){
        super(props);
          this.state = {
           email:null,
           username:null,
           firstname:null,
           lastname:null,
           id:null,
           waypointnum:0,
           waypointlist:[],
           oneway:[],
           secway:[],
           thirdway:[],
           fourway:[],
           fiveway:[],
           sixway:[],
           sevenway:[],
           eigthway:[],
           nineway:[],
           tenway:[]

        };
        this.myRef = React.createRef();
      
    }
    
    showAlert() {  
      Alert.alert(  
          'Error',  
          '10 waypoint is max',  
          [  
              
              {text: 'OK', onPress: () => console.log('OK Pressed')},  
          ]  
      );  
  }  
    
    goToPickLocationPage=()=>{
        this.props.navigation.navigate('LocationView')
    }

    removeInput =()=>{
      
      this.setState({waypointnum:this.state.waypointnum-1})
    }

    addInput =()=>{
      console.log('in point',this.props.pointList)
      if(this.state.waypointnum<3){
        this.setState({waypointnum:this.state.waypointnum+1})
      }else{
        this.showAlert()
      }
      
    }

    

    
    
    render(props) {
        const { navigation } = this.props;
        let arr=[]
        for (let i=0;i<this.state.waypointnum;i++){
        
            arr.push(
              <View key={i} style={{flexDirection:'row',alignItems:'center',padding:'2%'}}>
                <Text> {i+1}.</Text>
                <TextInput editable={false} selectTextOnFocus={false} style={{backgroundColor:'white',borderColor:'black',borderWidth:1}} placeholder="select location">
                
                </TextInput>
                <TouchableOpacity onPress={this.goToPickLocationPage}
                  styles={StyleSheet.buttonLogin}>
                  <MaterialIcons name="gps-fixed" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={this.removeInput}
                  styles={StyleSheet.buttonLogin}>
                  <AntDesign name="minuscircleo" size={20} color="red"></AntDesign>
                </TouchableOpacity>
              </View>
            )
          }
        return (
            
      
              <ScrollView contentContainerStyle={styles.container}>
                {arr}
                    <TouchableOpacity onPress={this.addInput}
                      styles={StyleSheet.buttonLogin}
                    >
                      <Text style={{color:'black',fontWeight:'bold'}}>+ Add New Waypoint</Text>
                    </TouchableOpacity>
              </ScrollView>
            
          );
    }
}

const styles = StyleSheet.create({
    buttonLogin: {
      justifyContent:"center",
      alignItems: "center",
      backgroundColor: "#6b4683",
      marginBottom:8,
      padding:8,

    },
    container: {
        flex: 1,
        justifyContent:"center",
        alignItems: "center",
        backgroundColor:'white',
    },
});

const mapStateToProps = (state) => (
  {pointList:state.locationReducer.pointList}
)

const mapDispatchToProps = state => ({});

export default connect(mapStateToProps,mapDispatchToProps) (Home)