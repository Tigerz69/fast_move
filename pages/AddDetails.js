import React,{Component} from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Alert,
    TextInput
    
}
from 'react-native';
import { connect } from 'react-redux';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import {editMoreOrder} from '../actions/Users';
import axios from "axios";
import Loading from "./Loading";
import auth from "../Firebase/Auth"
import firestore from '../Firebase/Firestore'
const initailprice = 36 
var upOnDistPrice = 0
var upOnNumPrice = 0

class AddDetails extends Component{

    constructor(props){
        super(props);

          this.state = {
            details:'',
            phonenumber:'',
            price:100,
            date:'',
            month:'',
            years:'',
            hour:'',
            minute:'',
            distance:0,
            duration:0,
            gnome:"",
            loading:false
          };
         
  }
  
        price_cal=(dist,num)=>{
         
          var totalPrice = 0
          if(dist>=1&&dist<=20){
            upOnDistPrice= dist*7
          }else if(dist>20&&dist<=30){
            upOnDistPrice= dist*8
          }else if(dist>30){
            upOnDistPrice= dist*14
          }
          if(num > 2){
            upOnNumPrice = (num-2)*20
          }
          totalPrice = upOnDistPrice+upOnNumPrice+initailprice
          let trantotalPrice=(Math.round(totalPrice * 100) / 100)
          //if use .toFixed(2) u will get string type
          return trantotalPrice
        }
        
        // calculate_for_2_point=()=>{
        //   //const {route}=this.props
        //   let dist = Math.round(route.params.distance/1000)
        //   let dur = Math.round(route.params.duration/60)
        //   let num = 2
        //   let totalPrice = this.price_cal(dist,num)
        //   let minute_dur = dur
        //   this.setState({price:totalPrice})
            
        //   this.setState({duration:minute_dur})
        //   this.setState({distance:dist})
        //   this.setState({gnome:route.params.gnome})
        //   let item ={details:this.state.details,
        //     phone:this.state.phonenumber,price:this.state.price}
        //     this.props.editMoreOrder(item)
        //     console.log('order',this.props.order)
        //     console.log('distance ',this.state.distance,' duration ',this.state.duration,' gnome ',this.state.gnome)
        // }

        calculate=()=>{
          
          axios.get(`http://192.168.1.100:5002/get`)  
          .then(res => {  
            let data = res.data; 
            console.log('data from api that calculated',data) 
            // this.setState({distance:data["distance"]})
            // this.setState({duration:data["duration"]})
            // this.setState({gnome:data["gnome"]})
            
            let dist = (data["distance"]/1000)
            let dur = Math.round(data["duration"]/60)
            let num = data["gnome"].length
            let totalPrice = this.price_cal(dist,num)
            let minute_dur = dur
            
            
            this.setState({price:totalPrice})
            this.setState({duration:minute_dur})
            this.setState({distance:dist})
            this.setState({gnome:data["gnome"]})
            
          })
          
        }

  saveLastNum=()=>{
    console.log('saveLastNum',this.state.phonenumber) 
    
    let item ={details:this.state.details,
      phone:this.state.phonenumber,price:this.state.price}
      this.props.editMoreOrder(item)
      console.log('order',this.props.order)
      console.log('distance ',this.state.distance,' duration ',this.state.duration,' gnome ',this.state.gnome)
  }


  save =()=>{
    console.log('order',this.props.order) 
    let user = auth.getCurrentUser() 
    console.log('user state' ,user)
    let order = this.props.order
    let id = user.uid
    let item={
      distance:this.state.distance,
      getTime:order.getTime,
      wayPointList:order.wayPointList, 
      gnome:this.state.gnome,
      customerID:id
      

    }
    firestore.saveOrder(item,this.saveSuccess,this.saveUncsuccess)
  }


  saveSuccess=()=>{
    this.props.navigation.navigate('Matching')
  }

  saveUncsuccess=(error)=>{
    console.log(error)
  }

        componentDidMount=()=>{
          
          
          var date =JSON.parse(JSON.stringify(this.props.order.getTime.getDate()))
          var month = JSON.parse(JSON.stringify(this.props.order.getTime.getMonth()+1))
          var years = JSON.parse(JSON.stringify(this.props.order.getTime.getFullYear()))
          var hour = JSON.parse(JSON.stringify(this.props.order.getTime.getHours()))
          var minute =JSON.parse(JSON.stringify(this.props.order.getTime.getMinutes()))
          if (hour < 10){
            hour = '0'+hour
          }
          
          if (minute < 10){
            minute = '0'+minute
          } 
          this.setState({date:date})
          this.setState({month:month})
          this.setState({years:years})
          this.setState({hour:hour})
          this.setState({minute:minute})
          
          
          this.calculate()
          
        }
      
