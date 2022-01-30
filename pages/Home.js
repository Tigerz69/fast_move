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
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { addRegion,deleteRegion } from "../actions/Users";
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';



const options = [
  { value: 'instanly', label: 'รับสินค้าทันที' },
  { value: 'picktime', label: 'รับสินค้าล่วงหน้า' }
  
];
const defaultOption = options[0];

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
           waypointlist:['Select location'],
           value: null,
           isFocus:false,
           date:null,
           time:null,
           isTimeShow:false,
           isDateShow:false

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

    showAlert2() {  
      Alert.alert(  
          'Error',  
          'You choose instanly no need to pick a time',  
          [  
              
              {text: 'OK', onPress: () => console.log('OK Pressed')},  
          ]  
      );  
  }  
  

  showAlert3() {  
    Alert.alert(  
        'Error',  
        'You have to choose time to get item',  
        [  
            
            {text: 'OK', onPress: () => console.log('OK Pressed')},  
        ]  
    );  
}  
    
    goToPickLocationPage=(i)=>{
        this.props.navigation.navigate('LocationView',{index:i})
        
    }

    removeInput =(i)=>{
      let item ={index:i}
      this.props.deleteRegion(item)
      console.log(this.props.pointList)
      this.setState({waypointnum:this.state.waypointnum-1})
    }

    addInput =()=>{
      
      console.log(this.props.pointList)
      this.setState({waypointlist : this.state.waypointlist.concat(["Select location"])});
      let item ={
        id:0,
        region:{},
        address:'',
        phonenumber:'',
        details:''
        

      }
      this.props.addRegion(item)

      if(this.state.waypointnum<10){
        this.setState({waypointnum:this.state.waypointnum+1})
      }else{
        this.showAlert()
      }
      console.log('in point',this.props.pointList)
    }

    handleChange = (selectedOption) => {
      this.setState({ selectedOption }, () =>
        console.log(`Option selected:`, this.state.selectedOption)
      );
    };

    renderLabel = () => {
      let value=this.state.value
      let isFocus=this.state.isFocus
      if (value || isFocus) {
        return (
          <Text style={[styles.label, isFocus && { color: 'blue' }]}>
            เลือกเวลา
          </Text>
        );
      }
      return null;
    };

    popupDatePicker = () =>{
      console.log('popupDate')
      if(this.state.value==='instanly'){
        this.showAlert2()
      }
      if(this.state.value==='picktime'){
        console.log('เข้าเลือกวันที่นะ')
        this.setState({isDateShow:true})
      }if(this.state.value===null){
        console.log('null kb')
        this.showAlert3()
      }
    }


    popupTimePicker = () =>{
      let currentDate = new Date();
      let currentTime = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
      this.setState({time:currentTime})
      console.log('popupTime')
      if(this.state.value==='instanly'){
        this.showAlert2()
      }
      if(this.state.value==='picktime'){
        console.log('เข้าเลือกเวลานะ')
        this.setState({isTimeShow:true})
      }if(this.state.value===null){
        console.log('null kb')
        this.showAlert3()
      }
    }

    

    onChangeDate = (event,selectedDate) => {
     this.setState({date:selectedDate})
      console.log('changed date',date)
    };
    onChangeTime = (event,selectedTime) => {
      this.setState({time:selectedTime})
       console.log('changed time',time)
     };
     
    
    render(props) {
        const { navigation } = this.props;
        const { selectedOption } = this.state;

        let arr=[]
        for (let i=0;i<this.state.waypointnum;i++){
        
            arr.push(
              <View key={i} style={{flexDirection:'row',alignItems:'center',padding:'2%'}}>
                <Text> {i+1}.</Text>
                <TextInput editable={false} selectTextOnFocus={false} style={{backgroundColor:'white',borderColor:'black',borderWidth:1,width:'80%'}} placeholder='select location'
                value={this.props.pointList[i] ? this.props.pointList[i].address : "Select waypoint"}>
                
                </TextInput>
                <TouchableOpacity onPress={()=>this.goToPickLocationPage(i)}
                  styles={StyleSheet.buttonLogin}>
                  <MaterialIcons name="gps-fixed" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.removeInput(i)}
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
                {this.renderLabel()}
                <Dropdown
                  style={[styles.dropdown, this.state.isFocus && { borderColor: 'blue' }]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={options}
                  //search
                  dropdownPosition='auto'
                  maxHeight={120}

                  labelField="label"
                  valueField="value"
                  placeholder={!this.state.isFocus ? 'เลือกเวลา' : '...'}
                  searchPlaceholder="Search..."
                  value={this.state.value}
                  onFocus={() => this.setState({isFocus:true})}
                  onBlur={() =>this.setState({isFocus:false})}
                  onChange={item => {
                    this.setState({value:item.value});
                    this.setState({isFocus:false});
                    console.log(this.state.value)
                  }}
                   renderLeftIcon={() => (
                      <MaterialCommunityIcons
                        style={styles.icon}
                        color={this.state.isFocus ? 'blue' : 'black'}
                        name="timetable"
                        size={20}
                      />
          )}
                />
                <TouchableOpacity style={styles.pickDateTimeButton}  onPress={this.popupDatePicker}>
                <Text style={{color:'black',fontWeight:'bold'}}>เลือกวัน</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.pickDateTimeButton} onPress={this.popupTimePicker}>
                <Text style={{color:'black',fontWeight:'bold'}}>เลือกเวลา</Text>
                </TouchableOpacity>
                {this.state.isDateShow && (
                      <DateTimePicker
                      testID="DatePicker"
                      value={this.state.date}
                      mode={'date'}
                      is24Hour={true}
                      display="default"
                      onChange={this.onChangeDate}
                      />
                    )}
                  {this.state.isTimeShow &&(
                    <View >
          
  
                    <DateTimePicker
                      testID="TimePicker"
                      value={this.state.time}
                      mode={'time'}
                      is24Hour={true}
                      display="default"
                      onChange={this.onChangeTime}
                    />
                  
                </View>
                  )}
              </ScrollView>
            
          );
    }
}

const styles = StyleSheet.create({
  icon: {
    marginRight: 5,
  },
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
    dropdown: {
      width:'90%',
      height: '10%',
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
    pickDateTimeButton:{
      justifyContent:"center",
      alignItems: "center",
      backgroundColor: "#6b4683",
      marginBottom:8,
      padding:8,
    },
});

const mapStateToProps = (state) => (
  {pointList:state.locationReducer.pointList}
)

const mapDispatchToProps = (dispatch)=>{
  return{
    addRegion:(item)=>dispatch(addRegion(item)),
    deleteRegion:(item)=>dispatch(deleteRegion(item))
  }
  
}

export default connect(mapStateToProps,mapDispatchToProps) (Home)