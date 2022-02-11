import { Component} from "react";
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
import { addRegion,deleteRegion, saveOrder } from "../actions/Users";
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';



const options = [
  { value: 'instanly', label: 'รับสินค้าทันที' },
  { value: 'picktime', label: 'รับสินค้าล่วงหน้า' }
  
];

      

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
           date:new Date(),
           time:null,
           mode:null,
           show:false,
           showBtn:false

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
  showAlert4() {  
    Alert.alert(  
        'Error',  
        'Please Select time',  
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
      

      if(this.state.waypointnum<10){
        this.setState({waypointlist : this.state.waypointlist.concat(["Select location"])});
        
        let item ={
          id:0,
          region:{},
          address:'',
          phonenumber:'',
          details:''
          

        }
        this.props.addRegion(item)
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
      if(selectedOption==='instanly'){
        this.setState({showBtn:false})
      }else{
        this.setState({showBtn:true})
      }
    };

    

    popupDatePicker = () =>{
      console.log('popupDate')
      if(this.state.value==='instanly'){
        this.showAlert2()
      }
      if(this.state.value==='picktime'){
        console.log('เข้าเลือกวันที่นะ')
        this.showDatepicker()
      }if(this.state.value===null){
        console.log('null kb')
        this.showAlert3()
      }
    }


    popupTimePicker = () =>{
      
      console.log('popupTime')
      if(this.state.value==='instanly'){
        this.showAlert2()
      }
      if(this.state.value==='picktime'){
        console.log('เข้าเลือกเวลานะ')
        this.showTimepicker()
      }if(this.state.value===null){
        console.log('null kb')
        this.showAlert3()
      }
    }

    showDatepicker = () => {
      this.showMode('date')
    };
  
    showTimepicker = () => {
      this.showMode('time');
    };

    showMode = (currentMode) => {
      this.setState({show:true})
      this.setState({mode:currentMode})
    };
    

    onChange = (event,selectedDate) => {
      const currentDate = selectedDate || this.state.date;
      
      this.setState({show:Platform.OS === 'ios'})

      this.setState({date:currentDate});
     
      console.log('changed date',this.state.date)
    };
   
    goToAddDetails=()=>{
      let time=null
      if(this.state.value==='instanly'){
        time = new Date();
        this.goToAddDetails2(time)
      }
      if(this.state.value==='picktime'){
        time = this.state.date
        this.goToAddDetails2(time)
      }if(this.state.value===null){
        
        this.showAlert4()
      }
      //let list = JSON.parse(JSON.stringify(this.props.pointList));
      //console.log('waypointlist',this.state.waypointlist)
      
    }

    goToAddDetails2=(time)=>{
      let list = this.props.pointList
      let item ={
        getTime:time,
        wayPointList:list

      }
      this.props.saveOrder(item)
      console.log(this.props.order)
      this.calculatewaypoint()
      this.props.navigation.navigate('AddDetails')
    }

    calculatewaypoint=()=>{
      
    }
    
    render(props) {
        const { navigation } = this.props;
        const { selectedOption } = this.state;

        let arr=[]
        for (let i=0;i<this.state.waypointnum;i++){
            if(i===0){

              arr.push(
                
                <View key={i} style={{flexDirection:'row',alignItems:'center',padding:'2%'}}>
                  <Text> {i+1}.</Text>
                  <TextInput editable={false} selectTextOnFocus={false} style={{backgroundColor:'white',borderColor:'black',borderWidth:1,width:'80%'}} placeholder='เลือกจุดรับของ'
                  value={this.props.pointList[i] ? this.props.pointList[i].address : "เลือกจุดรับของ"}>
                  
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
            }else{
              arr.push(
                <View key={i} style={{flexDirection:'row',alignItems:'center',padding:'2%'}}>
                  <Text> {i+1}.</Text>
                  <TextInput editable={false} selectTextOnFocus={false} style={{backgroundColor:'white',borderColor:'black',borderWidth:1,width:'80%'}} placeholder='เลือกจุดส่งของ'
                  value={this.props.pointList[i] ? this.props.pointList[i].address : "เลือกจุดส่งของ"}>
                  
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
            
          }
        return (
            
      
              <ScrollView contentContainerStyle={styles.container}>
                {arr}
                <TouchableOpacity onPress={this.addInput}
                      styles={StyleSheet.addButton}
                    >
                      <Text style={{color:'black',fontWeight:'bold'}}>+ Add New Waypoint</Text>
                </TouchableOpacity>
               
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
                    this.handleChange(item.value)
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
               <View style={{flexDirection:'row',height:'10%',paddingVertical:'2%',}}>
               {this.state.showBtn&&( <TouchableOpacity style={styles.pickDateTimeButton}  onPress={this.popupDatePicker}>
                    <Text style={{color:'black',fontWeight:'bold'}}>เลือกวัน</Text>
                    </TouchableOpacity>)}
               {this.state.showBtn&&( <TouchableOpacity style={styles.pickDateTimeButton} onPress={this.popupTimePicker}>
                    <Text style={{color:'black',fontWeight:'bold'}}>เลือกเวลา</Text>
                    </TouchableOpacity>)}

                    {this.state.show && (
                          <DateTimePicker
                          testID="dateTimePicker"
                          value={this.state.date}
                          mode={this.state.mode}
                          is24Hour={true}
                          display="default"
                          onChange={this.onChange}
                          />
                    )}

                </View>
                <TouchableOpacity style={styles.addButton} onPress={this.goToAddDetails}>
                      <Text>เพิ่มรายละเอียด</Text>
                </TouchableOpacity>
                
                 
                  
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
      backgroundColor: "pink",
      marginBottom:'50%',
      padding:8,

    },
    addButton:{
      justifyContent:"center",
      alignItems: "center",
      backgroundColor: "pink",
      borderColor:'black',
      borderWidth:1,
    },
    container: {
        flex: 1,
        justifyContent:"center",
        alignItems: "center",
        backgroundColor:'white',
    },
    dropdown: {
      width:'60%',
      height: '5%',
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
      backgroundColor: "pink",
      marginHorizontal:'5%',
      paddingHorizontal:'5%',
      height:'50%',
      borderColor:'black',
      borderWidth:1
    },
});

const mapStateToProps = (state) => (
  
    {pointList:state.locationReducer.pointList,order:state.orderReducer.order}
  
 
)


const mapDispatchToProps = (dispatch)=>{
  return{
    addRegion:(item)=>dispatch(addRegion(item)),
    deleteRegion:(item)=>dispatch(deleteRegion(item)),
    saveOrder:(item)=>dispatch(saveOrder(item))
  }
  
}

export default connect(mapStateToProps,mapDispatchToProps) (Home)