        componentDidUpdate(prevProps, prevState) {
          if (prevState.details !== this.state.details||prevState.phonenumber !== this.state.phonenumber) {
            let item ={details:this.state.details,
              phone:this.state.phonenumber,price:this.state.price}
              this.props.editMoreOrder(item)
              console.log('order',this.props.order)
              console.log('distance ',this.state.distance,' duration ',this.state.duration,' gnome ',this.state.gnome)
              
          }
        }

        

      render(){
          
        return(
            this.state.loading ? (<Loading></Loading>):
            (
            <View style={styles.container}>
                <View style={{alignItems:'center'}}>
                    <Text style={styles.Header}>เพิ่มรายละเอียด</Text>
                </View>
                <View style={{paddingLeft:'5%'}}>
                    <Text style={styles.SubHeader}>เวลารับสินค้า</Text>
                    <Text>{this.state.date+'/'+this.state.month+'/'+this.state.years+'  '+this.state.hour+':'+this.state.minute}</Text>
                </View>

               {/*<TouchableOpacity onPress={this.check}> 
                <Text>เช็ค</Text>
                </TouchableOpacity>*/}
                <View style={styles.detailView}>
                <MaterialCommunityIcons name="comment-text-outline" size={24} color="black" />
                  <TextInput style={styles.detailTextInput} placeholder='กรอกรายละเอียดเพิ่มเติม' 
                  onChangeText={txt=>{this.setState({details:txt},()=>{
                    
                    console.log('detail state in callback',this.state.details)
                  })}}></TextInput>
                </View>
                <View style={styles.detailView}>
                <AntDesign name="phone" size={24} color="black" />
                  <TextInput style={styles.detailTextInput} placeholder='เบอร์ติดต่อของลูกค้า' 
                  onChangeText={txt=>{this.setState({phonenumber:txt},()=>{
                    
                    console.log('phone state in callback',this.state.phonenumber)
                    this.saveLastNum() 
                  })}}></TextInput>
                </View>
                {/*<View>
                  <Text>ราคา</Text>
                </View>*/}
                
                {/*<TouchableOpacity style={styles.button} onPress={this.onShowPopup}>
                  <Text>เรียก popup</Text>
              </TouchableOpacity>*/}
              <View style={styles.bottomView}>
                <Text style={{alignItems:'flex-end',fontSize:20}}>
                      รายละเอียดค่าบริการ
                </Text>
                <Text >
                  ระยะทาง {this.state.distance} กม.
                </Text>
                <Text  >
                  ราคาเริ่มต้น 36 บาท 
                </Text>
                <Text  >
                  ราคาระยะทาง {Math.round(upOnDistPrice * 100) / 100} บาท
                </Text>
                <Text  >
                  ราคาต่อจำนวนจุด {upOnNumPrice} บาท
                </Text>
                <Text  >
                  ทั้งหมด {this.state.price} บาท
                </Text>
              </View> 
              <TouchableOpacity style={styles.button} onPress={this.save}>
                  <Text style={{color:'white'}}>เรียกงานขนส่ง</Text>
                </TouchableOpacity>
            </View>)
        )
      }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
        backgroundColor:'pink',
    },
      Header : {
        paddingTop:'10%',
        color: "black",
        fontSize:32,
        
        
      },
      SubHeader :{
          paddingTop:'10%',
          color:'black',
          fontSize:20
      },
      detailTextInput:{
        flex:1,
        backgroundColor:'white',
        flexDirection:'column',
        justifyContent: 'center',
        alignItems:'center',
        width:'100%',
      },
      detailView:{
        flexDirection:'row',paddingBottom:'5%',
        width:'90%'  ,paddingLeft:'5%',alignItems:'center',paddingTop:'5%'    },
      button:{
        backgroundColor:'black',
        alignItems:'center',
        justifyContent: 'center',
        margin:100,
        height:50

      },
      bottomView:{
        
        justifyContent: 'flex-end',
        alignItems:'flex-start',
        paddingLeft:20 
      },
      
});

const mapStateToProps = (state) => (
    {order:state.orderReducer.order}
  )
  
  const mapDispatchToProps = (dispatch)=>{
    return{
      editMoreOrder:(item)=>dispatch(editMoreOrder(item)),
      
    }
    
  }

  export default connect(mapStateToProps,mapDispatchToProps) (AddDetails)  